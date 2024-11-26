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

async function criarGraficoTags() {
    try {
        const response = await fetch('./php/perfilUsuario.php');
        const data = await response.json();

        if (!data.success) {
            console.error(data.message);
            return;
        }

        console.log(data.data);
        console.log(typeof data.data);
        console.log(data);

        const tags = data.data.map(item => item.tag); // Nomes das tags
        const valores = data.data.map(item => item.total); // Totais de usos

        // Cria o gráfico de barras
        new Chart("chartBarrasV", {
            type: "bar",
            data: {
                labels: tags,
                datasets: [{
                    label: "Número de Utilizações",
                    data: valores,
                    backgroundColor: [
                        "#8C22E6", "#E66F22", "#e6c222", "#2223E6", "#E69A22", 
                        "#22E6E6", "#E6226F", "#26e622", "#e62244", "#2266e6"
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: "Tags Mais Utilizadas",
                        color: '#fff'
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: true,
                            color: '#424242'
                        },
                        ticks: {
                            color: '#fff'
                        },
                        border: {
                            color: '#7f807d'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#fff'
                        },
                        border: {
                            color: '#7f807d'
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error("Erro ao criar o gráfico:", error);
    }
}

criarGraficoTags();

async function receberDados() {
    try {
        const response = await fetch(`./php/perfilUsuario.php`);
        const data = await response.json();

        if (data.success) {
            return data.data; // Retorna os dados diretamente
        } else {
            console.error(data.message);
            return {}; // Retorna objeto vazio em caso de erro
        }
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return {};
    }
}

receberDados().then((dadosProducoes) => {
    if (Object.keys(dadosProducoes).length === 0) {
        console.warn("Nenhum dado recebido para o gráfico.");
        return;
    }

    const mesesLabels = [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", 
        "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ];

    const datasets = Object.keys(dadosProducoes).map((nomeProd, index) => {
        return {
            label: nomeProd, // Nome da produção no gráfico
            borderColor: ['#E66F22', '#22E6E6', '#E6226F'][index], // Cores diferentes para as 3 linhas
            data: Object.values(dadosProducoes[nomeProd]), // Dados da produção ao longo dos meses
            tension: 0.4,
            fill: false
        };
    });

    new Chart("chartLinhas", {
        type: "line",
        data: {
            labels: mesesLabels, // Etiquetas do eixo x (meses)
            datasets: datasets   // Dados das linhas
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#fff' },
                    border: { display: true, color: '#7f807d' },
                },
                y: {
                    grid: { display: true, color: '#424242' },
                    ticks: { color: '#fff' },
                    border: { display: true, color: '#7f807d' },
                }
            },
            plugins: {
                legend: {
                    labels: { color: '#fff' }
                },
                title: {
                    display: true,
                    text: "Produções Mais Acessadas no Ano",
                    color: '#fff',
                }
            }
        }
    });
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