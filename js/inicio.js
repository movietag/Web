// Pegando os Elementos na DOM
const fPesquisa = document.querySelector("form"); // Formulário da Pesquisa
const lista = document.querySelector(".lista"); // Pega  a div em que o conteúdo 'Popular' aparece (Apenas para demonstração)

// Adicionando Eventos
fPesquisa.onsubmit = (ev) =>{ // Quando a pesquisa é submetida...
    ev.preventDefault(); // Não permite que a página reenicie
    const resultados = document.querySelector("#s02 .lista"); // Pega a div dos resultados para a preencher
    let busca = ev.target.pesquisa.value; // Pega o valor de dentro da pesquisa
    fetch(`https://api.themoviedb.org/3/search/movie?query=${busca}&include_adult=false&language=pt-BR&page=1`, options) // API, enviando a busca
        .then(response => response.json())
        .then(json => carregaFilmes(resultados, json))

    console.log(resultados);
    pesquisa();
}


// Funções 
function pesquisa(){
    const areas = document.querySelectorAll(".area");
    areas[0].style.display = "none";
    areas[1].style.display = "block";
}

const carregaFilmes = (lista, json) => { //Carrega o JSON, guardando os elementos na div correspondente
    const itens = lista.lastElementChild;
    itens.replaceChildren();

    json.results.forEach(element => {
        let item = document.createElement('div');
        item.classList.add('item');
        
        item.innerHTML = `<a href="../visualizacaoProducao.html?query=${element.id}">
        <img src="https://image.tmdb.org/t/p/w300${element.poster_path}"}>
        <span>${element.original_title}</span>
        </a>`;
        
        itens.appendChild(item);
    });
}

// API
const options = { //Opções enviadas para a API
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWExZjFhNGRjYzY2M2EzMTRlNmUwMDhhOGI5YWEyYyIsInN1YiI6IjY1ZDkxNjJiMGYwZGE1MDE2MjMyMjViMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCV25ZQQfVb7YOVnVVFI_xn7MAnNYMbZRrj0SApcL7k'
    }
  };

fetch('https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1', options)
    .then(response => response.json())
    .then(json => carregaFilmes(lista, json))


