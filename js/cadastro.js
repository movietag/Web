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


uUsuario.addEventListener("input", function(){
    validarUso();
});

uEmail.addEventListener("input", function(){
    validarUso();
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
    console.log("entramo");
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

    const dados = {
        nome: uNome.value,
        usuario: uUsuario.value,
        email: uEmail.value,
        senha: uSenha.value
    };

    let dadosString = "";

    if (dadosArmazenados == null) {
        const dadosGerais = [];
        dadosGerais.push(dados);
        dadosString = JSON.stringify(dadosGerais);
        localStorage.setItem('usuarioDados', dadosString);
    } else {
        salvarDados(dadosArmazenados, dados); 
    }

}

// 

function salvarDados(dadosArmazenados, dados){
    const dadosAnteriores = JSON.parse(dadosArmazenados);
    dadosAnteriores.push(dados);
    dadosString = JSON.stringify(dadosAnteriores);
    localStorage.setItem('usuarioDados', dadosString);
}