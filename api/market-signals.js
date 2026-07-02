const { getMarketData } = require('./_shared');

module.exports = (req, res) => {
  const data = getMarketData();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
};
