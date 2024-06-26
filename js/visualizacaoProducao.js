// Evento de click dos icones
const icon = document.querySelector("#mark");

// Define a variável 'aberto' como verdadeira
let aberto = true;

icon.addEventListener("click", (ev) => {
    const classes = ["bx-bookmark", "bxs-bookmark"]; // Lista de Classes dos Icones de Marcador
    if (icon.classList.contains(classes[0])) {
        icon.classList.remove(classes[0]);
        icon.classList.add(classes[1]);
    } else {
        icon.classList.remove(classes[1]);
        icon.classList.add(classes[0]);
    }
});
const botao = document.querySelector("#plataformas_button"); // Seleciona o botão de plataformas
botao.addEventListener("click", abrirPlataformas); // Adiciona ouvidor de evento de click no botão de plataformas

function abrirPlataformas() {
    const dados = document.querySelector("#dados_gerais"); // Seleciona a seção de dados gerais
    const plataformas = document.querySelector("#plataformas"); // Seleciona a seção de plataformas
    const backdrop = document.querySelector(".backdrop"); // Seleciona o backdrop

    if (aberto) {
        dados.style.display = "none"; // Esconde os dados gerais
        plataformas.style.display = "block"; // Mostra a seção de plataformas
        aberto = false; // Define 'aberto' como falso
        backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Altera a cor de fundo
        botao.textContent = "Voltar"; // Altera a cor de fundo

    }
    else if (!aberto) {
        dados.style.display = "flex"; // Mostra os dados gerais
        plataformas.style.display = "none"; // Esconde a seção de plataformas
        aberto = true; // Define 'aberto' como verdadeiro
        backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Altera a cor de fundo
        botao.textContent = "Disponível Neste Momento"; // Altera o texto do botão
    }
}


// API

var myParam = queryObj();
console.log(myParam);

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWExZjFhNGRjYzY2M2EzMTRlNmUwMDhhOGI5YWEyYyIsInN1YiI6IjY1ZDkxNjJiMGYwZGE1MDE2MjMyMjViMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCV25ZQQfVb7YOVnVVFI_xn7MAnNYMbZRrj0SApcL7k'
    }
};

// Faz a requisição à API do The Movie Database para obter os dados do filme
fetch(`https://api.themoviedb.org/3/movie/${myParam.query}?append_to_response=20&language=pt-BR`, options)
    .then(response => response.json())
    .then(json => carregaDados(json));

// Faz a requisição à API para obter as tags do filme
fetch(`https://api.themoviedb.org/3/movie/${myParam.query}/keywords`, options) // Palavra chave
    .then(response => response.json())
    .then(response => carregaTags(response));

// Faz a requisição à API para obter o Elenco do filme
fetch(`https://api.themoviedb.org/3/movie/${myParam.query}/credits?language=en-US`, options)
    .then(response => response.json())
    .then(response => carregaElenco(response));

// Faz a requisição à API para obter os provedores de streaming
fetch(`https://api.themoviedb.org/3/movie/${myParam.query}/watch/providers`, options)
  .then(response => response.json())
  .then(response => carregaProvedores(response))

// Função para obter os parâmetros da URL
function queryObj() { // Pega os valores do link HTML
    var result = {}, keyValuePairs = location.search.slice(1).split("&");
    keyValuePairs.forEach(function (keyValuePair) { // Percorre cada valor
        keyValuePair = keyValuePair.split('=');
        result[decodeURIComponent(keyValuePair[0])] = decodeURIComponent(keyValuePair[1]) || '';
    });
    return result;
};

// Atualizando Dados a partir da API
function carregaDados(json) {
    const banner = document.querySelector("#banner"); // Seleciona o banner
    banner.style.backgroundImage = (`url(https://image.tmdb.org/t/p/w1280${json.backdrop_path})`); // Define a imagem de fundo do banner

    const bannerPrincipal = document.querySelector(".main-banner"); // Seleciona o banner principal
    bannerPrincipal.setAttribute("src", `https://image.tmdb.org/t/p/w300${json.poster_path}`); // Define a imagem do poster

    const titulo = document.querySelector(".titulo"); // Seleciona o título
    const anoLancamento = document.querySelector(".ano"); // Seleciona o ano de lançamento

    const dataEstreia = document.querySelector(".data_estreia"); // Seleciona a data de estreia
    dataEstreia.innerHTML = `${json.release_date} (${json.origin_country})`; // Define a data de estreia e país de origem

    titulo.innerHTML = `${json.title}`; // Título
    const date = new Date(json.release_date); // Ano de Estréia
    anoLancamento.innerHTML = `(${date.getFullYear()})`;// Define o ano de lançamento

    const sinopse = document.querySelector(".sinopse"); // Seleciona a sinopse
    sinopse.innerHTML = json.overview; // Define a sinopse

    const duracao = document.querySelector(".duracao"); // Seleciona a duração
    duracao.innerHTML = `${json.runtime}min`; // Define a duração do filme
};

// Função para carregar as tags do filme
function carregaTags(json) {
    const listaTags = document.querySelector(".tags"); // Seleciona a lista de tags
    json.keywords.forEach(element => { // Para cada tag
        let item = document.createElement('a'); // Cria o a
        item.classList.add('item'); // Adiciona a classe item, o estilizando

        item.setAttribute("href", `visualizacaoTag.html?query=${element.id}`);// Define o link
        item.innerHTML = element.name; // Define o texto

        listaTags.appendChild(item);// Adiciona o item à lista de tags
    });
}

// Função para carregar o elenco do filme
function carregaElenco(json) {
    const elenco = document.querySelector("#elenco"); // Seleciona o elenco

    json.cast.forEach(element => {
        let item = document.createElement('div'); // Cria a div
        item.classList.add('item'); // Adiciona a classe item, o estilizando

        item.innerHTML = `<a href="visualizacaoIntegrante.html?query=${element.id}">
        <img src="https://image.tmdb.org/t/p/w300${element.profile_path}"}>
        <span>${element.name}</span>
        </a>`; // Cria o item com sua imagem, link e título

        elenco.lastElementChild.appendChild(item); // Adiciona o item ao elenco
    });
}

function carregaProvedores(json){ // Função para carregar os dados dos provedores
    const listaStream = document.querySelector("#lista-stream"); // Seleciona a lista de Stream
    const listaAluguel = document.querySelector("#lista-aluguel"); // Seleciona a lista de Aluguel
    const listaCompra = document.querySelector("#lista-compra"); // Seleciona a lista de Comppra

    if (json.results.BR != null){ // Testa se os resultados no Brasil é nulo
        if (json.results.BR.rent != null){ // Testa se o dicionário de aluguel é nulo
            criaItens(json.results.BR.rent, listaAluguel); // Chama função que cria o item
        }
        if (json.results.BR.buy != null){
            criaItens(json.results.BR.buy, listaCompra);
        } 
        if (json.results.BR.flatrate != null){
            criaItens(json.results.BR.flatrate, listaStream);}


        
        };
    }

function criaItens(type, lista){ // Função que cria os itens dos provedores
    type.forEach(element => {
        let item = document.createElement('div');
        item.classList.add("item-logo");
        item.innerHTML = `<img src="https://image.tmdb.org/t/p/w300${element.logo_path}"></img>
        <span> ${element.provider_name} </span>`; // Cria uma div com imagem e span

        lista.appendChild(item); // Insere o item criado na div pai
    })

}