const fPesquisa = document.querySelector("form");
const bPesquisar = document.querySelector("#pesq1");
const lista = document.querySelector(".lista");

bPesquisar.addEventListener("click", pesquisa);

function pesquisa(){
    const areas = document.querySelectorAll(".area");
    areas[0].style.display = "none";
    areas[1].style.display = "block";
}

// API
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWExZjFhNGRjYzY2M2EzMTRlNmUwMDhhOGI5YWEyYyIsInN1YiI6IjY1ZDkxNjJiMGYwZGE1MDE2MjMyMjViMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCV25ZQQfVb7YOVnVVFI_xn7MAnNYMbZRrj0SApcL7k'
    }
  };

fetch('https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1', options)
    .then(response => response.json())
    .then(json => carregaLista(json))
    .then(response => console.log(response))
    .catch(err => console.error(err));

const carregaLista = (json) => {
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
