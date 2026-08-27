export function montar(raiz) {
    configurarRolagemSuave(raiz);
}

function configurarRolagemSuave(raiz) {
    raiz.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (evento) => {
            const alvo = raiz.querySelector(link.getAttribute("href"));
            if (!alvo) {
                return;
            }
            evento.preventDefault();
            alvo.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
}
