// Pegando os Elementos na DOM
const fPesquisa = document.querySelector("form"); // Formulário da Pesquisa
const lista = document.querySelectorAll(".lista"); // Pega  a div em que o conteúdo 'Popular' aparece (Apenas para demonstração)

// Adicionando Eventos
fPesquisa.onsubmit = (ev) =>{ // Quando a pesquisa é submetida...
    ev.preventDefault(); // Não permite que a página reenicie
    const resultados = document.querySelector("#s02 .lista"); // Pega a div dos resultados para a preencher
    let busca = ev.target.pesquisa.value; // Pega o valor de dentro da pesquisa

    if (busca != ""){ // Se a busca for diferente de vazio...
        fetch(`https://api.themoviedb.org/3/search/multi?query=${busca}}&include_adult=false&language=pt-BR&page=1`, options)
            .then(response => response.json())
            .then(response => carregaFilmes(resultados, response))
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

    itens.replaceChildren();

    json.results.forEach(element => { // Para cada elemento de results de Json...
        let item = document.createElement('div'); // Cria a div
        item.classList.add('item'); // Adiciona a classe item, o estilizando
        console.log(element.media_type)
        if (element.media_type === "movie"){
            let url = `https://image.tmdb.org/t/p/w300${element.poster_path}`;
            if (element.poster_path === null){
                url = "./img/placeholder/MovieTag-NotFoundImage.png";
            };

            item.innerHTML = `<a href="visualizacaoProducao.html?type=movie&query=${element.id}">
            <img src=${url}>
            <span>${element.title}</span>
            </a>`; // Cria o item com sua imagem, link e título
            itens.appendChild(item); // Adiciona o item à div itens
        } else if(element.media_type === "person"){
            let url = `https://image.tmdb.org/t/p/w300${element.profile_path}`;
            if (element.profile_path === null){
                url = "./img/placeholder/MovieTag-NotFoundImage.png";
            };
            
            item.innerHTML = `<a href="visualizacaoIntegrante.html?type=person&query=${element.id}">
            <img src=${url}>
            <span>${element.name}</span>
            </a>`; // Cria o item com sua imagem, link e título
            itens.appendChild(item); // Adiciona o item à div itens

        } else if(element.media_type === "tv"){
            let url = `https://image.tmdb.org/t/p/w300${element.poster_path}`;
            if (element.poster_path === null){
                url = "./img/placeholder/MovieTag-NotFoundImage.png";
            };

            item.innerHTML = `<a href="visualizacaoProducao.html?type=tv&query=${element.id}">
            <img src=${url}>
            <span>${element.name}</span>
            </a>`; // Cria o item com sua imagem, link e título
            itens.appendChild(item); // Adiciona o item à div itens
        } else{
            let url = `https://image.tmdb.org/t/p/w300${element.poster_path}`;
            if (element.poster_path === null) {
                url = "./img/placeholder/MovieTag-NotFoundImage.png";
            };


            item.innerHTML = `<a href="visualizacaoProducao.html?type=movie&query=${element.id}">
            <img src=${url}>
            <span>${element.title}</span>
            </a>`; // Cria o item com sua imagem, link e título
            itens.appendChild(item); // Adiciona o item à div itens
        }

        

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
    .then(json => carregaFilmes(lista[0], json))

fetch('https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1', options)
    .then(response => response.json())
    .then(json => carregaFilmes(lista[1], json))


fetch('https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1', options)
    .then(response => response.json())
    .then(json => carregaFilmes(lista[2], json))


