const butao = document.querySelector("button"); // Seleciona o botão de enviar
const form = document.querySelector("#form-total"); // Seleciona o formulário completo

const uNome = document.querySelector("#uNome"); // Seleciona o campo de nome
const uUsuario = document.querySelector("#uUsuario"); // Seleciona o campo de usuário
const uEmail = document.querySelector("#uEmail"); // Seleciona o campo de email
const uSenha = document.querySelector("#uSenha"); // Seleciona o campo de senha
const uConfSenha = document.querySelector("#uConfSenha"); // Seleciona o campo de confirmação de senha

const campos = document.querySelectorAll('.camposInput'); // Seleciona todos os campos de entrada
const avisos = document.querySelectorAll('.alertas'); // Seleciona todos os elementos de alerta

const dadosArmazenados = localStorage.getItem('usuarioDados'); // Obtém os dados armazenados no localStorage
const usuarios = JSON.parse(dadosArmazenados) || []; // Converte os dados em objeto JavaScript ou inicializa um array vazio se não houver dados
console.log(usuarios); // Exibe os usuários armazenados no console

const emailRegexp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; // Expressão regular para validação de email

// Event listeners para validação dinâmica
uUsuario.addEventListener("input", validarUso);
uEmail.addEventListener("input", function(){
    validarEmail();
    validarUso();
});
uSenha.addEventListener("input", validarSenha);
uConfSenha.addEventListener("input", confSenha);
butao.addEventListener("click", validarDados);

// Impede o envio padrão do formulário
form.addEventListener("submit", function(event) {
    event.preventDefault();
});

// Função para validar o campo de email
function validarEmail(){
    if(uEmail.value == ""){
        uEmail.style.border = "1px solid red"; // Define borda vermelha se o campo estiver vazio
    }

    if(emailRegexp.test(uEmail.value)){
        uEmail.style.border = "1px solid green"; // Define borda verde se o email for válido
        avisos[2].style.display = "none"; // Esconde o aviso de email inválido
    } else {
        console.log("n valido");
        uEmail.style.border = "1px solid red"; // Define borda vermelha se o email não for válido
        avisos[2].style.display = "inline-block"; // Exibe o aviso de email inválido
    }
}

// Função para validar o campo de usuário
function validarUsuario(){
    if(uUsuario.value === ""){
        uUsuario.style.border = "1px solid red"; // Define borda vermelha se o campo estiver vazio
    }
    if(uUsuario.value.length < 6){
        uUsuario.style.border = "1px solid red"; // Define borda vermelha se o usuário tiver menos de 6 caracteres
        avisos[1].style.display = "inline-block"; // Exibe o aviso de usuário inválido
    } else {
        uUsuario.style.border = "1px solid green"; // Define borda verde se o usuário for válido
        avisos[1].style.display = "none"; // Esconde o aviso de usuário inválido
    }
}

// Função para validar o campo de senha
function validarSenha(){
    if(uSenha.value.length < 8){
        uSenha.style.border = "1px solid red"; // Define borda vermelha se a senha tiver menos de 8 caracteres
        avisos[3].style.display = "inline-block"; // Exibe o aviso de senha inválida
    } else {
        uSenha.style.border = "1px solid green"; // Define borda verde se a senha for válida
        avisos[3].style.display = "none"; // Esconde o aviso de senha inválida
    }
    confSenha(); // Chama a função para validar a confirmação de senha
}

// Função para validar o campo de confirmação de senha
function confSenha(){
    if(uConfSenha == ""){
        uConfSenha.style.border = "1px solid red"; // Define borda vermelha se o campo estiver vazio
    }
    if (uSenha.value !== uConfSenha.value) {
        uConfSenha.style.border = "1px solid red"; // Define borda vermelha se as senhas não coincidirem
        avisos[4].style.display = "inline-block"; // Exibe o aviso de senhas diferentes
    } else {
        uConfSenha.style.border = "1px solid green"; // Define borda verde se as senhas coincidirem
        avisos[4].style.display = "none"; // Esconde o aviso de senhas diferentes
    }
}

// Função para validar se o usuário e o email já estão em uso
function validarUso(){
    let usuarioEmUso = false;
    let emailEmUso = false;

    usuarios.forEach(usuario => {
        if (usuario.usuario === uUsuario.value) {
            usuarioEmUso = true;
        }
        if (usuario.email === uEmail.value) {
            emailEmUso = true;
        }
    });

    if (usuarioEmUso) {
        uUsuario.style.border = "1px solid red"; // Define borda vermelha se o usuário já estiver em uso
        avisos[1].style.display = "inline-block"; // Exibe o aviso de usuário em uso
    } else {
        uUsuario.style.border = "1px solid green"; // Define borda verde se o usuário não estiver em uso
        avisos[1].style.display = "none"; // Esconde o aviso de usuário em uso
    }

    if (emailEmUso) {
        uEmail.style.border = "1px solid red"; // Define borda vermelha se o email já estiver em uso
        avisos[2].style.display = "inline-block"; // Exibe o aviso de email em uso
    } else {
        uEmail.style.border = "1px solid green"; // Define borda verde se o email não estiver em uso
        avisos[2].style.display = "none"; // Esconde o aviso de email em uso
        validarEmail(); // Chama a função para validar o email
    }
}

// Função para validar todos os dados antes de enviar o formulário
function validarDados() {
    validarUsuario(); // Valida o campo de usuário
    validarEmail(); // Valida o campo de email
    validarSenha(); // Valida o campo de senha
    confSenha(); // Valida o campo de confirmação de senha
    validarUso(); // Valida se o usuário e o email já estão em uso

    let camposValidos = true;
    campos.forEach(campo => {
        if (campo.style.border === "1px solid red") {
            camposValidos = false; // Define camposValidos como false se algum campo estiver inválido
        }
    });

    if (!camposValidos) {
        avisos[5].style.display = "inline-block"; // Exibe o aviso de correção dos campos inválidos
        return;
    }

    const dados = {
        nome: uNome.value,
        usuario: uUsuario.value,
        email: uEmail.value,
        senha: uSenha.value
    };

    usuarios.push(dados); // Adiciona os novos dados ao array de usuários
    localStorage.setItem('usuarioDados', JSON.stringify(usuarios)); // Salva os usuários no localStorage
    window.location.href = "../index.html"; // Redireciona para a página inicial
    localStorage.setItem('status', "true"); // Define o status como true no localStorage
}
