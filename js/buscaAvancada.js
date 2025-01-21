//Obtendo os objetos da DOM

const filtros = document.querySelectorAll(".divInput"); // Pega todos os filtros da página
const divs = document.querySelectorAll(".rotulo"); // Pega todas as divs
const botao = document.querySelector("#botaoPesquisar"); // Botão de pesquisar
// const resultados = document.getElementById("resultados"); // Div de resultados
const resultados = document.querySelector(".itens");
const antes = document.getElementById("antesPesquisa"); // Div que aparece antes da pesquisa
const mostrar = document.querySelector("#botaoMostrar"); //Botão que mostra os filtros
const esconder = document.querySelector("#botaoEsconder"); // Botão que esconde os filtros
const classifs = document.querySelector(".divClassifInd"); //pegando a div que contem os botoes de classificacao


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
}


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

// Pesquisa Manual principal
async function handleSearch(e) {
    e.preventDefault();
    
    const filters = collectFilters();
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

// Coleta todos os filtros
function collectFilters() {
    const filters = {
        title: document.getElementById('tituloProducao').value,
        year: document.getElementById('anoLancamento').value,
        vote_average_gte: document.getElementById('avaliacaoMenor').value / 10,
        vote_average_lte: document.getElementById('avaliacaoMaior').value / 10,
        //with_genres: document.getElementById('genero').value,
        //with_keywords: document.getElementById('tag').value,
        with_original_language: document.getElementById('idioma').value,
        'with_runtime.lte': document.getElementById('duracao').value,
        certification: getSelectedClassification(),
        media_type: Array.from(document.querySelectorAll('input[name="tipo[]"]:checked')).map(cb => cb.value),
        platforms: Array.from(document.querySelectorAll('input[name="plataformas[]"]:checked')).map(cb => cb.value)
    };
    
    return filters;
}

// Coletar classificao inidicativa
function getSelectedClassification() {
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
}

// Search TMDB API with filters
async function searchTMDB(filters) {
    let results = [];
    const types = filters.media_type.length > 0 ? filters.media_type : ['movie', 'tv'];
    
    for (const type of types) {
        const baseUrl = `https://api.themoviedb.org/3/discover/${type}`;
        let queryParams = new URLSearchParams({
            language: 'pt-BR',
            include_adult: false,
            page: 1
        });
        
        // Add filters to query params
        if (filters.title) queryParams.append('query', filters.title);
        if (filters.year) queryParams.append('primary_release_year', filters.year);
        if (filters.vote_average_gte) queryParams.append('vote_average.gte', filters.vote_average_gte);
        if (filters.vote_average_lte) queryParams.append('vote_average.lte', filters.vote_average_lte);
        //if (filters.with_genres) queryParams.append('with_genres', filters.with_genres);
        //if (filters.with_keywords) queryParams.append('with_keywords', filters.with_keywords);
        if (filters.with_original_language) queryParams.append('with_original_language', filters.with_original_language);
        if (filters['with_runtime.lte']) queryParams.append('with_runtime.lte', filters['with_runtime.lte']);
        
        try {
            const response = await fetch(`${baseUrl}?${queryParams}`, apiOptions);
            const data = await response.json();
            
            // Add media_type to each result
            const typeResults = data.results.map(item => ({
                ...item,
                media_type: type
            }));
            
            results = [...results, ...typeResults];
        } catch (error) {
            console.error('Error fetching from TMDB:', error);
        }
    }
    
    return results;
}

// Display results in the UI
function displayResults(results) {
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
    const yearSpan = item.querySelector('h2 span');
    const year = yearSpan ? parseInt(yearSpan.textContent.replace(/[()]/g, '')) : 0;
    
    const ratingTag = item.querySelector('.tags li');
    const rating = ratingTag ? parseFloat(ratingTag.textContent.match(/\d+\.\d+/)[0]) : 0;
    
    return { year, rating };
}

// Initialize sort select
sortSelect.value = 'melAval';