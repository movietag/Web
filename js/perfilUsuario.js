document.querySelector("#botao").onclick = function () {
    window.location = "editarPerfil.php";
};

document.querySelector("#estatisticas").addEventListener("click", function () {
    document.querySelector(".dashboard").classList.remove("show");
    document.querySelector(".pagTags").classList.add("show");
    document.querySelector(".pagAvals").classList.add("show");
});

document.querySelector("#tags").addEventListener("click", function () {
    document.querySelector(".dashboard").classList.add("show");
    document.querySelector(".pagTags").classList.remove("show");
    document.querySelector(".pagAvals").classList.add("show");
});

document.querySelector("#avaliacoes").addEventListener("click", function () {
    document.querySelector(".dashboard").classList.add("show");
    document.querySelector(".pagTags").classList.add("show");
    document.querySelector(".pagAvals").classList.remove("show");
});




const xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
const yValues = [55, 49, 44, 24, 15];
const barColors = [
    "#e6c222",
    "#e6c222",
    "#e6c222",
    "#e6c222",
    "#e6c222"
];

const linexValues = ["Jan", "Fev", "Mar", "Abril", "Maio"];


new Chart("chartPizzas", {
    type: "pie",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues
        }]
    },
    options: {
        title: {
        display: true,
        text: "Gêneros Mais Assistidos",
        fontColor: '#fff'
        }
    }
});

new Chart("chartLinhas", {
    type: "line",
    data: {
        labels: linexValues ,
        datasets: [{
        label: "Batata",
        borderColor: '#e6c222',
        data: yValues,
        tension: 0
        }]
    },
    options:{
        responsive: true,
        title:{
            display: true,
            text: "teste",
            fontColor: '#fff'
        },
        scales:{
            x:{
                border:{
                    color: '#fff'
                }
            }
        }
        
    }
});

new Chart("chartBarras", {
    type: "horizontalBar",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues
        }]
    },
    options: {
        title: {
            display: true,
            text: "Engajamento em Tags Criadas Por Você",
            fontColor: '#fff',
        } 
    }
});

