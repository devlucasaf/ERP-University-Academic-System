import {
    configurarNavbarPagina,
    configurarBotoesInternos
} from "./_comum.js";

// --- BASE DE DADOS DA EQUIPE (nomes ficticios) ---
const EQUIPE = [
    // --- DIRECAO ---
    { nome: "Ricardo Almeida Ferreira",       cargo: "Diretor Geral",              categoria: "direcao" },
    { nome: "Beatriz Rocha Nogueira",         cargo: "Vice-Diretora Pedagógica",   categoria: "direcao" },
    { nome: "Marcos Vinícius Camargo",        cargo: "Vice-Diretor Administrativo", categoria: "direcao" },

    // --- COORDENACAO ---
    { nome: "Helena Prado Vasconcelos",       cargo: "Coordenadora da Educação Infantil", categoria: "coordenacao" },
    { nome: "Fernando Torres Machado",        cargo: "Coordenador do Fundamental I",      categoria: "coordenacao" },
    { nome: "Patrícia Cordeiro Lima",         cargo: "Coordenadora do Fundamental II",    categoria: "coordenacao" },
    { nome: "Rogério Bastos Cavalcante",      cargo: "Coordenador do Ensino Médio",       categoria: "coordenacao" },
    { nome: "Luciana Miranda Sousa",          cargo: "Coordenadora de Projetos",          categoria: "coordenacao" },

    // --- PROFESSORES ---
    { nome: "Amanda Ribeiro Teixeira",        cargo: "Professora de Matemática",          categoria: "professor" },
    { nome: "Bruno Sales Fontenele",          cargo: "Professor de Física",               categoria: "professor" },
    { nome: "Carla Mendonça Duarte",          cargo: "Professora de Português",           categoria: "professor" },
    { nome: "Diego Aragão Peixoto",           cargo: "Professor de História",             categoria: "professor" },
    { nome: "Elaine Bittencourt Faria",       cargo: "Professora de Geografia",           categoria: "professor" },
    { nome: "Felipe Nascimento Cordeiro",     cargo: "Professor de Química",              categoria: "professor" },
    { nome: "Gabriela Antunes Vieira",        cargo: "Professora de Biologia",            categoria: "professor" },
    { nome: "Henrique Damasceno Ramos",       cargo: "Professor de Educação Física",      categoria: "professor" },
    { nome: "Isabela Furtado Coelho",         cargo: "Professora de Artes",               categoria: "professor" },
    { nome: "João Paulo Marques Silveira",    cargo: "Professor de Inglês",               categoria: "professor" },
    { nome: "Karina Vasques Pontes",          cargo: "Professora de Espanhol",            categoria: "professor" },
    { nome: "Leandro Bezerra Amaral",         cargo: "Professor de Filosofia",            categoria: "professor" },
    { nome: "Mariana Queiroga Andrade",       cargo: "Professora de Sociologia",          categoria: "professor" },
    { nome: "Nicolas Fialho Barreto",         cargo: "Professor de Robótica",             categoria: "professor" },
    { nome: "Olívia Guimarães Barros",        cargo: "Professora da Educação Infantil",   categoria: "professor" },
    { nome: "Paulo Sérgio Cavalheiro",        cargo: "Professor de Música",               categoria: "professor" },
    { nome: "Renata Sampaio Oliveira",        cargo: "Professora do Fundamental I",       categoria: "professor" },

    // --- APOIO / LIMPEZA / MANUTENCAO ---
    { nome: "Antônia Pereira dos Santos",     cargo: "Auxiliar de Serviços Gerais",       categoria: "apoio" },
    { nome: "Cícero Batista Alves",           cargo: "Auxiliar de Manutenção",            categoria: "apoio" },
    { nome: "Dalva Rodrigues da Costa",       cargo: "Auxiliar de Limpeza",               categoria: "apoio" },
    { nome: "Edson Farias Nogueira",          cargo: "Porteiro",                          categoria: "apoio" },
    { nome: "Francisca Xavier de Melo",       cargo: "Auxiliar de Cozinha",               categoria: "apoio" },
    { nome: "Geraldo Mota Ferreira",          cargo: "Jardineiro",                        categoria: "apoio" },
    { nome: "Iracema Nunes Ribeiro",          cargo: "Auxiliar de Limpeza",               categoria: "apoio" },
    { nome: "José Bernardo Cavalcanti",       cargo: "Vigilante Diurno",                  categoria: "apoio" }
];

// --- RETORNA AS INICIAIS DE UM NOME (PARA O AVATAR) ---
function obterIniciais(nome) {
    const partes = nome.trim().split(" ").filter(p => p.length > 0);
    if (partes.length === 0) return "?";
    if (partes.length === 1) return partes[0][0].toUpperCase();
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

