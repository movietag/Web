//mostrar e ocultar os inputs dos filtros
const filtros = document.querySelectorAll(".divInput");
const setas = document.querySelectorAll(".rotulo");
const setinhaBaixo = document.querySelectorAll("bx-chevron-down");

//repeticao pegando todas as setas e adicionando o evento de click para cada rotulo
for (let i = 0; i<setas.length; i++){
    setas[i].addEventListener("click", function(){mostraFiltro(setas[i], filtros[i])});
}

for (i = 0; i < filtros.length; i++){
    filtros[i].classList.toggle("filtro-show");
}

function mostraFiltro(div, elem){
    elem.classList.toggle("filtro-show");
    trocaSeta(div);
}

function trocaSeta(div){
    div.lastChild.classList.toggle("cima");
}

//mostrar resultados da pesquisa
const botao = document.querySelector("#botaoPesquisar");
const resultados = document.getElementById("resultados");
const antes = document.getElementById("antesPesquisa");

botao.addEventListener("click", function(){
    antes.style.display = "none";
    resultados.style.display = "block";
});