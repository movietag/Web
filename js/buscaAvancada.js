//Obtendo os objetos da DOM

const filtros = document.querySelectorAll(".divInput"); // Pega todos os filtros da página
const divs = document.querySelectorAll(".rotulo"); // Pega todas as divs
const botao = document.querySelector("#botaoPesquisar"); // Botão de pesquisar
// const resultados = document.getElementById("resultados"); // Div de resultados
const resultados = document.querySelector(".itens");
const antes = document.getElementById("antesPesquisa"); // Div que aparece antes da pesquisa
const mostrar = document.querySelector("#botaoMostrar"); //Botão que mostra os filtros
const esconder = document.querySelector("#botaoEsconder"); // Botão que esconde os filtros
//const classifs = document.querySelector(".divClassifInd"); //pegando a div que contem os botoes de classificacao

loading = document.querySelector('.wrapperLoading');

// Adicionando Eventos aos Objetos

botao.addEventListener("click", function(){ // Evento de aparecer o resultado da pesquisa
    antes.style.display = "none";
    resultados.style.display = "block";
}); 

for (i = 0; i<divs.length; i++){ //repeticao pegando todas as setas e adicionando o evento de click para cada rotulo
    let div = divs[i];
    let elem = filtros[i];
    div.addEventListener("click", function() {mostraFiltro(div, elem)});
}

mostrar.addEventListener("click", function(){mostrarTodos(mostrar, esconder)}); // Evento para mostrar os filtros
esconder.addEventListener("click", function(){esconderTodos(mostrar, esconder)}); // Evento para ocultar todos os filtros
/*
for(i = 0; i <classifs.childElementCount; i++){
    //mudando o fundo das classificacoes caso clicadas
    let cont = i;
    classifs.children[cont].addEventListener("click", function(){
        switch (cont){
            case 0:
                classifs.children[cont].classList.toggle("livreC");
                break;

            case 1:
                classifs.children[cont].classList.toggle("dezC");
                break;

            case 2:
                classifs.children[cont].classList.toggle("dozeC");
                break;

            case 3:
                classifs.children[cont].classList.toggle("catorzeC");
                break;

            case 4:
                classifs.children[cont].classList.toggle("dezesseisC");
                break;

            case 5:
                classifs.children[cont].classList.toggle("dezoitoC");
                break;
        }
    })
}*/


// Oculta os filtros

inicioFiltros();


// Funções do Código

function inicioFiltros(){ // Oculta os filtros quando a página é iniciada
    for (i = 0; i < filtros.length; i++){
        filtros[i].classList.toggle("filtro-show");
    }
}

function mostraFiltro(div, elem){ // Torna visível o filtro
    elem.classList.toggle("filtro-show");
    trocaSeta(div);
}

function trocaSeta(div){ //gira as setas de acordo com se o input está mostrando ou nao
    div.lastChild.classList.toggle("cima");
}

function mostrarTodos(mos, esc){  // funcao para mostrar os filtros
    for (i = 0; i < filtros.length; i++){
        mostraFiltro(divs[i], filtros[i]);
    }
    mos.style.display = "none";
    esc.style.display = "block";
}

function esconderTodos(mos, esc){ // Evento para ocultar todos os filtros
    for (i = 0; i < filtros.length; i++){
        mostraFiltro(divs[i], filtros[i]);
    }
    mos.style.display = "block";
    esc.style.display = "none";
}

// Configuracao da API 
const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWExZjFhNGRjYzY2M2EzMTRlNmUwMDhhOGI5YWEyYyIsInN1YiI6IjY1ZDkxNjJiMGYwZGE1MDE2MjMyMjViMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCV25ZQQfVb7YOVnVVFI_xn7MAnNYMbZRrj0SApcL7k';

// Elementos DOM
const searchForm = document.getElementById('buscaAvancada');
const resultsContainer = document.querySelector('.resultados');
const beforeSearchDiv = document.getElementById('antesPesquisa');
const sortSelect = document.querySelector('select[name="ordem"]');

// Configuracao opcoes API
const apiOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: API_KEY
    }
};

// Event Listeners
searchForm.addEventListener('submit', handleSearch);
sortSelect.addEventListener('change', handleSort);

// Evento para busca manual no botão
botao.addEventListener("click", function() { 
    handleSearch();
});

// Debounce para evitar múltiplas requisições seguidas
function debounce(func, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

// Função principal de busca
async function handleSearch(e) {
    if (e) e.preventDefault();
    
    const filters = collectFilters();

    // Verifica se pelo menos um filtro foi preenchido antes de buscar
    const hasFilters = Object.values(filters).some(value => value && value.length > 0);
    
    if (!hasFilters) {
        console.log("Nenhum filtro aplicado. Pesquisa não realizada.");
        return;
    }

    // Se o nome da produção estiver vazio, busca geral com filtros aplicados
    if (!filters.title) {
        console.log("Realizando pesquisa geral com filtros selecionados...");
        delete filters.title; // Remove o campo vazio para evitar conflitos
    }

    const results = await searchTMDB(filters);
    

    if (results.length > 0) {
        displayResults(results);
        beforeSearchDiv.style.display = 'none';
        resultsContainer.style.display = 'block';
    } else {
        beforeSearchDiv.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        beforeSearchDiv.style.display = 'block';
        resultsContainer.style.display = 'none';
    }
}


// Atualização na coleta de filtros para evitar conflitos
function collectFilters() {
    return {
        title: document.getElementById('tituloProducao').value.trim(),
        year: document.getElementById('anoLancamento').value.trim(),
        vote_average_gte: document.getElementById('avaliacaoMenor').value ? document.getElementById('avaliacaoMenor').value / 10 : '',
        vote_average_lte: document.getElementById('avaliacaoMaior').value ? document.getElementById('avaliacaoMaior').value / 10 : '',
        //certification: getSelectedClassification(),
        media_type: Array.from(document.querySelectorAll('input[name="tipo[]"]:checked')).map(cb => cb.value)
    };
}

// Obter classificação indicativa selecionada
/*function getSelectedClassification() {
    const selectedButton = document.querySelector('.classifInd[class*="C"]');
    if (!selectedButton) return null;
    
    const classMap = {
        'livreC': 'L',
        'dezC': '10',
        'dozeC': '12',
        'catorzeC': '14',
        'dezesseisC': '16',
        'dezoitoC': '18'
    };
    
    for (const [className, value] of Object.entries(classMap)) {
        if (selectedButton.classList.contains(className)) return value;
    }
    return null;
}*/

// Search TMDB API with filters
async function searchTMDB(filters) {
    loading.style.display = 'block';
    let results = [];
    const types = filters.media_type.length > 0 ? filters.media_type : ['movie', 'tv'];
    const maxPages = 10; // Número de páginas a serem requisitadas

    for (const type of types) {
        try {
            // Construir os parâmetros da consulta com os filtros fornecidos
            const queryParams = new URLSearchParams({
                language: 'pt-BR',
                include_adult: false
            });

            if (filters.vote_average_gte) queryParams.append('vote_average.gte', filters.vote_average_gte);
            if (filters.vote_average_lte) queryParams.append('vote_average.lte', filters.vote_average_lte);
            //if (filters.certification) queryParams.append('certification', filters.certification);

            let urlBase = `https://api.themoviedb.org/3/discover/${type}?${queryParams}`;
            
            if (filters.title) {
                queryParams.append('query', filters.title);
                urlBase = `https://api.themoviedb.org/3/search/${type}?${queryParams}`;
            }

            for (let page = 1; page <= maxPages; page++) {
                const url = `${urlBase}&page=${page}`;
                const response = await fetch(url, apiOptions);
                const data = await response.json();
                
                // Filtrar exatamente pelo ano fornecido pelo usuário (se houver)
                results = [
                    ...results,
                    ...data.results
                        .map(item => ({ ...item, media_type: type }))
                        .filter(item => {
                            if (filters.year) {
                                const yearField = item.media_type === 'movie' ? 'release_date' : 'first_air_date';
                                return item[yearField] && item[yearField].startsWith(filters.year);
                            }
                            return true;
                        })
                ];
            }
        } catch (error) {
            console.error(`Erro ao buscar ${type}:`, error);
        }
    }

    loading.style.display = 'none';
    return results;
}





// Display results in the UI with default sorting
function displayResults(results) {
    // Ordena os resultados por melhor avaliação antes de exibi-los na primeira vez
    results.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));

    const container = resultsContainer.querySelector('.itens');
    container.innerHTML = ''; // Clear previous results

    results.forEach(item => {
        const posterUrl = item.poster_path 
            ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
            : 'img/placeholder/MovieTag-NotFoundImage.png';

        const title = item.title || item.name;
        const year = item.release_date || item.first_air_date;
        const yearFormatted = year ? `(${year.split('-')[0]})` : '';

        

        const resultHtml = `
            <a href="visualizacaoProducao.php?type=${item.media_type}&query=${item.id}" class="item filme">
                <img src="${posterUrl}" alt="Poster de ${title}">
                <div>
                    <h2>${title}<span>${yearFormatted}</span></h2>
                    <ul class="tags">
                        ${generateTags(item)}
                    </ul>
                    <p>${item.overview || 'Descrição não disponível.'}</p>
                </div>
            </a>
        `;
        

        container.insertAdjacentHTML('beforeend', resultHtml);
    });
}


// Generate tags for a result item
function generateTags(item) {
    const tags = [];
    
    if (item.vote_average) {
        tags.push(`Avaliação: ${(item.vote_average * 10).toFixed(1)}%`);
    }
    
    if (item.media_type === 'movie') {
        tags.push('Filme');
    } else if (item.media_type === 'tv') {
        tags.push('Série');
    }
    
    return tags.map(tag => `<li>${tag}</li>`).join('');
}

// Handle sorting of results
function handleSort() {
    const container = resultsContainer.querySelector('.itens');
    const items = Array.from(container.querySelectorAll('.item'));
    
    items.sort((a, b) => {
        const valueA = getItemSortValue(a);
        const valueB = getItemSortValue(b);
        
        switch (sortSelect.value) {
            case 'melAval':
                return valueB.rating - valueA.rating;
            case 'mRecente':
                return valueB.year - valueA.year;
            case 'mAntigo':
                return valueA.year - valueB.year;
            default:
                return 0;
        }
    });
    
    container.innerHTML = '';
    items.forEach(item => container.appendChild(item));
}

// Get sort values from an item
function getItemSortValue(item) {
    let rating = 0;

    const yearSpan = item.querySelector('h2 span');
    const year = yearSpan ? parseInt(yearSpan.textContent.replace(/[()]/g, '')) : 0;
    
    // Corrigindo a extração da avaliação
    const ratingTag = Array.from(item.querySelectorAll('.tags li')).find(tag => tag.textContent.includes('Avaliação'));
    if (ratingTag) {
        rating = parseFloat(ratingTag.textContent.match(/\d+\.\d+/)) || 0;
    }

    return { year, rating };
}


// Initialize sort select
sortSelect.value = 'melAval';