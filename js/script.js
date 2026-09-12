/* ============================================
   BLACK & WHITE IT — Script
   ============================================ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Ano dinâmico no footer ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Marcar body como carregado ---------- */
    document.body.classList.remove('is-loading');

    /* ---------- Menu hamburger ---------- */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
        if (isOpen) {
          const firstLink = navMenu.querySelector('a');
          if (firstLink) firstLink.focus({ preventScroll: true });
        }
      });
    }

    /* ---------- Smooth scroll + fechar menu ---------- */
    const SAFE_HASHES = /^#[a-zA-Z][a-zA-Z0-9_-]*$/;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.length > 1 && SAFE_HASHES.test(href)) {
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
      const onScrollDebounced = () => header.classList.toggle('scrolled', window.scrollY > 30);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* ---------- Formulário -> WhatsApp ---------- */
    const form = document.getElementById('contactForm');
    if (form) {
      const formTimestamp = Date.now();

      /* Honeypot multi-campo: dois campos invisíveis que bots automáticos preenchem */
      function isHoneypotTriggered() {
        if (form.website && form.website.value) return true;
        if (form.company && form.company.value) return true;
        return false;
      }

      function stripDangerousUnicode(str) {
        return str
          .replace(/[\u200B-\u200F\u2028-\u202F\u2060-\u2069\uFEFF]/g, '')
          .replace(/[\u0400-\u04FF]/g, function (c) {
            const map = { '\u0430': 'a', '\u0431': 'b', '\u0432': 'v', '\u0433': 'g', '\u0434': 'd', '\u0435': 'e', '\u0451': 'yo', '\u0436': 'zh', '\u0437': 'z', '\u0438': 'i', '\u0439': 'j', '\u043A': 'k', '\u043B': 'l', '\u043C': 'm', '\u043D': 'n', '\u043E': 'o', '\u043F': 'p', '\u0440': 'r', '\u0441': 's', '\u0442': 't', '\u0443': 'u', '\u0444': 'f', '\u0445': 'kh', '\u0446': 'ts', '\u0447': 'ch', '\u0448': 'sh', '\u0449': 'shch', '\u044A': '', '\u044B': 'y', '\u044C': '', '\u044D': 'e', '\u044E': 'yu', '\u044F': 'ya' };
            return map[c] || c;
          });
      }

      function sanitizeFieldName(value) {
        return value
          .replace(/[<>"'{}|\\^~\[\];:\/]/g, '')
          .replace(/[\u200F\u202B\u202E]/g, '')
          .replace(/\s+/g, ' ')
          .trim();
      }

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (isHoneypotTriggered()) return;

        const elapsed = Date.now() - formTimestamp;
        if (elapsed < 5000) {
          const errorEl = form.querySelector('.form-error');
          if (errorEl) {
            errorEl.textContent = 'Por favor, aguarde alguns segundos antes de enviar.';
            errorEl.classList.add('visible');
          }
          return;
        }

        const rawNome = form.nome.value.trim();
        const rawContato = form.contato.value.trim();
        const rawMensagem = form.mensagem.value.trim();
        const plano = sanitizeFieldName(form.plano.value);
        const tipo = sanitizeFieldName(form.tipo.value);

        if (!rawNome || !rawContato || !rawMensagem) {
          const errorEl = form.querySelector('.form-error');
          if (errorEl) {
            errorEl.textContent = 'Preencha todos os campos obrigatórios.';
            errorEl.classList.add('visible');
          }
          return;
        }

        const nome = stripDangerousUnicode(rawNome);
        const contato = stripDangerousUnicode(rawContato);
        const mensagem = stripDangerousUnicode(rawMensagem);

        const SAFE_TEXT = /^[\p{L}\p{N}\s@.,\-()!?áàãâéêíóôõúüçñ:;/'\\&*#%+={}]+$/u;

        if (nome.length < 2 || nome.length > 100) {
          const errorEl = form.querySelector('.form-error');
          if (errorEl) {
            errorEl.textContent = 'Nome deve ter entre 2 e 100 caracteres.';
            errorEl.classList.add('visible');
          }
          return;
        }

        if (contato.length < 5 || contato.length > 120) {
          const errorEl = form.querySelector('.form-error');
          if (errorEl) {
            errorEl.textContent = 'Contato deve ter entre 5 e 120 caracteres.';
            errorEl.classList.add('visible');
          }
          return;
        }

        if (mensagem.length < 10 || mensagem.length > 1000) {
          const errorEl = form.querySelector('.form-error');
          if (errorEl) {
            errorEl.textContent = 'Mensagem deve ter entre 10 e 1000 caracteres.';
            errorEl.classList.add('visible');
          }
          return;
        }

        if (!SAFE_TEXT.test(nome) || !SAFE_TEXT.test(contato) || !SAFE_TEXT.test(mensagem)) {
          const errorEl = form.querySelector('.form-error');
          if (errorEl) {
            errorEl.textContent = 'Use apenas caracteres normais, sem símbolos especiais perigosos.';
            errorEl.classList.add('visible');
          }
          return;
        }

        const errorEl = form.querySelector('.form-error');
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
        window.open(url, '_blank', 'noopener,noreferrer');
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
