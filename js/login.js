// Seleciona o elemento com a classe "secao-caixa"
const secaoCaixa = document.querySelector(".secao-caixa");
// Seleciona o formulário dentro do elemento dialog
const fDialog = document.querySelector("dialog form");
// Seleciona o formulário com o ID "form-total"
const form = document.querySelector("#form-total");

// Adiciona um evento ao formulário para prevenir o comportamento padrão de envio
form.addEventListener("submit", function(event) {
    event.preventDefault();
});

// Define a função que será executada quando o formulário for enviado
form.onsubmit = (ev) => {
    // Seleciona os campos de entrada de usuário e senha
    const uUsuario = document.querySelector("#uUsuario");
    const uSenha = document.querySelector("#uSenha");

    // Verifica se os campos estão vazios e, se estiverem, altera a borda para vermelho e sai da função
    if (uUsuario.value === "" || uSenha.value === "") {
        uUsuario.style.border = "1px solid red";
        uSenha.style.border = "1px solid red";
        return;
    }

    // Obtém os dados de usuários armazenados no localStorage
    const dadosArmazenados = localStorage.getItem('usuarioDados');

    // Verifica se existem dados armazenados
    if (dadosArmazenados) {
        // Converte os dados armazenados de string para objeto JSON
        const usuarios = JSON.parse(dadosArmazenados);

        // Percorre a lista de usuários para verificar se há correspondência com os dados de entrada
        usuarios.forEach(pessoa => {
            // Verifica se o nome ou email do usuário correspondem ao valor do campo de entrada
            if ((pessoa.nome === uUsuario.value) || (pessoa.email === uUsuario.value)) {
                // Verifica se a senha corresponde
                if(pessoa.senha === uSenha.value){
                    // Redireciona para a página principal e define o status como "true" no localStorage
                    window.location.href = "../index.html";
                    localStorage.setItem('status', "true");
                } else {
                    // Se a senha não corresponder, altera a borda dos campos de entrada para vermelho
                    uUsuario.style.border = "1px solid red";
                    uSenha.style.border = "1px solid red";
                }
            }
        });
    }
};

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
