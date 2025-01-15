document.addEventListener('DOMContentLoaded', function() {
    // Get tag ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const tagId = urlParams.get('query');
    
    if (tagId) {
        // Fetch tag information
        fetch(`./php/receberInfoTag.php?tagId=${tagId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Update page title with tag name
                    document.querySelector('h1').textContent = data.tag.nome;
                    
                    // Update access count if available
                    const subtitle = document.getElementById('subtitulo');
                    if (subtitle && data.tag.num_producoes) {
                        subtitle.textContent = `${data.tag.num_producoes} ${data.tag.num_producoes === 1 ? 'produção' : 'produções'}`;
                    }
                    
                    // Load associated productions
                    loadTagProductions(tagId);
                } else {
                    console.error('Erro ao carregar informações da tag:', data.message);
                }
            })
            .catch(error => console.error('Erro na requisição:', error));
    }
});

// TMDB API configuration
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWExZjFhNGRjYzY2M2EzMTRlNmUwMDhhOGI5YWEyYyIsInN1YiI6IjY1ZDkxNjJiMGYwZGE1MDE2MjMyMjViMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCV25ZQQfVb7YOVnVVFI_xn7MAnNYMbZRrj0SApcL7k'
    }
};

function loadTagProductions(tagId) {
    fetch(`./php/receberProducoesTag.php?tagId=${tagId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const container = document.querySelector('.itens.resultados');
                container.innerHTML = ''; // Clear existing content
                
                // Process each production sequentially
                data.productions.forEach(prod => {
                    fetchTMDBDetails(prod)
                        .then(tmdbData => {
                            const productionElement = createProductionCard(prod, tmdbData);
                            container.appendChild(productionElement);
                        })
                        .catch(error => {
                            console.error('Erro ao buscar dados do TMDB:', error);
                            const productionElement = createProductionCard(prod);
                            container.appendChild(productionElement);
                        });
                });
            } else {
                console.error('Erro ao carregar produções:', data.message);
            }
        })
        .catch(error => console.error('Erro na requisição:', error));
}

async function fetchTMDBDetails(production) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${production.idAPI}?language=pt-BR`, options);
        if (!response.ok) {
            throw new Error('Erro na resposta da API TMDB');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar dados do TMDB:', error);
        throw error;
    }
}

function createProductionCard(production, tmdbData = null) {
    const card = document.createElement('a');
    card.href = `visualizacaoProducao.php?query=${production.idAPI}&type=movie`;
    card.className = 'item filme';
    
    // Use TMDB data if available, fallback to local data or defaults
    const posterPath = tmdbData?.poster_path 
        ? `https://image.tmdb.org/t/p/w300${tmdbData.poster_path}`
        : "img/placeholder/MovieTag-NotFoundImage.png";
    
    const releaseYear = tmdbData?.release_date 
        ? `(${new Date(tmdbData.release_date).getFullYear()})` 
        : '';
    
    const overview = tmdbData?.overview || '';
    
    // Ensure we're only using the tags that belong to this specific production
    const tagsList = Array.isArray(production.tags) 
        ? production.tags.map(tag => `<li>${tag}</li>`).join('') 
        : '';
    
    card.innerHTML = `
        <img src="${posterPath}" alt="Poster da Produção">
        <div>
            <h2>${production.nomeProd}${releaseYear ? ` <span>${releaseYear}</span>` : ''}</h2>
            <ul class="tags">
                ${tagsList}
            </ul>
            ${overview ? `<p>${overview}</p>` : ''}
        </div>
    `;
    
    return card;
}