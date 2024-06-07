const butao = document.querySelector("button");
butao.addEventListener("click", function(){salvarDados()}) 

function salvarDados(){
    uNome = document.querySelector("#uNome").value;
    uEmail = document.querySelector("#uEmail").value;
    uSenha = document.querySelector("#uSenha").value;
    uConfSenha = document.querySelector("#uConfSenha").value;

    if (uSenha !== uConfSenha){
        alert("senhas não coincidem")
    }

    const dados = {
        nome: uNome, 
        email: uEmail, 
        senha: uSenha
    };
    
    let dadosString = "";
    const dadosArmazenados = localStorage.getItem('usuarioDados');
    if (dadosArmazenados == null){
        dadosGerais = [];
        dadosGerais.push(dados);
        dadosString = JSON.stringify(dadosGerais);
    }
    else{
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
        
        const dadosAnteriores = JSON.parse(dadosArmazenados);
        dadosAnteriores.push(dados);
        dadosString = JSON.stringify(dadosAnteriores);
    }
    localStorage.setItem('usuarioDados', dadosString);
};

function caixaVazia(input){
    input.innerHTML = "Este campo precisa ser preenchido!";
}
