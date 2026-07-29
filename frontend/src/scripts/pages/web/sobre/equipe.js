import {
    configurarNavbarPagina,
    configurarBotoesInternos
} from "./_comum.js";

import EQUIPE from "../../../../data/equipe.json";

// --- RETORNA AS INICIAIS DE UM NOME ---
function obterIniciais(nome) {
    const partes = nome.trim().split(" ").filter(p => p.length > 0);
    if (partes.length === 0) {
        return "?";
    }

    if (partes.length === 1) {
        return partes[0][0].toUpperCase();
    }
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

// --- MONTA O HTML DE UM CARD DE PROFISSIONAL ---
function montarCard(pessoa) {
    return `
        <article class="site-equipe-card" data-categoria="${pessoa.categoria}">
            <div class="site-equipe-avatar" aria-hidden="true">
                ${obterIniciais(pessoa.nome)}
            </div>
            <div class="site-equipe-info">
                <h3>${pessoa.nome}</h3>
                <span>${pessoa.cargo}</span>
            </div>
        </article>
    `;
}

// --- RENDERIZA A LISTA DE ACORDO COM O FILTRO ATIVO ---
function renderizarLista(raiz, filtro) {
    const grid = raiz.querySelector("#equipeGrid");
    const vazio = raiz.querySelector("#equipeVazio");
    const contador = raiz.querySelector("#equipeContador");

    const lista = filtro === "todos"
        ? EQUIPE
        : EQUIPE.filter(p => p.categoria === filtro);

    grid.innerHTML = lista.map(montarCard).join("");
    vazio.hidden = lista.length > 0;

    const total = lista.length;
    contador.textContent = total === 1
        ? "1 profissional encontrado"
        : `${total} profissionais encontrados`;
}

// --- CONFIGURA OS BOTOES DE FILTRO ---
function configurarFiltros(raiz) {
    const botoes = raiz.querySelectorAll(".site-filtro-btn");

    botoes.forEach((botao) => {
        botao.addEventListener("click", () => {
            botoes.forEach((b) => {
                b.classList.remove("ativo");
                b.setAttribute("aria-selected", "false");
            });
            botao.classList.add("ativo");
            botao.setAttribute("aria-selected", "true");

            renderizarLista(raiz, botao.dataset.filtro);
        });
    });
}

// --- MONTA A PAGINA "NOSSA EQUIPE" ---
export function montar(raiz) {
    configurarNavbarPagina(raiz);
    configurarBotoesInternos(raiz);
    configurarFiltros(raiz);
    renderizarLista(raiz, "todos");
}

