const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    if (entry.target.classList.contains('metrics')) animateCounters(entry.target);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

function animateCounters(scope) {
  scope.querySelectorAll('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    let value = 0;
    const timer = setInterval(() => {
      value += 1;
      el.textContent = value;
      if (value >= target) clearInterval(timer);
    }, 130);
  });
}

document.querySelectorAll('.magnetic').forEach((el) => {
  el.addEventListener('pointermove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * .16;
    const y = (e.clientY - rect.top - rect.height / 2) * .16;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });
  el.addEventListener('pointerleave', () => { el.style.transform = ''; });
});

document.querySelectorAll('.tilt-card').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const rx = ((e.clientY - rect.top) / rect.height - .5) * -4;
    const ry = ((e.clientX - rect.left) / rect.width - .5) * 4;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('pointerleave', () => { card.style.transform = ''; });
});

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelectorAll('.orbit').forEach((orb, i) => {
    orb.style.translate = `0 ${y * (i ? .08 : -.06)}px`;
  });
  document.querySelectorAll('.float-shot').forEach((shot, i) => {
    shot.style.marginTop = `${Math.sin(y / 260 + i) * 12}px`;
  });
}, { passive: true });
