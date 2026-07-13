const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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

function cleanString(value, maxLength = 1000) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

function cleanPhone(value) {
  return String(value || '').replace(/[^\d+]/g, '').slice(0, 18);
}

function normalizeWhatsAppPhone(value = process.env.MODIT_WHATSAPP_PHONE) {
  return String(value || '').replace(/\D/g, '').slice(0, 18);
}

function getPublicConfig() {
  return {
    whatsappPhone: normalizeWhatsAppPhone(),
    leadCaptureConfigured: Boolean(process.env.LEADS_WEBHOOK_URL),
    leadTarget: cleanString(process.env.LEADS_WEBHOOK_LABEL || (process.env.LEADS_WEBHOOK_URL ? 'configured webhook' : 'local dev only'), 80)
  };
}

function readRequestJson(req, maxBytes = 50000) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > maxBytes) {
        reject(new Error('Request body too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function sanitizeObject(value, depth = 0) {
  if (depth > 4) return cleanString(value, 500);
  if (Array.isArray(value)) return value.slice(0, 60).map(item => sanitizeObject(item, depth + 1));
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  if (typeof value === 'boolean' || value === null) return value;
  if (!value || typeof value !== 'object') return cleanString(value, 3000);
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [
    cleanString(key, 80),
    sanitizeObject(item, depth + 1)
  ]));
}

function normalizeLeadPayload(payload = {}, meta = {}) {
  const customerInput = payload.customer || {};
  const customer = {
    name: cleanString(customerInput.name || payload.name, 120),
    phone: cleanPhone(customerInput.phone || payload.phone),
    email: cleanString(customerInput.email || payload.email, 160),
    company: cleanString(customerInput.company || payload.company, 160)
  };
  const cart = Array.isArray(payload.cart) ? payload.cart.slice(0, 50).map(item => ({
    id: Number(item.id) || null,
    name: cleanString(item.name, 180),
    qty: Number(item.qty) || 0,
    unit: cleanString(item.unit, 40),
    unitPrice: Number(item.unitPrice) || 0,
    lineTotal: Number(item.lineTotal) || 0
  })) : [];
  const lead = {
    id: `MODIT-${Date.now()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`,
    createdAt: new Date().toISOString(),
    type: cleanString(payload.type || 'general', 50),
    source: cleanString(payload.source || 'website', 120),
    page: cleanString(payload.page || meta.referer || '', 240),
    customer,
    message: cleanString(payload.message, 6000),
    fields: sanitizeObject(payload.fields || {}),
    cart,
    totals: sanitizeObject(payload.totals || {}),
    meta: {
      userAgent: cleanString(meta.userAgent, 240),
      ip: cleanString(meta.ip, 80)
    }
  };
  const hasContact = Boolean(customer.name || customer.phone || customer.email || customer.company);
  const hasContent = Boolean(lead.message || Object.keys(lead.fields).length || cart.length);
  if (!hasContact && !hasContent) {
    throw new Error('Lead must include contact details, message, form fields, or cart items');
  }
  return lead;
}

async function forwardLeadToWebhook(lead) {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (!webhookUrl) return { delivered: false, target: 'local-dev', reason: 'LEADS_WEBHOOK_URL not configured' };
  if (typeof fetch !== 'function') return { delivered: false, target: 'webhook', reason: 'fetch unavailable in current Node runtime' };
  const controller = new AbortController();
  const timeoutMs = Number(process.env.LEADS_WEBHOOK_TIMEOUT_MS || 8000);
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'MODIT-Leads/1.0'
    };
    if (process.env.LEADS_WEBHOOK_SECRET) {
      headers['X-MODIT-SECRET'] = process.env.LEADS_WEBHOOK_SECRET;
    }
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(lead),
      signal: controller.signal
    });
    return {
      delivered: response.ok,
      target: cleanString(process.env.LEADS_WEBHOOK_LABEL || 'webhook', 80),
      status: response.status
    };
  } finally {
    clearTimeout(timeout);
  }
}

function writeLocalLeadLog(lead) {
  if (process.env.VERCEL || process.env.LEADS_LOCAL_LOG === '0') return false;
  const dir = path.join(rootDir, '.tmp');
  fs.mkdirSync(dir, { recursive: true });
  fs.appendFileSync(path.join(dir, 'leads.jsonl'), `${JSON.stringify(lead)}\n`);
  return true;
}

async function createLead(payload, meta = {}) {
  const lead = normalizeLeadPayload(payload, meta);
  const delivery = await forwardLeadToWebhook(lead);
  const localLogged = writeLocalLeadLog(lead);
  return {
    ok: true,
    leadId: lead.id,
    delivered: delivery.delivered,
    delivery,
    localLogged,
    generatedAt: new Date().toISOString()
  };
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
  createLead,
  formatRupee,
  getAiReply,
  getKnowledgeBank,
  getKnowledgeReply,
  getMarketData,
  getPublicConfig,
  readRequestJson,
  rootDir
};
