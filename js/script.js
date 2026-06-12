/* ============================================
   BLACK & WHITE IT — v3 Script
   Modelo de aluguel
   ============================================ */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        console.log('%cBlack & White IT', 'color:#fff;background:#000;padding:6px 12px;font-weight:700;font-size:14px;border-radius:4px;');
        console.log('%cAluguel de sites · Tudo incluso ✔', 'color:#25d366;font-size:12px;');

        /* ---------- Year ---------- */
        const yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();

        /* ---------- Hamburger ---------- */
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

        /* ---------- Smooth scroll + close menu ---------- */
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

        /* ---------- Sticky header shadow ---------- */
        const header = document.getElementById('header');
        if (header) {
            const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
        }

        /* ---------- Form -> WhatsApp ---------- */
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const nome = form.nome.value.trim();
                const contato = form.contato.value.trim();
                const plano = form.plano.value;
                const tipo = form.tipo.value;
                const mensagem = form.mensagem.value.trim();

                if (nome.length < 2 || contato.length < 5 || mensagem.length < 10) {
                    alert('Por favor, preencha os campos obrigatórios corretamente.');
                    return;
                }

                const texto =
                    `Olá! Vim pelo site da Black & White IT e quero alugar.\n\n` +
                    `*Nome:* ${nome}\n` +
                    `*Contato:* ${contato}\n` +
                    `*Plano:* ${plano}\n` +
                    `*Tipo de projeto:* ${tipo}\n\n` +
                    `*Descrição:*\n${mensagem}`;

                const url = `https://wa.me/5521995078663?text=${encodeURIComponent(texto)}`;
                window.open(url, '_blank', 'noopener');
            });
        }

        /* ---------- Reveal on scroll ---------- */
        const revealTargets = document.querySelectorAll(
            '.section-head, .compare-card, .plan-card, .service-card, .portfolio-card, .testimonial, .process-list li, .about-text, .about-card, .faq-list details, .contact-info, .contact-form, .cta-final'
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
