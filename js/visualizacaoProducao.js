
// Evento de click dos icones
const icon = document.querySelector("#mark");

aberto = true;
// const backdropNormalcolor = backdrop.style.backgroundColor;

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
const botao = document.querySelector("#plataformas_button");
botao.addEventListener("click", abrirPlataformas);

function abrirPlataformas() {
    const dados = document.querySelector("#dados_gerais");
    const plataformas = document.querySelector("#plataformas")
    const backdrop = document.querySelector(".backdrop");

    if (aberto) {
        dados.style.display = "none";
        plataformas.style.display = "block";
        aberto = false;
        backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        botao.textContent = "Voltar"

    }
    else if (!aberto) {
        dados.style.display = "flex";
        plataformas.style.display = "none";
        aberto = true;
        backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        botao.textContent = "Disponível Neste Momento"
    }
}

// Testes
// // API

var myParam = queryObj();
console.log(myParam);

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWExZjFhNGRjYzY2M2EzMTRlNmUwMDhhOGI5YWEyYyIsInN1YiI6IjY1ZDkxNjJiMGYwZGE1MDE2MjMyMjViMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCV25ZQQfVb7YOVnVVFI_xn7MAnNYMbZRrj0SApcL7k'
    }
};

fetch(`https://api.themoviedb.org/3/movie/${myParam.query}?append_to_response=20&language=pt-BR`, options)
    .then(response => response.json())
    .then(json => carregaDados(json));

fetch(`https://api.themoviedb.org/3/movie/${myParam.query}/keywords`, options) // Palavra chave
    .then(response => response.json())
    .then(response => carregaTags(response));

fetch(`https://api.themoviedb.org/3/movie/${myParam.query}/credits?language=en-US`, options)
    .then(response => response.json())
    .then(response => carregaElenco(response));

fetch('https://api.themoviedb.org/3/movie/${myParam.query}/watch/providers', options)
  .then(response => response.json())
  .then(response => console.log(response))

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
    const banner = document.querySelector(".banner");
    banner.style.backgroundImage = (`url(https://image.tmdb.org/t/p/w1280${json.backdrop_path})`); // Imagem de Fundo

    const bannerPrincipal = document.querySelector(".main-banner");
    bannerPrincipal.setAttribute("src", `https://image.tmdb.org/t/p/w300${json.poster_path}`)

    const titulo = document.querySelector(".titulo");
    const anoLancamento = document.querySelector(".ano");

    const dataEstreia = document.querySelector(".data_estreia");
    dataEstreia.innerHTML = `${json.release_date} (${json.origin_country})`;

    titulo.innerHTML = `${json.title}`; // Título
    const date = new Date(json.release_date); // Ano de Estréia
    anoLancamento.innerHTML = `(${date.getFullYear()})`

    const sinopse = document.querySelector(".sinopse");
    sinopse.innerHTML = json.overview;

    const duracao = document.querySelector(".duracao");
    duracao.innerHTML = `${json.runtime}min`;
};

function carregaTags(json) {

    const listaTags = document.querySelector(".tags");
    listaTags.replaceChildren();
    json.keywords.forEach(element => {
        let item = document.createElement('a'); // Cria o a
        item.classList.add('item'); // Adiciona a classe item, o estilizando

        item.setAttribute("href", `visualizacaoTag.html?query=${element.id}`);
        item.innerHTML = element.name;

        listaTags.appendChild(item);
    });
}

function carregaElenco(json) {
    const elenco = document.querySelector("#elenco");
    elenco.lastElementChild.replaceChildren();

    json.cast.forEach(element => {
        let item = document.createElement('div'); // Cria a div
        item.classList.add('item'); // Adiciona a classe item, o estilizando

        item.innerHTML = `<a href="visualizacaoIntegrante.html?query=${element.id}">
        <img src="https://image.tmdb.org/t/p/w300${element.profile_path}"}>
        <span>${element.name}</span>
        </a>`; // Cria o item com sua imagem, link e título

        elenco.lastElementChild.appendChild(item);
    });
}