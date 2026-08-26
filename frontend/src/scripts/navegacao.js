export const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");

// --- CONVERTE UM CAMINHO INTERNO PARA A URL COMPLETA DO SITE ---
export function caminhoParaUrl(caminho) {
    const interno = caminho.startsWith("#") ? caminho.slice(1) : caminho;
    const normalizado = interno.startsWith("/") ? interno : `/${interno}`;
    return `${BASE_URL}${normalizado}`;
}

// --- RETORNA A ROTA INTERNA ATUAL, SEM O PREFIXO DA BASE ---
export function caminhoAtual() {
    const { pathname } = window.location;
    if (BASE_URL && pathname.startsWith(BASE_URL)) {
        const resto = pathname.slice(BASE_URL.length);
        return resto === "" ? "/" : resto;
    }
    return pathname || "/";
}

// --- NAVEGA PARA UMA ROTA INTERNA SEM RECARREGAR A PAGINA ---
export function navegarPara(caminho, { substituir = false } = {}) {
    const url = caminhoParaUrl(caminho);

    if (substituir) {
        history.replaceState(null, "", url);
    } else {
        history.pushState(null, "", url);
    }

    window.dispatchEvent(new PopStateEvent("popstate"));
}

// --- REESCREVE O QUE AINDA CONSTA NO FORMATO ANTIGO ---
export function reescreverLinksInternos(container) {
    container.querySelectorAll('a[href^="#/"]').forEach((link) => {
        link.setAttribute("href", caminhoParaUrl(link.getAttribute("href")));
    });

    container.querySelectorAll('[data-rota^="#/"]').forEach((elemento) => {
        elemento.setAttribute("data-rota", elemento.getAttribute("data-rota").slice(1));
    });

    container.querySelectorAll('[data-ir^="#/"]').forEach((elemento) => {
        elemento.setAttribute("data-ir", elemento.getAttribute("data-ir").slice(1));
    });
}

// --- INTERCEPTA GLOBALMENTE OS CLIQUES EM LINKS INTERNOS ---
export function ativarInterceptacaoGlobal() {
    document.addEventListener("click", (evento) => {
        const link = evento.target.closest("a");

        if (!link || link.target === "_blank" || evento.defaultPrevented) {
            return;
        }

        if (evento.button !== 0 || evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) {
            return;
        }

        let url;
        try {
            url = new URL(link.href, window.location.origin);
        } catch {
            return;
        }

        if (url.origin !== window.location.origin) {
            return;
        }

        if (BASE_URL && !url.pathname.startsWith(BASE_URL)) {
            return;
        }

        evento.preventDefault();
        navegarPara(url.pathname);
    });
}
