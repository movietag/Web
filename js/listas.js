const listas = document.querySelector('#caixa-listas');
const novaLista = listas.firstElementChild;

listas.replaceChildren();
listas.appendChild(novaLista);

// PHP que pegue, em json, a lista de filmes do usuário
const listasUsuario = {};

listasUsuario.forEach(element => {
    // Criação do elemento <a>
    const link = document.createElement("a");
    link.href = `visualizacaoLista.php?id=${element.id}`;
    link.className = "caixinha-listas";

    // Adicionando a imagem do pôster
    const img = document.createElement("img");
    img.src = element.poster;
    img.alt = `Pôster de ${element.titulo}`;
    img.className = "poster";
    criarListas.appendChild(img);

    // Adicionando <div id="caixaDois"> e <div id="caixaTres">
    const caixaDois = document.createElement("div");
    caixaDois.id = "caixaDois";
    criarListas.appendChild(caixaDois);

    const caixaTres = document.createElement("div");
    caixaTres.id = "caixaTres";
    criarListas.appendChild(caixaTres);

    // Adicionando <div id="info-listas">
    const infoListas = document.createElement("div");
    infoListas.id = "info-listas";

    const titulo = document.createElement("h2");
    titulo.textContent = element.titulo;
    infoListas.appendChild(titulo);

    const numProducoes = document.createElement("p");
    numProducoes.textContent = `${element.numProducoes} produções`;
    infoListas.appendChild(numProducoes);

    // Montando a estrutura final
    link.appendChild(criarListas);
    link.appendChild(infoListas);
    listas.appendChild(link);
});


