const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function formatRupee(value) {
  return `Rs ${Math.round(value).toLocaleString('en-IN')}`;
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
  return 'I can help with product discovery, market signals, cart guidance, and bulk inquiry preparation. For production, this endpoint can be connected to a secure LLM backend with catalog retrieval and human handoff.';
}

module.exports = {
  formatRupee,
  getAiReply,
  getMarketData,
  rootDir
};
