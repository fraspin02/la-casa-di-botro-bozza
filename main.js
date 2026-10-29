document.documentElement.classList.remove('no-js');

// Menu mobile
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', e => {
    if (e.target.closest('a')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); }
  });
}

// Comparsa leggera allo scorrimento
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  items.forEach(el => io.observe(el));
} else {
  items.forEach(el => el.classList.add('in'));
}

// Modulo di richiesta: nella bozza non invia nulla
document.querySelectorAll('form[data-demo]').forEach(form => {
  const arrivo = form.querySelector('[name="arrivo"]');
  const partenza = form.querySelector('[name="partenza"]');
  if (arrivo && partenza) {
    const oggi = new Date().toISOString().slice(0, 10);
    arrivo.min = oggi;
    partenza.min = oggi;
    arrivo.addEventListener('change', () => { partenza.min = arrivo.value || oggi; });
  }
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const ok = form.querySelector('.form-ok');
    ok.classList.add('show');
    ok.focus();
  });
});

const y = document.getElementById('anno');
if (y) y.textContent = new Date().getFullYear();
