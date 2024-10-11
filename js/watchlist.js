// Seleciona o botão e o diálogo
const openNovaProd = document.getElementById('novaProducao');
const dialogNovaProd = document.getElementById('buscarFilme');
// const cancelButtonAvaliar = document.getElementById('cancelDialogAvaliar');

// Abre o diálogo quando o botão é clicado
openNovaProd.addEventListener('click', () => {
    dialogNovaProd.showModal(); // Exibe o diálogo como modal
});

// Fecha o diálogo ao clicar no botão "Cancelar"
// cancelButtonAvaliar.addEventListener('click', () => {
//     dialogAvaliar.close(); // Fecha o diálogo
// });