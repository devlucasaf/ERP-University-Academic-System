import { navegarPara } from "../../navegacao.js";

// --- MONTA A CENTRAL DE ACESSO AOS MÓDULOS DO ERP ---
export function montar(raiz) {
    const raizHtml           = document.documentElement;
    const botaoTema          = raiz.querySelector("#botaoTema");
    const pesquisaModulo     = raiz.querySelector("#pesquisaModulo");
    const cartoes            = Array.from(raiz.querySelectorAll(".cartao-modulo"));
    const botoesAcesso       = raiz.querySelectorAll(".botao-acesso");
    const contadorModulos    = raiz.querySelector("#contadorModulos");
    const mensagemVazia      = raiz.querySelector("#mensagemVazia");

    // --- NORMALIZA O TEXTO PARA PERMITIR PESQUISAS SEM DIFERENÇA ENTRE ACENTOS E LETRAS MAIÚSCULAS ---
    function normalizarTexto(texto) {
        return texto
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();
    }

    // --- ATUALIZA A QUANTIDADE DE MÓDULOS VISÍVEIS NA PÁGINA ---
    function atualizarContador(quantidade) {
        contadorModulos.textContent = quantidade === 1
                ? "1 módulo disponível"
                : `${quantidade} módulos disponíveis`;
    }

    // --- FILTRA OS MÓDULOS DE ACORDO COM O TERMO INFORMADO NA PESQUISA ---
    function filtrarModulos() {
        const termo = normalizarTexto(pesquisaModulo.value.trim());
        let quantidadeVisivel = 0;

        cartoes.forEach((cartao) => {
            const conteudo = normalizarTexto([
                cartao.dataset.nome,
                cartao.dataset.categoria,
                cartao.dataset.descricao
            ].join(" "));

            const deveExibir = conteudo.includes(termo);
            cartao.hidden = !deveExibir;

            if (deveExibir) {
                quantidadeVisivel++;
            }
        });

        mensagemVazia.hidden = quantidadeVisivel !== 0;
        atualizarContador(quantidadeVisivel);
    }

    // --- APLICA O TEMA ESCOLHIDO E ATUALIZA AS INFORMAÇÕES DE ACESSIBILIDADE DO BOTÃO ---
    function aplicarTema(tema) {
        raizHtml.dataset.tema = tema;
        localStorage.setItem("tema-central-erp", tema);

        const temaEscuroAtivo = tema === "escuro";
        botaoTema.setAttribute("aria-label", temaEscuroAtivo ? "Ativar tema claro" : "Ativar tema escuro");
        botaoTema.setAttribute("title", temaEscuroAtivo ? "Ativar tema claro" : "Ativar tema escuro");
    }

    // --- ALTERNA ENTRE OS TEMAS CLARO E ESCURO ---
    function alternarTema() {
        const temaAtual = raizHtml.dataset.tema === "escuro" ? "escuro" : "claro";
        aplicarTema(temaAtual === "escuro" ? "claro" : "escuro");
    }

    // --- REDIRECIONA O USUÁRIO PARA A ROTA CONFIGURADA NO BOTÃO DO MÓDULO ---
    function acessarModulo(evento) {
        const rota = evento.currentTarget.dataset.rota;

        if (rota) {
            navegarPara(rota);
        }
    }

    pesquisaModulo.addEventListener("input", filtrarModulos);
    botaoTema.addEventListener("click", alternarTema);
    botoesAcesso.forEach((botao) => botao.addEventListener("click", acessarModulo));

    const temaSalvo = localStorage.getItem("tema-central-erp");
    const prefereEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
    aplicarTema(temaSalvo || (prefereEscuro ? "escuro" : "claro"));
    atualizarContador(cartoes.length);
}

