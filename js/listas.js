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
            novaLista.setAttribute('href', `editarLista.php?idLista=${data.idLista}`);
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
        link.href = `visualizacaoLista.php?id=${element.id}`;
        link.className = "caixinha-listas";

        const criarListas = document.createElement("div");
        criarListas.className = "criar-listas";

        const caixaDois = document.createElement("div");
        caixaDois.id = "caixaDois";
        criarListas.appendChild(caixaDois);

        const caixaTres = document.createElement("div");
        caixaTres.id = "caixaTres";
        criarListas.appendChild(caixaTres);

        const infoListas = document.createElement("div");
        infoListas.id = "info-listas";

        const titulo = document.createElement("h2");
        titulo.textContent = element.titulo;
        infoListas.appendChild(titulo);

        // const numProducoes = document.createElement("p");
        // numProducoes.textContent = `${element.numProducoes} produções`;
        // infoListas.appendChild(numProducoes);

        // Montando a estrutura final
        link.appendChild(criarListas);
        link.appendChild(infoListas);

        // Adiciona o link ao contêiner HTML 'listas'
        listas.appendChild(link);
    });
}

