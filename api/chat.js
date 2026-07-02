const { getAiReply } = require('./_shared');

module.exports = async (req, res) => {
  try {
    const body = await new Promise((resolve, reject) => {
      let raw = '';
      req.on('data', chunk => {
        raw += chunk;
        if (raw.length > 10000) {
          reject(new Error('Request body too large'));
          req.destroy();
        }
      });
      req.on('end', () => resolve(raw));
      req.on('error', reject);
    });

    const payload = body ? JSON.parse(body) : {};
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify({
      reply: getAiReply(payload.message, payload.cartCount),
      source: 'modit-api',
      generatedAt: new Date().toISOString()
    }));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: error.message || 'Internal server error' }));
  }
};
