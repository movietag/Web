const butao = document.querySelector("button");
const form = document.querySelector("#form-total");

const uNome = document.querySelector("#uNome");
const uUsuario = document.querySelector("#uUsuario");
const uEmail = document.querySelector("#uEmail");
const uSenha = document.querySelector("#uSenha");
const uConfSenha = document.querySelector("#uConfSenha");

const campos = document.querySelectorAll('.camposInput');
const avisos = document.querySelectorAll('.alertas')

const dadosArmazenados = localStorage.getItem('usuarioDados');
const usuarios = JSON.parse(dadosArmazenados);
console.log(usuarios);

const emailRegexp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

uUsuario.addEventListener("input", function(){
    validarUso();
});

uEmail.addEventListener("input", function(){
    validarUso();
    validarEmail();
});

uSenha.addEventListener("input", function(){
    validarSenha();
});

uConfSenha.addEventListener("input", function(){
    confSenha();
});


butao.addEventListener("click", function() {
    validarDados();
});

form.addEventListener("submit", function(event) {
    event.preventDefault();
});


function validarEmail(){
    if(emailRegexp.test(uEmail.value)){
        console.log("valido")
        uEmail.style.border = "1px solid green";
        avisos[2].style.display = "none";
        validarUso();
    }
    else{
        
        uEmail.style.border = "1px solid red";
        avisos[2].style.display = "inline-block";
    }
}

function validarUsuario(){
    if(uNome.value.length < 6){
        uUsuario.style.border = "1px solid red";
        avisos[1].style.display = "inline-block";
    }
    else{
        uNome.style.border = "1px solid green";
        avisos[1].style.display = "none";
    }
}

function validarSenha(){
    if(uSenha.value.length < 8){
        uSenha.style.border = "1px solid red";
        avisos[3].style.display = "inline-block";
        confSenha();
    }
    else{
        uSenha.style.border = "1px solid green";
        avisos[3].style.display = "none";
        confSenha();
    }
}

function confSenha(){
    if (uSenha.value !== uConfSenha.value) {
        uConfSenha.style.border = "1px solid red";
        avisos[4].style.display = "inline-block";
        senhaDif = true;
    }
    else{
        uConfSenha.style.border = "1px solid green";
        avisos[4].style.display = "none";
        senhaDif = false;
    }
}

function validarUso(){
    let usuarioEmUso = false;
    let emailEmUso = false;

    usuarios.forEach(usuario => {
        if (usuario.usuario === uUsuario.value) {
            usuarioEmUso = true;
        }
        if (usuario.email === uEmail.value) {
            uEmail.style.border = "1px solid red";
            emailEmUso = true;
        }
    });
    if (usuarioEmUso) {
        uUsuario.style.border = "1px solid red";
        avisos[1].style.display = "inline-block";
    } else {
        uUsuario.style.border = "1px solid green";
        avisos[1].style.display = "none";
    }

    if (emailEmUso) {
        uEmail.style.border = "1px solid red";
        avisos[2].style.display = "inline-block";
    } else {
        uEmail.style.border = "1px solid green";
        avisos[2].style.display = "none";
    }
}

// const emailRegexp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

function validarDados() {
    // Chama todas as funções de validação necessárias
    validarUsuario();
    validarEmail();
    validarSenha();
    confSenha();

    // Verifica se algum campo não passou na validação
    let camposValidos = true;
    campos.forEach(campo => {
        if (campo.style.border === "1px solid red") {
            camposValidos = false;
        }
    });

    // Se algum campo não for válido, não salva os dados
    if (!camposValidos) {
        console.log("Por favor, corrija os erros antes de enviar o formulário.");
        return;
    }

    // Se todos os campos forem válidos, proceda com a operação de salvar os dados
    const dados = {
        nome: uNome.value,
        usuario: uUsuario.value,
        email: uEmail.value,
        senha: uSenha.value
    };

    // Verifica se o nome de usuário e o e-mail já estão em uso
    let usuarioEmUso = false;
    let emailEmUso = false;

    usuarios.forEach(usuario => {
        if (usuario.usuario === dados.usuario) {
            usuarioEmUso = true;
        }
        if (usuario.email === dados.email) {
            emailEmUso = true;
        }
    });

    if (usuarioEmUso) {
        console.log("Nome de usuário já em uso. Por favor, escolha outro.");
        return;
    }

    if (emailEmUso) {
        console.log("O e-mail fornecido já está associado a uma conta. Por favor, use outro e-mail.");
        return;
    }

    // Se tudo estiver correto, salva os dados
    if (dadosArmazenados == null) {
        const dadosGerais = [];
        dadosGerais.push(dados);
        localStorage.setItem('usuarioDados', JSON.stringify(dadosGerais));
    } else {
        const dadosAnteriores = JSON.parse(dadosArmazenados);
        dadosAnteriores.push(dados);
        localStorage.setItem('usuarioDados', JSON.stringify(dadosAnteriores));
    }
}


function salvarDados(dadosArmazenados, dados) {
    let dadosAnteriores = [];

    // Verifica se há dados armazenados
    if (dadosArmazenados !== null) {
        dadosAnteriores = JSON.parse(dadosArmazenados);
    }

    // Adiciona os novos dados aos dados anteriores
    dadosAnteriores.push(dados);

    // Salva a nova array de dados no localStorage
    localStorage.setItem('usuarioDados', JSON.stringify(dadosAnteriores));
}
}
