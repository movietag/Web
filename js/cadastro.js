const butao = document.querySelector("button"); // Seleciona o botão de enviar
const form = document.querySelector("#form-total"); // Seleciona o formulário completo

const uNome = document.querySelector("#uNome"); // Seleciona o campo de nome
const uUsuario = document.querySelector("#uUsuario"); // Seleciona o campo de usuário
const uEmail = document.querySelector("#uEmail"); // Seleciona o campo de email
const uSenha = document.querySelector("#uSenha"); // Seleciona o campo de senha
const uConfSenha = document.querySelector("#uConfSenha"); // Seleciona o campo de confirmação de senha

const campos = document.querySelectorAll('.camposInput'); // Seleciona todos os campos de entrada
const avisos = document.querySelectorAll('.alertas'); // Seleciona todos os elementos de alerta
const emailRegexp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; // Expressão regular para validação de email

// Event listeners para validação dinâmica
uUsuario.addEventListener("input", validarUsuario);
uEmail.addEventListener("input", validarEmail);
uSenha.addEventListener("input", validarSenha);
uConfSenha.addEventListener("input", confSenha);
butao.addEventListener("click", validarDados);
loading = document.querySelector('.wrapperLoading');

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    if (validarDados()) {
        // Exibe o loading
        loading.style.display = 'block';

        // Cria um objeto FormData a partir do formulário
        const formData = new FormData(form);

        // Envia os dados usando fetch
        fetch('./php/cadastrarUsuario.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json(); // Transformar a resposta em JSON
        })
        .then(data => {
            if (data.success) {
                console.log('Cadastro realizado com sucesso!');
                window.location.href = './index.php';
            } else {
                validarDados(data.message);
                console.error(`Erro: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Erro de conexão ou na API:', error.message);
        })
        .finally(() => {
            // Sempre oculta o loading, independentemente do sucesso ou erro
            loading.style.display = 'none';
        });
    }
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
        avisos[0].style.display = "inline-block"; // Exibe o aviso de usuário inválido
    } else {
        uUsuario.style.border = "1px solid green"; // Define borda verde se o usuário for válido
        avisos[0].style.display = "none"; // Esconde o aviso de usuário inválido
    }
}

// Função para validar o campo de senha
function validarSenha(){
    if(uSenha.value.length < 8){
        uSenha.style.border = "1px solid red"; // Define borda vermelha se a senha tiver menos de 8 caracteres
        avisos[4].style.display = "inline-block"; // Exibe o aviso de senha inválida
    } else {
        uSenha.style.border = "1px solid green"; // Define borda verde se a senha for válida
        avisos[4].style.display = "none"; // Esconde o aviso de senha inválida
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
        avisos[5].style.display = "inline-block"; // Exibe o aviso de senhas diferentes
    } else {
        uConfSenha.style.border = "1px solid green"; // Define borda verde se as senhas coincidirem
        avisos[5].style.display = "none"; // Esconde o aviso de senhas diferentes
    }
}

// Função para validar todos os dados antes de enviar o formulário
function validarDados(msg) {
    validarUsuario(); // Valida o campo de usuário
    validarEmail(); // Valida o campo de email
    validarSenha(); // Valida o campo de senha
    confSenha(); // Valida o campo de confirmação de senha
    // // validarUso(); // Valida se o usuário e o email já estão em uso

    let camposValidos = true;
    campos.forEach(campo => {
        if (campo.style.border === "1px solid red") {
            camposValidos = false;
    }})

    // });
    if (msg){
        avisos[6].style.display = "inline-block"; // Exibe o aviso de correção dos campos inválidos
        avisos[6].textContent = msg;
    } else{
        avisos[6].style.display = 'none';
    }

    return camposValidos;
}