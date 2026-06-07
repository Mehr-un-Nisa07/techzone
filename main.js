// ── SCROLL FADE IN ──────────────────────────────────────────
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.08 });
document.querySelectorAll('.fade').forEach(el => obs.observe(el));

// ── MOBILE NAV ───────────────────────────────────────────────
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => links.classList.remove('open'))
  );
}

// ── NAVBAR SHADOW ON SCROLL ───────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () =>
    navbar.style.boxShadow = window.scrollY > 20 ? '0 4px 24px rgba(0,0,0,0.5)' : 'none'
  );
}

// ── CART SYSTEM ──────────────────────────────────────────────
function getCart() {
  return JSON.parse(localStorage.getItem('tz_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('tz_cart', JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = total);
}

function addToCart(name, price) {
  let cart = getCart();
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  saveCart(cart);
  updateCartCount();
  showToast();
}

function showToast() {
  const toast = document.getElementById('cartToast');
  if (!toast) return;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// Init cart count on page load
updateCartCount();

// ── COUNTDOWN TIMER ──────────────────────────────────────────
function startCountdown() {
  const hrsEl  = document.getElementById('hrs');
  const minsEl = document.getElementById('mins');
  const secsEl = document.getElementById('secs');
  if (!hrsEl) return;

  // Store end time in sessionStorage so it persists on refresh
  let endTime = sessionStorage.getItem('tz_countdown_end');
  if (!endTime) {
    endTime = Date.now() + (8 * 3600 + 45 * 60 + 30) * 1000;
    sessionStorage.setItem('tz_countdown_end', endTime);
  }

  function tick() {
    const diff = Math.max(0, endTime - Date.now());
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    hrsEl.textContent  = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
    if (diff > 0) setTimeout(tick, 1000);
  }
  tick();
}
startCountdown();

// ── NEWSLETTER ────────────────────────────────────────────────
function subscribeNewsletter() {
  const email = document.getElementById('nlEmail');
  if (!email) return;
  if (!email.value.trim() || !email.value.includes('@')) {
    alert('Please enter a valid email address.');
    return;
  }
  email.value = '';
  email.placeholder = '✅ Subscribed! Thank you.';
  setTimeout(() => { email.placeholder = 'Enter your email address...'; }, 3000);
}

// ── FAQ ACCORDION ─────────────────────────────────────────────
// (called inline from contact.html)
