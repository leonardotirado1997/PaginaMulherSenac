/**
 * Renderiza o grid de cards da seção Destaques (reutilizável em index.html e em outras páginas).
 * Depende de window.DESTAQUES_MULHERES (destaques-data.js).
 */
(function () {
  "use strict";

  /**
   * @param {string} containerId — id do elemento (ex.: "grid-destaques")
   * @param {string} [prefixoDetalhe] — prefixo opcional para detalhes.html (ex.: "../../" a partir da pasta trabalho)
   */
  function renderCardsDestaques(containerId, prefixoDetalhe) {
    const base = prefixoDetalhe || "";
    const gridDestaques = document.getElementById(containerId);
    const dadosDestaques = window.DESTAQUES_MULHERES;
    if (!gridDestaques || !Array.isArray(dadosDestaques)) return;

    dadosDestaques.forEach((m) => {
      const art = document.createElement("article");
      art.className = "card-destaque";

      const img = document.createElement("img");
      img.className = "card-destaque__imagem";
      img.src = base + m.imagem;
      img.alt = `Retrato de ${m.titulo}`;
      img.loading = "lazy";
      img.width = 400;
      img.height = 180;

      const h3 = document.createElement("h3");
      h3.className = "card-destaque__titulo";
      h3.textContent = m.titulo;

      const p = document.createElement("p");
      p.className = "card-destaque__descricao";
      p.textContent = m.resumo;

      const linkMais = document.createElement("a");
      linkMais.className = "btn-saiba-mais";
      linkMais.href = `${base}detalhes.html?id=${encodeURIComponent(m.id)}`;
      linkMais.textContent = "Saiba mais";

      art.append(img, h3, p, linkMais);
      gridDestaques.appendChild(art);
    });
  }

  window.renderCardsDestaques = renderCardsDestaques;
})();
