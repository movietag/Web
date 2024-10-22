function detectTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  function updateFavicon(theme) { 
    const favicon = document.getElementById('favicon');
    if (theme === 'dark') { 
      favicon.href = './img/Logo-Branca-Mini.svg';
    } else { 
      favicon.href = './img/Logo-Preta.svg';
    } 
  }
  
  // Atualiza o favicon com base no tema inicial
  updateFavicon(detectTheme());
  
  // Adiciona um listener para detectar mudanças no tema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const newTheme = event.matches ? 'dark' : 'light';
    updateFavicon(newTheme);
  });
  








// Evento do Menu
const btnConta = document.querySelector("#btnConta");
btnConta.addEventListener("click", (ev) => {showMenu(ev)});
const menu = document.querySelector(".menu");
const popup = document.getElementById("myPopup");

// Altera os items que aparecem no backdown menu
const backdownMenu = document.querySelector(".backdown-menu")
for (let i = 0; i < backdownMenu.childElementCount; i++){

    // i > 1: Perfil e Sair
    if (i > 1){
        backdownMenu.children[i].classList.toggle("item-show");
    }
}

// Evento de Watchlist
menu.children[1].addEventListener("click", (ev) => {

    // Se estiver logado...
    if(verificaLogado() === true){
        // Permite o usuario navegar ate Watchlist
        ev.target.setAttribute("href", "visualizacaoListas.php");
    } else{
        ev.preventDefault();

        //Popup de Aviso
        apareceAviso();
        ev.target.setAttribute("href", "");
    }

    }
);

// Se o usuario estiver logado
function verificaLogado(){
    if (localStorage.getItem('status') != null){
        logado();
        return true;
    } else{
        return
    }
}

// Chama a funcao para verificar se o usuario esta logado
verificaLogado();

// Aparecer o Menu
function showMenu(){
    backdownMenu.classList.toggle("backdown-show");

    // Se o popup de Watchlist estiver aparecendo
    if (popup.classList.contains("show")){

        // Some o popup
        popup.classList.toggle("show");
    }
}

// Altera o frond se a pessoa estiver logada
function logado(){
    apareceItem();
    // Se clicar em sair, deslogado é chamado
    backdownMenu.lastElementChild.addEventListener("click", deslogado);
}

// Altera o front se a pessoa estiver deslogada
function deslogado(){
    localStorage.removeItem('status');
    apareceItem();

}

// Atualiza os itens que devem aparecer no backdownMenu
function apareceItem(){
    for (let i = 0; i < backdownMenu.childElementCount; i++){
        backdownMenu.children[i].classList.toggle("item-show");
}}

// Popup de Watchlist
function apareceAviso() {
    popup.classList.toggle("show");

    // Testa se o backdownMenu de conta
    if (backdownMenu.classList.contains("backdown-show")){
        backdownMenu.classList.toggle("backdown-show");
    } 
  }