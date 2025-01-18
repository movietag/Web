const listas = document.querySelector('#caixa-listas');
const novaLista = listas.firstElementChild;

novaLista.addEventListener('click', (ev)=>{
    fetch('./php/criarNovaLista.php')
    .then(response => response.json()) // Converte a resposta do PHP para JSON
    .then(data => {
        if (!data.success) {  // Verifica se o sucesso é true
            ev.preventDefault(); // Previne a ação padrão temporariamente
            console.log('Erro:', data.message);
        }else{
            window.location.reload();
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });
})

listas.replaceChildren();
listas.appendChild(novaLista);



fetch('./php/receberListas.php')
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            if (Array.isArray(data.listas) && data.listas.length > 0) {
                // Se listas não está vazia, carrega as listas
                carregaListas(data.listas);
            } else {
                console.log("Nenhuma lista encontrada.");
            }
        } else {
            console.error(data.message);
        }
    })
    .catch(error => console.error('Erro ao verificar o login:', error));

function carregaListas(listaArray) {
    listaArray.forEach(element => {
        // Criação do elemento <a>
        const link = document.createElement("a");
        link.href = `visualizacaoLista.php?id=${element.idLista}`;
        link.className = "caixinha-listas";

        // Criação do container 'criarListas'
        const criarListas = document.createElement("div");
        criarListas.className = "criarListas";

        // Adicionando a imagem
        const img = document.createElement("img");
        img.src = element.poster || "img/placeholder/MovieTag-NotFoundImage.png"; // Usa o 'poster' ou um placeholder
        img.alt = `Pôster de ${element.titulo}`;
        img.className = "poster";
        criarListas.appendChild(img);

        // Adicionando as divs internas
        const caixaDois = document.createElement("div");
        caixaDois.className = "caixaDois";
        criarListas.appendChild(caixaDois);

        const caixaTres = document.createElement("div");
        caixaTres.className = "caixaTres";
        criarListas.appendChild(caixaTres);

        // Criação do container 'info-listas'
        const infoListas = document.createElement("div");
        infoListas.className = "info-listas";

        // Adicionando o título
        const titulo = document.createElement("h2");
        titulo.textContent = element.nomeLista;
        infoListas.appendChild(titulo);

        // Adicionando o número de produções
        const numProducoes = document.createElement("p");
        numProducoes.textContent = `${element.producoes.length} produções`;
        infoListas.appendChild(numProducoes);

        // Montando a estrutura final
        link.appendChild(criarListas);
        link.appendChild(infoListas);

        listas.appendChild(link);
    });
}

