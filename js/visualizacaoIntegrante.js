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

fetch(`https://api.themoviedb.org/3/person/${myParam.query}}?language=pt-BR`, options)
  .then(response => response.json())
  .then(response => carregaDados(response))

fetch(`https://api.themoviedb.org/3/person/${myParam.query}/combined_credits?language=pt-BR`, options)
  .then(response => response.json())
  .then(response => carregaFilmes(response))

function carregaDados(json, n){

    if (n !== 1){
        const foto = document.querySelector('#foto');
        foto.setAttribute('src', `https://image.tmdb.org/t/p/w300${json.profile_path})`);
    
        const atividade = document.querySelector('#idAtividade');
        atividade.innerHTML = json.known_for_department;
    
        const nome = document.querySelector('#nome');
        nome.innerHTML = json.name;
    
        const bio = document.querySelector('#bio');
    
        const aniversario = document.querySelector('#aniversario');
        aniversario.innerHTML = json.birthday;

        if(json.biography === ""){
            chamaApiIngles();
        }else{
            bio.innerHTML = json.biography;
        }
    } else{
        bio.innerHTML = json.biography;
    }
}

function carregaFilmes(data){
    const movies = data.cast; // ou data.crew, dependendo do que você deseja
    // Ordenar os filmes pela popularidade

    const sortedMovies = movies.sort((a, b) => {
        // Primeiro compara o order
        if (a.order !== b.order) {
            return a.order - b.order; // Ordena por 'order' de forma ascendente
        }
        // Se os orders forem iguais, compara a popularidade
        return b.popularity - a.popularity}); // Ordena por 'popularity' de forma descendente

    // Exibir os filmes ordenados
    const itens = document.querySelector('.lista').lastElementChild;
    criaFilmes(sortedMovies, itens)
    console.log(sortedMovies)
}

function criaFilmes(movies, itens){

    const limitedMovies = movies.slice(0, 7);
    limitedMovies.forEach(element => {
        let url = `https://image.tmdb.org/t/p/w300${element.poster_path}`;
        if (element.poster_path === null){
            url = "./img/placeholder/MovieTag-NotFoundImage.png";
        }

        let item = document.createElement('div'); // Cria a div
        item.classList.add('item'); // Adiciona a classe item, o estilizando
        item.classList.add('card'); // Adiciona a classe item, o estilizando
        

        item.innerHTML = `<a href="visualizacaoProducao.php?type=${element.media_type}&query=${element.id}">  
        <img src=${url}>
        <span>${element.title || element.name}</a>`

        itens.appendChild(item)

        
    }) 
}

function chamaApiIngles(){
    fetch(`https://api.themoviedb.org/3/person/${myParam.query}?language=en-US`, options)
        .then(response => response.json())
        .then(response => carregaDados(response, 1))
}

// Função para obter os parâmetros da URL
function queryObj() { // Pega os valores do link HTML
    var result = {}, keyValuePairs = location.search.slice(1).split("&");
    keyValuePairs.forEach(function (keyValuePair) { // Percorre cada valor
        keyValuePair = keyValuePair.split('=');
        result[decodeURIComponent(keyValuePair[0])] = decodeURIComponent(keyValuePair[1]) || '';
    });
    return result;
};

