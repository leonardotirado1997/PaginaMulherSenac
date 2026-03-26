/**
 * Mês das Mulheres — script principal
 * Responsável por: menu mobile, animações AOS, renderização dos cards de destaque,
 * expansão dos tipos de violência, efeito tilt na história (desktop),
 * e atalhos tel: para 180/190.
 */

(function () {
  "use strict";

  const tiposViolencia = [
    {
      titulo: "Física",
      texto:
        "Agressões como tapas, socos, empurrões ou qualquer ação que machuque o corpo.",
    },
    {
      titulo: "Psicológica",
      texto: "Humilhações, ameaças, manipulação emocional e controle mental.",
    },
    {
      titulo: "Moral",
      texto: "Ofensas, xingamentos, difamação e exposição da vítima.",
    },
    {
      titulo: "Sexual",
      texto: "Qualquer ato sem consentimento, inclusive dentro de relacionamento.",
    },
    {
      titulo: "Patrimonial",
      texto:
        "Controle de dinheiro, destruição de bens ou impedir independência financeira.",
    },
  ];

  // ---------- Inicialização AOS (scroll reveal) ----------
  if (typeof AOS !== "undefined") {
    const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    AOS.init({
      duration: reduzirMovimento ? 0 : 900,
      once: true,
      offset: 40,
      disable: reduzirMovimento,
    });
  }

  // ---------- Ano no rodapé ----------
  const anoEl = document.getElementById("year");
  if (anoEl) {
    anoEl.textContent = String(new Date().getFullYear());
  }

  // ---------- Menu mobile ----------
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  function fecharMenu() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const aberto = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", aberto ? "true" : "false");
    });

    navLinks.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 900px)").matches) {
          fecharMenu();
        }
      });
    });
  }

  // ---------- Destaques: ver js/destaques-ui.js + destaques-data.js ----------
  if (typeof window.renderCardsDestaques === "function") {
    window.renderCardsDestaques("grid-destaques");
  }

  // ---------- Seção violência: grid + tel ----------
  const violenciaGrid = document.getElementById("violencia-grid");
  if (violenciaGrid) {
    tiposViolencia.forEach((item) => {
      const div = document.createElement("div");
      div.className = "violencia-card";
      div.setAttribute("role", "button");
      div.setAttribute("tabindex", "0");
      div.setAttribute("aria-expanded", "false");

      const titulo = document.createElement("strong");
      titulo.textContent = item.titulo;
      const desc = document.createElement("div");
      desc.className = "descricao";
      desc.textContent = item.texto;
      div.append(titulo, desc);

      function alternar() {
        const aberto = div.classList.toggle("is-open");
        div.setAttribute("aria-expanded", aberto ? "true" : "false");
      }

      div.addEventListener("click", alternar);
      div.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          alternar();
        }
      });

      violenciaGrid.appendChild(div);
    });
  }

  document.querySelectorAll("[data-tel]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const num = btn.getAttribute("data-tel");
      window.location.href = `tel:${num}`;
    });
  });

  // ---------- Cartão história: efeito tilt (apenas ponteiro fino — evita em touch) ----------
  const historiaCard = document.getElementById("historia-card");
  const prefersCoarse = window.matchMedia("(pointer: coarse)").matches;

  if (historiaCard && !prefersCoarse) {
    historiaCard.addEventListener("mousemove", (e) => {
      const rect = historiaCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = (y - cy) / 25;
      const rotateY = (cx - x) / 25;
      historiaCard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      historiaCard.style.boxShadow = "0 20px 40px rgba(0,0,0,0.18)";
    });

    historiaCard.addEventListener("mouseleave", () => {
      historiaCard.style.transform = "";
      historiaCard.style.boxShadow = "";
    });
  }
})();
