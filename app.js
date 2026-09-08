/**
 * Application Logic for AURÈLIA Event Props & Special FX Rental
 */

class EvoriaApp {
  constructor() {
    this.cart = [];
    this.currentCategory = 'all';
    this.currentGalleryCategory = 'all';
    this.searchQuery = '';
    this.includeTechnician = true;
    this.technicianFee = 2500;

    this.init();
  }

  init() {
    this.loadCartFromStorage();
    this.renderServicesSlider();
    this.renderSpotlightShowcase();
    this.renderDedicatedGallery();
    this.updateCartUI();
  }

  loadCartFromStorage() {
    try {
      const saved = localStorage.getItem('aurelia_cart');
      if (saved) this.cart = JSON.parse(saved);
    } catch (e) {
      this.cart = [];
    }
  }

  saveCartToStorage() {
    try {
      localStorage.setItem('aurelia_cart', JSON.stringify(this.cart));
    } catch (e) {}
  }

  renderServicesSlider() {
    const track = document.getElementById('services-products-slider');
    if (!track) return;

    track.innerHTML = PRODUCTS_DATA.map((p, idx) => {
      const inCart = this.cart.some(c => c.id === p.id);
      return `
        <div class="service-arch-pill-card" onclick="app.selectProduct('${p.id}')">
          <div class="pill-image-window">
            <img src="${p.image}" alt="${p.name}" loading="lazy" />
          </div>
          <div class="pill-floating-icon">
            ${p.icon || '<svg viewBox="0 0 24 24"><path d="M12 2l2.4 5.6L20 9.2l-4.4 4 1.2 6-4.8-3-4.8 3 1.2-6-4.4-4 5.6-1.6z"/></svg>'}
          </div>
          <h3 class="pill-card-title">${p.name}</h3>
          <span class="pill-card-price">₹${p.pricePerDay.toLocaleString('en-IN')}</span>
          <span class="pill-card-arrow">${inCart ? '✓ In Quote' : '+ Add &rarr;'}</span>
        </div>
      `;
    }).join('');

    updateServicesCounter();
  }

  renderSpotlightShowcase() {
    const track = document.getElementById('gallery-arches-track');
    if (!track) return;

    track.innerHTML = PRODUCTS_DATA.map((p, idx) => {
      return `
        <div class="gallery-arch-window" onclick="openLightbox(${idx})" style="cursor: pointer;">
          <img src="${p.image}" alt="${p.name}" loading="lazy" />
        </div>
      `;
    }).join('');

    updateGalleryCounter();
  }

  renderDedicatedGallery() {
    const grid = document.getElementById('dedicated-gallery-grid');
    if (!grid) return;

    let items = PRODUCTS_DATA;
    if (this.currentGalleryCategory !== 'all') {
      items = items.filter(p => p.category === this.currentGalleryCategory);
    }

    grid.innerHTML = items.map((p) => {
      const fullIdx = PRODUCTS_DATA.findIndex(item => item.id === p.id);
      const inCart = this.cart.some(c => c.id === p.id);
      return `
        <article class="gallery-product-card" onclick="openLightbox(${fullIdx})">
          <div class="gallery-card-img-wrap">
            <img src="${p.image}" alt="${p.name}" loading="lazy" />
            <div class="gallery-card-hover-overlay">
              <span class="gallery-zoom-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                VIEW FULLSCREEN
              </span>
            </div>
          </div>
          <div class="gallery-card-body">
            <span class="gallery-card-cat">${p.categoryLabel}</span>
            <h3 class="gallery-card-title">${p.name}</h3>
            <p class="gallery-card-desc">${p.tagline}</p>
            <div class="gallery-card-foot">
              <span class="gallery-card-price">₹${p.pricePerDay.toLocaleString('en-IN')}</span>
              <div class="gallery-card-btn-icon" title="Inspect & Add">
                ${inCart ? '✓' : '&rarr;'}
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  filterGalleryCategory(catId, btnEl) {
    this.currentGalleryCategory = catId;
    
    // Update active tab styling
    document.querySelectorAll('.gallery-filter-btn').forEach(btn => btn.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    this.renderDedicatedGallery();
  }

  selectProduct(id) {
    const prod = PRODUCTS_DATA.find(p => p.id === id);
    if (!prod) return;

    const idx = this.cart.findIndex(c => c.id === id);
    if (idx > -1) {
      this.cart.splice(idx, 1);
      this.showToast(`Removed "${prod.name}"`);
    } else {
      this.cart.push({
        id: prod.id,
        name: prod.name,
        price: prod.pricePerDay,
        qty: 1
      });
      this.showToast(`Added "${prod.name}" to Quote!`);
    }

    this.saveCartToStorage();
    this.updateCartUI();
    this.renderServicesSlider();
    this.renderDedicatedGallery();
    this.openQuoteDrawer();
  }

  toggleTechnician(checked) {
    this.includeTechnician = checked;
    this.updateCartUI();
  }

  calculateTotals() {
    const equip = this.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const tech = (this.includeTechnician && this.cart.length > 0) ? this.technicianFee : 0;
    return {
      equip,
      tech,
      grand: equip + tech
    };
  }

  updateCartUI() {
    const badge = document.getElementById('cart-badge');
    const totalItems = this.cart.reduce((sum, i) => sum + i.qty, 0);
    if (badge) badge.textContent = totalItems;

    const listEl = document.getElementById('drawer-items-list');
    if (listEl) {
      if (this.cart.length === 0) {
        listEl.innerHTML = `
          <div style="text-align: center; padding: 40px 20px; color: var(--text-dark-muted);">
            <p style="font-size: 0.95rem; margin-bottom: 8px;">Your quote draft is empty.</p>
            <span style="font-size: 0.8rem;">Tap any product card in the gallery to add!</span>
          </div>
        `;
      } else {
        listEl.innerHTML = this.cart.map(item => `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #FFFFFF; border-radius: 10px; border: 1px solid var(--border-cream); margin-bottom: 8px;">
            <div style="max-width: 65%;">
              <strong style="font-size: 0.88rem; color: var(--text-dark); display: block; line-height: 1.25; margin-bottom: 2px;">${item.name}</strong>
              <span style="font-size: 0.78rem; color: var(--color-terracotta);">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <button onclick="app.updateItemQty('${item.id}', -1)" style="width: 24px; height: 24px; border-radius: 50%; border: 1px solid var(--border-cream); background: #F5EEE6; cursor: pointer;">-</button>
              <span style="font-size: 0.85rem; font-weight: 600;">${item.qty}</span>
              <button onclick="app.updateItemQty('${item.id}', 1)" style="width: 24px; height: 24px; border-radius: 50%; border: 1px solid var(--border-cream); background: #F5EEE6; cursor: pointer;">+</button>
            </div>
          </div>
        `).join('');
      }
    }

    const totals = this.calculateTotals();
    const equipEl = document.getElementById('summary-equip-val');
    const grandEl = document.getElementById('summary-grand-val');

    if (equipEl) equipEl.textContent = `₹${totals.equip.toLocaleString('en-IN')}`;
    if (grandEl) grandEl.textContent = `₹${totals.grand.toLocaleString('en-IN')}`;
  }

  updateItemQty(id, delta) {
    const item = this.cart.find(c => c.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      this.cart = this.cart.filter(c => c.id !== id);
    }
    this.saveCartToStorage();
    this.updateCartUI();
    this.renderServicesSlider();
    this.renderDedicatedGallery();
  }

  sendWhatsAppQuote() {
    const date = document.getElementById('evoria-event-date')?.value || 'TBD';
    const city = document.getElementById('evoria-event-city')?.value || 'City Venue';
    const totals = this.calculateTotals();

    let text = `🌿 *AURÈLIA | EVENT PROPS & CELEBRATION INQUIRY* 🌿\n\n`;
    text += `📅 *Date:* ${date}\n`;
    text += `📍 *Venue:* ${city}\n\n`;
    
    if (this.cart.length > 0) {
      text += `✨ *Selected Props & Setup:*\n`;
      this.cart.forEach((c, idx) => {
        text += `${idx + 1}. ${c.name} (Qty: ${c.qty}) - ₹${(c.price * c.qty).toLocaleString('en-IN')}\n`;
      });
      text += `\n💰 *Estimated Total:* ₹${totals.grand.toLocaleString('en-IN')}\n\n`;
    } else {
      text += `✨ *Inquiry:* I would like a consultation for my upcoming event!\n\n`;
    }

    text += `Please check equipment availability for our date.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?phone=919876543210&text=${encoded}`, '_blank');
  }

  openQuoteDrawer() {
    document.getElementById('quote-drawer-evoria')?.classList.add('open');
    document.getElementById('drawer-overlay')?.classList.add('active');
  }

  closeQuoteDrawer() {
    document.getElementById('quote-drawer-evoria')?.classList.remove('open');
    document.getElementById('drawer-overlay')?.classList.remove('active');
  }

  showToast(msg) {
    let t = document.getElementById('aurelia-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'aurelia-toast';
      t.style.position = 'fixed';
      t.style.bottom = '30px';
      t.style.left = '50%';
      t.style.transform = 'translateX(-50%)';
      t.style.background = '#213329';
      t.style.color = '#FFFFFF';
      t.style.padding = '12px 24px';
      t.style.borderRadius = '9999px';
      t.style.fontSize = '0.88rem';
      t.style.fontWeight = '600';
      t.style.zIndex = '9999';
      t.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.display = 'block';
    setTimeout(() => { t.style.display = 'none'; }, 2500);
  }
}

// ---------------------------------------------------------------------------
// Services Carousel Track Controller
// ---------------------------------------------------------------------------
let servicesCurrentIndex = 0;

function getVisibleCardsCount() {
  const width = window.innerWidth;
  if (width < 600) return 2;
  if (width < 992) return 3;
  if (width < 1200) return 4;
  return 6;
}

function nextServicesSlide() {
  const visible = getVisibleCardsCount();
  const maxIndex = Math.max(0, PRODUCTS_DATA.length - visible);
  if (servicesCurrentIndex < maxIndex) {
    servicesCurrentIndex++;
  } else {
    servicesCurrentIndex = 0;
  }
  updateServicesSliderPosition();
}

function prevServicesSlide() {
  const visible = getVisibleCardsCount();
  const maxIndex = Math.max(0, PRODUCTS_DATA.length - visible);
  if (servicesCurrentIndex > 0) {
    servicesCurrentIndex--;
  } else {
    servicesCurrentIndex = maxIndex;
  }
  updateServicesSliderPosition();
}

function updateServicesSliderPosition() {
  const track = document.getElementById('services-products-slider');
  const card = track?.querySelector('.service-arch-pill-card');
  if (!track || !card) return;

  const cardWidth = card.offsetWidth;
  const gap = 20;
  const offset = servicesCurrentIndex * (cardWidth + gap);

  track.style.transform = `translateX(-${offset}px)`;
  updateServicesCounter();
}

function updateServicesCounter() {
  const counter = document.getElementById('services-counter');
  if (!counter) return;
  const current = String(servicesCurrentIndex + 1).padStart(2, '0');
  const total = String(PRODUCTS_DATA.length).padStart(2, '0');
  counter.textContent = `${current} / ${total}`;
}

// ---------------------------------------------------------------------------
// Spotlight Showcase Slider & Lightbox Gallery Controller
// ---------------------------------------------------------------------------
let galleryCurrentIndex = 0;
let currentLightboxIdx = 0;

function nextGallerySlide() {
  const visible = window.innerWidth < 768 ? 2 : (window.innerWidth < 1100 ? 3 : 4);
  const maxIdx = Math.max(0, PRODUCTS_DATA.length - visible);

  if (galleryCurrentIndex < maxIdx) {
    galleryCurrentIndex++;
  } else {
    galleryCurrentIndex = 0;
  }
  updateGallerySliderPosition();
}

function prevGallerySlide() {
  const visible = window.innerWidth < 768 ? 2 : (window.innerWidth < 1100 ? 3 : 4);
  const maxIdx = Math.max(0, PRODUCTS_DATA.length - visible);

  if (galleryCurrentIndex > 0) {
    galleryCurrentIndex--;
  } else {
    galleryCurrentIndex = maxIdx;
  }
  updateGallerySliderPosition();
}

function updateGallerySliderPosition() {
  const track = document.getElementById('gallery-arches-track');
  const card = track?.querySelector('.gallery-arch-window');
  if (!track || !card) return;

  const cardWidth = card.offsetWidth;
  const gap = 18;
  const offset = galleryCurrentIndex * (cardWidth + gap);

  track.style.transform = `translateX(-${offset}px)`;
  updateGalleryCounter();
}

function updateGalleryCounter() {
  const counter = document.getElementById('gallery-counter');
  if (counter) {
    const current = String(galleryCurrentIndex + 1).padStart(2, '0');
    const total = String(PRODUCTS_DATA.length).padStart(2, '0');
    counter.textContent = `${current} / ${total}`;
  }
}

// Lightbox Logic
function openLightbox(index) {
  currentLightboxIdx = (index + PRODUCTS_DATA.length) % PRODUCTS_DATA.length;
  const prod = PRODUCTS_DATA[currentLightboxIdx];
  if (!prod) return;

  const modal = document.getElementById('gallery-lightbox-modal');
  const img = document.getElementById('lightbox-main-img');
  const cat = document.getElementById('lightbox-item-cat');
  const title = document.getElementById('lightbox-item-title');
  const desc = document.getElementById('lightbox-item-desc');
  const price = document.getElementById('lightbox-item-price');

  if (img) img.src = prod.image;
  if (cat) cat.textContent = prod.categoryLabel || 'Signature Event Prop';
  if (title) title.textContent = prod.name;
  if (desc) desc.textContent = prod.tagline || 'Exquisite handcrafted prop & special FX setup for extraordinary celebrations.';
  if (price) price.textContent = `₹${prod.pricePerDay.toLocaleString('en-IN')}`;

  modal?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('gallery-lightbox-modal')?.classList.remove('open');
  document.body.style.overflow = '';
}

function nextLightboxSlide() {
  openLightbox(currentLightboxIdx + 1);
}

function prevLightboxSlide() {
  openLightbox(currentLightboxIdx - 1);
}

function addCurrentLightboxToQuote() {
  const prod = PRODUCTS_DATA[currentLightboxIdx];
  if (prod && app) {
    app.selectProduct(prod.id);
    closeLightbox();
  }
}

// Keyboard controls for Lightbox (Escape, ArrowLeft, ArrowRight)
window.addEventListener('keydown', (e) => {
  const modal = document.getElementById('gallery-lightbox-modal');
  if (modal?.classList.contains('open')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightboxSlide();
    if (e.key === 'ArrowLeft') prevLightboxSlide();
  }
});

// Close Lightbox on backdrop click
document.getElementById('gallery-lightbox-modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'gallery-lightbox-modal') {
    closeLightbox();
  }
});

// ---------------------------------------------------------------------------
// Hero Slide Controls
// ---------------------------------------------------------------------------
let currentHeroSlide = 0;
let heroSliderTimer = null;

function goToHeroSlide(index) {
  const slides = document.querySelectorAll('.hero-image-slide');
  const dots = document.querySelectorAll('.slide-dot');
  if (slides.length === 0) return;

  currentHeroSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === currentHeroSlide);
  });

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentHeroSlide);
  });

  resetHeroSliderTimer();
}

function nextHeroSlide() {
  goToHeroSlide(currentHeroSlide + 1);
}

function prevHeroSlide() {
  goToHeroSlide(currentHeroSlide - 1);
}

function resetHeroSliderTimer() {
  if (heroSliderTimer) clearInterval(heroSliderTimer);
  heroSliderTimer = setInterval(() => {
    nextHeroSlide();
  }, 4500);
}

// ---------------------------------------------------------------------------
// Mobile Navigation Drawer Controller
// ---------------------------------------------------------------------------
function toggleMobileNav() {
  const drawer = document.getElementById('mobile-nav-drawer');
  const btn = document.querySelector('.mobile-hamburger-btn');
  drawer?.classList.toggle('open');
  btn?.classList.toggle('active');
}

// ---------------------------------------------------------------------------
// Auto-Slide Timers Configuration (All Sliders)
// ---------------------------------------------------------------------------
let servicesSliderTimer = null;
let gallerySliderTimer = null;

function startAllAutoSliders() {
  resetHeroSliderTimer();
  resetServicesSliderTimer();
  resetGallerySliderTimer();
  setupSliderHoverListeners();
}

function resetServicesSliderTimer() {
  if (servicesSliderTimer) clearInterval(servicesSliderTimer);
  servicesSliderTimer = setInterval(() => {
    nextServicesSlide();
  }, 3500);
}

function resetGallerySliderTimer() {
  if (gallerySliderTimer) clearInterval(gallerySliderTimer);
  gallerySliderTimer = setInterval(() => {
    nextGallerySlide();
  }, 4000);
}

function setupSliderHoverListeners() {
  // Hero slider hover pause
  const heroContainer = document.querySelector('.hero-slider-container');
  if (heroContainer) {
    heroContainer.addEventListener('mouseenter', () => clearInterval(heroSliderTimer));
    heroContainer.addEventListener('mouseleave', resetHeroSliderTimer);
  }

  // Services slider hover pause
  const servicesViewport = document.querySelector('.services-slider-viewport');
  if (servicesViewport) {
    servicesViewport.addEventListener('mouseenter', () => clearInterval(servicesSliderTimer));
    servicesViewport.addEventListener('mouseleave', resetServicesSliderTimer);
  }

  // Spotlight Gallery slider hover pause
  const galleryViewport = document.querySelector('.gallery-arches-viewport');
  if (galleryViewport) {
    galleryViewport.addEventListener('mouseenter', () => clearInterval(gallerySliderTimer));
    galleryViewport.addEventListener('mouseleave', resetGallerySliderTimer);
  }
}

// Window resize handler for all sliders
window.addEventListener('resize', () => {
  updateServicesSliderPosition();
  updateGallerySliderPosition();
});

let app;
window.addEventListener('DOMContentLoaded', () => {
  app = new EvoriaApp();
  startAllAutoSliders();
});


