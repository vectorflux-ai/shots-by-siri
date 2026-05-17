/* ═══════════════════════════════════════════════════
   SHOTS BY SIRI — Application Logic
   ═══════════════════════════════════════════════════ */

// ——— Configuration & Pricing Data ———
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
    { id: 'pellikoduku', name: 'Pelli Koduku', icon: '🎉', description: 'Groom\'s celebrations', services: ['traditional-photo', 'traditional-video', 'candid-photo', 'candid-video', 'drone', 'led-screen'] },
    { id: 'pellikuthuru', name: 'Pelli Kuthuru', icon: '🌺', description: 'Bride\'s celebrations', services: ['traditional-photo', 'traditional-video', 'candid-photo', 'candid-video', 'drone', 'led-screen'] },
    { id: 'groom-haldi', name: 'Groom Haldi / Pasupu', icon: '🟡', description: 'Groom\'s haldi ceremony', services: ['candid-photo', 'candid-video'] },
    { id: 'bride-haldi', name: 'Bride Haldi / Pasupu', icon: '💛', description: 'Bride\'s haldi ceremony', services: ['candid-photo', 'candid-video'] },
    { id: 'sangeeth', name: 'Sangeeth Night', icon: '🎶', description: 'Music & dance celebration', services: ['candid-photo', 'candid-video', 'traditional-video', 'drone', 'led-screen'] },
    { id: 'mehandi', name: 'Mehandi Ceremony', icon: '🤲', description: 'Mehandi application day', services: ['candid-photo', 'traditional-video'] },
    { id: 'cocktail-party', name: 'Cocktail Party', icon: '🍸', description: 'Evening party celebration', services: ['candid-photo', 'candid-video', 'led-screen'] },
    { id: 'wedding-day', name: 'Wedding Day (Muhurtham)', icon: '🔥', description: 'The main wedding ceremony', services: ['traditional-photo', 'traditional-video', 'candid-photo', 'candid-video', 'drone', 'led-screen'] },
    { id: 'reception', name: 'Reception', icon: '🎊', description: 'Grand reception party', services: ['traditional-photo', 'traditional-video', 'candid-photo', 'candid-video', 'drone', 'led-screen'] },
    { id: 'satyanarayana-vratham', name: 'Satyanarayana Vratham', icon: '🙏', description: 'Post-wedding puja', services: ['traditional-photo', 'traditional-video'] },
];

// ——— Google Sheets Configuration ———
// Replace with your actual Google Apps Script Web App URL
const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';

// ——— State ———
let currentStep = 1;
const totalSteps = 6;
let selectedEvents = new Set();
let eventServices = {}; // { eventId: { serviceId: true/false } }
let albumQty = { 'candid-press': 0, 'candid-magnum': 0, 'trad-press': 0, 'trad-magnum': 0 };

// ——— Initialization ———
document.addEventListener('DOMContentLoaded', () => {
    initPetals();
    initScrollAnimations();
    initStatCounters();
    initNavScroll();
    renderEventsGrid();
    initMobileMenu();
});

// ——— Floating Petals ———
function initPetals() {
    const container = document.getElementById('floating-petals');
    if (!container) return;
    for (let i = 0; i < 15; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (8 + Math.random() * 12) + 's';
        petal.style.animationDelay = Math.random() * 10 + 's';
        petal.style.opacity = 0.2 + Math.random() * 0.3;
        petal.style.transform = `scale(${0.5 + Math.random() * 1})`;
        container.appendChild(petal);
    }
}

// ——— Scroll-triggered Animations ———
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.service-card, .step-card, .testimonial-card, .section-header').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// ——— Stat Counter Animation ———
function initStatCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                animateCounter(el, target);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));
}

function animateCounter(el, target) {
    const duration = 2000;
    const start = performance.now();
    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// ——— Nav Scroll Effect ———
function initNavScroll() {
    const nav = document.querySelector('.hero-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// ——— Mobile Menu ———
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            document.getElementById('mobile-menu-overlay').classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
}

function closeMobileMenu() {
    document.getElementById('mobile-menu-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

// ——— Smooth scroll ———
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// ═══════════════════════════════════
// QUOTE BUILDER
// ═══════════════════════════════════

function startQuoteBuilder() {
    const qb = document.getElementById('quote-builder');
    qb.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    currentStep = 1;
    updateStep();
}

function closeQuoteBuilder() {
    document.getElementById('quote-builder').classList.add('hidden');
    document.body.style.overflow = '';
}

function updateStep() {
    // Show/hide steps
    document.querySelectorAll('.qb-step').forEach(s => s.classList.remove('active'));
    const activeStep = document.querySelector(`.qb-step[data-step="${currentStep}"]`);
    if (activeStep) activeStep.classList.add('active');

    // Progress
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('qb-progress-bar').style.setProperty('--progress', progress + '%');
    document.getElementById('qb-progress-text').textContent = `Step ${currentStep} of ${totalSteps}`;

    // Nav buttons
    const prevBtn = document.getElementById('qb-prev');
    const nextBtn = document.getElementById('qb-next');
    prevBtn.style.visibility = currentStep === 1 ? 'hidden' : 'visible';

    if (currentStep === totalSteps) {
        nextBtn.style.display = 'none';
    } else if (currentStep === totalSteps - 1) {
        nextBtn.innerHTML = '<span>View Final Quote</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
        nextBtn.style.display = 'inline-flex';
    } else {
        nextBtn.innerHTML = '<span>Next Step</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
        nextBtn.style.display = 'inline-flex';
    }

    // Recalculate total
    recalculate();

    // Build dynamic content for steps
    if (currentStep === 3) buildEventConfigs();
    if (currentStep === 5) buildSummary();
    if (currentStep === 6) {
        document.getElementById('final-amount').textContent = formatCurrency(calculateTotal());
    }

    // Scroll panel to top
    document.querySelector('.qb-panel').scrollTop = 0;
}

function nextStep() {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && selectedEvents.size === 0) {
        showToast('Please select at least one event', 'error');
        return;
    }
    if (currentStep < totalSteps) {
        currentStep++;
        updateStep();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStep();
    }
}

// ——— Validation ———
function validateStep1() {
    const name = document.getElementById('customer-name').value.trim();
    const mobile = document.getElementById('customer-mobile').value.trim();

    let valid = true;

    if (!name) {
        showFieldError('customer-name', 'Please enter your name');
        valid = false;
    } else {
        clearFieldError('customer-name');
    }

    if (!mobile || !/^[0-9]{10}$/.test(mobile)) {
        showFieldError('customer-mobile', 'Please enter a valid 10-digit mobile number');
        valid = false;
    } else {
        clearFieldError('customer-mobile');
    }

    return valid;
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('input-error');

    let errEl = field.parentElement.querySelector('.error-message');
    if (!errEl) {
        errEl = document.createElement('div');
        errEl.className = 'error-message';
        field.parentElement.appendChild(errEl);
    }
    errEl.textContent = message;
    errEl.classList.add('show');
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.remove('input-error');
    const errEl = field.parentElement.querySelector('.error-message');
    if (errEl) errEl.classList.remove('show');
}

// ——— Render Events Grid (Step 2) ———
function renderEventsGrid() {
    const grid = document.getElementById('events-grid');
    grid.innerHTML = EVENTS.map(event => `
        <label class="event-toggle" id="event-${event.id}">
            <input type="checkbox" value="${event.id}" onchange="toggleEvent('${event.id}', this.checked)">
            <div class="event-toggle-card">
                <span class="event-toggle-icon">${event.icon}</span>
                <div class="event-toggle-info">
                    <h4>${event.name}</h4>
                    <p>${event.description}</p>
                </div>
                <div class="event-check"></div>
            </div>
        </label>
    `).join('');
}

function toggleEvent(eventId, checked) {
    if (checked) {
        selectedEvents.add(eventId);
        // Initialize services for this event
        const event = EVENTS.find(e => e.id === eventId);
        if (!eventServices[eventId]) {
            eventServices[eventId] = {};
            event.services.forEach(s => eventServices[eventId][s] = false);
        }
    } else {
        selectedEvents.delete(eventId);
        delete eventServices[eventId];
    }
    recalculate();
}

// ——— Build Event Configuration (Step 3) ———
function buildEventConfigs() {
    const container = document.getElementById('event-config-container');
    const selectedArr = EVENTS.filter(e => selectedEvents.has(e.id));

    container.innerHTML = selectedArr.map(event => `
        <div class="event-config-card">
            <div class="ecc-header">
                <span>${event.icon}</span>
                <h3>${event.name}</h3>
            </div>
            <div class="ecc-services">
                ${event.services.map(svcId => {
                    const svc = PRICING.services[svcId];
                    const checked = eventServices[event.id]?.[svcId] ? 'checked' : '';
                    return `
                        <label class="service-option">
                            <input type="checkbox" ${checked} onchange="toggleService('${event.id}', '${svcId}', this.checked)">
                            <div class="service-option-card">
                                <div class="svc-icon">${svc.icon}</div>
                                <div class="svc-name">${svc.name}</div>
                                <div class="svc-price">${formatCurrency(svc.price)}</div>
                            </div>
                        </label>
                    `;
                }).join('')}
            </div>
        </div>
    `).join('');
}

function toggleService(eventId, serviceId, checked) {
    if (!eventServices[eventId]) eventServices[eventId] = {};
    eventServices[eventId][serviceId] = checked;
    recalculate();
}

// ——— Album Qty Control ———
function changeQty(albumId, delta) {
    albumQty[albumId] = Math.max(0, (albumQty[albumId] || 0) + delta);
    const display = document.getElementById(`qty-${albumId}`);
    if (display) display.textContent = albumQty[albumId];
    recalculate();
}

// ——— Calculate Total ———
function calculateTotal() {
    let total = 0;

    // Service costs per event
    for (const eventId of selectedEvents) {
        const services = eventServices[eventId] || {};
        for (const [svcId, selected] of Object.entries(services)) {
            if (selected) {
                total += PRICING.services[svcId].price;
            }
        }
    }

    // Albums
    for (const [albumId, qty] of Object.entries(albumQty)) {
        total += PRICING.albums[albumId].price * qty;
    }

    // Extras
    for (const [extraId, config] of Object.entries(PRICING.extras)) {
        const el = document.getElementById(extraId);
        if (el && el.checked) total += config.price;
    }

    // Post production
    const ppRadio = document.querySelector('input[name="post-production"]:checked');
    if (ppRadio) {
        total += PRICING.postProduction[ppRadio.value].adjustment;
    }

    return total;
}

function recalculate() {
    const total = calculateTotal();
    const display = document.getElementById('running-amount');
    if (display) display.textContent = formatCurrency(total);
}

function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}

// ——— Build Summary (Step 5) ———
function buildSummary() {
    const container = document.getElementById('summary-container');
    let html = '';

    // Customer info
    html += `
        <div class="summary-section">
            <div class="summary-section-title">👤 Customer Details</div>
            <div class="summary-line"><span class="sl-label">Name</span><span class="sl-value">${document.getElementById('customer-name').value}</span></div>
            <div class="summary-line"><span class="sl-label">Mobile</span><span class="sl-value">${document.getElementById('customer-mobile').value}</span></div>
            ${document.getElementById('customer-email').value ? `<div class="summary-line"><span class="sl-label">Email</span><span class="sl-value">${document.getElementById('customer-email').value}</span></div>` : ''}
            ${document.getElementById('wedding-date').value ? `<div class="summary-line"><span class="sl-label">Wedding Date</span><span class="sl-value">${new Date(document.getElementById('wedding-date').value).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>` : ''}
            ${document.getElementById('wedding-city').value ? `<div class="summary-line"><span class="sl-label">City</span><span class="sl-value">${document.getElementById('wedding-city').value}</span></div>` : ''}
        </div>
    `;

    // Events & Services
    let eventTotal = 0;
    const selectedArr = EVENTS.filter(e => selectedEvents.has(e.id));
    if (selectedArr.length > 0) {
        html += `<div class="summary-section"><div class="summary-section-title">🎊 Events & Services</div>`;
        selectedArr.forEach(event => {
            const services = eventServices[event.id] || {};
            const activeServices = Object.entries(services).filter(([, v]) => v);
            if (activeServices.length > 0) {
                html += `<div style="margin-bottom:12px;"><strong style="color:var(--color-text);font-size:0.9rem;">${event.icon} ${event.name}</strong>`;
                activeServices.forEach(([svcId]) => {
                    const svc = PRICING.services[svcId];
                    eventTotal += svc.price;
                    html += `<div class="summary-line"><span class="sl-label">&nbsp;&nbsp;${svc.name}</span><span class="sl-value">${formatCurrency(svc.price)}</span></div>`;
                });
                html += '</div>';
            }
        });
        html += '</div>';
    }

    // Albums
    let albumTotal = 0;
    const activeAlbums = Object.entries(albumQty).filter(([, qty]) => qty > 0);
    if (activeAlbums.length > 0) {
        html += `<div class="summary-section"><div class="summary-section-title">📖 Albums</div>`;
        activeAlbums.forEach(([albumId, qty]) => {
            const album = PRICING.albums[albumId];
            const cost = album.price * qty;
            albumTotal += cost;
            html += `<div class="summary-line"><span class="sl-label">${album.name} × ${qty}</span><span class="sl-value">${formatCurrency(cost)}</span></div>`;
        });
        html += '</div>';
    }

    // Extras
    let extrasTotal = 0;
    const extrasHtml = [];
    for (const [extraId, config] of Object.entries(PRICING.extras)) {
        const el = document.getElementById(extraId);
        if (el && el.checked) {
            extrasTotal += config.price;
            extrasHtml.push(`<div class="summary-line"><span class="sl-label">${config.name}</span><span class="sl-value">${formatCurrency(config.price)}</span></div>`);
        }
    }

    // Post production
    const ppRadio = document.querySelector('input[name="post-production"]:checked');
    let ppAdjustment = 0;
    let ppLabel = '';
    if (ppRadio) {
        ppAdjustment = PRICING.postProduction[ppRadio.value].adjustment;
        ppLabel = PRICING.postProduction[ppRadio.value].label;
        if (ppAdjustment !== 0) {
            extrasHtml.push(`<div class="summary-line"><span class="sl-label">Post Production: ${ppLabel}</span><span class="sl-value">${ppAdjustment > 0 ? '+' : ''}${formatCurrency(ppAdjustment)}</span></div>`);
            extrasTotal += ppAdjustment;
        }
    }

    if (extrasHtml.length > 0) {
        html += `<div class="summary-section"><div class="summary-section-title">✨ Add-ons & Extras</div>${extrasHtml.join('')}</div>`;
    }

    const grandTotal = calculateTotal();
    html += `
        <div class="summary-total">
            <span class="st-label">Grand Total</span>
            <span class="st-value">${formatCurrency(grandTotal)}</span>
        </div>
    `;

    container.innerHTML = html;
}

// ——— PDF Download ———
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    let y = margin;

    // Helper functions
    const addLine = (y1) => {
        doc.setDrawColor(201, 149, 107);
        doc.setLineWidth(0.5);
        doc.line(margin, y1, pageWidth - margin, y1);
    };

    const checkPageBreak = (neededHeight) => {
        if (y + neededHeight > pageHeight - margin) {
            doc.addPage();
            y = margin;
            return true;
        }
        return false;
    };

    // ——— Header ———
    doc.setFillColor(26, 26, 36);
    doc.rect(0, 0, pageWidth, 55, 'F');

    doc.setTextColor(201, 149, 107);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('Shots by Siri', margin, 25);

    doc.setTextColor(157, 153, 168);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Wedding Photography & Videography', margin, 33);

    doc.setTextColor(240, 236, 230);
    doc.setFontSize(10);
    doc.text('+91 98765 43210  |  hello@shotsbysiri.com', margin, 42);

    const today = new Date();
    doc.setTextColor(157, 153, 168);
    doc.setFontSize(9);
    doc.text(`Quote Date: ${today.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, pageWidth - margin, 25, { align: 'right' });
    doc.text(`Quote #: SBS-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 9000) + 1000}`, pageWidth - margin, 33, { align: 'right' });

    y = 65;

    // ——— Customer Details ———
    doc.setFillColor(40, 40, 55);
    doc.roundedRect(margin, y, contentWidth, 35, 3, 3, 'F');

    doc.setTextColor(201, 149, 107);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Prepared For:', margin + 5, y + 8);

    doc.setTextColor(240, 236, 230);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(document.getElementById('customer-name').value, margin + 5, y + 16);
    doc.text('Mobile: ' + document.getElementById('customer-mobile').value, margin + 5, y + 23);

    const rightCol = pageWidth - margin - 5;
    if (document.getElementById('customer-email').value) {
        doc.text('Email: ' + document.getElementById('customer-email').value, rightCol, y + 16, { align: 'right' });
    }
    if (document.getElementById('wedding-date').value) {
        doc.text('Wedding: ' + new Date(document.getElementById('wedding-date').value).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }), rightCol, y + 23, { align: 'right' });
    }
    if (document.getElementById('wedding-city').value) {
        doc.text('City: ' + document.getElementById('wedding-city').value, rightCol, y + 30, { align: 'right' });
    }

    y += 45;

    // ——— Events & Services Table ———
    const selectedArr = EVENTS.filter(e => selectedEvents.has(e.id));
    let hasEventServices = false;

    selectedArr.forEach(event => {
        const services = eventServices[event.id] || {};
        const activeServices = Object.entries(services).filter(([, v]) => v);
        if (activeServices.length > 0) hasEventServices = true;
    });

    if (hasEventServices) {
        doc.setTextColor(201, 149, 107);
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text('Events & Services', margin, y);
        y += 4;
        addLine(y);
        y += 8;

        // Table header
        doc.setFillColor(40, 40, 55);
        doc.roundedRect(margin, y - 3, contentWidth, 8, 1, 1, 'F');
        doc.setTextColor(201, 149, 107);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text('EVENT', margin + 3, y + 2);
        doc.text('SERVICE', margin + 60, y + 2);
        doc.text('AMOUNT', pageWidth - margin - 3, y + 2, { align: 'right' });
        y += 10;

        selectedArr.forEach(event => {
            const services = eventServices[event.id] || {};
            const activeServices = Object.entries(services).filter(([, v]) => v);

            if (activeServices.length > 0) {
                checkPageBreak(10 + activeServices.length * 7);

                doc.setTextColor(240, 236, 230);
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.text(`${event.name}`, margin + 3, y);
                y += 1;

                activeServices.forEach(([svcId], idx) => {
                    const svc = PRICING.services[svcId];
                    doc.setTextColor(157, 153, 168);
                    doc.setFontSize(9);
                    doc.setFont('helvetica', 'normal');
                    doc.text(svc.name, margin + 60, y + 5);
                    doc.setTextColor(240, 236, 230);
                    doc.text(formatCurrency(svc.price), pageWidth - margin - 3, y + 5, { align: 'right' });
                    y += 7;
                });

                doc.setDrawColor(50, 50, 65);
                doc.setLineWidth(0.2);
                doc.line(margin, y + 2, pageWidth - margin, y + 2);
                y += 6;
            }
        });
    }

    // ——— Albums ———
    const activeAlbums = Object.entries(albumQty).filter(([, qty]) => qty > 0);
    if (activeAlbums.length > 0) {
        checkPageBreak(20 + activeAlbums.length * 8);
        y += 5;
        doc.setTextColor(201, 149, 107);
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text('Albums', margin, y);
        y += 4;
        addLine(y);
        y += 8;

        activeAlbums.forEach(([albumId, qty]) => {
            const album = PRICING.albums[albumId];
            const cost = album.price * qty;
            doc.setTextColor(240, 236, 230);
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.text(`${album.name}  ×  ${qty}`, margin + 3, y);
            doc.text(formatCurrency(cost), pageWidth - margin - 3, y, { align: 'right' });
            y += 8;
        });
    }

    // ——— Extras ———
    const extrasItems = [];
    for (const [extraId, config] of Object.entries(PRICING.extras)) {
        const el = document.getElementById(extraId);
        if (el && el.checked) {
            extrasItems.push({ name: config.name, price: config.price });
        }
    }

    const ppRadio = document.querySelector('input[name="post-production"]:checked');
    if (ppRadio && PRICING.postProduction[ppRadio.value].adjustment !== 0) {
        extrasItems.push({
            name: `Post Production: ${PRICING.postProduction[ppRadio.value].label}`,
            price: PRICING.postProduction[ppRadio.value].adjustment
        });
    }

    if (extrasItems.length > 0) {
        checkPageBreak(20 + extrasItems.length * 8);
        y += 5;
        doc.setTextColor(201, 149, 107);
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text('Add-ons & Extras', margin, y);
        y += 4;
        addLine(y);
        y += 8;

        extrasItems.forEach(item => {
            doc.setTextColor(240, 236, 230);
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.text(item.name, margin + 3, y);
            doc.text((item.price > 0 ? '' : '') + formatCurrency(item.price), pageWidth - margin - 3, y, { align: 'right' });
            y += 8;
        });
    }

    // ——— Grand Total ———
    checkPageBreak(25);
    y += 8;
    const grandTotal = calculateTotal();
    doc.setFillColor(201, 149, 107);
    doc.roundedRect(margin, y, contentWidth, 14, 3, 3, 'F');
    doc.setTextColor(26, 26, 36);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL ESTIMATED PRICE', margin + 5, y + 9.5);
    doc.setFontSize(14);
    doc.text(formatCurrency(grandTotal), pageWidth - margin - 5, y + 9.5, { align: 'right' });

    y += 25;

    // ——— Terms ———
    checkPageBreak(50);
    doc.setTextColor(201, 149, 107);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Terms & Conditions', margin, y);
    y += 2;
    addLine(y);
    y += 7;

    const terms = [
        'This is an estimated quotation. Final price may vary based on discussion.',
        'Sessions last for 5-6 hours per event.',
        'Travel and stay to be arranged by the client.',
        '50% advance at booking, balance payable on the wedding day.',
        'Output delivery timeline depends on timely payment.',
        'If another photography team is hired, the contract will be cancelled immediately.',
        'In case of data loss, re-copying is available at ₹29,999 for lifelong memories.',
    ];

    doc.setTextColor(157, 153, 168);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    terms.forEach((term, i) => {
        checkPageBreak(6);
        doc.text(`${i + 1}. ${term}`, margin + 3, y);
        y += 5;
    });

    // ——— Footer ———
    y += 10;
    checkPageBreak(15);
    doc.setDrawColor(201, 149, 107);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;
    doc.setTextColor(157, 153, 168);
    doc.setFontSize(8);
    doc.text('Shots by Siri  |  +91 98765 43210  |  hello@shotsbysiri.com  |  Hyderabad, Telangana', pageWidth / 2, y, { align: 'center' });
    y += 4;
    doc.text('© 2026 Shots by Siri. All rights reserved.', pageWidth / 2, y, { align: 'center' });

    // Save PDF
    const customerName = document.getElementById('customer-name').value.replace(/\s+/g, '_') || 'Customer';
    doc.save(`ShotsBySiri_Quote_${customerName}.pdf`);

    showToast('PDF downloaded successfully! ✨', 'success');

    // Save to Google Sheets
    saveToGoogleSheets();
}

// ——— Google Sheets Integration ———
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

    // If Google Sheets URL is configured, send data
    if (GOOGLE_SHEETS_URL && GOOGLE_SHEETS_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
        try {
            await fetch(GOOGLE_SHEETS_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            console.log('Data saved to Google Sheets successfully');
        } catch (error) {
            console.error('Error saving to Google Sheets:', error);
        }
    } else {
        console.log('Google Sheets integration not configured. Data to be saved:', data);
    }
}

function getBreakdownText() {
    let lines = [];

    const selectedArr = EVENTS.filter(e => selectedEvents.has(e.id));
    selectedArr.forEach(event => {
        const services = eventServices[event.id] || {};
        const activeServices = Object.entries(services).filter(([, v]) => v);
        if (activeServices.length > 0) {
            lines.push(event.name + ': ' + activeServices.map(([sId]) => PRICING.services[sId].name).join(', '));
        }
    });

    Object.entries(albumQty).forEach(([aId, qty]) => {
        if (qty > 0) lines.push(`${PRICING.albums[aId].name} × ${qty}`);
    });

    for (const [extraId, config] of Object.entries(PRICING.extras)) {
        const el = document.getElementById(extraId);
        if (el && el.checked) lines.push(config.name);
    }

    const ppRadio = document.querySelector('input[name="post-production"]:checked');
    if (ppRadio) lines.push('Post Production: ' + PRICING.postProduction[ppRadio.value].label);

    return lines.join(' | ');
}

// ——— Toast Notification ———
function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✅' : '⚠️'}</span>
        <span class="toast-message">${message}</span>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(20px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
