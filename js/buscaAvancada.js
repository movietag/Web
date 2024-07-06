//Obtendo os objetos da DOM

const filtros = document.querySelectorAll(".divInput"); // Pega todos os filtros da página
const divs = document.querySelectorAll(".rotulo"); // Pega todas as divs
const botao = document.querySelector("#botaoPesquisar"); // Botão de pesquisar
// const resultados = document.getElementById("resultados"); // Div de resultados
const resultados = document.querySelector(".itens");
const antes = document.getElementById("antesPesquisa"); // Div que aparece antes da pesquisa
const mostrar = document.querySelector("#botaoMostrar"); //Botão que mostra os filtros
const esconder = document.querySelector("#botaoEsconder"); // Botão que esconde os filtros


// Adicionando Eventos aos Objetos

botao.addEventListener("click", function(){ // Evento de aparecer o resultado da pesquisa
    antes.style.display = "none";
    resultados.style.display = "block";
}); 

for (i = 0; i<divs.length; i++){ //repeticao pegando todas as setas e adicionando o evento de click para cada rotulo
    let div = divs[i];
    let elem = filtros[i];
    div.addEventListener("click", function() {mostraFiltro(div, elem)});
}

mostrar.addEventListener("click", function(){mostrarTodos(mostrar, esconder)}); // Evento para mostrar os filtros
esconder.addEventListener("click", function(){esconderTodos(mostrar, esconder, filtros, divs)}); // Evento para ocultar todos os filtros


// Oculta os filtros

inicioFiltros();


// Funções do Código

function inicioFiltros(){ // Oculta os filtros quando a página é iniciada
    for (i = 0; i < filtros.length; i++){
        filtros[i].classList.toggle("filtro-show");
    }
}

function mostraFiltro(div, elem){ // Torna visível o filtro
    elem.classList.toggle("filtro-show");
    trocaSeta(div);
}

function trocaSeta(div){ //gira as setas de acordo com se o input está mostrando ou nao
    div.lastChild.classList.toggle("cima");
}

function mostrarTodos(mos, esc){
    for (i = 0; i < filtros.length; i++){
        mostraFiltro(divs[i], filtros[i]);
    }
    mos.style.display = "none";
    esc.style.display = "block";
}

function esconderTodos(mos, esc){
    for (i = 0; i < filtros.length; i++){
        mostraFiltro(divs[i], filtros[i]);
    }
    mos.style.display = "block";
    esc.style.display = "none";
}


//botoes de classificacao
const classifs = document.querySelectorAll(".classifInd");


for(i = 0; i<classifs.length; i++){
    let clas = classifs[i]; 
    clas.addEventListener("click", function(){
        console.log(i);
        if (i == 0){
            clas.lastChild.classList.toggle("livreC");
        } else if (i == 1){
            clas.lastChild.classList.toggle("dezC");
        } else if (i == 2){
            clas.lastChild.classList.toggle("dozeC");
        } else if (i == 3){
            clas.lastChild.classList.toggle("catorzeC");
        } else if (i == 4){
            clas.lastChild.classList.toggle("dezesseisC");
        } else if (i == 5){
            clas.lastChild.classList.toggle("dezoitoC");
        }
    });
}

// function mudarFundo(clas, numero){
//     console.log(numero);
//     if (numero == 0){
//         clas.lastChild.classList.toggle("livreC");
//     } else if (numero == 1){
//         clas.lastChild.classList.toggle("dezC");
//     } else if (numero == 2){
//         clas.lastChild.classList.toggle("dozeC");
//     } else if (numero == 3){
//         clas.lastChild.classList.toggle("catorzeC");
//     } else if (numero == 4){
//         clas.lastChild.classList.toggle("dezesseisC");
//     } else if (numero == 5){
//         clas.lastChild.classList.toggle("dezoitoC");
//     }
// }