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
    "#8C22E6",
    "#E66F22",
    "#e6c222",
    "#2223E6",
    "#E69A22"
];

const linexValues = ["Jan", "Fev", "Mar", "Abril", "Maio"];


new Chart("chartBarrasV", {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues
        }]
    },
    options: {
        plugins:{
            responsive: true,
            title: {
                display: true,
                text: "Tags Mais Utilizadas",
                color: '#fff',
            } 
        },
        scales: {
            x: {
                grid: {
                    display: true, // remove o grid do eixo x
                    color: '#424242'
                },
                ticks: {
                    color: '#fff' // Cor das labels no eixo x (opcional)
                },
                border:{
                    display: true,
                    color: '#7f807d'
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#fff' // Cor das labels no eixo y (opcional)
                },
                border:{
                    display: true,
                    color: '#7f807d',
                }
            }
        },

    }
});

new Chart("chartLinhas", {
    type: "line",
    data: {
        labels: ["Jan", "Fev", "Mar", "Abril", "Maio"], // etiquetas do eixo x
        datasets: [{
            label: "Batata",
            borderColor: '#E66F22',
            data: [55, 72, 44, 24, 49], // dados do gráfico
            tension: 0.4
        },
        {
            label: "Arroz",
            borderColor: '#8C22E6',
            data: [65, 35, 49, 32, 14], // dados do gráfico
            tension: 0.4
        },
        {
            label: "Arroz",
            borderColor: '#e6c222',
            data: [29, 64, 39, 52, 22], // dados do gráfico
            tension: 0.4
        }

        ]
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
                },
                border:{
                    display: true,
                    color: '#7f807d'
                },
            },
            y: {
                grid: {
                    display: true, // remove o grid do eixo y
                    color: '#424242',
                },
                ticks: {
                    color: '#fff' // Cor das labels no eixo y (opcional)
                },
                border:{
                    display: true,
                    color: '#7f807d',
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#fff' // Cor das labels da legenda (opcional)
                }
            },
            title: {
                display: true,
                text: "Produções Mais Acessadas por Período",
                color: '#fff',
            }
        }
    }
});

new Chart("chartBarrasH", {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues
        }]
    },
    options: {
        indexAxis: 'y',
        plugins:{
            title: {
                display: true,
                text: "Usuários com Maior Atividade",
                color: '#fff',
            } 
        },
        scales: {
            x: {
                grid: {
                    display: true, // remove o grid do eixo x
                    color: '#424242'
                },
                ticks: {
                    color: '#fff' // Cor das labels no eixo x (opcional)
                },
                border:{
                    display: true,
                    color: '#7f807d'
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#fff' // Cor das labels no eixo y (opcional)
                },
                border:{
                    display: true,
                    color: '#7f807d',
                }
            }
        },

    }
});