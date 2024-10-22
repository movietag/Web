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