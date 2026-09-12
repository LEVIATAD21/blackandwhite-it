/* BLACK & WHITE IT — JavaScript v4 */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    document.body.classList.remove('is-loading');

    const header = document.getElementById('header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const closeMenu = () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
          closeMenu();
          hamburger.focus();
        }
      });
    }
    navLinks.forEach((l) => l.addEventListener('click', closeMenu));

    if (header) {
      let ticking = false;
      const onScroll = () => {
          window.requestAnimationFrame(() => {
            header.classList.toggle('scrolled', window.scrollY > 30);
            ticking = false;
          });
          ticking = true;
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    const backTop = document.createElement('button');
    backTop.type = 'button';
    backTop.className = 'back-top';
    backTop.setAttribute('aria-label', 'Voltar ao topo');
    backTop.innerHTML = '\u2191';
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.body.appendChild(backTop);
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      const honeypot = contactForm.querySelector('input[name="website"]');
      const formTs = document.getElementById('formTs');
      if (formTs) formTs.value = String(Date.now());

      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (honeypot && honeypot.value.trim() !== '') return;
        if (formTs && Date.now() - Number(formTs.value) < 3000) return;

        const nameInput = document.getElementById('name');
        const contactInput = document.getElementById('contact');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('nameError');
        const contactError = document.getElementById('contactError');
        const messageError = document.getElementById('messageError');

        [nameError, contactError, messageError].forEach((el) => {
          if (el) el.classList.remove('visible');
        });

        const name = nameInput ? nameInput.value.trim() : '';
        const contact = contactInput ? contactInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';
        let valid = true;

        if (name.length < 2) { if (nameError) nameError.classList.add('visible'); valid = false; }
        if (contact.length < 5) { if (contactError) contactError.classList.add('visible'); valid = false; }
        if (message.length < 10) { if (messageError) messageError.classList.add('visible'); valid = false; }

        const texto = encodeURIComponent(
          '*Novo contato pelo site*\n\n*Nome:* ' + name +
          '\n*Contato:* ' + contact +
          '\n*Mensagem:*\n' + message
        );
        window.open('https://wa.me/5521995078663?text=' + texto, '_blank', 'noopener,noreferrer');

        const ok = document.createElement('p');
        ok.className = 'form-success';
        ok.setAttribute('role', 'status');
        ok.textContent = 'Mensagem enviada. O WhatsApp abriu em nova aba.';
        contactForm.appendChild(ok);
        setTimeout(() => ok.remove(), 6000);
        contactForm.reset();
        if (formTs) formTs.value = String(Date.now());
      });
    }

    const selectors = ['.section-head','.compare-card','.plan-card','.service-card','.portfolio-card','.process-list li','.about-text','.about-card','.faq-list details','.contact-info','.contact-form','.cta-final','.market-compare'].join(',');
    const targets = document.querySelectorAll(selectors);
    targets.forEach((el) => el.classList.add('reveal'));
    if ('IntersectionObserver' in window && targets.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      targets.forEach((el) => io.observe(el));
    } else {
      targets.forEach((el) => el.classList.add('visible'));
    }
  });
})();
