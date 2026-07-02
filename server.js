const http = require('http');
const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const port = Number(process.env.PORT || 8765);

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
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

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function getMarketData() {
  const market = readJson(path.join(rootDir, 'data', 'market-signals.json'));
  return {
    updatedAt: market.updatedAt,
    signals: market.signals.map(signal => ({
      ...signal,
      updatedAt: signal.updatedAt || market.updatedAt
    }))
  };
}

function getAiReply(message, cartCount = 0) {
  const q = String(message || '').toLowerCase();
  const market = getMarketData();
  const cement = market.signals.find(signal => signal.materialKey === 'cement_43_grade');
  const copper = market.signals.find(signal => signal.materialKey === 'copper_wire_1_5sqmm');

  if (!q.trim()) {
    return 'Send a material, quantity, site use case, or market question and I will help you prepare the next action.';
  }
  if (q.includes('market') || q.includes('price') || q.includes('sensex') || q.includes('forecast')) {
    return `${cement.label} is ${formatRupee(cement.todayPrice)} today. AI tomorrow is ${formatRupee(cement.aiTomorrowPrice)} with ${cement.confidence}% confidence. Use this as a procurement planning signal; final selling price and availability should be confirmed before dispatch.`;
  }
  if (q.includes('cement') || q.includes('slab') || q.includes('concrete')) {
    return 'For cement, I recommend shortlisting UltraTech Premium Cement and UltraTech PPC. Share area, slab thickness, floor count, and delivery pincode so MODIT can convert this into a bulk quote.';
  }
  if (q.includes('wire') || q.includes('electrical') || q.includes('copper')) {
    return `For wiring, Polycab 1.5 sq mm is a sponsored SKU. Current copper-linked signal is ${formatRupee(copper.todayPrice)} today and ${formatRupee(copper.aiTomorrowPrice)} for AI tomorrow. Confirm load type and route length before ordering.`;
  }
  if (q.includes('bulk') || q.includes('quote') || q.includes('contractor')) {
    return 'For a bulk quote, capture material list, brand preference, quantity, GST number, delivery site, unloading constraints, and payment terms. MODIT sales should verify stock and final rate before confirmation.';
  }
  if (q.includes('cart') || q.includes('order')) {
    return `Your browser cart currently reports ${cartCount} item(s). I can help decide whether to add sponsored market SKUs or prepare a contractor quote.`;
  }
  return 'I can help with product discovery, material market signals, cart guidance, and bulk inquiry preparation. For production, this endpoint can be connected to an LLM with catalog retrieval and human handoff.';
}

function formatRupee(value) {
  return `Rs ${Math.round(value).toLocaleString('en-IN')}`;
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

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const requestedPath = url.pathname === '/' ? '/index.html' : url.pathname;
  const decodedPath = decodeURIComponent(requestedPath);
  const fullPath = path.resolve(rootDir, `.${decodedPath}`);

  if (!fullPath.startsWith(rootDir)) {
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
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === 'GET' && url.pathname === '/api/market-signals') {
      sendJson(res, 200, getMarketData());
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
