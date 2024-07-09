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
const classifs = document.querySelector(".divClassifInd");


for(i = 0; i <classifs.childElementCount; i++){ 
    let cont = i;
    classifs.children[cont].addEventListener("click", function(){
        switch (cont){
            case 0:
                classifs.children[cont].classList.toggle("livreC");                
                break;

            case 1:
                classifs.children[cont].classList.toggle("dezC");
                break;

            case 2:
                classifs.children[cont].classList.toggle("dozeC");
                break;

            case 3:
                classifs.children[cont].classList.toggle("catorzeC");
                break;

            case 4:
                classifs.children[cont].classList.toggle("dezesseisC");
                break;

            case 5:
                classifs.children[cont].classList.toggle("dezoitoC");
                break;
        }
    })
}