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

new Chart("chartPizzas2", {
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
        text: "FSAGDFSGDSGAS",
        fontColor: '#fff'
        }
    }
});

new Chart("chartLinhas", {
    type: "line",
    data: {
        labels: ["Jan", "Fev", "Mar", "Abril", "Maio"], // etiquetas do eixo x
        datasets: [{
            label: "Batata",
            borderColor: '#e6c222',
            data: [55, 49, 44, 24, 15], // dados do gráfico
            tension: 0
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false // remove o grid do eixo x
                },
                ticks: {
                    color: '#fff' // Cor das labels no eixo x (opcional)
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: false // remove o grid do eixo y
                },
                ticks: {
                    color: '#fff' // Cor das labels no eixo y (opcional)
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#fff' // Cor das labels da legenda (opcional)
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