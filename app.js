/* ═══════════════════════════════════════════════════
   SHOTS BY SIRI — Application Logic v2
   Cream/Gold PDF + Enhanced Landing Page
   ═══════════════════════════════════════════════════ */

// ——— Pricing Data ———
const PRICING = {
    services: {
        'traditional-photo': { name: 'Traditional Photography', icon: '📷', price: 15000, unit: 'per event' },
        'traditional-video': { name: 'Traditional Videography', icon: '🎥', price: 20000, unit: 'per event' },
        'candid-photo': { name: 'Candid Photography', icon: '📸', price: 25000, unit: 'per event' },
        'candid-video': { name: 'Candid Videography', icon: '🎬', price: 30000, unit: 'per event' },
        'drone': { name: 'Drone Coverage', icon: '🚁', price: 15000, unit: 'per event' },
        'led-screen': { name: 'LED Screen', icon: '📺', price: 20000, unit: 'per event' },
    },
    albums: {
        'candid-press': { name: 'Candid Album — Press Book', price: 15000 },
        'candid-magnum': { name: 'Candid Album — Magnum', price: 25000 },
        'trad-press': { name: 'Traditional Album — Press Book', price: 12000 },
        'trad-magnum': { name: 'Traditional Album — Magnum', price: 20000 },
    },
    extras: {
        'prewed-photo': { name: 'Pre-Wedding Shoot — Photo Only', price: 25000 },
        'prewed-both': { name: 'Pre-Wedding Shoot — Photo & Video', price: 45000 },
        'live-streaming': { name: 'Live Streaming (4 hours)', price: 15000 },
        'documentary': { name: 'Documentary Style Wedding Film', price: 35000 },
    },
    postProduction: {
        '1-month': { label: 'Express (1 Month)', adjustment: 20000 },
        '3-months': { label: 'Standard (3 Months)', adjustment: 0 },
        '5-months': { label: 'Relaxed (5 Months)', adjustment: -5000 },
    }
};

const EVENTS = [
    { id: 'engagement', name: 'Engagement', icon: '💍', description: 'Ring ceremony & celebration', services: ['traditional-photo', 'traditional-video', 'candid-photo', 'candid-video', 'drone', 'led-screen'] },
    { id: 'vratham', name: 'Vratham / Seemantham', icon: '🪔', description: 'Pre-wedding rituals', services: ['traditional-photo', 'traditional-video'] },
    { id: 'pellikoduku', name: 'Pelli Koduku', icon: '🎉', description: "Groom's celebrations", services: ['traditional-photo', 'traditional-video', 'candid-photo', 'candid-video', 'drone', 'led-screen'] },
    { id: 'pellikuthuru', name: 'Pelli Kuthuru', icon: '🌺', description: "Bride's celebrations", services: ['traditional-photo', 'traditional-video', 'candid-photo', 'candid-video', 'drone', 'led-screen'] },
    { id: 'groom-haldi', name: 'Groom Haldi / Pasupu', icon: '🟡', description: "Groom's haldi ceremony", services: ['candid-photo', 'candid-video'] },
    { id: 'bride-haldi', name: 'Bride Haldi / Pasupu', icon: '💛', description: "Bride's haldi ceremony", services: ['candid-photo', 'candid-video'] },
    { id: 'sangeeth', name: 'Sangeeth Night', icon: '🎶', description: 'Music & dance celebration', services: ['candid-photo', 'candid-video', 'traditional-video', 'drone', 'led-screen'] },
    { id: 'mehandi', name: 'Mehandi Ceremony', icon: '🤲', description: 'Mehandi application day', services: ['candid-photo', 'traditional-video'] },
    { id: 'cocktail-party', name: 'Cocktail Party', icon: '🍸', description: 'Evening party celebration', services: ['candid-photo', 'candid-video', 'led-screen'] },
    { id: 'wedding-day', name: 'Wedding Day (Muhurtham)', icon: '🔥', description: 'The main wedding ceremony', services: ['traditional-photo', 'traditional-video', 'candid-photo', 'candid-video', 'drone', 'led-screen'] },
    { id: 'reception', name: 'Reception', icon: '🎊', description: 'Grand reception party', services: ['traditional-photo', 'traditional-video', 'candid-photo', 'candid-video', 'drone', 'led-screen'] },
    { id: 'satyanarayana-vratham', name: 'Satyanarayana Vratham', icon: '🙏', description: 'Post-wedding puja', services: ['traditional-photo', 'traditional-video'] },
];

const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyz8aelA7xbI2HBGFYJiGUO6pDRdMjVQmzuSB69FeQFz59SHlwfAolkaeAvc5Ar27s/exec';

// ——— State ———
let currentStep = 1;
const totalSteps = 6;
let selectedEvents = new Set();
let eventServices = {};
let albumQty = { 'candid-press': 0, 'candid-magnum': 0, 'trad-press': 0, 'trad-magnum': 0 };
let cachedLogoData = null;
let cachedAssets = {};

// ——— Init ———
document.addEventListener('DOMContentLoaded', () => {
    initPetals();
    initSparkles();
    initCursorGlow();
    initScrollAnimations();
    initStatCounters();
    initNavScroll();
    initMobileMenu();
    renderEventsGrid();
    generateGallery();
    preloadPDFAssets();
});

// ——— Floating Petals ———
function initPetals() {
    const c = document.getElementById('floating-petals');
    if (!c) return;
    for (let i = 0; i < 12; i++) {
        const p = document.createElement('div');
        p.className = 'petal';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (8 + Math.random() * 12) + 's';
        p.style.animationDelay = Math.random() * 10 + 's';
        p.style.opacity = 0.15 + Math.random() * 0.25;
        p.style.transform = `scale(${0.5 + Math.random()})`;
        c.appendChild(p);
    }
}

// ——— Sparkles ———
function initSparkles() {
    const c = document.getElementById('sparkle-container');
    if (!c) return;
    for (let i = 0; i < 20; i++) {
        const s = document.createElement('div');
        s.className = 'sparkle';
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * 100 + '%';
        s.style.animationDuration = (1.5 + Math.random() * 2) + 's';
        s.style.animationDelay = Math.random() * 4 + 's';
        s.style.width = s.style.height = (2 + Math.random() * 3) + 'px';
        c.appendChild(s);
    }
}

// ——— Cursor Glow ———
function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;
    let mx = 0, my = 0, gx = 0, gy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function animate() {
        gx += (mx - gx) * 0.08;
        gy += (my - gy) * 0.08;
        glow.style.left = gx + 'px';
        glow.style.top = gy + 'px';
        requestAnimationFrame(animate);
    })();
}

// ——— Scroll Animations ———
function initScrollAnimations() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal-card, .section-header').forEach(el => obs.observe(el));
}

// ——— Stat Counters ———
function initStatCounters() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { animateCounter(e.target, parseInt(e.target.dataset.count)); obs.unobserve(e.target); }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-number').forEach(el => obs.observe(el));
}

function animateCounter(el, target) {
    const dur = 2000, start = performance.now();
    (function update(now) {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
        if (p < 1) requestAnimationFrame(update);
    })(start);
}

// ——— Nav Scroll ———
function initNavScroll() {
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 80));
}

// ——— Mobile Menu ———
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    if (btn) btn.addEventListener('click', () => { document.getElementById('mobile-menu-overlay').classList.add('active'); document.body.style.overflow = 'hidden'; });
}
function closeMobileMenu() { document.getElementById('mobile-menu-overlay').classList.remove('active'); document.body.style.overflow = ''; }
function scrollToSection(id) { document.getElementById(id).scrollIntoView({ behavior: 'smooth' }); }

// ——— Gallery Generation ———
function generateGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    const scenes = [
        { prompt: 'South Indian bride in red silk saree with gold jewelry, wedding portrait, cinematic lighting', color: '#2a1810' },
        { prompt: 'Candid wedding moment couple laughing', color: '#1a1520' },
        { prompt: 'Drone aerial shot wedding venue decorated', color: '#101520' },
        { prompt: 'Traditional haldi ceremony golden light', color: '#2a2010' },
        { prompt: 'Wedding reception LED lights crowd', color: '#151025' },
        { prompt: 'Bridal mehandi hands detailed close up', color: '#201510' },
    ];
    scenes.forEach((s, i) => {
        const item = document.createElement('div');
        item.className = 'gallery-item reveal-card';
        item.style.background = `linear-gradient(135deg, ${s.color}, #0a0a0f)`;
        item.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2.5rem;opacity:0.3">${['📸', '💑', '🚁', '🟡', '🎊', '🤲'][i]}</div>`;
        grid.appendChild(item);
    });
}

// ——— Preload PDF Assets ———
function preloadPDFAssets() {
    ['assets/logo.png', 'assets/elephant.png', 'assets/lantern.png', 'assets/floral-corner.png'].forEach(src => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const c = document.createElement('canvas');
            c.width = img.naturalWidth; c.height = img.naturalHeight;
            c.getContext('2d').drawImage(img, 0, 0);
            cachedAssets[src] = c.toDataURL('image/png');
        };
        img.src = src;
    });
}

// ═══════════════════════════
// QUOTE BUILDER
// ═══════════════════════════
function startQuoteBuilder() {
    document.getElementById('quote-builder').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    currentStep = 1;
    updateStep();
}
function closeQuoteBuilder() {
    document.getElementById('quote-builder').classList.add('hidden');
    document.body.style.overflow = '';
}

function updateStep() {
    document.querySelectorAll('.qb-step').forEach(s => s.classList.remove('active'));
    const active = document.querySelector(`.qb-step[data-step="${currentStep}"]`);
    if (active) active.classList.add('active');

    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('qb-progress-bar').style.setProperty('--progress', progress + '%');
    document.querySelectorAll('.ps').forEach(p => {
        const s = parseInt(p.dataset.s);
        p.classList.toggle('active', s === currentStep);
        p.classList.toggle('done', s < currentStep);
    });

    const prev = document.getElementById('qb-prev'), next = document.getElementById('qb-next');
    prev.style.visibility = currentStep === 1 ? 'hidden' : 'visible';
    if (currentStep === totalSteps) { next.style.display = 'none'; }
    else if (currentStep === totalSteps - 1) { next.innerHTML = '<span>View Final Quote</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'; next.style.display = 'inline-flex'; }
    else { next.innerHTML = '<span>Next Step</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'; next.style.display = 'inline-flex'; }

    recalculate();
    if (currentStep === 3) buildEventConfigs();
    if (currentStep === 5) buildSummary();
    if (currentStep === 6) document.getElementById('final-amount').textContent = formatCurrency(calculateTotal());
    document.querySelector('.qb-panel').scrollTop = 0;
}

function nextStep() {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && selectedEvents.size === 0) { showToast('Please select at least one event', 'error'); return; }
    if (currentStep < totalSteps) { currentStep++; updateStep(); }
}
function prevStep() { if (currentStep > 1) { currentStep--; updateStep(); } }

function validateStep1() {
    const name = document.getElementById('customer-name').value.trim();
    const mobile = document.getElementById('customer-mobile').value.trim();
    let valid = true;
    if (!name) { showFieldError('customer-name', 'Please enter your name'); valid = false; } else clearFieldError('customer-name');
    if (!mobile || !/^[0-9]{10}$/.test(mobile)) { showFieldError('customer-mobile', 'Enter a valid 10-digit mobile number'); valid = false; } else clearFieldError('customer-mobile');
    return valid;
}

function showFieldError(id, msg) {
    const f = document.getElementById(id); f.classList.add('input-error');
    let e = f.parentElement.querySelector('.error-message');
    if (!e) { e = document.createElement('div'); e.className = 'error-message'; f.parentElement.appendChild(e); }
    e.textContent = msg; e.classList.add('show');
}
function clearFieldError(id) {
    const f = document.getElementById(id); f.classList.remove('input-error');
    const e = f.parentElement.querySelector('.error-message'); if (e) e.classList.remove('show');
}

// Events
function renderEventsGrid() {
    document.getElementById('events-grid').innerHTML = EVENTS.map(e => `
        <label class="event-toggle" id="event-${e.id}">
            <input type="checkbox" value="${e.id}" onchange="toggleEvent('${e.id}',this.checked)">
            <div class="event-toggle-card"><span class="event-toggle-icon">${e.icon}</span><div class="event-toggle-info"><h4>${e.name}</h4><p>${e.description}</p></div><div class="event-check"></div></div>
        </label>`).join('');
}

function toggleEvent(id, checked) {
    if (checked) { selectedEvents.add(id); const ev = EVENTS.find(e => e.id === id); if (!eventServices[id]) { eventServices[id] = {}; ev.services.forEach(s => eventServices[id][s] = false); } }
    else { selectedEvents.delete(id); delete eventServices[id]; }
    recalculate();
}

function buildEventConfigs() {
    document.getElementById('event-config-container').innerHTML = EVENTS.filter(e => selectedEvents.has(e.id)).map(event => `
        <div class="event-config-card"><div class="ecc-header"><span>${event.icon}</span><h3>${event.name}</h3></div><div class="ecc-services">
            ${event.services.map(sId => {
        const s = PRICING.services[sId]; const ck = eventServices[event.id]?.[sId] ? 'checked' : '';
        return `<label class="service-option"><input type="checkbox" ${ck} onchange="toggleService('${event.id}','${sId}',this.checked)"><div class="service-option-card"><div class="svc-icon">${s.icon}</div><div class="svc-name">${s.name}</div><div class="svc-price">${formatCurrency(s.price)}</div></div></label>`;
    }).join('')}
        </div></div>`).join('');
}

function toggleService(eid, sid, checked) { if (!eventServices[eid]) eventServices[eid] = {}; eventServices[eid][sid] = checked; recalculate(); }

function changeQty(id, delta) {
    albumQty[id] = Math.max(0, (albumQty[id] || 0) + delta);
    const d = document.getElementById(`qty-${id}`); if (d) d.textContent = albumQty[id];
    recalculate();
}

function handlePrewedToggle(changedId) {
    const other = changedId === 'prewed-photo' ? 'prewed-both' : 'prewed-photo';
    const changedEl = document.getElementById(changedId);
    const otherEl = document.getElementById(other);
    if (changedEl.checked && otherEl.checked) otherEl.checked = false;
}

function calculateTotal() {
    let total = 0;
    for (const eid of selectedEvents) { const svcs = eventServices[eid] || {}; for (const [sid, sel] of Object.entries(svcs)) { if (sel) total += PRICING.services[sid].price; } }
    for (const [aid, qty] of Object.entries(albumQty)) total += PRICING.albums[aid].price * qty;
    for (const [eid, cfg] of Object.entries(PRICING.extras)) { const el = document.getElementById(eid); if (el && el.checked) total += cfg.price; }
    const pp = document.querySelector('input[name="post-production"]:checked'); if (pp) total += PRICING.postProduction[pp.value].adjustment;
    return total;
}

function recalculate() { const d = document.getElementById('running-amount'); if (d) d.textContent = formatCurrency(calculateTotal()); }
function formatCurrency(a) { return '₹' + a.toLocaleString('en-IN'); }

// Summary
function buildSummary() {
    const c = document.getElementById('summary-container');
    let h = '';
    h += `<div class="summary-section"><div class="summary-section-title">👤 Customer Details</div>
        <div class="summary-line"><span class="sl-label">Name</span><span class="sl-value">${document.getElementById('customer-name').value}</span></div>
        <div class="summary-line"><span class="sl-label">Mobile</span><span class="sl-value">${document.getElementById('customer-mobile').value}</span></div>
        ${document.getElementById('customer-email').value ? `<div class="summary-line"><span class="sl-label">Email</span><span class="sl-value">${document.getElementById('customer-email').value}</span></div>` : ''}
        ${document.getElementById('wedding-date').value ? `<div class="summary-line"><span class="sl-label">Wedding Date</span><span class="sl-value">${new Date(document.getElementById('wedding-date').value).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>` : ''}
        ${document.getElementById('wedding-city').value ? `<div class="summary-line"><span class="sl-label">City</span><span class="sl-value">${document.getElementById('wedding-city').value}</span></div>` : ''}
    </div>`;

    const sel = EVENTS.filter(e => selectedEvents.has(e.id));
    if (sel.length) {
        h += `<div class="summary-section"><div class="summary-section-title">🎊 Events & Services</div>`;
        sel.forEach(ev => {
            const svcs = Object.entries(eventServices[ev.id] || {}).filter(([, v]) => v);
            if (svcs.length) { h += `<div style="margin-bottom:10px"><strong style="color:var(--text);font-size:.88rem">${ev.icon} ${ev.name}</strong>`; svcs.forEach(([sid]) => { h += `<div class="summary-line"><span class="sl-label">&nbsp;&nbsp;${PRICING.services[sid].name}</span><span class="sl-value">${formatCurrency(PRICING.services[sid].price)}</span></div>`; }); h += '</div>'; }
        });
        h += '</div>';
    }

    const aa = Object.entries(albumQty).filter(([, q]) => q > 0);
    if (aa.length) { h += `<div class="summary-section"><div class="summary-section-title">📖 Albums</div>`; aa.forEach(([aid, qty]) => { const a = PRICING.albums[aid]; h += `<div class="summary-line"><span class="sl-label">${a.name} × ${qty}</span><span class="sl-value">${formatCurrency(a.price * qty)}</span></div>`; }); h += '</div>'; }

    const eh = [];
    for (const [eid, cfg] of Object.entries(PRICING.extras)) { const el = document.getElementById(eid); if (el && el.checked) eh.push(`<div class="summary-line"><span class="sl-label">${cfg.name}</span><span class="sl-value">${formatCurrency(cfg.price)}</span></div>`); }
    const pp = document.querySelector('input[name="post-production"]:checked');
    if (pp && PRICING.postProduction[pp.value].adjustment !== 0) eh.push(`<div class="summary-line"><span class="sl-label">Post Production: ${PRICING.postProduction[pp.value].label}</span><span class="sl-value">${PRICING.postProduction[pp.value].adjustment > 0 ? '+' : ''}${formatCurrency(PRICING.postProduction[pp.value].adjustment)}</span></div>`);
    if (eh.length) h += `<div class="summary-section"><div class="summary-section-title">✨ Add-ons & Extras</div>${eh.join('')}</div>`;

    h += `<div class="summary-total"><span class="st-label">Grand Total</span><span class="st-value">${formatCurrency(calculateTotal())}</span></div>`;
    c.innerHTML = h;
}

// ═══════════════════════════════════════
// PDF GENERATION — Cream/Gold Theme
// Matching the reference quotation style
// ═══════════════════════════════════════

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const W = 210, H = 297, M = 15;
    const CW = W - 2 * M;

    // Colors
    const CREAM = [250, 247, 242];
    const GOLD = [184, 134, 11];
    const GOLD_LIGHT = [201, 149, 107];
    const DARK = [40, 35, 30];
    const TEXT_DARK = [50, 45, 40];
    const TEXT_MED = [120, 110, 100];

    // === HELPER FUNCTIONS ===
    const setC = (c) => doc.setTextColor(c[0], c[1], c[2]);
    const setD = (c) => doc.setDrawColor(c[0], c[1], c[2]);
    const setF = (c) => doc.setFillColor(c[0], c[1], c[2]);

    function drawCreamBg() {
        setF(CREAM); doc.rect(0, 0, W, H, 'F');
    }

    function drawGoldenBorder(m) {
        m = m || 8;
        setD(GOLD); doc.setLineWidth(0.8);
        doc.rect(m, m, W - 2 * m, H - 2 * m);
        doc.setLineWidth(0.3);
        doc.rect(m + 2, m + 2, W - 2 * m - 4, H - 2 * m - 4);
    }

    function drawCornerOrnament(x, y, size, flip) {
        setD(GOLD_LIGHT); doc.setLineWidth(0.5);
        const sx = flip ? -1 : 1;
        const sy = flip ? -1 : 1;
        // L-shape with curl
        doc.line(x, y, x + sx * size, y);
        doc.line(x, y, x, y + sy * size);
        // Small dots
        setF(GOLD_LIGHT);
        doc.circle(x + sx * 2, y + sy * 2, 0.8, 'F');
        doc.circle(x + sx * (size - 2), y, 0.8, 'F');
        doc.circle(x, y + sy * (size - 2), 0.8, 'F');
        // Decorative curl
        doc.setLineWidth(0.3);
        doc.line(x + sx * 4, y + sy * 1, x + sx * 6, y + sy * 3);
        doc.line(x + sx * 1, y + sy * 4, x + sx * 3, y + sy * 6);
    }

    function drawDecorativeLine(x, y, width) {
        const cx = x + width / 2;
        setD(GOLD); doc.setLineWidth(0.4);
        doc.line(x, y, x + width, y);
        // Center diamond
        setF(GOLD);
        doc.triangle(cx - 2, y, cx, y - 2, cx + 2, y);
        doc.triangle(cx - 2, y, cx, y + 2, cx + 2, y);
    }

    function drawSectionHeader(text, y) {
        setC(GOLD);
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        const tW = doc.getTextWidth(text);
        const cx = W / 2;
        doc.text(text, cx, y, { align: 'center' });
        // Underline ornament
        const lineW = Math.max(tW + 10, 40);
        setD(GOLD); doc.setLineWidth(0.4);
        doc.line(cx - lineW / 2, y + 2, cx + lineW / 2, y + 2);
        // Small end dots
        setF(GOLD);
        doc.circle(cx - lineW / 2, y + 2, 0.6, 'F');
        doc.circle(cx + lineW / 2, y + 2, 0.6, 'F');
        return y + 8;
    }

    function addAsset(key, x, y, w, h) {
        if (cachedAssets[key]) {
            try { doc.addImage(cachedAssets[key], 'PNG', x, y, w, h); } catch (e) { }
        }
    }

    function checkPage(needed) {
        if (currentY + needed > H - M - 10) { doc.addPage(); drawCreamBg(); drawGoldenBorder(); drawPageCorners(); currentY = M + 15; return true; }
        return false;
    }

    function drawPageCorners() {
        drawCornerOrnament(12, 12, 15, false);        // top-left
        drawCornerOrnament(W - 12, 12, 15, false);       // top-right (flipped)
        drawCornerOrnament(12, H - 12, 15, false);       // bottom-left
        drawCornerOrnament(W - 12, H - 12, 15, true);      // bottom-right
        // Redraw with proper flip
        setD(GOLD_LIGHT); doc.setLineWidth(0.5);
        // top-right
        doc.line(W - 12, 12, W - 12 - 15, 12); doc.line(W - 12, 12, W - 12, 12 + 15);
        setF(GOLD_LIGHT); doc.circle(W - 14, 14, 0.8, 'F');
        // bottom-left
        doc.line(12, H - 12, 12 + 15, H - 12); doc.line(12, H - 12, 12, H - 12 - 15);
        doc.circle(14, H - 14, 0.8, 'F');
        // bottom-right
        doc.line(W - 12, H - 12, W - 12 - 15, H - 12); doc.line(W - 12, H - 12, W - 12, H - 12 - 15);
        doc.circle(W - 14, H - 14, 0.8, 'F');
    }

    let currentY = 0;

    // ═══════════════════════
    // PAGE 1 — COVER
    // ═══════════════════════
    drawCreamBg();
    drawGoldenBorder();

    // Decorative wavy lines top-right
    setD(GOLD_LIGHT); doc.setLineWidth(0.2);
    for (let i = 0; i < 6; i++) {
        const startX = W - 50 + i * 3;
        for (let j = 0; j < 20; j++) {
            const x1 = startX + j * 3;
            const y1 = 15 + Math.sin(j * 0.5 + i * 0.3) * 3 + i * 4;
            const x2 = x1 + 3;
            const y2 = 15 + Math.sin((j + 1) * 0.5 + i * 0.3) * 3 + i * 4;
            if (x1 < W - 10) doc.line(x1, y1, x2, y2);
        }
    }

    // Lantern top-left
    addAsset('assets/lantern.png', 15, 15, 18, 35);

    // Logo centered
    let logoY = 70;
    if (cachedAssets['assets/logo.png']) {
        addAsset('assets/logo.png', W / 2 - 35, 55, 70, 50);
        logoY = 115;
    } else {
        // Text fallback
        setC(GOLD);
        doc.setFontSize(36);
        doc.setFont('helvetica', 'bold');
        doc.text('Shots by Siri', W / 2, 90, { align: 'center' });
        logoY = 100;
    }

    // Photography subtitle
    setC(GOLD);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('— P H O T O G R A P H Y —', W / 2, logoY + 5, { align: 'center' });

    // Decorative line
    drawDecorativeLine(W / 2 - 40, logoY + 15, 80);

    // WEDDING PHOTOGRAPHY QUOTATION
    setC(DARK);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('WEDDING PHOTOGRAPHY', W / 2, logoY + 35, { align: 'center' });
    doc.text('QUOTATION', W / 2, logoY + 44, { align: 'center' });

    // Elephant motif
    addAsset('assets/elephant.png', 20, H - 75, 30, 28);

    // Prepared for
    setC(TEXT_MED);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Prepared for', W / 2, logoY + 65, { align: 'center' });
    setC(DARK);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(document.getElementById('customer-name').value || 'Customer', W / 2, logoY + 74, { align: 'center' });

    // Date
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    setC(TEXT_MED);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(dateStr, W - M - 10, H - M - 15, { align: 'right' });

    // Quote reference
    const quoteRef = `SBS-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 9000) + 1000}`;
    doc.setFontSize(8);
    doc.text(`Ref: ${quoteRef}`, W - M - 10, H - M - 10, { align: 'right' });

    // ═══════════════════════
    // PAGE 2+ — CONTENT
    // ═══════════════════════
    doc.addPage();
    drawCreamBg();
    drawGoldenBorder();
    drawPageCorners();

    // Floral corner bottom-left
    addAsset('assets/floral-corner.png', 8, H - 68, 55, 55);

    // Lantern top-left
    addAsset('assets/lantern.png', 12, 12, 14, 28);

    currentY = M + 20;

    // Customer info box
    setF([245, 241, 235]); doc.roundedRect(M + 5, currentY - 3, CW - 10, 22, 2, 2, 'F');
    setC(TEXT_MED); doc.setFontSize(8); doc.setFont('helvetica', 'normal');
    doc.text('Customer: ' + (document.getElementById('customer-name').value || ''), M + 10, currentY + 4);
    doc.text('Mobile: ' + (document.getElementById('customer-mobile').value || ''), M + 10, currentY + 10);
    const email = document.getElementById('customer-email').value;
    const wdate = document.getElementById('wedding-date').value;
    const city = document.getElementById('wedding-city').value;
    if (email) doc.text('Email: ' + email, W / 2 + 5, currentY + 4);
    if (wdate) doc.text('Wedding: ' + new Date(wdate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }), W / 2 + 5, currentY + 10);
    if (city) doc.text('City: ' + city, W / 2 + 5, currentY + 16);
    currentY += 28;

    // Events & Services
    const selEvents = EVENTS.filter(e => selectedEvents.has(e.id));
    selEvents.forEach(event => {
        const svcs = eventServices[event.id] || {};
        const active = Object.entries(svcs).filter(([, v]) => v);
        if (active.length === 0) return;

        checkPage(15 + active.length * 6);

        currentY = drawSectionHeader('FOR  ' + event.name.toUpperCase(), currentY);

        active.forEach(([sId]) => {
            const svc = PRICING.services[sId];
            setC(TEXT_DARK); doc.setFontSize(10); doc.setFont('helvetica', 'normal');
            doc.text(svc.name, W / 2, currentY, { align: 'center' });
            currentY += 6;
        });
        currentY += 4;
    });

    // Albums
    const activeAlbums = Object.entries(albumQty).filter(([, q]) => q > 0);
    // Extras
    const extrasItems = [];
    for (const [eid, cfg] of Object.entries(PRICING.extras)) { const el = document.getElementById(eid); if (el && el.checked) extrasItems.push(cfg); }

    if (activeAlbums.length > 0 || extrasItems.length > 0) {
        checkPage(15 + (activeAlbums.length + extrasItems.length) * 6);
        currentY = drawSectionHeader('FOR  COMPLEMENTARY', currentY);

        activeAlbums.forEach(([aid, qty]) => {
            setC(TEXT_DARK); doc.setFontSize(10); doc.setFont('helvetica', 'normal');
            doc.text(`${qty} ${PRICING.albums[aid].name}`, W / 2, currentY, { align: 'center' });
            currentY += 6;
        });

        extrasItems.forEach(item => {
            setC(TEXT_DARK); doc.setFontSize(10); doc.setFont('helvetica', 'normal');
            doc.text(item.name, W / 2, currentY, { align: 'center' });
            currentY += 6;
        });

        const pp = document.querySelector('input[name="post-production"]:checked');
        if (pp) {
            doc.text('Post Production: ' + PRICING.postProduction[pp.value].label, W / 2, currentY, { align: 'center' });
            currentY += 6;
        }
        currentY += 4;
    }

    // Grand Total
    checkPage(30);
    currentY += 5;
    drawDecorativeLine(W / 2 - 50, currentY, 100);
    currentY += 12;

    setC(GOLD);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL  :', W / 2 - 15, currentY, { align: 'right' });

    const grandTotal = calculateTotal();
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text(formatCurrency(grandTotal).replace('₹', ''), W / 2 - 10, currentY);
    // Rupee symbol
    doc.setFontSize(14);
    doc.text('Rs.', W / 2 - 12 - doc.getTextWidth(formatCurrency(grandTotal).replace('₹', '')) - 2, currentY);

    currentY += 15;

    // Golden page curl effect (bottom right)
    setF(GOLD);
    const cx = W - 10, cy = H - 10;
    doc.triangle(cx, cy - 20, cx - 20, cy, cx, cy, 'F');
    setF([220, 180, 100]);
    doc.triangle(cx, cy - 20, cx - 15, cy - 5, cx, cy, 'F');

    // Elephant bottom-right
    addAsset('assets/elephant.png', W - 55, H - 68, 30, 28);

    // ═══════════════════════
    // PAGE 3 — TERMS
    // ═══════════════════════
    doc.addPage();
    drawCreamBg();
    drawGoldenBorder();
    drawPageCorners();
    addAsset('assets/floral-corner.png', 8, H - 68, 55, 55);

    currentY = M + 18;
    currentY = drawSectionHeader('TERMS  &  CONDITIONS', currentY);

    const terms = [
        'This is an estimated quotation. Final price may vary based on discussion.',
        'Sessions last for 5-6 hours per event.',
        'Travel and stay to be arranged by the client.',
        '50% advance at booking, balance payable on the wedding day.',
        'Output delivery timeline depends on timely payment.',
        'If another photography team is hired, the contract will be cancelled immediately.',
        'Original data can be received via client-provided drive.',
        'In case of data loss, re-copying is available at Rs. 29,999 for lifelong memories.',
        'We prioritise careful handling of your original data at all times.',
    ];

    setC(TEXT_DARK); doc.setFontSize(9.5); doc.setFont('helvetica', 'normal');
    terms.forEach((t, i) => {
        doc.text(`${i + 1}. ${t}`, W / 2, currentY, { align: 'center', maxWidth: CW - 20 });
        currentY += t.length > 70 ? 10 : 7;
    });

    currentY += 10;
    drawDecorativeLine(W / 2 - 30, currentY, 60);
    currentY += 15;

    // Contact info
    setC(GOLD); doc.setFontSize(11); doc.setFont('helvetica', 'bold');
    doc.text('Shots by Siri Photography', W / 2, currentY, { align: 'center' });
    currentY += 7;
    setC(TEXT_MED); doc.setFontSize(9); doc.setFont('helvetica', 'normal');
    doc.text('+91 98765 43210  |  hello@shotsbysiri.com', W / 2, currentY, { align: 'center' });
    currentY += 5;
    doc.text('Hyderabad, Telangana', W / 2, currentY, { align: 'center' });
    currentY += 10;
    doc.setFontSize(7);
    doc.text('© 2026 Shots by Siri. All rights reserved.', W / 2, currentY, { align: 'center' });

    // Save
    const customerName = document.getElementById('customer-name').value.replace(/\s+/g, '_') || 'Customer';
    doc.save(`ShotsBySiri_Quote_${customerName}.pdf`);
    showToast('PDF downloaded successfully! ✨', 'success');
    saveToGoogleSheets();
}

// ——— Google Sheets ———
async function saveToGoogleSheets() {
    const data = {
        timestamp: new Date().toISOString(),
        name: document.getElementById('customer-name').value,
        mobile: document.getElementById('customer-mobile').value,
        email: document.getElementById('customer-email').value || 'N/A',
        weddingDate: document.getElementById('wedding-date').value || 'N/A',
        city: document.getElementById('wedding-city').value || 'N/A',
        selectedEvents: EVENTS.filter(e => selectedEvents.has(e.id)).map(e => e.name).join(', '),
        totalAmount: calculateTotal(),
        breakdown: getBreakdownText(),
    };
    if (GOOGLE_SHEETS_URL && GOOGLE_SHEETS_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
        try { await fetch(GOOGLE_SHEETS_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); } catch (e) { console.error('Sheets error:', e); }
    } else { console.log('Google Sheets not configured. Data:', data); }
}

function getBreakdownText() {
    let lines = [];
    EVENTS.filter(e => selectedEvents.has(e.id)).forEach(ev => {
        const svcs = Object.entries(eventServices[ev.id] || {}).filter(([, v]) => v);
        if (svcs.length) lines.push(ev.name + ': ' + svcs.map(([s]) => PRICING.services[s].name).join(', '));
    });
    Object.entries(albumQty).forEach(([a, q]) => { if (q > 0) lines.push(`${PRICING.albums[a].name} × ${q}`); });
    for (const [eid, cfg] of Object.entries(PRICING.extras)) { const el = document.getElementById(eid); if (el && el.checked) lines.push(cfg.name); }
    const pp = document.querySelector('input[name="post-production"]:checked'); if (pp) lines.push('PP: ' + PRICING.postProduction[pp.value].label);
    return lines.join(' | ');
}

// ——— Toast ———
function showToast(msg, type = 'success') {
    const ex = document.querySelector('.toast'); if (ex) ex.remove();
    const t = document.createElement('div'); t.className = `toast ${type}`;
    t.innerHTML = `<span class="toast-icon">${type === 'success' ? '✅' : '⚠️'}</span><span class="toast-message">${msg}</span>`;
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(20px)'; t.style.transition = 'all .3s'; setTimeout(() => t.remove(), 300); }, 3500);
}
