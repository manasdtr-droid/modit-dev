const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const apiDataDir = path.join(__dirname, 'data');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function formatRupee(value) {
  return `Rs ${Math.round(value).toLocaleString('en-IN')}`;
}

function normalizeText(value) {
  return String(value || '').toLowerCase();
}

function getMarketData() {
  const market = readJson(path.join(apiDataDir, 'market-signals.json'));
  return {
    updatedAt: market.updatedAt,
    signals: market.signals.map(signal => ({
      ...signal,
      updatedAt: signal.updatedAt || market.updatedAt
    }))
  };
}

function getKnowledgeBank() {
  return readJson(path.join(apiDataDir, 'ai-knowledge-bank.json'));
}

function countKeywordMatches(query, keywords = []) {
  return keywords.reduce((score, keyword) => {
    const normalized = normalizeText(keyword);
    return score + (normalized && query.includes(normalized) ? 1 : 0);
  }, 0);
}

function findBestMatch(query, entries = []) {
  return entries
    .map(entry => ({ entry, score: countKeywordMatches(query, entry.keywords) }))
    .filter(match => match.score > 0)
    .sort((a, b) => b.score - a.score)[0]?.entry || null;
}

function isEstimatorQuery(query) {
  return [
    'estimate',
    'estimator',
    'calculate',
    'quantity',
    'how much',
    'sq ft',
    'square feet',
    'area',
    'volume',
    'material required'
  ].some(keyword => query.includes(keyword));
}

function getKnowledgeReply(message) {
  const q = normalizeText(message);
  const bank = getKnowledgeBank();
  const estimatorMode = isEstimatorQuery(q);
  const material = findBestMatch(q, bank.materialGuides);
  const estimationRule = findBestMatch(q, bank.estimationRules);
  const procurementTopic = findBestMatch(q, bank.procurementTopics);

  if (estimationRule) {
    return `${bank.agents.estimator.name}: ${estimationRule.reply} ${bank.safetyAndDisclaimers[1]}`;
  }

  if (material) {
    const baseReply = estimatorMode ? material.estimatorReply : material.procurementReply;
    const questions = material.questions?.length
      ? ` Key inputs needed: ${material.questions.join(' ')}`
      : '';
    const agent = estimatorMode ? bank.agents.estimator.name : bank.agents.procurement.name;
    return `${agent}: ${baseReply}${questions}`;
  }

  if (procurementTopic) {
    return `${bank.agents.procurement.name}: ${procurementTopic.reply}`;
  }

  if (q.includes('procurement assistant') || q.includes('procurement agent')) {
    return `${bank.agents.procurement.name}: ${bank.agents.procurement.defaultReply}`;
  }

  if (q.includes('construction estimator') || q.includes('estimator agent')) {
    return `${bank.agents.estimator.name}: ${bank.agents.estimator.defaultReply}`;
  }

  return null;
}

function getAiReply(message, cartCount = 0) {
  const q = String(message || '').toLowerCase();
  const market = getMarketData();
  const cement = market.signals.find(signal => signal.materialKey === 'cement_43_grade');
  const copper = market.signals.find(signal => signal.materialKey === 'copper_wire_1_5sqmm');
  const knowledgeReply = getKnowledgeReply(message);

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
  if (knowledgeReply) return knowledgeReply;
  return 'I can help with product discovery, market signals, estimation, cart guidance, delivery planning, GST billing, and bulk inquiry preparation. Share a material or site scope to get a more specific answer.';
}

module.exports = {
  formatRupee,
  getAiReply,
  getKnowledgeBank,
  getKnowledgeReply,
  getMarketData,
  rootDir
};
