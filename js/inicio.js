// Elementos da DOM
const formularioPesquisa = document.querySelector("form"); // Formulário de pesquisa
const listasFilmes = document.querySelectorAll(".lista"); // Lista de filmes popular e outras
const seletores = document.querySelectorAll('.seletor');

// Cache de requisições
const cache = {};

// Opções de configuração da API
const opcoesApi = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWExZjFhNGRjYzY2M2EzMTRlNmUwMDhhOGI5YWEyYyIsInN1YiI6IjY1ZDkxNjJiMGYwZGE1MDE2MjMyMjViMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCV25ZQQfVb7YOVnVVFI_xn7MAnNYMbZRrj0SApcL7k'
    }
};

const fetchComCache = (url) => {
    // Verifica se a resposta já está no cache
    if (cache[url]) {
        return Promise.resolve(cache[url]); // Retorna os dados do cache
    }

    // Se não estiver no cache, faz a requisição
    return fetch(url, opcoesApi)
        .then(response => response.json())
        .then(data => {
            cache[url] = data; // Armazena o resultado no cache
            return data; // Retorna os dados da API
        })
        .catch(error => {
            console.error(`Erro ao fazer fetch para a URL: ${url}`, error);
            throw error; // Propaga o erro para ser tratado externamente
        });
};

// Evento de Troca da Lista para Filme/Serie
listasFilmes.forEach(lista => {
    const seletores = lista.querySelectorAll('.seletor');

    seletores.forEach(seletor => {
        seletor.addEventListener('click', () => {
            // Remove a classe "selecionado" do seletor oposto
            seletores.forEach(s => {
                if (s !== seletor) {
                    s.classList.remove('selecionado');
                }
            });
            // Adiciona a classe "selecionado" ao seletor clicado
            seletor.classList.add('selecionado');
            // Chame sua função para alterar a lista se necessário
            alteraLista(seletor);
        });
    });
});

function alteraLista(seletor) {
    let url = '';

    switch (seletor.dataset.name) {
        case 'filmePopular':
            url = 'https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1';
            break;
        case 'seriePopular':
            url = 'https://api.themoviedb.org/3/tv/popular?language=pt-BR&page=1';
            break;
        case 'filmeTop':
            url = 'https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1';
            break;
        case 'serieTop':
            url = 'https://api.themoviedb.org/3/tv/top_rated?language=pt-BR&page=1';
            break;
        case 'serieNovidade':
            url = 'https://api.themoviedb.org/3/tv/on_the_air?language=pt-BR&page=1';
            break;
        case 'filmeNovidade':
            url = 'https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1';
            break;
    }

    if (url) {
        // Usa a função fetchComCache em vez do fetch diretamente
        fetchComCache(url)
            .then(res => itensComMediaType(res, seletor.dataset.name.includes('filme') ? "movie" : "tv"))
            .then(res => carregarFilmes(seletor.parentElement.parentElement.parentElement, res))
            .catch(error => {
                console.error('Erro ao carregar lista:', error);
            });
    }
}


function itensComMediaType(json, type){
    json.results.forEach(item => {
        item.media_type = type;  // Modifica diretamente o item dentro de json.results
    });

    return json;  // Retorna o JSON modificado
}


// Mantenha todo o código existente e adicione/modifique as seguintes partes:

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("pesquisa");
    const highlight = document.getElementById("highlight");
    const tagsList = []; // Lista para armazenar as tags
    const formularioPesquisa = document.querySelector("form");

    input.addEventListener("input", () => {
        const text = input.value;
        // Captura apenas palavras começando com #, ignora o resto
        const newTags = text.match(/#([^\s#]+)/g)?.map(tag => tag.slice(1)) || [];
        
        // Atualiza a lista de tags, garantindo que só tenha valores únicos
        tagsList.length = 0; // Limpa a lista antes de atualizar
        tagsList.push(...new Set(newTags));
        
        // Atualiza o div de destaque com as tags
        const formattedTags = tagsList.map(tag => `<span class="tag">${tag}</span>`);
        highlight.innerHTML = formattedTags.join('');
    });

    // Modificar o evento de submit do formulário
    // Modificar o evento de submit do formulário
    formularioPesquisa.onsubmit = async (evento) => {
        evento.preventDefault();
        const areaResultados = document.querySelector("#s02 .lista");
        const termoPesquisa = input.value;
    
        try {
            // Validação inicial
            const validationResponse = await fetch('./php/validacaoInicio.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    termoPesquisa,
                    tags: tagsList.length > 0 ? tagsList : undefined
                })
            });
            
            const validationData = await validationResponse.json();
            
            if (validationData.status === 'ok') {
                if (tagsList.length > 0) {
                    // Pesquisa por tags
                    const response = await fetch('./php/pesquisarPorTags.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ tags: tagsList })
                    });
                    
                    const data = await response.json();
                    if (data.success) {
                        carregarFilmes(areaResultados, { results: data.productions });
                        exibirAreaPesquisa();
                    }
                } else if (termoPesquisa) {
                    // Pesquisa normal
                    buscarFilmes(termoPesquisa, areaResultados);
                    exibirAreaPesquisa();
                }
            }
        } catch (error) {
            console.error('Erro na pesquisa:', error);
        }
    };
});

// Modificar a função carregarFilmes para incluir tags quando disponíveis
async function carregarFilmes(lista, dados) {
    const containerItens = lista.lastElementChild;
    containerItens.replaceChildren();

    dados.results.forEach(item => {
        const elemento = document.createElement('div');
        elemento.classList.add('item');

        // Adaptar para aceitar tanto dados da API quanto do banco local
        const { urlImagem, nome, urlDetalhes } = gerarDetalhesItem({
            ...item,
            media_type: item.tipoProd || item.media_type,
            poster_path: item.poster_path || item.imagem,
            title: item.title || item.nomeProd,
            name: item.name || item.nomeProd
        });
        
        elemento.addEventListener('click', (ev) => {
            
            fetch('./php/acessarProducao.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: item.id, nome:item.name??item.title, tipoProd:item.media_type})
            })
            .then(response => response.json()) // Converte a resposta do PHP para JSON
            .then(data => {
                if (!data.success) {  // Verifica se o sucesso é true
                    alert("PA");
                    ev.preventDefault(); // Previne a ação padrão temporariamente
                    console.log('Erro:', data.message);
                }
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
            });
        });
        
        
        const tagsHtml = item.tags ? `
            <ul class="tags">
                ${item.tags.map(tag => `<li>${tag}</li>`).join('')}
            </ul>
        ` : '';

        elemento.innerHTML = `
            <a href="${urlDetalhes}">
                <img src="${urlImagem}">
                <div class="item-content">
                    <span>${nome}</span>
                    ${tagsHtml}
                </div>
            </a>
        `;



        containerItens.appendChild(elemento);
    });
};

// Função para buscar filmes na API
const buscarFilmes = (termo, lista) => {
    const url = `https://api.themoviedb.org/3/search/multi?query=${termo}&include_adult=false&language=pt-BR&page=1`;

    fetch(url, opcoesApi)
        .then(response => response.json())
        .then(dados => carregarFilmes(lista, dados));
};

// Função para exibir a área de pesquisa
const exibirAreaPesquisa = () => {
    const areas = document.querySelectorAll(".area");
    areas[0].style.display = "none"; // Esconde a tela inicial
    areas[1].style.display = "block"; // Mostra a tela de resultados
};


// Função para gerar os detalhes de cada item (filme, série ou pessoa)
const gerarDetalhesItem = (item) => {
    let urlImagem;
    let nome;
    let urlDetalhes;
    if("idAPI" in item){
        item.id = item.idAPI;
    }
    console.log(item);

    

    if (item.media_type === "movie") {
        urlImagem = criarUrlImagem(item.poster_path, 'MovieTag-NotFoundImage.png');
        nome = item.title;
        urlDetalhes = `visualizacaoProducao.php?type=movie&query=${item.id}`;
    } else if (item.media_type === "person") {
        urlImagem = criarUrlImagem(item.profile_path, 'MovieTag-NotFoundImage.png');
        nome = item.name;
        urlDetalhes = `visualizacaoIntegrante.php?type=person&query=${item.id}`;
    } else if (item.media_type === "tv") {
        urlImagem = criarUrlImagem(item.poster_path, 'MovieTag-NotFoundImage.png');
        nome = item.name;
        urlDetalhes = `visualizacaoProducao.php?type=tv&query=${item.id}`;
    } else {
        urlImagem = criarUrlImagem(item.poster_path, 'MovieTag-NotFoundImage.png');
        nome = item.title || item.name; // Caso especial
        urlDetalhes = `visualizacaoProducao.php?type=movie&query=${item.id}`;
    }

    return { urlImagem, nome, urlDetalhes };
};

// Função para criar a URL da imagem ou usar uma imagem substituta se não houver
const criarUrlImagem = (caminho, imagemPadrao) => {
    return caminho ? `https://image.tmdb.org/t/p/w300${caminho}` : `./img/placeholder/${imagemPadrao}`;
};

// Carrega listas iniciais da API (Popular, Em exibição, Melhor avaliados)
const carregarListasIniciais = () => {
    const urlsListas = [
        'https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1',
        'https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1',
        'https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1'
    ];

    urlsListas.forEach((url, index) => {
        fetchComCache(url)
            .then(json => itensComMediaType(json, "movie"))
            .then(json => carregarFilmes(listasFilmes[index], json))
            .catch(error => {
                console.error(`Erro ao carregar lista inicial para URL: ${url}`, error);
            });
    });
};

// Inicializa o carregamento das listas iniciais ao carregar a página
carregarListasIniciais();
