// Pegando os Elementos na DOM
const fPesquisa = document.querySelector("form"); // Formulário da Pesquisa
const lista = document.querySelector(".lista"); // Pega  a div em que o conteúdo 'Popular' aparece (Apenas para demonstração)

// Adicionando Eventos
fPesquisa.onsubmit = (ev) =>{ // Quando a pesquisa é submetida...
    ev.preventDefault(); // Não permite que a página reenicie
    const resultados = document.querySelector("#s02 .lista"); // Pega a div dos resultados para a preencher
    let busca = ev.target.pesquisa.value; // Pega o valor de dentro da pesquisa

    if (busca != ""){ // Se a busca for diferente de vazio...
        fetch(`https://api.themoviedb.org/3/search/movie?query=${busca}&include_adult=false&language=pt-BR&page=1`, options) // API, enviando a String busca e recebendo o resultado da busca
            .then(response => response.json()) // Formato JSON
            .then(json => carregaFilmes(resultados, json)) // Chama a função que carrega os filmes
        pesquisa(); // Altera as divs da tela inicial para a de pesquisa
    }

}


// Funções 
function pesquisa(){ // Função que mostra a div responsável pelos resultados
    const areas = document.querySelectorAll(".area");
    areas[0].style.display = "none";
    areas[1].style.display = "block";
}

const carregaFilmes = (lista, json) => { //Carrega o JSON, guardando os elementos na div correspondente
    const itens = lista.lastElementChild;

    json.results.forEach(element => { // Para cada elemento de results de Json...
        let item = document.createElement('div'); // Cria a div
        item.classList.add('item'); // Adiciona a classe item, o estilizando
        
        item.innerHTML = `<a href="visualizacaoProducao.html?query=${element.id}">
        <img src="https://image.tmdb.org/t/p/w300${element.poster_path}"}>
        <span>${element.title}</span>
        </a>`; // Cria o item com sua imagem, link e título
        
        itens.appendChild(item); // Adiciona o item à div itens
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

fetch('https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1', options) // Recebe os dados da lista 'popular' da API
    .then(response => response.json())
    .then(json => carregaFilmes(lista, json))


