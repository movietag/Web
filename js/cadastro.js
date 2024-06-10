const butao = document.querySelector("button");
const form = document.querySelector("#form-total");

butao.addEventListener("click", function() {
    validarDados();
});

form.addEventListener("submit", function(event) {
    event.preventDefault();
    validarDados();
});

function validarDados() {
    const uNome = document.querySelector("#uNome").value;
    const uEmail = document.querySelector("#uEmail").value;
    const uSenha = document.querySelector("#uSenha").value;
    const uConfSenha = document.querySelector("#uConfSenha").value;

    const iNome = document.querySelector("#uNome");
    const iEmail = document.querySelector("#uEmail");
    const iSenha = document.querySelector("#uSenha");
    const iConfSenha = document.querySelector("#uConfSenha");

    if (uSenha !== uConfSenha) {
        iConfSenha.style.border = "1px solid red";
        senhaDif = true;
    }
    else{
        senhaDif = false;
    }

    const dados = {
        nome: uNome,
        email: uEmail,
        senha: uSenha
    };

    let dadosString = "";
    const dadosArmazenados = localStorage.getItem('usuarioDados');
    if (dadosArmazenados == null) {
        const dadosGerais = [];
        dadosGerais.push(dados);
        dadosString = JSON.stringify(dadosGerais);
        localStorage.setItem('usuarioDados', dadosString);
    } else {
        const usuarios = JSON.parse(dadosArmazenados);
        let nomeEmUso = false;
        let emailEmUso = false;

        usuarios.forEach(usuario => {
            if (usuario.nome === uNome) {
                nomeEmUso = true;
            }
            if (usuario.email === uEmail) {
                emailEmUso = true;
            }
        });
        if (nomeEmUso || emailEmUso){
            if (nomeEmUso) {
                iNome.style.border = "1px solid red";
                return;
            }
            if (emailEmUso) {
                iEmail.style.border = "1px solid red";
                return;
            }
        }
        salvarDados(dadosArmazenados, dados);
    }

}


function salvarDados(dadosArmazenados, dados){
    const dadosAnteriores = JSON.parse(dadosArmazenados);
    dadosAnteriores.push(dados);
    dadosString = JSON.stringify(dadosAnteriores);
    localStorage.setItem('usuarioDados', dadosString);
}

function caixaVazia(input) {
    input.innerHTML = "Este campo precisa ser preenchido!";
}
