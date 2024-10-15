// Elementos da DOM
const formularioPesquisa = document.querySelector("form"); // Formulário de pesquisa
const listasFilmes = document.querySelectorAll(".lista"); // Lista de filmes popular e outras

// Opções de configuração da API
const opcoesApi = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWExZjFhNGRjYzY2M2EzMTRlNmUwMDhhOGI5YWEyYyIsInN1YiI6IjY1ZDkxNjJiMGYwZGE1MDE2MjMyMjViMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCV25ZQQfVb7YOVnVVFI_xn7MAnNYMbZRrj0SApcL7k'
    }
};

// Evento de submissão da pesquisa
formularioPesquisa.onsubmit = (evento) => {
    evento.preventDefault(); // Evita o recarregamento da página
    const areaResultados = document.querySelector("#s02 .lista"); // Área onde os resultados serão exibidos
    const termoPesquisa = evento.target.pesquisa.value; // Termo da pesquisa

    if (termoPesquisa) { // Se o termo de pesquisa não for vazio
        buscarFilmes(termoPesquisa, areaResultados);
        exibirAreaPesquisa(); // Exibe a área de pesquisa
    }
};

// Função para buscar filmes na API
const buscarFilmes = (termo, lista) => {
    const url = `https://api.themoviedb.org/3/search/multi?query=${termo}&include_adult=false&language=pt-BR&page=1`;

    fetch(url, opcoesApi)
        .then(response => response.json())
        .then(dados => carregarFilmes(lista, dados));
};

// Função para exibir a área de pesquisa
const exibirAreaPesquisa = () => {
    const areas = document.querySelectorAll(".area");
    areas[0].style.display = "none"; // Esconde a tela inicial
    areas[1].style.display = "block"; // Mostra a tela de resultados
};

// Função para carregar filmes e outros resultados na lista
const carregarFilmes = (lista, dados) => {
    const containerItens = lista.lastElementChild;
    containerItens.replaceChildren(); // Limpa os itens anteriores

    dados.results.forEach(item => {
        const elemento = document.createElement('div');
        elemento.classList.add('item');

        const { urlImagem, nome, urlDetalhes } = gerarDetalhesItem(item);
        elemento.innerHTML = `
            <a href="${urlDetalhes}">
                <img src="${urlImagem}">
                <span>${nome}</span>
            </a>
        `;
        containerItens.appendChild(elemento);
    });
};

// Função para gerar os detalhes de cada item (filme, série ou pessoa)
const gerarDetalhesItem = (item) => {
    let urlImagem;
    let nome;
    let urlDetalhes;

    if (item.media_type === "movie") {
        urlImagem = criarUrlImagem(item.poster_path, 'MovieTag-NotFoundImage.png');
        nome = item.title;
        urlDetalhes = `visualizacaoProducao.php?type=movie&query=${item.id}`;
    } else if (item.media_type === "person") {
        urlImagem = criarUrlImagem(item.profile_path, 'MovieTag-NotFoundImage.png');
        nome = item.name;
        urlDetalhes = `visualizacaoIntegrante.php?type=person&query=${item.id}`;
    } else if (item.media_type === "tv") {
        urlImagem = criarUrlImagem(item.poster_path, 'MovieTag-NotFoundImage.png');
        nome = item.name;
        urlDetalhes = `visualizacaoProducao.php?type=tv&query=${item.id}`;
    } else {
        urlImagem = criarUrlImagem(item.poster_path, 'MovieTag-NotFoundImage.png');
        nome = item.title || item.name; // Caso especial
        urlDetalhes = `visualizacaoProducao.php?type=movie&query=${item.id}`;
    }

    return { urlImagem, nome, urlDetalhes };
};

// Função para criar a URL da imagem ou usar uma imagem substituta se não houver
const criarUrlImagem = (caminho, imagemPadrao) => {
    return caminho ? `https://image.tmdb.org/t/p/w300${caminho}` : `./img/placeholder/${imagemPadrao}`;
};

// Carrega listas iniciais da API (Popular, Em exibição, Melhor avaliados)
const carregarListasIniciais = () => {
    const urlsListas = [
        'https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1',
        'https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1',
        'https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1'
    ];

    urlsListas.forEach((url, index) => {
        fetch(url, opcoesApi)
            .then(response => response.json())
            .then(json => carregarFilmes(listasFilmes[index], json));
    });
};

// Inicializa o carregamento das listas iniciais ao carregar a página
carregarListasIniciais();

