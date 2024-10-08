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

