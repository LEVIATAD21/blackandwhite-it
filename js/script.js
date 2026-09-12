/* ============================================
   BLACK & WHITE IT — Script
   ============================================ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Ano dinâmico no footer ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Menu hamburger ---------- */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });
    }

    /* ---------- Smooth scroll + fechar menu ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (navMenu && navMenu.classList.contains('active')) {
              navMenu.classList.remove('active');
              hamburger.classList.remove('active');
              hamburger.setAttribute('aria-expanded', 'false');
              document.body.style.overflow = '';
            }
          }
        }
      });
    });

    /* ---------- Header com sombra ao rolar ---------- */
    const header = document.getElementById('header');
    if (header) {
      const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* ---------- Formulário -> WhatsApp ---------- */
    const form = document.getElementById('contactForm');
    if (form) {
      const formTimestamp = Date.now();

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const honeypot = form.website.value;
        if (honeypot) return;

        const elapsed = Date.now() - formTimestamp;
        if (elapsed < 3000) {
          const errorEl = form.querySelector('.form-error');
          if (errorEl) {
            errorEl.textContent = 'Por favor, aguarde alguns segundos antes de enviar.';
            errorEl.classList.add('visible');
          }
          return;
        }

        const nome = form.nome.value.trim();
        const contato = form.contato.value.trim();
        const plano = form.plano.value;
        const tipo = form.tipo.value;
        const mensagem = form.mensagem.value.trim();
        const errorEl = form.querySelector('.form-error');

        const hasInvalidChars = /[^\p{L}\p{N}\s@.,\-()!?áàãâéêíóôõúüçñÁÀÃÂÉÊÍÓÔÕÚÜÇÑ:;/''"°§\\&*#%+={}\[\]<>|\\^~`]/u.test(nome + contato + mensagem);

        if (nome.length < 2 || contato.length < 5 || mensagem.length < 10 || hasInvalidChars) {
          if (errorEl) {
            errorEl.textContent = 'Preencha os campos obrigatórios corretamente. Nome (mín. 2), contato (mín. 5) e mensagem (mín. 10 caracteres). Use apenas caracteres normais.';
            errorEl.classList.add('visible');
          }
          return;
        }

        if (errorEl) {
          errorEl.classList.remove('visible');
        }

        const texto =
          'Ol\u00E1! Vim pelo site da Black & White IT e quero alugar.\n\n' +
          '*Nome:* ' + nome + '\n' +
          '*Contato:* ' + contato + '\n' +
          '*Plano:* ' + plano + '\n' +
          '*Tipo de projeto:* ' + tipo + '\n\n' +
          '*Descri\u00E7\u00E3o:*\n' + mensagem;

        const url = 'https://wa.me/5521995078663?text=' + encodeURIComponent(texto);
        window.open(url, '_blank', 'noopener');
      });
    }

    /* ---------- Reveal on scroll ---------- */
    const revealTargets = document.querySelectorAll(
      '.section-head, .compare-card, .plan-card, .service-card, .portfolio-card, .process-list li, .about-text, .about-card, .faq-list details, .contact-info, .contact-form, .cta-final'
    );
    revealTargets.forEach(el => el.classList.add('reveal'));

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealTargets.forEach(el => io.observe(el));
    } else {
      revealTargets.forEach(el => el.classList.add('visible'));
    }

  });
})();
