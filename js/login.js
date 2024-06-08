const secaoCaixa = document.querySelector(".secao-caixa");
const fDialog = document.querySelector("dialog form");

const form = document.querySelector("form");
form.onsubmit = (ev) => {
    const uUsuario = document.querySelector("#uUsuario").value;
    const uSenha = document.querySelector("#uSenha").value;

    const dadosArmazenados = localStorage.getItem('usuarioDados');

    if (dadosArmazenados) {
        const usuarios = JSON.parse(dadosArmazenados);

        usuarios.forEach(pessoa => {
            if ((pessoa.nome === uUsuario) || (pessoa.email === uUsuario)) {
                if(pessoa.senha === uSenha){
                    localStorage.setItem('status', "true");
                    window.location.href = "../index.html";
                }
            else{
                alert("Informações Incorretas");
            }
            };
        });

    }
};

// Esqueci a Senha
const esqueceu = document.querySelector("form a");
esqueceu.addEventListener("click", (ev)=>{
    ev.preventDefault();
    secaoCaixa.classList.toggle("blur");
    fDialog.parentElement.showModal();

})

// Redefinir a senha

fDialog.onsubmit = (ev) => {
    ev.preventDefault();
    secaoCaixa.classList.toggle("blur");
    fDialog.parentElement.close();
};

