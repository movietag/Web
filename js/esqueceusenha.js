const fDialog = document.querySelector("dialog form");


const secaoCaixa = document.querySelector(".secao-caixa");

// Seleciona o link "Esqueceu a senha?"
const esqueceu = document.querySelector("form a");
// Adiciona um evento de clique ao link
esqueceu.addEventListener("click", (ev)=>{
    ev.preventDefault(); 
    secaoCaixa.classList.toggle("blur"); 
    fDialog.parentElement.showModal(); 
})

// Define a função que será executada quando o formulário de redefinição de senha for enviado
fDialog.onsubmit = (ev) => {
    ev.preventDefault(); // Previne o comportamento padrão de envio do formulário
    const formData = new FormData(fDialog); // Captura os dados do formulário
    console.log('ta entrano');

    fetch('./php/processoEmail.php', {
        method: 'POST',
        body: formData, 
    })
        .then((response) => {
            if (response.ok) {
                console.log(response);
                return response.text(); 
            } else {
                throw new Error('Erro no envio do formulário');
            }
        })
        .then((data) => {
            console.log(data); 
            alert('E-mail enviado com sucesso!');
        })
        .catch((error) => {
            console.error('Erro:', error);
            alert('Erro ao enviar o e-mail.');
        });



    secaoCaixa.classList.toggle("blur"); // Remove o efeito de desfoque
    fDialog.parentElement.close(); // Fecha o diálogo modal
};