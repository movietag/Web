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
  .then(response => carregaDados(response, 0))

function carregaDados(json, param){

    if (param === 0){
        const foto = document.querySelector('#foto');
        foto.setAttribute('src', `https://image.tmdb.org/t/p/w300${json.profile_path})`);
    
        const atividade = document.querySelector('#idAtividade');
        atividade.innerHTML = json.known_for_department;
    
        const nome = document.querySelector('#nome');
        nome.innerHTML = json.name;
    
        const bio = document.querySelector('#bio');
        bio.innerHTML = json.biography;
    
        const aniversario = document.querySelector('#aniversario');
        aniversario.innerHTML = json.birthday;
        chamaAPI(json.id, json.name)
    } else{
        console.log(json);
    }





}

function chamaAPI(id, name){
    fetch(`https://api.themoviedb.org/3/search/person?query=${name}&include_adult=false&language=en-US&page=1`, options)
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

