//mostrar e ocultar os inputs dos filtros
const filtros = document.querySelectorAll(".divInput");
const setas = document.querySelectorAll(".rotulo");

//repeticao pegando todas as setas e adicionando o evento de click para cada rotulo
for (i = 0; i<setas.length; i++){
    setas[i].addEventListener("click", function(){mostraFiltro(setas[i], filtros[i])});
}

for (i = 0; i < filtros.length; i++){
    filtros[i].classList.toggle("filtro-show");
}

function mostraFiltro(div, elem){
    elem.classList.toggle("filtro-show");
    trocaSeta(div);
}

//gira as setas de acordo com se o input está mostrando ou nao
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

//mostrando todos os filtros
const mostrar = document.querySelector("#botaoMostrar");
mostrar.addEventListener("click", function(){mostrarTodos(mostrar, esconder, filtros, setas)});
function mostrarTodos(mos, esc, filt, set){
    for (i = 0; i < filt.length; i++){
        filt[i].style.display = "block";
    }
    for (i = 0; i < set.length; i++){
        set[i].lastChild.classList.add("cima")
    }
    mos.style.display = "none";
    esc.style.display = "block";
}

//ocultando todos os filtros
const esconder = document.querySelector("#botaoEsconder");
esconder.addEventListener("click", function(){esconderTodos(mostrar, esconder, filtros, setas)});
function esconderTodos(mos, esc, filt, set){
    for (i = 0; i < filt.length; i++){
        filt[i].style.display = "none";
    }
    for (i = 0; i < set.length; i++){
        set[i].lastChild.classList.remove("cima");
    }
    mos.style.display = "block";
    esc.style.display = "none";
}