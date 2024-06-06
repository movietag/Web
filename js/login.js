const form = document.querySelector("form");
form.onsubmit = (ev) => {
    const uUsuario = document.querySelector("#uUsuario").value;
    const uSenha = document.querySelector("#uSenha").value;

    const dadosArmazenados = localStorage.getItem('usuarioDados');
    console.log(dadosArmazenados);

    if (dadosArmazenados) {
        const usuarios = JSON.parse(dadosArmazenados);

        usuarios.forEach(pessoa => {
            if ((pessoa.nome === uUsuario) || (pessoa.email === uUsuario)) {
                if(pessoa.senha === uSenha){
                    localStorage.setItem('status', "true");
                    window.location.href = "../index.html";
                }
            };
        });
        alert("Informações Incorretas");
    }
};   
        
