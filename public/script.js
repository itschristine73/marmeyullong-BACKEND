
'use strict';
const API = '';
/* ─── DATA ──────────────────────────────────────────────── */
const galleryData = [
  { src:'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80', cat:'interior', title:'The Library Lounge', desc:'Interior · Evening Ambience' },
  { src:'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80', cat:'exterior', title:'The Grand Terrace', desc:'Exterior · Sunset' },
  { src:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', cat:'food', title:'Tasting Menu', desc:'Food · Chef\'s Selection' },
  { src:'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', cat:'events', title:'Wedding Gala', desc:'Events · Celebrations' },
  { src:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', cat:'nature', title:'Garden Pavilion', desc:'Nature · Manicured Grounds' },
  { src:'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', cat:'interior', title:'Royal Suite', desc:'Interior · Penthouse Collection' },
  { src:'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80', cat:'exterior', title:'Infinity Pool', desc:'Exterior · Leisure' },
  { src:'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80', cat:'food', title:'Morning Ritual', desc:'Food · Breakfast Service' },
  { src:'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80', cat:'moments', title:'Anniversary Evening', desc:'Moments · Private Dining' },
  { src:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80', cat:'nature', title:'Forest Retreat', desc:'Nature · Wilderness' },
  { src:'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80', cat:'interior', title:'The Spa Atrium', desc:'Interior · Wellness' },
  { src:'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800&q=80', cat:'exterior', title:'Coastal View', desc:'Exterior · Seascape' },
  { src:'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', cat:'food', title:'The Main Dining Room', desc:'Food · À la Carte' },
  { src:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80', cat:'events', title:'New Year Gala', desc:'Events · Special Occasions' },
  { src:'https://images.unsplash.com/photo-1568454537842-d933259bb258?w=800&q=80', cat:'moments', title:'Proposal on the Terrace', desc:'Moments · Unforgettable' },
];

const reviewsData = [
  { name:'Sophia Laurent', loc:'Paris', stars:5, date:'March 2025', text:'Lumière didnt just meet our expectations — it quietly dismantled them and rebuilt something far more beautiful.', img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
  { name:'Marcus Chen', loc:'Singapore', stars:5, date:'February 2025', text:'The spa alone is worth the flight. Nothing comes close to the restorative power of this place.', img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
  { name:'Elena Vasquez', loc:'New York', stars:5, date:'January 2025', text:'We hosted our wedding here. Our guests still talk about the evening on the terrace under a full moon.', img:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80' },
  { name:'Arjun Mehta', loc:'Mumbai', stars:5, date:'April 2025', text:'Every staff member remembered my name and my coffee order by day two. That warmth isnt trained — its cultured.', img:'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&q=80' },
  { name:'Claire Dupont', loc:'Lyon', stars:5, date:'May 2025', text:'The most sublime breakfast service I have ever experienced. Even the butter arrives as a work of art.', img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
  { name:'James Whitmore', loc:'London', stars:5, date:'May 2025', text:'Came for three nights. Stayed for seven. The city outside ceased to matter entirely.', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
];

/* ─── LOADER ────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    loader.addEventListener('transitionend', () => loader.remove(), { once: true });
  }, 1600);
});

/* ─── CURSOR ────────────────────────────────────────────── */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mouseX=0, mouseY=0, ringX=0, ringY=0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX+'px'; dot.style.top = mouseY+'px';
});
function lerpCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX+'px'; ring.style.top = ringY+'px';
  requestAnimationFrame(lerpCursor);
}
lerpCursor();
document.querySelectorAll('a, button, .carousel-slide, .masonry-item').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
});

/* ─── RIPPLE ────────────────────────────────────────────── */
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-primary, .submit-btn');
  if (!btn) return;
  const r = document.createElement('span');
  r.className = 'ripple-effect';
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
  btn.appendChild(r);
  r.addEventListener('animationend', () => r.remove());
});

/* ─── NAVBAR ────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateScrollProgress();
  toggleBackTop();
}, { passive: true });

/* ─── SCROLL PROGRESS ───────────────────────────────────── */
const progressBar = document.getElementById('scroll-progress');
function updateScrollProgress() {
  const total = document.body.scrollHeight - window.innerHeight;
  const pct = (window.scrollY / total) * 100;
  progressBar.style.width = pct + '%';
}

/* ─── BACK TO TOP ───────────────────────────────────────── */
const backTop = document.getElementById('back-top');
function toggleBackTop() { backTop.classList.toggle('visible', window.scrollY > 400); }
function scrollToTop() { window.scrollTo({ top:0, behavior:'smooth' }); }

/* ─── MOBILE NAV ────────────────────────────────────────── */
const hamburger   = document.getElementById('hamburger');
const mobileNav   = document.getElementById('mobile-nav');
hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  mobileNav.setAttribute('aria-hidden', !open);
  document.body.style.overflow = open ? 'hidden' : '';
});

/* ─── PAGE NAVIGATION ───────────────────────────────────── */
function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-'+page);
  if (target) { target.classList.add('active'); window.scrollTo(0, 0); }
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
    a.setAttribute('aria-current', a.dataset.page === page ? 'page' : 'false');
  });
  // Close mobile nav
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileNav.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  // Re-trigger reveals
  setTimeout(initReveal, 100);
  // Init page-specific content
  if (page === 'gallery') initGallery();
  if (page === 'reviews') { initReviews(); initRatingBars(); }
  if (page === 'locations') {} // map loads on demand
}

// Wire nav links
document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(a => {
  a.addEventListener('click', e => { e.preventDefault(); navigateTo(a.dataset.page); });
});
// Nav logo → home
document.querySelector('.nav-logo').addEventListener('click', e => { e.preventDefault(); navigateTo('home'); });

/* ─── PARTICLES ─────────────────────────────────────────── */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = -Math.random() * 0.5 - 0.1;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.life = 0; this.maxLife = Math.random() * 300 + 100;
  }
  update() {
    this.x += this.vx; this.y += this.vy; this.life++;
    if (this.life > this.maxLife) this.reset();
  }
  draw() {
    const t = this.life / this.maxLife;
    const a = this.alpha * (t < 0.1 ? t/0.1 : t > 0.8 ? (1-t)/0.2 : 1);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fillStyle = `rgba(201,169,110,${a})`;
    ctx.fill();
  }
}
for (let i=0; i<80; i++) particles.push(new Particle());
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ─── HERO VIDEO FALLBACK ───────────────────────────────── */
const heroVideo = document.getElementById('hero-video');
// Only show video if connection is likely fast
if (navigator.connection && navigator.connection.effectiveType && !['slow-2g','2g'].includes(navigator.connection.effectiveType)) {
  heroVideo.style.display = 'block';
} else if (!navigator.connection) {
  heroVideo.style.display = 'block'; // assume good if API not available
}

/* ─── REVEAL ON SCROLL ───────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}
initReveal();

/* ─── COUNTERS ───────────────────────────────────────────── */
function animateCounter(el, target, duration=2000) {
  let start = 0; const step = target / (duration/16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.round(start);
    if (start >= target) clearInterval(timer);
  }, 16);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = +e.target.dataset.target;
      animateCounter(e.target, target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(c => counterObs.observe(c));

/* ─── CAROUSEL ───────────────────────────────────────────── */
const track = document.getElementById('carousel-track');
let carouselIdx = 0;
function getCarouselVisible() { return window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3; }
function updateCarousel() {
  const slides = track.querySelectorAll('.carousel-slide');
  const vis = getCarouselVisible();
  const max = Math.max(0, slides.length - vis);
  carouselIdx = Math.min(carouselIdx, max);
  const w = slides[0].offsetWidth + 24;
  track.style.transform = `translateX(-${carouselIdx * w}px)`;
}
document.getElementById('carousel-prev').addEventListener('click', () => { carouselIdx = Math.max(0, carouselIdx-1); updateCarousel(); });
document.getElementById('carousel-next').addEventListener('click', () => {
  const vis = getCarouselVisible();
  const max = track.querySelectorAll('.carousel-slide').length - vis;
  carouselIdx = Math.min(max, carouselIdx+1); updateCarousel();
});
window.addEventListener('resize', updateCarousel);

/* ─── TESTIMONIALS SLIDER ───────────────────────────────── */
const tTrack = document.getElementById('testimonials-track');
const tDots  = document.querySelectorAll('.t-dot');
let tIdx = 0, tTimer;
function goToTestimonial(i) {
  tIdx = (i + tDots.length) % tDots.length;
  tTrack.style.transform = `translateX(-${tIdx * 100}%)`;
  tDots.forEach((d,j) => { d.classList.toggle('active', j===tIdx); d.setAttribute('aria-selected', j===tIdx); });
}
tDots.forEach((d,i) => d.addEventListener('click', () => { goToTestimonial(i); resetTTimer(); }));
function resetTTimer() { clearInterval(tTimer); tTimer = setInterval(() => goToTestimonial(tIdx+1), 5000); }
resetTTimer();

/* ─── GALLERY ────────────────────────────────────────────── */
let lightboxIdx = 0, filteredItems = [...galleryData];
function initGallery() {
  const grid = document.getElementById('masonry-grid');
  if (grid.children.length) return;
  galleryData.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'masonry-item';
    div.setAttribute('data-cat', item.cat);
    div.setAttribute('role', 'listitem');
    div.setAttribute('tabindex', '0');
    div.setAttribute('aria-label', item.title + ' — ' + item.desc);
    div.innerHTML = `
      <img src="${item.src}" alt="${item.title}" loading="lazy"/>
      <div class="masonry-overlay">
        <h4>${item.title}</h4><p>${item.desc}</p>
      </div>`;
    div.addEventListener('click', () => openLightbox(i));
    div.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') openLightbox(i); });
    grid.appendChild(div);
  });

  // filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
      btn.classList.add('active'); btn.setAttribute('aria-pressed','true');
      const f = btn.dataset.filter;
      filteredItems = f==='all' ? galleryData : galleryData.filter(d=>d.cat===f);
      document.querySelectorAll('.masonry-item').forEach(item => {
        const show = f==='all' || item.dataset.cat===f;
        item.classList.toggle('hidden', !show);
        item.style.transition = 'opacity 0.4s';
      });
    });
  });
}

function openLightbox(i) {
  lightboxIdx = i;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lb-img');
  const title = document.getElementById('lb-title');
  const desc  = document.getElementById('lb-desc');
  img.src = galleryData[i].src;
  img.alt = galleryData[i].title;
  title.textContent = galleryData[i].title;
  desc.textContent  = galleryData[i].desc;
  lb.classList.add('open');
  document.body.style.overflow='hidden';
}
document.getElementById('lb-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox').addEventListener('click', e => { if(e.target===e.currentTarget) closeLightbox(); });
document.getElementById('lb-prev').addEventListener('click', () => { openLightbox((lightboxIdx-1+galleryData.length)%galleryData.length); });
document.getElementById('lb-next').addEventListener('click', () => { openLightbox((lightboxIdx+1)%galleryData.length); });
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('open')) return;
  if (e.key==='Escape') closeLightbox();
  if (e.key==='ArrowLeft')  document.getElementById('lb-prev').click();
  if (e.key==='ArrowRight') document.getElementById('lb-next').click();
});
// Swipe support
let touchStartX=0;
document.getElementById('lightbox').addEventListener('touchstart', e => { touchStartX=e.changedTouches[0].clientX; }, {passive:true});
document.getElementById('lightbox').addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx)>50) { dx<0 ? document.getElementById('lb-next').click() : document.getElementById('lb-prev').click(); }
});

/* ─── REVIEWS ────────────────────────────────────────────── */
function initReviews() {
  const grid = document.getElementById('reviews-grid');
  if (grid.children.length) return;
  reviewsData.forEach(r => {
    const stars = '★'.repeat(r.stars) + '☆'.repeat(5-r.stars);
    const card = document.createElement('div');
    card.className = 'review-card reveal';
    card.innerHTML = `
      <div class="review-header">
        <img class="review-avatar" src="${r.img}" alt="${r.name}" loading="lazy"/>
        <div><div class="review-name">${r.name}</div><div class="review-date">${r.loc} · ${r.date}</div></div>
      </div>
      <div class="review-stars" aria-label="${r.stars} stars">${stars}</div>
      <p class="review-text">"${r.text}"</p>`;
    grid.appendChild(card);
  });
}
function initRatingBars() {
  document.querySelectorAll('.rating-bar-fill').forEach(bar => {
    setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 400);
  });
}

/* Star rating input */
let selectedStars = 0;
document.querySelectorAll('.star-btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    const s = +btn.dataset.star;
    document.querySelectorAll('.star-btn').forEach((b,i) => { b.textContent = i<s ? '★':'☆'; b.classList.toggle('filled',i<s); });
  });
  btn.addEventListener('mouseleave', () => {
    document.querySelectorAll('.star-btn').forEach((b,i) => { b.textContent = i<selectedStars?'★':'☆'; b.classList.toggle('filled',i<selectedStars); });
  });
  btn.addEventListener('click', () => { selectedStars = +btn.dataset.star; });
});

document.getElementById('review-form').addEventListener('submit', async e => {
  e.preventDefault();
  try {
    const res = await fetch(API + '/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: document.getElementById('rv-name').value,
        email: document.getElementById('rv-email').value,
        stars: selectedStars,
        comment: document.getElementById('rv-comment').value,
      }),
    });
    if (!res.ok) { alert((await res.json()).error); return; }
    document.getElementById('review-form').style.display = 'none';
    document.getElementById('review-success').classList.add('show');
  } catch (err) {
    alert('Could not reach the server. Is it running?');
  }
});

/* ─── BOOKING FLOW ──────────────────────────────────────── */
async function sendBooking() {
  const slot = document.querySelector('.slot-btn.selected');
  try {
    const res = await fetch(API + '/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: document.getElementById('bk-name').value,
        email: document.getElementById('bk-email').value,
        phone: document.getElementById('bk-phone').value,
        guests: document.getElementById('bk-guests').value,
        occasion: document.getElementById('bk-occasion').value,
        checkIn: document.getElementById('bk-checkin').value,
        checkOut: document.getElementById('bk-checkout').value,
        timeSlot: slot ? slot.textContent : '',
        requests: document.getElementById('bk-requests').value,
      }),
    });
    if (!res.ok) { alert((await res.json()).error); return false; }
    return true;
  } catch (err) {
    alert('Could not reach the server. Is it running?');
    return false;
  }
}
async function bookingNextStep(current) {
  if (current === 2) {
    const ok = await sendBooking();
    if (!ok) return;
  }
  document.getElementById('booking-step-'+current).style.display='none';
  if (current === 2) {
    // Show confirmation
    document.getElementById('booking-step-3').style.display='block';
    const name  = document.getElementById('bk-name').value  || 'Guest';
    const email = document.getElementById('bk-email').value || '—';
    const ci    = document.getElementById('bk-checkin').value || '—';
    const co    = document.getElementById('bk-checkout').value || '—';
    const guests= document.getElementById('bk-guests').value || '—';
    const occ   = document.getElementById('bk-occasion').value || 'Leisure Stay';
    document.getElementById('confirm-summary').innerHTML =
      `<b>Guest:</b> ${name}<br/><b>Email:</b> ${email}<br/><b>Check-in:</b> ${ci}<br/>` +
      `<b>Check-out:</b> ${co}<br/><b>Guests:</b> ${guests}<br/><b>Occasion:</b> ${occ}`;
    document.getElementById('booking-confirm').classList.add('show');
    document.querySelectorAll('.booking-step').forEach((s,i)=>s.classList.toggle('active',true));
  } else {
    document.getElementById('booking-step-'+(current+1)).style.display='block';
    document.querySelectorAll('.booking-step').forEach((s,i)=>s.classList.toggle('active',i<current));
  }
}
function bookingPrevStep(current) {
  document.getElementById('booking-step-'+current).style.display='none';
  document.getElementById('booking-step-'+(current-1)).style.display='block';
  document.querySelectorAll('.booking-step').forEach((s,i)=>s.classList.toggle('active',i<current-1));
}
function resetBooking() {
  document.getElementById('booking-confirm').classList.remove('show');
  document.getElementById('booking-step-3').style.display='none';
  document.getElementById('booking-step-1').style.display='block';
  document.getElementById('booking-form').reset();
  document.querySelectorAll('.booking-step').forEach((s,i)=>s.classList.toggle('active',i===0));
}
function selectSlot(btn) {
  document.querySelectorAll('.slot-btn').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
}

/* ─── CONTACT FORM ──────────────────────────────────────── */
document.getElementById('contact-form').addEventListener('submit', async e => {
  e.preventDefault();
  try {
    const res = await fetch(API + '/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: document.getElementById('ct-name').value,
        email: document.getElementById('ct-email').value,
        phone: document.getElementById('ct-phone').value,
        subject: document.getElementById('ct-subject').value,
        message: document.getElementById('ct-msg').value,
      }),
    });
    if (!res.ok) { alert((await res.json()).error); return; }
    document.getElementById('contact-form').style.display = 'none';
    document.getElementById('contact-success').classList.add('show');
  } catch (err) {
    alert('Could not reach the server. Is it running?');
  }
});

/* ─── MODAL ─────────────────────────────────────────────── */
function openModal() {
  const m = document.getElementById('booking-modal');
  m.classList.add('open');
  document.body.style.overflow='hidden';
  document.getElementById('m-name').focus();
}
function closeModal() {
  document.getElementById('booking-modal').classList.remove('open');
  document.body.style.overflow='';
}
document.getElementById('booking-modal').addEventListener('click', e => { if(e.target===e.currentTarget) closeModal(); });
document.getElementById('modal-form').addEventListener('submit', async e => {
  e.preventDefault();
  try {
    const res = await fetch(API + '/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: document.getElementById('m-name').value,
        email: document.getElementById('m-email').value,
        checkIn: document.getElementById('m-checkin').value,
        checkOut: document.getElementById('m-checkout').value,
        guests: document.getElementById('m-guests').value,
      }),
    });
    if (!res.ok) {
      const err = await res.json();
      alert(err.error);
      return;
    }
    document.getElementById('modal-form').style.display = 'none';
    document.getElementById('modal-success').classList.add('show');
  } catch (err) {
    alert('Could not reach the server. Is it running?');
  }
});
document.addEventListener('keydown', e => { if(e.key==='Escape') closeModal(); });

/* ─── NEWSLETTER ────────────────────────────────────────── */
async function subscribeNewsletter() {
  const input = document.getElementById('nl-email');
  if (!input.value || !input.value.includes('@')) { input.style.borderColor = '#e05050'; return; }
  try {
    const res = await fetch(API + '/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: input.value }),
    });
    if (!res.ok) { input.style.borderColor = '#e05050'; return; }
    input.style.borderColor = 'var(--gold)';
    document.querySelector('.newsletter-form').style.display = 'none';
    document.getElementById('nl-success').style.display = 'block';
  } catch (err) {
    alert('Could not reach the server. Is it running?');
  }
}
/* ─── YEAR ───────────────────────────────────────────────── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ─── PARALLAX ───────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && document.getElementById('page-home').classList.contains('active')) {
    const offset = window.scrollY * 0.3;
    heroContent.style.transform = `translateY(${offset}px)`;
  }
}, { passive: true });

/* ─── PREFER REDUCED MOTION ──────────────────────────────── */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('*').forEach(el => {
    el.style.animationDuration = '0.01ms';
    el.style.transitionDuration = '0.01ms';
  });
}