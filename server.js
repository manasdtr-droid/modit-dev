const http = require('http');
const fs = require('fs');
const path = require('path');
const { createLead, getAiReply, getMarketData, getPublicConfig } = require('./api/_shared');

const rootDir = __dirname;
const port = Number(process.env.PORT || 8765);
const blockedStaticPrefixes = ['/api/data/', '/data/', '/src/', '/.git/', '/.lovable/'];
const blockedStaticFiles = new Set([
  '/index-ssr.html',
  '/agents.md',
  '/modit-project-overview.md',
  '/package.json',
  '/vercel.json',
  '/vite.config.ts',
  '/tsconfig.json',
  '/components.json',
  '/bun.lock',
  '/bunfig.toml',
  '/eslint.config.js'
]);

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg'
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(payload));
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 10000) {
        reject(new Error('Request body too large'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function isBlockedStaticPath(pathname) {
  const normalized = pathname.replace(/\\/g, '/');
  const lower = normalized.toLowerCase();
  return blockedStaticFiles.has(normalized) || blockedStaticFiles.has(lower) || blockedStaticPrefixes.some(prefix => lower.startsWith(prefix));
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const requestedPath = url.pathname === '/' ? '/index.html' : url.pathname;
  const decodedPath = decodeURIComponent(requestedPath);
  const fullPath = path.resolve(rootDir, `.${decodedPath}`);

  if (!fullPath.startsWith(rootDir) || isBlockedStaticPath(decodedPath)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    const ext = path.extname(fullPath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': contentTypes[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-store' : 'public, max-age=60'
    });
    res.end(req.method === 'HEAD' ? undefined : data);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === 'GET' && url.pathname === '/api/market-signals') {
      sendJson(res, 200, getMarketData());
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/config') {
      sendJson(res, 200, getPublicConfig());
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/chat') {
      const body = await readRequestBody(req);
      const payload = body ? JSON.parse(body) : {};
      sendJson(res, 200, {
        reply: getAiReply(payload.message, payload.cartCount),
        source: 'modit-api',
        generatedAt: new Date().toISOString()
      });
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/leads') {
      const body = await readRequestBody(req);
      const payload = body ? JSON.parse(body) : {};
      const result = await createLead(payload, {
        userAgent: req.headers['user-agent'],
        ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress,
        referer: req.headers.referer || req.headers.referrer
      });
      sendJson(res, 200, result);
      return;
    }

    if (req.method === 'GET' || req.method === 'HEAD') {
      serveStatic(req, res);
      return;
    }

    sendJson(res, 405, { error: 'Method not allowed' });
  } catch (error) {
    sendJson(res, 500, { error: error.message || 'Internal server error' });
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`MODIT server running at http://127.0.0.1:${port}`);
});
