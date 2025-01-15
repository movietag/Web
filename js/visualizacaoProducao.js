
// Declaração de Variáveis
let logado = false;
let idProd = null;

// Valores da URL
var myParam = queryObj();

// Ao carregar a página...
document.addEventListener('DOMContentLoaded', function() {

    // Verificar Login
    fetch('./php/fetchLogin.php')
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn){
                logado = true;
                atualizaAvaliacao(); // Atualiza a atualização, se existir
            }
        })
        .catch(error => console.error('Erro ao verificar o login:', error));
    
    const stars = document.querySelectorAll('input[name="rating"]');

    stars.forEach(star => {
        star.addEventListener('click', function () {
            selectedValue = this.value; // Captura o valor selecionado
        });
    });

    carregaTags();
});

function progressBar(value) {
    if (value > 0) {
        value = Math.trunc(value * 10);
        let progressBar = document.querySelector(".circular-progress");
        let valueContainer = document.querySelector(".value-container");

        let progressValue = 0;
        let progressEndValue = value;
        let speed = 1;

        let progress = setInterval(() => {
            progressValue++;
            valueContainer.textContent = `${progressValue}%`;
            progressBar.style.background = `conic-gradient(
                #e6c222 ${progressValue * 3.6}deg,
                #e3dbb5 ${progressValue * 3.6}deg
            )`;
            if (progressValue == progressEndValue) {
                clearInterval(progress);
            }
        }, speed);
    } else {
        // Fundo cinza sólido
        let progressBar = document.querySelector(".circular-progress");
        let valueContainer = document.querySelector(".value-container");

        progressBar.style.background = "rgb(131, 131, 131)"; // Cor cinza sólido
    }
}


// Dialog de Login
//Esconder senha do popup de login
const dialogLogin = document.getElementById('myDialogLogin');
const toggleSenha = document.getElementById('toggleSenha');
/*const loginSenha = document.getElementById('loginSenha');

// Aparecer e desaparecer a senha conforme ícone do olho
toggleSenha.addEventListener('click', () => {
    if (loginSenha.type == 'password') {
        loginSenha.type = 'text';
        toggleSenha.innerHTML = '&#128065;';
    } else {
        loginSenha.type = 'password';
        toggleSenha.innerHTML = '&#128065;'; 
    }
});
*/

//Adicionar Tag
const openButtonAdicionarTag = document.getElementById('openDialogAdicionarTag');
const dialogAdicionarTag = document.getElementById('myDialogAdicionarTag');

const inputTag = document.getElementById('inputTag');
const confirmTag = document.getElementById('confirmTag');
const tagsContainer = document.getElementById('tagsContainer');
const cancelButtonAdicionarTag = document.getElementById('cancelDialogAdicionarTag');

// Ao clicar no botão, abre dialog...
openButtonAdicionarTag.addEventListener('click', () => {
    if(logado){
        dialogAdicionarTag.showModal(); // Exibe o diálogo como modal
    }else{
        dialogLogin.showModal();
    }
    
});

// Fecha o diálogo ao clicar no botão "Cancelar"
cancelButtonAdicionarTag.addEventListener('click', () => {
    dialogAdicionarTag.close(); // Fecha o diálogo
});

// Permite adicionar tag ao pressionar "Enter"
inputTag.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Evita quebra de linha
        adicionarTag();
    }
});

// Enviar possível tag para a lista de tags
confirmTag.addEventListener('click', adicionarTag);

// Ao clicar no botão de confirmar envio das Tags...
document.getElementById('confirmDialogAdicionarTag').addEventListener('click', (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Coleta todas as tags adicionadas no contêiner
    const tags = Array.from(document.querySelectorAll('#tagsContainer .tag')).map(tag =>
        tag.textContent.replace('x', '').trim()
    );
    // Envia as tags para o backend
    fetch('./php/adicionarTag.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tags, id: idProd})
    })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                console.error('Erro ao processar tags: ' + data.message);
            }
        })
        .catch(error => console.error('Erro na requisição:', error));
    
    tagsContainer.replaceChildren;
    carregaTags();
    });


// Função para guardar as tags que o usuário quer adicionar no sistema
function atualizarHiddenTags() {
    if ([...document.querySelectorAll('#tagsContainer .tag')].some(tag => tag.textContent.replace('x', '').trim() === tagText)) {
        alert('Tag já adicionada!');
        return;
    }    
    const tags = Array.from(document.querySelectorAll('#tagsContainer .tag')).map(tag => tag.textContent.replace('x', '').trim());
    document.getElementById('hiddenTags').value = tags.join(',');
}

// Função para adicionar uma nova tag
function adicionarTag() {
    
    const tagText = inputTag.value.trim();
    if (tagText) {
        const newTag = document.createElement('span');
        newTag.className = 'tag';
        newTag.textContent = tagText;

        // Adiciona um botão para remover a tag
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-tag';
        removeBtn.textContent = 'x';
        removeBtn.onclick = () => newTag.remove(); // Remove a tag ao clicar no botão

        newTag.appendChild(removeBtn);
        tagsContainer.appendChild(newTag);

        inputTag.value = ''; // Limpa o input para nova tag
    }
}

// Avaliação
// Seleciona o botão e o diálogo
let selectedValue = null;
let selectedStar = null;
const openButtonAvaliar = document.getElementById('openDialogAvaliar');
const dialogAvaliar = document.getElementById('myDialogAvaliar');
const cancelButtonAvaliar = document.getElementById('cancelDialogAvaliar');
const stars = document.querySelectorAll('.star');


// Eventos
// Fecha o diálogo ao clicar no botão "Avaliar"
document.getElementById('confirmDialogAdicionarTag').addEventListener('click', () => {
    dialogAdicionarTag.close(); // Fecha o diálogo
});

// Abre o diálogo quando o botão é clicado
openButtonAvaliar.addEventListener('click', () => {
    if(logado){
        dialogAvaliar.showModal(); // Exibe o diálogo como modal
    }else{
        dialogLogin.showModal();
    }

});

// Fecha o diálogo ao clicar no botão "Cancelar"
cancelButtonAvaliar.addEventListener('click', () => {
    dialogAvaliar.close(); // Fecha o diálogo
});

// Fecha o diálogo ao clicar no botão "Avaliar"
document.getElementById('confirmDialogAvaliar').addEventListener('click', () => {
    dialogAvaliar.close(); // Fecha o diálogo
    if(selectedValue) enviarAvaliacao(selectedValue);
    console.log(selectedValue);
});

// Pega o elemento de estrela a partir do value do banco
function getLabelByValue(value) {
    // Encontra o input com o valor correspondente
    const input = document.querySelector(`input[name="rating"][value="${value}"]`);
    if (!input) return null; // Caso não encontre o input, retorna null

    if (input) {
        input.checked = true; // Marca o input no DOM
}
    
    // Busca a label associada pelo atributo for
    const label = document.querySelector(`label[for="${input.id}"]`);
    return label;
}

// Função para pegar a avaliação do banco
async function atualizaAvaliacao(){
    idProd = await obterIdProducao(); // Certifique-se de que essa função retorna um número válido
    fetch(`./php/getAvaliacao.php?idProd=${idProd}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            const valorEstrela = data.data.avaliacao;
            const label = getLabelByValue(valorEstrela); // Obtém a label
            if (label) {
                selectedStar = label;
                applySelectedStarColors(); // Aplica as cores
            }
        } else {
            selectedStar = null;
            console.error(data.message);
        }
    })
    .catch(error => {
        console.error('Erro de conexão ou na API:', error.message);
    });
}

// Para cada estrela...
stars.forEach(star => {
    star.addEventListener('mouseover', () => {
        // Muda a cor das estrelas ao passar o mouse
        resetStarColors();
        star.style.color = '#ffc107';
        let prevSibling = star.previousElementSibling;
        while (prevSibling) {
            if (prevSibling.classList.contains('star')) {
                prevSibling.style.color = '#ffc107';
            }
            prevSibling = prevSibling.previousElementSibling;
        }
    });

    star.addEventListener('click', () => {
        // Marca a estrela selecionada ao clicar
        selectedStar = star; // Atualiza a estrela selecionada
        resetStarColors();
        star.style.color = '#ffc107';
        star.previousElementSibling.checked = true; // Marca o input associado
        let prevSibling = star.previousElementSibling;
        while (prevSibling) {
            if (prevSibling.classList.contains('star')) {
                prevSibling.style.color = '#ffc107';
            }
            prevSibling = prevSibling.previousElementSibling;
        }
    });


    star.addEventListener('mouseleave', () => {
        // Ao sair, mantém as estrelas selecionadas
        if (selectedStar) {
            applySelectedStarColors(); // Volta à seleção anterior
        }
        if(selectedStar == null){
            resetStarColors();
        }
    });
});

// Função para resetar as cores
function resetStarColors() {
    if(selectedStar == null){
    stars.forEach(star => {
        star.style.color = '#aaa';
    });
    } else{
        stars.forEach(star => {
            star.style.color = 'rgba(255, 193, 7, 0.5)';
        });
    }
}

// Função para aplicar as cores
function applySelectedStarColors() {
    // Preenche as estrelas até a estrela selecionada
    if (selectedStar) {
        selectedStar.style.color = '#ffc107';
        let prevSibling = selectedStar.previousElementSibling;
        
        // Preenche as estrelas anteriores com a cor cheia
        while (prevSibling) {
            if (prevSibling.classList.contains('star')) {
                prevSibling.style.color = '#ffc107';
            }
            prevSibling = prevSibling.previousElementSibling;
        }

        // As estrelas posteriores
        let nextSibling = selectedStar.nextElementSibling;
        while (nextSibling) {
            if (nextSibling.classList.contains('star')) {
                nextSibling.style.color = 'rgba(255, 193, 7, 0.5)'; // Cor de fundo 
            }
            nextSibling = nextSibling.nextElementSibling;
        }
    }
}

// Função para enviar avaliação ao banco
function enviarAvaliacao(valor) {
    console.log(`Enviando avaliação: ${valor}`);

    // Configuração para enviar ao servidor
    fetch('./php/enviarAvaliacao.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avaliacao: valor }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return response.json(); // Transformar a resposta em JSON
    })
    .then(data => {
        if (data.success) {
            console.log('Avaliação enviada com sucesso!');
        } else {
            console.error(`Erro na API: ${data.message}`);
        }
    })
    .catch(error => {
        console.error('Erro de conexão ou na API:', error.message);
    });
}

// Dialog Salvar Prod

// Seleciona o botão e o diálogo
const openSalvarProd = document.getElementById('openDialog_salvar_prod')
const dialogSalvarProd = document.getElementById('myDialogSalvarProd');
const cancelButtonSalvarProd = document.getElementById('cancelDialogSalvarProd');

// Abre o diálogo quando o botão é clicado
openSalvarProd.addEventListener('click', () => {
    if(logado){
        dialogSalvarProd.showModal(); // Exibe o diálogo como modal
    }else{
        dialogLogin.showModal();
        console.log("sem vacu");
    } 
});

// Fecha o diálogo ao clicar no botão "Cancelar"
cancelButtonSalvarProd.addEventListener('click', () => {
    dialogSalvarProd.close(); // Fecha o diálogo
});

// Fecha o diálogo ao clicar no botão "OK"
document.getElementById('confirmDialogSalvarProd').addEventListener('click', () => {
    dialogSalvarProd.close(); // Fecha o diálogo
});

// Dialog Nova Lista
const openNovaLista = document.getElementById('novaLista');
const dialogNovaLista = document.getElementById('myDialogNovaLista');
const cancelButtonNovaLista = document.getElementById('cancelDialogNovaLista');

// Abre o diálogo quando o botão é clicado
openNovaLista.addEventListener('click', () => {
    dialogNovaLista.showModal(); // Exibe o diálogo como modal
    dialogSalvarProd.close(); // Fecha o diálogo
});

// Fecha o diálogo ao clicar no botão "Cancelar"
cancelButtonNovaLista.addEventListener('click', () => {
    dialogNovaLista.close(); // Fecha o diálogo
    dialogSalvarProd.showModal();
})

// Fecha o diálogo ao clicar no botão "OK"
document.getElementById('confirmDialogCriarNovaLista').addEventListener('click', () => {
    dialogNovaLista.close(); // Fecha o diálogo
});

// Evento de click dos icones
const icon = document.querySelector("#mark");
const divTemp = document.querySelector("#temporadas");

// Div da Lista de Temporadas
if (myParam.type !== "tv"){
    divTemp.style.display = "none";
}

// Define a variável 'aberto' como verdadeira
let aberto = true;

const botao = document.querySelector("#plataformas_button"); // Seleciona o botão de plataformas
botao.addEventListener("click", abrirPlataformas); // Adiciona ouvidor de evento de click no botão de plataformas

function abrirPlataformas() {
    const dados = document.querySelector("#dados_gerais"); // Seleciona a seção de dados gerais
    const plataformas = document.querySelector("#plataformas"); // Seleciona a seção de plataformas
    const backdrop = document.querySelector(".backdrop"); // Seleciona o backdrop

    if (aberto) {
        dados.style.display = "none"; // Esconde os dados gerais
        plataformas.style.display = "block"; // Mostra a seção de plataformas
        aberto = false; // Define 'aberto' como falso
        backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Altera a cor de fundo
        botao.textContent = "Voltar"; // Altera a cor de fundo

    }
    else if (!aberto) {
        dados.style.display = "flex"; // Mostra os dados gerais
        plataformas.style.display = "none"; // Esconde a seção de plataformas
        aberto = true; // Define 'aberto' como verdadeiro
        backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Altera a cor de fundo
        botao.textContent = "Disponível Neste Momento"; // Altera o texto do botão
    }
}

// API do TMDB
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWExZjFhNGRjYzY2M2EzMTRlNmUwMDhhOGI5YWEyYyIsInN1YiI6IjY1ZDkxNjJiMGYwZGE1MDE2MjMyMjViMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCV25ZQQfVb7YOVnVVFI_xn7MAnNYMbZRrj0SApcL7k'
    }
};

if (myParam.type === "movie"){
// Faz a requisição à API do The Movie Database para obter os dados do filme
fetch(`https://api.themoviedb.org/3/movie/${myParam.query}?append_to_response=20&language=pt-BR`, options)
    .then(response => response.json())
    .then(json => carregaDados(json));

// Faz a requisição à API para obter o Elenco do filme
fetch(`https://api.themoviedb.org/3/movie/${myParam.query}/credits?language=pt-BR`, options)
    .then(response => response.json())
    .then(response => carregaElenco(response));

fetch(`https://api.themoviedb.org/3/movie/${myParam.query}/credits?language=pt-BR`, options)
    .then(response => response.json())
    .then(response => carregaEquipe(response));

// Faz a requisição à API para obter os provedores de streaming
fetch(`https://api.themoviedb.org/3/movie/${myParam.query}/watch/providers`, options)
    .then(response => response.json())
    .then(response => carregaProvedores(response))

fetch(`https://api.themoviedb.org/3/movie/${myParam.query}/videos?language=${json.original_language}-${json.origin_country}`, options)
        .then(response => response.json())
        .then(response => carregaTrailer(response))



} else if (myParam.type === "tv"){
    fetch(`https://api.themoviedb.org/3/tv/${myParam.query}?language=pt-BR`, options)
        .then(response => response.json())
        .then(response => carregaDados(response))
    
    fetch(`https://api.themoviedb.org/3/tv/${myParam.query}/credits?language=pt-BR`, options)
        .then(response => response.json())
        .then(response => carregaElenco(response))
    
    
    fetch(`https://api.themoviedb.org/3/tv/${myParam.query}/credits?language=pt-BR`, options)
        .then(response => response.json())
        .then(response => carregaEquipe(response))

    
}

// Função para obter os parâmetros da URL
function queryObj() { // Pega os valores do link HTML
    var result = {}, keyValuePairs = location.search.slice(1).split("&");
    keyValuePairs.forEach(function (keyValuePair) { // Percorre cada valor
        keyValuePair = keyValuePair.split('=');
        result[decodeURIComponent(keyValuePair[0])] = decodeURIComponent(keyValuePair[1]) || '';
    });
    return result;
};

function carregaTemporadas(json){
    const dadosProd = json;
    json.seasons.forEach(element => {
        let url = `https://image.tmdb.org/t/p/w300${element.poster_path}`;
        if (element.poster_path === null){
            url = "./img/placeholder/MovieTag-NotFoundImage.png";
        }
        const date = new Date(element.air_date); // Ano de Estréia
        let item = document.createElement('div'); // Cria a div
        item.classList.add('item'); // Adiciona a classe item, o estilizando
        item.classList.add('card'); // Adiciona a classe item, o estilizando
        

        item.innerHTML = `<img src=${url}>
        <div class="temp-info"> <div> <h3>${element.name}</h3> <h4>${date.getFullYear()} • ${element.episode_count} episódios</h4> </div>
        <div> <p>Esta temporada começou a ser exibida em ${date.toLocaleDateString()}.</p> 
        <p>${element.overview}</p> </div> </div>`;

        divTemp.lastElementChild.appendChild(item); 
    });
}

// Atualizando Dados a partir da API
function carregaDados(json) {
    const titAvalia = document.querySelector('#tituloAvaliacao');
    titAvalia.innerHTML = `Como você avalia a produção ${json.title || json.name}?`;

    const banner = document.querySelector("#banner"); 
    banner.style.backgroundImage = (`url(https://image.tmdb.org/t/p/w1280${json.backdrop_path})`);

    const bannerPrincipal = document.querySelector(".main-banner");
    bannerPrincipal.setAttribute("src", `https://image.tmdb.org/t/p/w300${json.poster_path}`);
    
    const titulo = document.querySelector(".titulo");
    const anoLancamento = document.querySelector(".ano");
    const dataEstreia = document.querySelector(".data_estreia");
    const sinopse = document.querySelector(".sinopse");
    sinopse.innerHTML = json.overview;

    const nota = document.querySelector(".porcentagem");
    progressBar(json.vote_average);

    if (myParam.type === "movie") {
        dataEstreia.innerHTML = `${json.release_date} (${json.origin_country})`;
        titulo.innerHTML = `${json.title}`;
        const date = new Date(json.release_date);
        anoLancamento.innerHTML = `(${date.getFullYear()})`;

        const duracao = document.querySelector(".duracao");
        duracao.innerHTML = `${json.runtime}min`;

        carregaClassificacao(myParam.query, "movie").then(classificacao => {
            const spanClassificacao = document.querySelector("#classification");
            if (spanClassificacao) {
                spanClassificacao.textContent = classificacao;
            }
        });
        fetch(`https://api.themoviedb.org/3/movie/${myParam.query}/videos?language=${json.original_language}-${json.origin_country}`, options)
        .then(response => response.json())
        .then(response => carregaTrailer(response))

    } else if (myParam.type === "tv") {
        titulo.innerHTML = `${json.name}`;
        carregaTemporadas(json);

        carregaClassificacao(myParam.query, "tv").then(classificacao => {
            const spanClassificacao = document.querySelector("#classification");
            if (spanClassificacao) {
                spanClassificacao.textContent = classificacao;
            }
        });

        fetch(`https://api.themoviedb.org/3/tv/${myParam.query}/videos?language=en-US`, options)
        .then(response => response.json())
        .then(response => carregaTrailer(response))
    }

    if (json.poster_path === null) {
        bannerPrincipal.setAttribute("src", "./img/placeholder/MovieTag-NotFoundImage.png");
    }
};


// Função para carregar o elenco do filme
function carregaElenco(json) {
    const elenco = document.querySelector("#elenco"); // Seleciona o elenco

    json.cast.forEach(element => {
        let url = `https://image.tmdb.org/t/p/w300${element.profile_path}`;
        let item = document.createElement('div'); // Cria a div
        item.classList.add('item'); // Adiciona a classe item, o estilizando

        if (element.profile_path === null){
            url = "./img/placeholder/MovieTag-NotFoundImage.png";
        }

        item.innerHTML = `<div class="item-background"><a href="visualizacaoIntegrante.php?query=${element.id}">
        <img src=${url}>
        <p>${element.name}</p> <p class="sub-p">${element.character}</p>
        </a></div>`; // Cria o item com sua imagem, link e título


        elenco.lastElementChild.appendChild(item); // Adiciona o item ao elenco
    });
}

async function obterIdProducao() {

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const myQuery = urlParams.get("query"); // Obtém 'query' da URL diretamente
        console.log("Query obtida da URL:", myQuery);

        const url = `php/receberIdProducao.php?idAPI=${myQuery}`;
        console.log("URL gerada para obter ID da produção:", url);

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("Resposta da API para obter ID da produção:", data);

        if (data.success) {
            return data.idProd;
        } else {
            console.error(data.message || "Erro desconhecido ao obter ID da produção.");
            return null;
        }
    } catch (error) {
        console.error("Erro na requisição para obter ID da produção:", error);
        return null;
    }
}

async function carregaTags() {
    const idProd = await obterIdProducao();
    console.log("ID da produção obtido:", idProd);

    const listaTags = document.querySelector(".tags");

    if (!idProd) {
        console.error("ID da produção não foi fornecido ou é inválido.");
        listaTags.innerHTML = `<p class="erro">Erro: ID da produção não encontrado.</p>`;
        return;
    }

    try {
        const url = `./php/receberTags.php?idProd=${idProd}`;
        console.log("URL gerada para carregar tags:", url);

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("Resposta da API para carregar tags:", data);

        if (data.success) {
            const tags = data.tags;
            listaTags.innerHTML = ""; // Limpa as tags antigas

            tags.forEach(tag => {
                const item = document.createElement('a');
                item.classList.add('item');
                item.setAttribute("href", `visualizacaoTag.php?query=${tag.id}`);
                item.textContent = tag.nome;
                listaTags.appendChild(item);
            });
            
            
        } else {
            console.error("Erro ao buscar as tags:", data.message || "Erro desconhecido.");
            listaTags.innerHTML = `<p class="erro">Erro ao carregar tags.</p>`;
        }
    } catch (error) {
        console.error("Erro ao carregar tags:", error);
        listaTags.innerHTML = `<p class="erro">Erro ao carregar tags: ${error.message}</p>`;
    }
}

function carregaClassificacao(id, type) {
    const endpoint = type === "movie" 
        ? `https://api.themoviedb.org/3/movie/${id}/release_dates` 
        : `https://api.themoviedb.org/3/tv/${id}/content_ratings`;

    return fetch(endpoint, options)
        .then(response => response.json())
        .then(data => {
            if (type === "movie") {
                const brRelease = data.results.find(r => r.iso_3166_1 === 'BR');
                if (brRelease) {
                    return brRelease.release_dates[0]?.certification || "Não classificado";
                }
            } else if (type === "tv") {
                const brRating = data.results.find(r => r.iso_3166_1 === 'BR');
                return brRating?.rating || "Não classificado";
            }
            return "Não classificado";
        })
        .catch(error => {
            console.error("Erro ao carregar classificação:", error);
            return "Não classificado";
        });
}


// Função para carregar os dados de Elenco
function carregaEquipe(json){
    const produtores = document.querySelector("#produtores");

    json.crew.forEach(element => {

        if (element.job === "Director" || element.job === "Writer"){
            let item = document.createElement('li');
            item.classList.add('card_produtor');
            
            // Criando as tags manualmente
            let h3 = document.createElement('h3');
            h3.classList.add('nome_produtor');
            h3.textContent = element.name;
            
            let p = document.createElement('p');
            p.classList.add('funcao_produtor');
            p.textContent = element.job;
            
            // Anexando as tags criadas ao item
            item.appendChild(h3);
            item.appendChild(p);
            
            // Adicionando o item à lista
            console.log(item);
            produtores.appendChild(item);
        }
        
    })
}

function carregaProvedores(json){ // Função para carregar os dados dos provedores
    const listaStream = document.querySelector("#lista-stream"); // Seleciona a lista de Stream
    const listaAluguel = document.querySelector("#lista-aluguel"); // Seleciona a lista de Aluguel
    const listaCompra = document.querySelector("#lista-compra"); // Seleciona a lista de Comppra

    if (json.results.BR != null){ // Testa se os resultados no Brasil é nulo
        if (json.results.BR.rent != null){ // Testa se o dicionário de aluguel é nulo
            criaItens(json.results.BR.rent, listaAluguel); // Chama função que cria o item
        }
        if (json.results.BR.buy != null){
            criaItens(json.results.BR.buy, listaCompra);
        } 
        if (json.results.BR.flatrate != null){
            criaItens(json.results.BR.flatrate, listaStream);}
        };
    }

function criaItens(type, lista){ // Função que cria os itens dos provedores
    type.forEach(element => {
        let item = document.createElement('div');
        item.classList.add("item-logo");
        item.innerHTML = `<img src="https://image.tmdb.org/t/p/w300${element.logo_path}"></img>
        <span> ${element.provider_name} </span>`; // Cria uma div com imagem e span

        lista.appendChild(item); // Insere o item criado na div pai
    })

}

function carregaTrailer(json){
    let url = null
    const btnTrailer = document.querySelector('#btnTrailer');
    json.results.forEach(element => {
        console.log(element);
        if (element.type === "Trailer" && element.site === "YouTube"){
            url = `https://www.youtube.com/watch?v=${element.key}`;
        }
    }    
    );
    if(url == null){
        btnTrailer.style.display = "none"
    }
    btnTrailer.setAttribute('href', url);
    btnTrailer.setAttribute('target', "_blank");
}

