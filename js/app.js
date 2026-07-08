const MODIT = {
  products: [
    { id: 1, name: "UltraTech Premium Cement (43 Grade)", category: "cement", brand: "UltraTech", price: 380, originalPrice: 420, rating: 4.7, reviews: 2345, image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80", badge: "Bestseller", delivery: "45 min", unit: "50 kg", sponsored: true, marketSignal: { materialKey: "cement_43_grade", label: "Cement 43 Grade", unit: "50 kg bag", todayPrice: 380, previousAiForToday: 376, aiTomorrowPrice: 384, confidence: 74, trend: "up", updatedAt: "01 Jul 2026, 09:00 IST", source: "MODIT supplier index" } },
    { id: 2, name: "Asian Paints Royale Shyne (20L)", category: "paint", brand: "Asian Paints", price: 5499, originalPrice: 6299, rating: 4.5, reviews: 1892, image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&q=80", badge: "-13%", delivery: "1 hour", unit: "20 L", sponsored: true, marketSignal: { materialKey: "premium_paint_20l", label: "Premium Paint", unit: "20 L pail", todayPrice: 5499, previousAiForToday: 5520, aiTomorrowPrice: 5475, confidence: 68, trend: "down", updatedAt: "01 Jul 2026, 09:00 IST", source: "MODIT demand index" } },
    { id: 3, name: "Polycab Wires (1.5 sq mm, 90m)", category: "electrical", brand: "Polycab", price: 1299, originalPrice: 1599, rating: 4.6, reviews: 1547, image: "https://images.unsplash.com/photo-1664448015950-3bf1ef1d8c63?w=400&q=80", badge: "Popular", delivery: "30 min", unit: "90 m", sponsored: true, marketSignal: { materialKey: "copper_wire_1_5sqmm", label: "Copper Wire", unit: "90 m coil", todayPrice: 1299, previousAiForToday: 1285, aiTomorrowPrice: 1312, confidence: 71, trend: "up", updatedAt: "01 Jul 2026, 09:00 IST", source: "Copper-linked index" } },
    { id: 4, name: "Kajaria Vitrified Tiles (60x60)", category: "tiles", brand: "Kajaria", price: 79, originalPrice: 99, rating: 4.4, reviews: 3210, image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80", badge: "-20%", delivery: "2 hours", unit: "sq ft", sponsored: true, marketSignal: { materialKey: "vitrified_tile_60x60", label: "Vitrified Tile", unit: "sq ft", todayPrice: 79, previousAiForToday: 80, aiTomorrowPrice: 79, confidence: 63, trend: "flat", updatedAt: "01 Jul 2026, 09:00 IST", source: "MODIT regional index" } },
    { id: 5, name: "Havells Modular Switches (White)", category: "electrical", brand: "Havells", price: 45, originalPrice: 55, rating: 4.3, reviews: 4123, image: "https://images.unsplash.com/photo-1664448015950-3bf1ef1d8c63?w=400&q=80", badge: "Trending", delivery: "30 min", unit: "piece" },
    { id: 6, name: "Bosch Professional Drill Set", category: "tools", brand: "Bosch", price: 8499, originalPrice: 9999, rating: 4.8, reviews: 876, image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80", badge: "Premium", delivery: "1 hour", unit: "set" },
    { id: 7, name: "Supreme PVC Pipe (4 inch, 6m)", category: "plumbing", brand: "Supreme", price: 899, originalPrice: 1099, rating: 4.5, reviews: 2567, image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&q=80", badge: "Best Price", delivery: "45 min", unit: "6 m" },
    { id: 8, name: "Dr Fixit Waterproof Coating (10L)", category: "waterproofing", brand: "Dr Fixit", price: 2499, originalPrice: 2899, rating: 4.6, reviews: 1432, image: "https://images.unsplash.com/photo-1584589167171-c5413b6e1e3c?w=400&q=80", badge: "Popular", delivery: "1 hour", unit: "10 L" },
    { id: 9, name: "Hettich Drawer Slide (Premium)", category: "hardware", brand: "Hettich", price: 299, originalPrice: 399, rating: 4.4, reviews: 987, image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&q=80", badge: "-25%", delivery: "30 min", unit: "pair" },
    { id: 10, name: "Jaquar Chrome Bath Fitting Set", category: "plumbing", brand: "Jaquar", price: 3999, originalPrice: 4999, rating: 4.7, reviews: 1876, image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&q=80", badge: "Premium", delivery: "1 hour", unit: "set" },
    { id: 11, name: "Asian Paints Tractor Emulsion (20L)", category: "paint", brand: "Asian Paints", price: 3299, originalPrice: 3799, rating: 4.3, reviews: 4321, image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&q=80", badge: "Value", delivery: "1 hour", unit: "20 L" },
    { id: 12, name: "UltraTech PPC Cement (Super Grade)", category: "cement", brand: "UltraTech", price: 395, originalPrice: 445, rating: 4.8, reviews: 5678, image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80", badge: "Top Rated", delivery: "45 min", unit: "50 kg" },
  ],

  cart: [],

  init() {
    this.loadCart();
    this.initMobileMenu();
    this.initScrollAnimations();
    this.initSearchToggle();
    this.initCounters();
    this.renderProducts();
    this.renderMarketSection();
    this.updateCartBadge();
    this.initNavbarScroll();
    this.initModitAI();
    this.loadMarketSignals();
  },

  initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  },

  loadCart() {
    try {
      const saved = localStorage.getItem('modit_cart');
      this.cart = saved ? JSON.parse(saved) : [];
    } catch { this.cart = []; }
  },

  saveCart() {
    localStorage.setItem('modit_cart', JSON.stringify(this.cart));
    this.updateCartBadge();
  },

  updateCartBadge() {
    const count = this.cart.reduce((s, i) => s + i.qty, 0);
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = count;
      el.classList.toggle('hidden', count === 0);
    });
  },

  addToCart(id) {
    const existing = this.cart.find(i => i.id === id);
    if (existing) { existing.qty++; }
    else { this.cart.push({ id, qty: 1 }); }
    this.saveCart();
    this.showToast('Added to cart');
  },

  removeFromCart(id) {
    this.cart = this.cart.filter(i => i.id !== id);
    this.saveCart();
    if (window.location.pathname.includes('cart')) this.renderCartPage();
  },

  updateQty(id, delta) {
    const item = this.cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) { this.cart = this.cart.filter(i => i.id !== id); }
    this.saveCart();
    if (window.location.pathname.includes('cart')) this.renderCartPage();
  },

  getCartTotal() {
    return this.cart.reduce((s, i) => {
      const p = this.products.find(p => p.id === i.id);
      return s + (p ? p.price * i.qty : 0);
    }, 0);
  },

  getCartCount() { return this.cart.reduce((s, i) => s + i.qty, 0); },

  showToast(msg) {
    const existing = document.querySelector('.modit-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'modit-toast';
    toast.innerHTML = `<div class="flex items-center gap-3 px-6 py-4 bg-[#111] text-white rounded-2xl shadow-2xl text-sm font-medium"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>${msg}</div>`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 2500);
  },

  getProduct(id) { return this.products.find(p => p.id === parseInt(id)); },

  getRelatedProducts(category, excludeId) {
    return this.products.filter(p => p.category === category && p.id !== excludeId).slice(0, 4);
  },

  getProductsByCategory(cat) {
    return cat && cat !== 'all' ? this.products.filter(p => p.category === cat) : this.products;
  },

  getCategories() {
    const cats = {};
    this.products.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1; });
    return Object.entries(cats).map(([slug, count]) => ({
      slug, count,
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      image: this.products.find(p => p.category === slug)?.image || ''
    }));
  },

  getBrands() {
    return [...new Set(this.products.map(p => p.brand))];
  },

  formatPrice(p) {
    return '\u20B9' + Math.round(p).toLocaleString('en-IN');
  },

  getMarketProducts() {
    return this.products.filter(p => p.marketSignal);
  },

  async loadMarketSignals() {
    if (!window.location.protocol.startsWith('http')) return;
    try {
      const response = await fetch('/api/market-signals', { headers: { 'Accept': 'application/json' } });
      if (!response.ok) throw new Error('Market API unavailable');
      const payload = await response.json();
      this.applyMarketSignals(payload.signals || [], payload.updatedAt);
      this.refreshDynamicViews();
    } catch (error) {
      console.warn('Using embedded market signals:', error.message);
    }
  },

  applyMarketSignals(signals, updatedAt) {
    signals.forEach(signal => {
      const product = this.getProduct(signal.productId);
      if (!product) return;
      product.sponsored = true;
      product.marketSignal = {
        ...signal,
        updatedAt: signal.updatedAt || updatedAt || 'Needs update'
      };
    });
  },

  refreshDynamicViews() {
    this.renderMarketSection();
    if (document.getElementById('products-grid')) this.renderProducts();
    if (document.getElementById('shop-products') && typeof window.applyFilters === 'function') window.applyFilters();
    if (document.getElementById('cart-container')) this.renderCartPage();
    if (document.getElementById('product-detail') && typeof window.renderProductDetail === 'function') window.renderProductDetail();
  },

  getTrendMeta(trend) {
    if (trend === 'up') return { symbol: 'Rising', className: 'market-up', copy: 'Buy soon', advice: 'AI expects this rate to move up tomorrow.' };
    if (trend === 'down') return { symbol: 'Softening', className: 'market-down', copy: 'Can wait', advice: "AI expects some relief in tomorrow's rate." };
    return { symbol: 'Stable', className: 'market-flat', copy: 'Plan normally', advice: 'AI expects this material to stay stable.' };
  },

  getMarketDelta(signal) {
    return signal.aiTomorrowPrice - signal.todayPrice;
  },

  marketMini(signal) {
    if (!signal) return '';
    const trend = this.getTrendMeta(signal.trend);
    const delta = this.getMarketDelta(signal);
    const sign = delta > 0 ? '+' : '';
    return `<div class="market-mini ${trend.className}">
      <div class="market-mini-top"><span>Market signal</span><strong>${trend.symbol}</strong></div>
      <div class="market-mini-values">
        <span>Today ${this.formatPrice(signal.todayPrice)}</span>
        <span>Tomorrow ${sign}${this.formatPrice(Math.abs(delta))}</span>
      </div>
    </div>`;
  },

  marketPanel(p) {
    const signal = p?.marketSignal;
    if (!signal) return '';
    const trend = this.getTrendMeta(signal.trend);
    const delta = this.getMarketDelta(signal);
    const sign = delta > 0 ? '+' : delta < 0 ? '-' : '';
    const previousDelta = signal.previousAiForToday - signal.todayPrice;
    const previousDeltaText = previousDelta === 0
      ? 'Matched today'
      : `${previousDelta > 0 ? '+' : '-'}${this.formatPrice(Math.abs(previousDelta))} vs today`;
    return `<div class="market-panel ${trend.className}">
      <div class="market-panel-head">
        <div>
          <p class="eyebrow">MODIT Market</p>
          <h3>${signal.label} buying signal</h3>
        </div>
        <span class="market-trend">${trend.copy}</span>
      </div>
      <div class="market-value-grid">
        <div><span>Today</span><strong>${this.formatPrice(signal.todayPrice)}</strong><small>${signal.unit}</small></div>
        <div><span>AI Tomorrow</span><strong>${this.formatPrice(signal.aiTomorrowPrice)}</strong><small>${sign}${this.formatPrice(Math.abs(delta))} vs today</small></div>
        <div><span>Previous AI</span><strong>${this.formatPrice(signal.previousAiForToday)}</strong><small>${previousDeltaText}</small></div>
      </div>
      <div class="market-panel-foot">
        <span>${signal.confidence}% confidence</span>
        <span>${signal.source}</span>
        <span>Updated ${signal.updatedAt}</span>
      </div>
      <p class="market-note">Use this as a planning estimate. Final price, stock and dispatch slot are confirmed before billing.</p>
    </div>`;
  },

  renderMarketSection() {
    const container = document.getElementById('market-signals-grid');
    if (!container) return;
    const products = this.getMarketProducts();
    container.innerHTML = products.map(p => {
      const signal = p.marketSignal;
      const trend = this.getTrendMeta(signal.trend);
      const delta = this.getMarketDelta(signal);
      const previousDelta = signal.previousAiForToday - signal.todayPrice;
      const deltaText = delta === 0 ? 'No major change' : `${delta > 0 ? '+' : '-'}${this.formatPrice(Math.abs(delta))} vs today`;
      const previousDeltaText = previousDelta === 0
        ? 'Matched today'
        : `${previousDelta > 0 ? '+' : '-'}${this.formatPrice(Math.abs(previousDelta))} vs today`;
      return `<a href="product-detail.html?id=${p.id}" class="market-card reveal visible ${trend.className}">
        <div class="market-card-top">
          <span>${signal.label}</span>
          <strong class="market-card-action">${trend.copy}</strong>
        </div>
        <h3>${p.name}</h3>
        <p class="market-card-advice">${trend.advice}</p>
        <div class="market-card-main">
          <span>Today</span>
          <strong>${this.formatPrice(signal.todayPrice)}</strong>
          <small>${signal.unit}</small>
        </div>
        <div class="market-card-values">
          <div><span>AI Tomorrow</span><strong>${this.formatPrice(signal.aiTomorrowPrice)}</strong><small>${deltaText}</small></div>
          <div><span>Previous AI</span><strong>${this.formatPrice(signal.previousAiForToday)}</strong><small>${previousDeltaText}</small></div>
        </div>
        <div class="market-card-foot"><span>${signal.confidence}% confidence</span><span>${trend.symbol}</span></div>
      </a>`;
    }).join('');
  },

  initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
      btn.addEventListener('click', () => {
        menu.classList.toggle('open');
        btn.innerHTML = menu.classList.contains('open')
          ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
          : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
      });
    }
  },

  initSearchToggle() {
    const btn = document.getElementById('search-toggle');
    const bar = document.getElementById('search-bar');
    if (btn && bar) {
      btn.addEventListener('click', () => {
        bar.classList.toggle('open');
        if (bar.classList.contains('open')) bar.querySelector('input')?.focus();
      });
    }
    const input = document.getElementById('global-search');
    if (input) {
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') this.searchToShop(input.value);
        if (event.key === 'Escape') bar?.classList.remove('open');
      });
    }
  },

  searchToShop(query) {
    const q = (query || '').trim();
    window.location.href = q ? `shop.html?search=${encodeURIComponent(q)}` : 'shop.html';
  },

  initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => observer.observe(el));
  },

  initCounters() {
    document.querySelectorAll('.counter').forEach(el => {
      const target = parseInt(el.dataset.target);
      if (!target) return;
      const duration = 2000, step = Math.max(1, Math.floor(target / 60));
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current.toLocaleString('en-IN') + (el.dataset.suffix || '');
      }, 33);
    });
  },

  renderProducts(containerId = 'products-grid', category = 'all', search = '') {
    const container = document.getElementById(containerId);
    if (!container) return;
    let products = this.getProductsByCategory(category);
    if (search) {
      const q = search.toLowerCase();
      products = products.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    if (!products.length) {
      container.innerHTML = `<div class="col-span-full text-center py-20"><svg class="mx-auto mb-4 text-gray-300" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><p class="text-xl font-semibold text-gray-800">No products found</p><p class="text-gray-500 mt-2">Try a different search or category</p></div>`;
      return;
    }
    container.innerHTML = products.map(p => this.productCard(p)).join('');
    container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.addToCart(parseInt(btn.dataset.id));
        btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>';
        setTimeout(() => { btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>'; }, 1000);
      });
    });
  },

  productCard(p) {
    return `<div class="group product-card reveal visible">
      <div class="relative overflow-hidden rounded-2xl bg-white border border-[#ECECEC]">
        <div class="relative aspect-[4/3] overflow-hidden bg-gray-50">
          <a href="product-detail.html?id=${p.id}">
            <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy">
          </a>
          ${p.badge ? `<span class="absolute top-3 left-3 px-3 py-1 bg-[#7C3AED] text-white text-xs font-bold rounded-lg">${p.badge}</span>` : ''}
          <span class="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 rounded-lg shadow-sm">${p.delivery}</span>
          <button class="absolute top-3 right-12 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-sm" title="Wishlist"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>
        </div>
        <div class="p-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-semibold text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-0.5 rounded-md">${p.brand}</span>
            <span class="text-xs text-gray-400">${p.unit}</span>
          </div>
          <a href="product-detail.html?id=${p.id}"><h3 class="font-semibold text-[#121212] leading-tight mb-2 group-hover:text-[#7C3AED] transition-colors line-clamp-2">${p.name}</h3></a>
          <div class="flex items-center gap-1 mb-2">
            <svg class="w-3.5 h-3.5 text-[#7C3AED]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            <span class="text-sm font-semibold text-gray-800">${p.rating}</span>
            <span class="text-xs text-gray-400">(${p.reviews.toLocaleString('en-IN')})</span>
          </div>
          <div class="product-procurement-row">
            <span>In stock</span>
            <span>GST invoice</span>
            <span>${p.delivery}</span>
          </div>
          <div class="flex items-center justify-between mt-3">
            <div>
              <span class="text-lg font-bold text-[#121212]">${this.formatPrice(p.price)}</span>
              ${p.originalPrice ? `<span class="text-sm text-gray-400 line-through ml-2">${this.formatPrice(p.originalPrice)}</span>` : ''}
            </div>
            <button class="add-to-cart-btn w-10 h-10 bg-[#111] text-white rounded-xl flex items-center justify-center hover:bg-[#7C3AED] transition-all active:scale-90 shadow-md" data-id="${p.id}" title="Add to cart"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg></button>
          </div>
          ${this.marketMini(p.marketSignal)}
          <a href="contact.html" class="bulk-quote-link">Need quantity pricing? Request bulk quote</a>
        </div>
      </div>
    </div>`;
  },

  initModitAI() {
    if (document.getElementById('modit-ai-widget')) return;
    const widget = document.createElement('div');
    widget.id = 'modit-ai-widget';
    widget.className = 'modit-ai-widget';
    widget.innerHTML = `
      <button class="modit-ai-launcher" id="modit-ai-launcher" aria-label="Open Modit AI">
        <span>AI</span>
      </button>
      <section class="modit-ai-chat" id="modit-ai-chat" aria-label="Modit AI chat">
        <div class="modit-ai-head">
          <div><strong>Modit AI</strong><span>Product, quote and market assistant</span></div>
          <button id="modit-ai-close" aria-label="Close Modit AI">x</button>
        </div>
        <div class="modit-ai-messages" id="modit-ai-messages">
          <div class="ai-msg bot">Tell me what you need for your site. I can help with products, market signals or a bulk inquiry.</div>
        </div>
        <div class="modit-ai-prompts">
          <button type="button" class="ai-prompt-chip" data-prompt="Estimate cement for a 2000 sq ft slab">Estimate cement</button>
          <button type="button" class="ai-prompt-chip" data-prompt="Show cement market forecast">Check market rate</button>
          <button type="button" class="ai-prompt-chip" data-prompt="Prepare a bulk quote for my site">Prepare bulk quote</button>
        </div>
        <form class="modit-ai-form" id="modit-ai-form">
          <input id="modit-ai-input" type="text" autocomplete="off" placeholder="Ask about cement, wires, bulk order...">
          <button type="submit">Send</button>
        </form>
      </section>`;
    document.body.appendChild(widget);

    const launcher = document.getElementById('modit-ai-launcher');
    const chat = document.getElementById('modit-ai-chat');
    const close = document.getElementById('modit-ai-close');
    const form = document.getElementById('modit-ai-form');
    const input = document.getElementById('modit-ai-input');
    const messages = document.getElementById('modit-ai-messages');

    const setOpen = (open) => chat.classList.toggle('open', open);
    const sendQuery = async (query) => {
      if (!query) return;
      this.appendAiMessage(messages, query, 'user');
      input.value = '';
      const pending = this.appendAiMessage(messages, 'Checking MODIT data...', 'bot');
      const reply = await this.getAiReply(query);
      pending.textContent = reply;
      messages.scrollTop = messages.scrollHeight;
    };
    launcher.addEventListener('click', () => setOpen(!chat.classList.contains('open')));
    close.addEventListener('click', () => setOpen(false));
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const query = input.value.trim();
      await sendQuery(query);
    });
    document.querySelectorAll('.ai-prompt-chip').forEach(button => {
      button.addEventListener('click', async () => {
        setOpen(true);
        await sendQuery(button.dataset.prompt || button.textContent);
      });
    });
    document.querySelectorAll('.ai-open-agent').forEach(button => {
      button.addEventListener('click', async () => {
        setOpen(true);
        await sendQuery(button.dataset.agentPrompt || button.textContent);
      });
    });
  },

  appendAiMessage(container, text, role) {
    const div = document.createElement('div');
    div.className = `ai-msg ${role}`;
    div.textContent = text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
  },

  async getAiReply(query) {
    if (window.location.protocol.startsWith('http')) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            message: query,
            cartCount: this.getCartCount(),
            page: window.location.pathname
          })
        });
        if (!response.ok) throw new Error('Chat API unavailable');
        const payload = await response.json();
        if (payload.reply) return payload.reply;
      } catch (error) {
        console.warn('Using embedded Modit AI reply:', error.message);
      }
    }
    return this.getFallbackAiReply(query);
  },

  getFallbackAiReply(query) {
    const q = query.toLowerCase();
    if (q.includes('market') || q.includes('price') || q.includes('sensex') || q.includes('forecast')) {
      const cement = this.getMarketProducts()[0]?.marketSignal;
      return cement ? `Current sponsored market signal: ${cement.label} is ${this.formatPrice(cement.todayPrice)} today, AI tomorrow is ${this.formatPrice(cement.aiTomorrowPrice)}, confidence ${cement.confidence}%. This is a planning estimate, not a guaranteed selling price.` : 'Market signals are being prepared for sponsored products first.';
    }
    if (q.includes('estimate') || q.includes('estimator') || q.includes('cement') || q.includes('slab') || q.includes('concrete') || q.includes('sq ft')) {
      return 'Construction estimator mode: share built-up area, slab thickness, room count, floor count and city. For a 2000 sq ft residential scope, I would first estimate cement/concrete, paint area, tile area, wire length and plumbing points, then convert it into a purchase list for confirmation.';
    }
    if (q.includes('wire') || q.includes('electrical') || q.includes('copper')) {
      return 'For electrical work, Polycab 1.5 sq mm wire is available with a copper-linked market signal. Tell me load type, room count, and preferred brand for a better shortlist.';
    }
    if (q.includes('bulk') || q.includes('quote') || q.includes('contractor')) {
      return 'I can capture a bulk inquiry: material list, quantity, site location, GST details, delivery window, and preferred payment terms. A human sales desk should confirm final price and availability.';
    }
    if (q.includes('cart') || q.includes('order')) {
      return `Your cart currently has ${this.getCartCount()} item(s). Add products from the shop, then checkout can capture delivery and payment preference.`;
    }
    return 'I can help with product discovery, sponsored market signals, bulk quote preparation, and cart guidance. For live AI, this widget should connect to a secure backend /api/chat endpoint.';
  },

  renderCartPage() {
    const container = document.getElementById('cart-container');
    if (!container) return;
    if (!this.cart.length) {
      container.innerHTML = `<div class="text-center py-20"><svg class="mx-auto mb-6 text-gray-300" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg><h2 class="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2><p class="text-gray-500 mb-8">Start shopping to add items</p><a href="shop.html" class="inline-flex items-center gap-2 px-8 py-4 bg-[#111] text-white rounded-2xl font-semibold hover:bg-[#7C3AED] transition-all"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>Continue Shopping</a></div>`;
      return;
    }
    container.innerHTML = this.cart.map(item => {
      const p = this.getProduct(item.id);
      if (!p) return '';
      return `<div class="flex items-center gap-5 p-5 bg-white rounded-2xl border border-[#ECECEC] reveal visible cart-item">
        <img src="${p.image}" alt="${p.name}" class="w-20 h-20 object-cover rounded-xl">
        <div class="flex-1 min-w-0">
          <p class="text-xs font-semibold text-[#7C3AED]">${p.brand}</p>
          <h3 class="font-semibold text-gray-800 truncate">${p.name}</h3>
          <p class="text-lg font-bold text-gray-900 mt-1">${this.formatPrice(p.price)}</p>
        </div>
        <div class="flex items-center gap-3">
          <button class="qty-btn w-9 h-9 rounded-xl border border-[#ECECEC] flex items-center justify-center hover:bg-gray-50 transition-colors" data-id="${p.id}" data-delta="-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/></svg></button>
          <span class="w-8 text-center font-semibold">${item.qty}</span>
          <button class="qty-btn w-9 h-9 rounded-xl border border-[#ECECEC] flex items-center justify-center hover:bg-gray-50 transition-colors" data-id="${p.id}" data-delta="1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg></button>
        </div>
        <div class="text-right min-w-[80px]">
          <p class="font-bold text-gray-900">${this.formatPrice(p.price * item.qty)}</p>
          <button class="remove-btn text-xs text-red-500 hover:text-red-700 mt-1" data-id="${p.id}">Remove</button>
        </div>
      </div>`;
    }).join('');
    container.querySelectorAll('.qty-btn').forEach(btn => btn.addEventListener('click', () => this.updateQty(parseInt(btn.dataset.id), parseInt(btn.dataset.delta))));
    container.querySelectorAll('.remove-btn').forEach(btn => btn.addEventListener('click', () => this.removeFromCart(parseInt(btn.dataset.id))));
    const total = this.getCartTotal();
    const gst = total * 0.18;
    document.getElementById('cart-total') && (document.getElementById('cart-total').textContent = this.formatPrice(total));
    document.getElementById('cart-subtotal') && (document.getElementById('cart-subtotal').textContent = this.formatPrice(total));
    document.getElementById('cart-gst') && (document.getElementById('cart-gst').textContent = this.formatPrice(gst));
    document.getElementById('cart-grand-total') && (document.getElementById('cart-grand-total').textContent = this.formatPrice(total + gst));
  }
};

window.MODIT = MODIT;
document.addEventListener('DOMContentLoaded', () => MODIT.init());
