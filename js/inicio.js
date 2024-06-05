const fPesquisa = document.querySelector("form");
const bPesquisar = document.querySelector("#pesq1");

bPesquisar.addEventListener("click", pesquisa);

function pesquisa(){
    const areas = document.querySelectorAll(".area");
    areas[0].style.display = "none";
    areas[1].style.display = "block";
}