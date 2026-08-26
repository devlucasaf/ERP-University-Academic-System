// --- MONTA A PÁGINA DO CURSO DE CIÊNCIA DA COMPUTAÇÃO ---
export function montar(raiz) {
    configurarAcordeaoMatriz(raiz);
    configurarRolagemSuave(raiz);
}

// --- ABRE/FECHA CADA SEMESTRE DA MATRIZ CURRICULAR ---
function configurarAcordeaoMatriz(raiz) {
    const semestres = raiz.querySelectorAll(".cc-semester");

    semestres.forEach((semestre) => {
        const botao = semestre.querySelector("button");
        const seta = botao?.querySelector("span:last-child");

        botao?.addEventListener("click", () => {
            const abrindo = !semestre.classList.contains("aberto");

            semestre.classList.toggle("aberto", abrindo);
            botao.setAttribute("aria-expanded", String(abrindo));

            if (seta) {
                seta.textContent = abrindo ? "⌃" : "⌄";
            }
        });
    });
}

// --- ROLAGEM SUAVE PARA AS SEÇÕES INTERNAS DA PÁGINA ---
function configurarRolagemSuave(raiz) {
    raiz.querySelectorAll('a[href^="#cc-"]').forEach((link) => {
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

