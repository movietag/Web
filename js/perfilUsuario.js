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
    $dados = dadosProducoes[0];

    if (Object.keys($dados).length === 0) {
        console.warn("Nenhum dado recebido para o gráfico.");
        return;
    }

    const tags = $dados.map(item => item.tag); // Nomes das tags
    const valores = $dados.map(item => item.total); // Totais de usos

    const dataset = [{
        data: valores, // Valores associados às tags
        backgroundColor: ['#E66F22', '#22E6E6', '#E6226F', '#2223E6', '#E69A22'], // Cores das barras
    }];
    

    // Cria o gráfico de barras
    new Chart("chartBarrasV", {
        type: "bar",
        data: {
            labels: tags,
            datasets: dataset
        },
        options: {
            responsive: true,
            plugins: {
                legend: {display: false},
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
});

receberDados().then((dadosProducoes) => {
    $dados = dadosProducoes[1];

    if (Object.keys($dados).length === 0) {
        console.warn("Nenhum dado recebido para o gráfico.");
        return;
    }

    const mesesLabels = [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", 
        "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ];

    const datasets = Object.keys($dados).map((nomeProd, index) => {
        return {
            label: nomeProd, // Nome da produção no gráfico
            borderColor: ['#E66F22', '#22E6E6', '#E6226F', '#2223E6', '#E69A22'][index], // Cores diferentes para as 3 linhas
            data: Object.values($dados[nomeProd]), // Dados da produção ao longo dos meses
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

receberDados().then((dadosProducoes) => {
    $dados = dadosProducoes[2];

    if (Object.keys($dados).length === 0) {
        console.warn("Nenhum dado recebido para o gráfico.");
        return;
    }
    const usuarios = $dados.map(user => user.usuario);
    const atividades = $dados.map(user => user.atividade_total);
    const dataset = [{
        data: atividades, // Valores associados
        backgroundColor: ['#E66F22', '#22E6E6', '#E6226F', '#2223E6', '#E69A22'], // Cores das barras
    }];

    new Chart("chartBarrasH", {
        type: "bar",
        data: {
            labels: usuarios,
            datasets: dataset
        },
        options: {
            indexAxis: 'y',
            plugins: {
                title: {
                    display: true,
                    text: "Usuários com Maior Atividade",
                    color: '#fff',
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: { display: true, color: '#424242' },
                    ticks: { color: '#fff' },
                    border: { display: true, color: '#7f807d' },
                },
                y: {
                    grid: { display: false },
                    ticks: { color: '#fff' },
                    border: { display: true, color: '#7f807d' },
                }
            }
        }
    });
});
