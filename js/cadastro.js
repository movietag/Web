const butao = document.querySelector("button");
butao.addEventListener("click", function(){salvarDados()}) 

function salvarDados(){
    uNome = document.querySelector("#uNome").value;
    uEmail = document.querySelector("#uEmail").value;
    uSenha = document.querySelector("#uSenha").value;
    uConfSenha = document.querySelector("#uConfSenha").value;

    if (uSenha != uConfSenha){
        alert("senhas não coincidem")
    }

    
    const dadosArmazenados = localStorage.getItem('usuarioDados');
    if (dadosArmazenados) {
        const usuarios = JSON.parse(dadosArmazenados);
        if (usuarios.nome === uNome) {
            alert("Nome de usuário já em uso.");
            return;
        }
        if (usuarios.email === uEmail) {
            alert("Endereço de e-mail já em uso.");
            return;
        }
    }

    const dados = {
        nome: uNome, 
        email: uEmail, 
        senha: uSenha, 
        confsenha: uConfSenha
    };
        
    const dadosString = JSON.stringify(dados);
    localStorage.setItem('usuarioDados', dadosString);

};

