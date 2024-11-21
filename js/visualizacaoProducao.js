let logado = false;

// Verifica o status de login ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    fetch('./php/fetchLogin.php')
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                console.log("Usuário está logado.");
                logado = true;
            } else {
                console.log("Usuário não está logado.");
            }
        })
        .catch(error => console.error('Erro ao verificar o login:', error));
});

function progressBar(value){
    value = Math.trunc(value*10);
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
    console.log(value);
}

//Esconder senha do popup de login
const dialogLogin = document.getElementById('myDialogLogin');
const toggleSenha = document.getElementById('toggleSenha');
const loginSenha = document.getElementById('loginSenha');

toggleSenha.addEventListener('click', () => {
    if (loginSenha.type === 'password') {
        loginSenha.type = 'text';
        toggleSenha.innerHTML = '&#128065;'; // Ícone de olho aberto
    } else {
        loginSenha.type = 'password';
        toggleSenha.innerHTML = '&#128065;'; // Ícone de olho
    }
});


//Adicionar Tag
const openButtonAdicionarTag = document.getElementById('openDialogAdicionarTag');
const dialogAdicionarTag = document.getElementById('myDialogAdicionarTag');

openButtonAdicionarTag.addEventListener('click', () => {
    if(logado){
        dialogAdicionarTag.showModal(); // Exibe o diálogo como modal
    }else{
        dialogLogin.showModal();
    }
    
});


// Elementos HTML
const inputTag = document.getElementById('inputTag');
const confirmTag = document.getElementById('confirmTag');
const tagsContainer = document.getElementById('tagsContainer');
const cancelButtonAdicionarTag = document.getElementById('cancelDialogAdicionarTag');

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


// Eventos
confirmTag.addEventListener('click', adicionarTag);

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
        body: JSON.stringify({ tags, myParam: JSON.stringify(myParam) })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(data.message, data.tags);
            } else {
                console.log('Erro ao processar tags: ' + data.message);
            }
        })
        .catch(error => console.error('Erro na requisição:', error));
    
    tagsContainer.replaceChildren;
    carregaTags();
    });


// Permite adicionar tag ao pressionar "Enter"
inputTag.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Evita quebra de linha
        adicionarTag();
    }
});

// Fecha o diálogo ao clicar no botão "Cancelar"
cancelButtonAdicionarTag.addEventListener('click', () => {
    dialogAdicionarTag.close(); // Fecha o diálogo
});

// Fecha o diálogo ao clicar no botão "Avaliar"
document.getElementById('confirmDialogAdicionarTag').addEventListener('click', () => {
    dialogAdicionarTag.close(); // Fecha o diálogo
});

// Seleciona o botão e o diálogo
const openButtonAvaliar = document.getElementById('openDialogAvaliar');
const dialogAvaliar = document.getElementById('myDialogAvaliar');
const cancelButtonAvaliar = document.getElementById('cancelDialogAvaliar');

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

let selectedValue = null;

// Fecha o diálogo ao clicar no botão "Avaliar"
document.getElementById('confirmDialogAvaliar').addEventListener('click', () => {
    dialogAvaliar.close(); // Fecha o diálogo
    if(selectedValue) enviarAvaliacao(selectedValue);
    console.log(selectedValue);
});

// Seleciona as estrelas e adiciona a funcionalidade de seleção
const stars = document.querySelectorAll('.star');
let selectedStar = null; // Variável para armazenar a estrela selecionada

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

document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll('input[name="rating"]');

    stars.forEach(star => {
        star.addEventListener('click', function () {
            selectedValue = this.value; // Captura o valor selecionado
            console.log(`Valor selecionado: ${selectedValue}`);

            // Chamada para enviar o valor ao servidor
            // enviarAvaliacao(selectedValue);
        });
    });
});

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


// API

var myParam = queryObj();
console.log(myParam);

if (myParam.type !== "tv"){
    divTemp.style.display = "none";
}

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

// // Faz a requisição à API para obter as tags do filme
// fetch(`https://api.themoviedb.org/3/movie/${myParam.query}/keywords`, options) // Palavra chave
//     .then(response => response.json())
//     .then(response => carregaTags(response));

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
    const banner = document.querySelector("#banner"); // Seleciona o banner
    banner.style.backgroundImage = (`url(https://image.tmdb.org/t/p/w1280${json.backdrop_path})`); // Define a imagem de fundo do banner

    const bannerPrincipal = document.querySelector(".main-banner"); // Seleciona o banner principal
    bannerPrincipal.setAttribute("src", `https://image.tmdb.org/t/p/w300${json.poster_path}`); // Define a imagem do poster

    const titulo = document.querySelector(".titulo"); // Seleciona o título
    const anoLancamento = document.querySelector(".ano"); // Seleciona o ano de lançamento

    const dataEstreia = document.querySelector(".data_estreia"); // Seleciona a data de estreia

    const sinopse = document.querySelector(".sinopse"); // Seleciona a sinopse
    sinopse.innerHTML = json.overview; // Define a sinopse

    const nota = document.querySelector(".porcentagem");
    progressBar(json.vote_average);

    if (myParam.type === "movie"){
        dataEstreia.innerHTML = `${json.release_date} (${json.origin_country})`; // Define a data de estreia e país de origem
        titulo.innerHTML = `${json.title}`; // Título
        const date = new Date(json.release_date); // Ano de Estréia
        anoLancamento.innerHTML = `(${date.getFullYear()})`;// Define o ano de lançamento



        const duracao = document.querySelector(".duracao"); // Seleciona a duração
        duracao.innerHTML = `${json.runtime}min`; // Define a duração do filme
    } else if(myParam.type === "tv"){
        titulo.innerHTML = `${json.name}`;
        carregaTemporadas(json);

    }

    console.log(json);
    if (json.poster_path === null) bannerPrincipal.setAttribute("src", "./img/placeholder/MovieTag-NotFoundImage.png");
    
    
    
};

// Função para carregar o elenco do filme
function carregaElenco(json) {
    console.log(json);
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
        const response = await fetch(`php/receberIdProducao.php?idAPI=${myParam.query}`);
        
        // Aguarde a resposta ser convertida para JSON
        const data = await response.json();

        if (data.success) {
            return data.idProd;
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}

async function carregaTags() {
    const idProd = await obterIdProducao(); // Certifique-se de que essa função retorna um número válido
    const listaTags = document.querySelector(".tags");

    try {
        fetch(`./php/receberTags.php?idProd=${idProd}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Exibir as tags
                const tags = data.tags;
                console.log(tags);

                // Garante que a lista está limpa antes de adicionar novos elementos
                listaTags.innerHTML = "";

                // Processa e exibe as tags recebidas
                tags.forEach(tag => {
                    const item = document.createElement('a');
                    item.classList.add('item');
                    item.setAttribute("href", `visualizacaoTag.php?query=${tag.id}`);
                    item.textContent = tag.nome; // Adiciona o nome da tag ao elemento
                    listaTags.appendChild(item);
        });
            } else {
                console.error('Erro ao buscar as tags:', data.message);
            }
        })

        

    } catch (error) {
        console.error("Erro ao carregar tags:", error);
    }
}

carregaTags();



function carregaEquipe(json){
    console.log(json);
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

