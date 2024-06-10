
// Evento de click dos icones
const icon = document.querySelector("#mark");

icon.addEventListener("click", (ev) => {
    const classes = ["bx-bookmark", "bxs-bookmark"];
    if (icon.classList.contains(classes[0])){
        icon.classList.remove(classes[0]);
        icon.classList.add(classes[1]);
    } else {
        icon.classList.remove(classes[1]);
        icon.classList.add(classes[0]);
    }
});

// Testes
// // API

// var myParam = queryObj();

// const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWExZjFhNGRjYzY2M2EzMTRlNmUwMDhhOGI5YWEyYyIsInN1YiI6IjY1ZDkxNjJiMGYwZGE1MDE2MjMyMjViMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCV25ZQQfVb7YOVnVVFI_xn7MAnNYMbZRrj0SApcL7k'
//     }
//   };
  
// fetch(`https://api.themoviedb.org/3/movie/${myParam.query}?append_to_response=20&language=pt-BR`, options)
//     .then(response => response.json())
//     .then(json => carregaDados(json))

// function queryObj() { // Pega os valores do link HTML
//     var result = {}, keyValuePairs = location.search.slice(1).split("&");
//     keyValuePairs.forEach(function(keyValuePair) {
//         keyValuePair = keyValuePair.split('=');
//         result[decodeURIComponent(keyValuePair[0])] = decodeURIComponent(keyValuePair[1]) || '';
//     });
//     return result;
// }

// // Atualizando Dados a partir da API
// function carregaDados(json){
//     const pai = document.querySelector(".main-banner_banner_contents");
//     pai.firstElementChild.firstElementChild.setAttribute("src", `https://image.tmdb.org/t/p/w300${json.poster_path}`); // Atualiza Banner Principal
    
//     pai.parentElement.parentElement.style.backgroundColor = "#efefef";
//     console.log(`https://image.tmdb.org/t/p/w300${json.backdrop_path}`);
//     console.log(pai.parentElement.parentElement);

//     const dados = pai.lastElementChild.firstElementChild;
//     const title = dados.firstElementChild.firstElementChild;

//     title.firstElementChild.innerHTML = `${json.title}`; // Título
//     const date = new Date(json.release_date); // Ano de Estréia
//     title.lastElementChild.innerHTML = `${date.getFullYear()}`

//     console.log(title.nextElementSibling)
// }