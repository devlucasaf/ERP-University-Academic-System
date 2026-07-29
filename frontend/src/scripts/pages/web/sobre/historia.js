// --- COMPARTILHA A NAVBAR E O TEMA DA HOME ---
import {
    configurarNavbarPagina,
    configurarBotoesInternos
} from "./_comum.js";

// --- MONTA A PAGINA "NOSSA HISTORIA" ---
export function montar(raiz) {
    configurarNavbarPagina(raiz);
    configurarBotoesInternos(raiz);
}

