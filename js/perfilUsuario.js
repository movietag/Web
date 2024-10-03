document.querySelector("#botao").onclick = function () {
    location.href = "editarPefil.html";
};

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

