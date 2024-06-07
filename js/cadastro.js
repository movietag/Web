const butao = document.querySelector("button");
const form = document.querySelector("#form-total");

butao.addEventListener("click", function() {
    salvarDados();
});

form.addEventListener("submit", function(event) {
    event.preventDefault();
    salvarDados();
});

function salvarDados() {
    const uNome = document.querySelector("#uNome").value;
    const uEmail = document.querySelector("#uEmail").value;
    const uSenha = document.querySelector("#uSenha").value;
    const uConfSenha = document.querySelector("#uConfSenha").value;

    const iConfSenha = document.querySelector("#uConfSenha");

    if (uSenha !== uConfSenha) {
        iConfSenha.style.border = "1px solid red";
        return;
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

        if (nomeEmUso) {
            alert("Nome de usuário já em uso.");
            return;
        }
        if (emailEmUso) {
            alert("Endereço de e-mail já em uso.");
            return;
        }

        const dadosAnteriores = JSON.parse(dadosArmazenados);
        dadosAnteriores.push(dados);
        dadosString = JSON.stringify(dadosAnteriores);
    }

    localStorage.setItem('usuarioDados', dadosString);
}

function caixaVazia(input) {
    input.innerHTML = "Este campo precisa ser preenchido!";
}
