const opcoesApi = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWExZjFhNGRjYzY2M2EzMTRlNmUwMDhhOGI5YWEyYyIsInN1YiI6IjY1ZDkxNjJiMGYwZGE1MDE2MjMyMjViMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCV25ZQQfVb7YOVnVVFI_xn7MAnNYMbZRrj0SApcL7k'
    }
};

const urlParams = new URLSearchParams(window.location.search);
const idLista = urlParams.get('id');

if (idLista) {
    // Fetch tag information
    fetch(`./php/receberLista.php?idLista=${idLista}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                atualizaDados(data.lista).then(listaAtualizada => {
                    carregaDados(listaAtualizada);
                });
            } else {
                console.error('Erro ao carregar lista:', data.message);
            }
        })
}

async function atualizaDados(dadosLista) {
    // Mapeia as produções para incluir os dados do TMDb
    const promessas = dadosLista.producoes.map(async element => {
        const { idProd, idAPI, tipoProd } = element;

        if (tipoProd === "movie") {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${idAPI}?append_to_response=20&language=pt-BR`, options);
            const dadosTmdb = await response.json();

                // Mescla os dados do TMDb com as informações originais
            return {
                idProd,
                idAPI,
                tipoProd,
                tmdbData: dadosTmdb // Dados da API do TMDb
            };
        } else if(tipoProd === "tv"){
            const response = await fetch(`https://api.themoviedb.org/3/tv/${idAPI}?append_to_response=20&language=pt-BR`, options);
            const dadosTmdb = await response.json();

                // Mescla os dados do TMDb com as informações originais
            return {
                idProd,
                idAPI,
                tipoProd,
                tmdbData: dadosTmdb // Dados da API do TMDb
            };
        }
    });

    // Aguarda todas as requisições serem concluídas
    dadosLista.producoes = await Promise.all(promessas);
    return dadosLista;
}

function carregaDados(lista) {
    const titulo = document.querySelector('#tituloLista');
    titulo.textContent = lista.nome;

    const producoesContainer = document.querySelector('.itens.resultados'); // Seleciona o contêiner para produções
    producoesContainer.innerHTML = ''; // Limpa o contêiner

    lista.producoes.forEach(producao => {
        // Criação do link que contém a produção
        const link = document.createElement('a');
        link.href = `visualizacaoProducao.php?type=${producao.tipoProd}&query=${producao.idAPI}`;
        link.className = 'item filme';

        // Adiciona o poster (imagem)
        const img = document.createElement('img');
        img.src = producao.tmdbData?.poster_path
            ? `https://image.tmdb.org/t/p/w500${producao.tmdbData.poster_path}`
            : 'img/placeholder/MovieTag-NotFoundImage.png'; // Exemplo de imagem padrão
        img.alt = `Poster de ${producao.tmdbData?.title || 'Filme'}`;
        link.appendChild(img);

        // Criação da div para texto
        const textoDiv = document.createElement('div');

        // Adiciona título e ano
        const tituloH2 = document.createElement('h2');
        tituloH2.innerHTML = `
            ${producao.tmdbData?.title || 'Título não disponível'}
            <span>(${producao.tmdbData?.release_date?.split('-')[0] || 'Ano desconhecido'})</span>
        `;
        textoDiv.appendChild(tituloH2);

        // Adiciona descrição
        const descricaoP = document.createElement('p');
        descricaoP.textContent = producao.tmdbData?.overview || 'Descrição não disponível.';
        textoDiv.appendChild(descricaoP);

        // Adiciona a div de texto ao link
        link.appendChild(textoDiv);

        // Adiciona o link ao contêiner de produções
        producoesContainer.appendChild(link);
    });
}


// Seleciona o botão e o diálogo
const openNovaProd = document.getElementById('novaProducao');
const dialogNovaProd = document.getElementById('buscarFilme');
const fechar = document.getElementById('botaoCancel');

// Abre o diálogo quando o botão é clicado
openNovaProd.addEventListener('click', () => {
    dialogNovaProd.showModal(); // Exibe o diálogo como modal
});

// Fecha o diálogo ao clicar no botão "Cancelar"
fechar.addEventListener('click', () => {
    dialogNovaProd.close(); // Fecha o diálogo
});

const inputTitulo = document.querySelector('#tituloFilme');
const lista = document.querySelector('.dialog-content');

inputTitulo.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        let texto = inputTitulo.value;
        console.log(texto);
        buscarFilmes(texto, lista);
    }
  });

// Função para buscar filmes na API
function buscarFilmes(termo, lista){
    const url = `https://api.themoviedb.org/3/search/multi?query=${termo}&include_adult=false&language=pt-BR&page=1`;

    fetch(url, opcoesApi)
        .then(response => response.json())
        .then(dados => carregarFilmes(lista, dados));
};

function carregarFilmes(lista, dados) {
    // Limpa a lista existente
    lista.replaceChildren();

    // Itera sobre os resultados
    dados.results.forEach(item => {
        console.log(item);

        if(item.media_type === "movie" || item.media_type === "tv"){
            // Cria o elemento <a> com a classe "filmeBusca"
            const link = document.createElement('a');
            // link.href = item.url || '#'; // Substitua por um link válido se disponível
            link.classList.add('filmeBusca');

            // Cria o elemento <img> para o poster
            const img = document.createElement('img');
            img.src = criarUrlImagem(item.poster_path, 'MovieTag-NotFoundImage.png');
            img.alt = `Poster de ${item.title??item.name}`;

            // Cria o elemento <div> para o texto
            const textDiv = document.createElement('div');

            // Adiciona o título e o ano
            const title = document.createElement('h2');
            title.innerHTML = `${item.title??item.name}<span>(${item.year || 'N/A'})</span>`;

            // // Adiciona o nome do diretor/criador
            // const director = document.createElement('p');
            // director.textContent = item.director ? `Dirigido por ${item.director}` : `Criado por ${item.creator}`;

            // Adiciona o tipo (Filme ou Série)
            const type = document.createElement('p');
            type.textContent = item.media_type || 'Desconhecido';

            // Anexa os elementos ao <div>
            textDiv.appendChild(title);
            // textDiv.appendChild(director);
            textDiv.appendChild(type);

            // Anexa o <img> e o <div> ao <a>
            link.appendChild(img);
            link.appendChild(textDiv);

            // Adiciona um separador <hr>
            const separator = document.createElement('hr');

            // Adiciona o <a> e <hr> à lista

            link.addEventListener('click', (ev)=>{
                adicionarFilmeLista(item.id, item.title??item.name, item.media_type);
            });
            lista.appendChild(link);
            lista.appendChild(separator);
        }

    });
}

// Função para criar a URL da imagem ou usar uma imagem substituta se não houver
function criarUrlImagem(caminho, imagemPadrao){
    return caminho ? `https://image.tmdb.org/t/p/w300${caminho}` : `./img/placeholder/${imagemPadrao}`;
};

function adicionarFilmeLista(id, nome, tipoProd){
    fetch('adicionarProducaoLista.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, nome, tipoProd})
    }
    .then(response => response.json())

    )
}



