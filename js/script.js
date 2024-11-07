let statusLogin = false;

// Detecta o tema do sistema (escuro ou claro)
function detectarTema() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Atualiza o favicon com base no tema
function atualizarFavicon(tema) {
    const favicon = document.getElementById('favicon');
    favicon.href = tema === 'dark' ? './img/Logo-Branca-Mini.svg' : './img/Logo-Preta.svg';
}

// Inicializa o favicon com base no tema atual
atualizarFavicon(detectarTema());

// Detecta mudanças no tema do sistema e atualiza o favicon
const mediaQueryTema = window.matchMedia('(prefers-color-scheme: dark)');
mediaQueryTema.addEventListener('change', (evento) => atualizarFavicon(evento.matches ? 'dark' : 'light'));

// Evento de clique no botão de conta
const btnConta = document.querySelector("#btnConta");
btnConta.addEventListener("click", exibirMenu);
const menu = document.querySelector(".menu");
const popupAviso = document.getElementById("myPopup");
const menuDropdown = document.querySelector(".backdown-menu");

// Evento de acesso à Watchlist
menu.children[1].addEventListener("click", (evento) => {
    if (statusLogin) {
        evento.target.setAttribute("href", "visualizacaoListas.php");
    } else {
        evento.preventDefault();
        exibirAviso();
        evento.target.setAttribute("href", "");
    }
});

// Exibe ou oculta o menu de conta
function exibirMenu() {
    menuDropdown.classList.toggle("backdown-show");
    if (popupAviso.classList.contains("show")) {
        popupAviso.classList.remove("show");
    }
}

// Exibe ou oculta o aviso de login na Watchlist
function exibirAviso() {
    popupAviso.classList.toggle("show");
    if (menuDropdown.classList.contains("backdown-show")) {
        menuDropdown.classList.remove("backdown-show");
    }
}

// Atualiza a interface para usuário logado
function usuarioLogado() {
    statusLogin = true;
    atualizarItensMenu();
    menuDropdown.lastElementChild.addEventListener("click", usuarioDeslogado);
}

// Atualiza a interface para usuário deslogado
function usuarioDeslogado() {
    console.log('Saindo');
    statusLogin = false;
    fetch('./php/deslogarUsuario.php')
        .then(response => {
            if (!response.ok) throw new Error("Erro ao deslogar");
            return response.text();
        })
        .then(data => {
            console.log("Usuário deslogado com sucesso:", data);
            atualizarItensMenu();
            window.location.href = "index.php";
        })
        .catch(error => console.error("Erro ao deslogar o usuário:", error));
}

// Atualiza os itens que devem aparecer no menu de conta
function atualizarItensMenu() {
    for (let item of menuDropdown.children) {
        item.classList.toggle("item-show");
    }
}

// Verifica o status de login ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    fetch('./php/fetchLogin.php')
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                console.log("Usuário está logado.");
                usuarioLogado();
            } else {
                console.log("Usuário não está logado.");
            }
        })
        .catch(error => console.error('Erro ao verificar o login:', error));
});
