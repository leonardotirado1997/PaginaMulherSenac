/**
 * Página detalhes.html: lê o parâmetro ?id=, busca o registro em DESTAQUES_MULHERES
 * e monta título, imagem ampliada e parágrafos. Sem duplicar dados — usa destaques-data.js.
 */
(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const elErro = document.getElementById("detalhe-erro");
  const elArtigo = document.getElementById("detalhe-artigo");
  const elImg = document.getElementById("detalhe-imagem");
  const elTitulo = document.getElementById("detalhe-titulo");
  const elTextos = document.getElementById("detalhe-textos");
  const elAno = document.getElementById("year-detalhe");

  if (elAno) {
    elAno.textContent = String(new Date().getFullYear());
  }

  const lista = window.DESTAQUES_MULHERES || [];
  const item = id ? lista.find((d) => d.id === id) : null;

  if (!item) {
    document.title = "Destaque não encontrado | Mês das Mulheres";
    if (elErro) elErro.hidden = false;
    return;
  }

  document.title = `${item.titulo} | Mês das Mulheres`;

  if (elImg) {
    elImg.src = item.imagem;
    elImg.alt = `Retrato de ${item.titulo}`;
    elImg.loading = "eager";
  }

  if (elTitulo) {
    elTitulo.textContent = item.titulo;
  }

  if (elTextos) {
    elTextos.replaceChildren();
    item.textoCompleto.forEach((paragrafo) => {
      const p = document.createElement("p");
      p.className = "detalhe-paragrafo";
      p.textContent = paragrafo;
      elTextos.appendChild(p);
    });
  }

  if (elArtigo) elArtigo.hidden = false;
})();
