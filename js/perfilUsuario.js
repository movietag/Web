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
    "#b91d47",
    "#00aba9",
    "#2b5797",
    "#e8c3b9",
    "#1e7145"
];

const linexValues = ["Jan", "Fev", "Mar", "Abril", "Maio"];

const engajamentoLabels = ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"];
const engajamentoData = [12, 19, 3, 5, 2];
const engajamentoColors = [
    "#ff6384",
    "#36a2eb",
    "#ffce56",
    "#4bc0c0",
    "#9966ff"
];

new Chart("chartEngajamento", {
    type: "bar",
    data: {
        labels: engajamentoLabels,
        datasets: [{
            label: "Tags Criadas",
            backgroundColor: engajamentoColors,
            data: engajamentoData
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Engajamento em Tags Criadas",
                font: {
                    size: 24,
                }
            }
        }
    }
});


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
        text: "World Wide Wine Production 2018"
        }
    }
});

new Chart("chartLinhas", {
    type: "line",
    data: {
        labels: linexValues ,
        datasets: [{
        label: "TAG1",
        lineTension: 0,
        borderColor: 'rgba(75, 192, 192, 1)',
        data: yValues
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: "Taxa de Salvamentos em Tags Criadas Por Você",
                font: {
                    size: 24,
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
        text: "World Wide Wine Production 2018"
        }
    }
});

