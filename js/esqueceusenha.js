const fDialog = document.querySelector("dialog form");
// Seleciona o elemento com a classe "secao-caixa"
const secaoCaixa = document.querySelector(".secao-caixa");

// Seleciona o link "Esqueceu a senha?"
const esqueceu = document.querySelector("form a");
// Adiciona um evento de clique ao link
esqueceu.addEventListener("click", (ev)=>{
    ev.preventDefault(); // Previne o comportamento padrão do link
    secaoCaixa.classList.toggle("blur"); // Adiciona ou remove a classe "blur" para aplicar o efeito de desfoque
    fDialog.parentElement.showModal(); // Mostra o diálogo modal
})

// Define a função que será executada quando o formulário de redefinição de senha for enviado
fDialog.onsubmit = (ev) => {
    ev.preventDefault(); // Previne o comportamento padrão de envio do formulário
    secaoCaixa.classList.toggle("blur"); // Remove o efeito de desfoque
    fDialog.parentElement.close(); // Fecha o diálogo modal
};