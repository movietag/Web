const formGeral = document.querySelector("form");
formGeral.onsubmit = (ev) => {
    uNome = document.querySelector("#uNome").value;
    uEmail = document.querySelector("#uEmail").value;
    uSenha = document.querySelector("#uSenha").value;
    uConfSenha = document.querySelector("#uConfSenha").value;

    const dados = {nome: uNome, email: uEmail, senha: uSenha, confsenha: uConfSenha};
    console.log(dados);
    const dadosString = JSON.stringify(dados);
    localStorage.setItem('usuarioDados', dadosString);

};