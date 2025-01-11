// Seleciona o formulário dentro do elemento dialog
const alerts = document.querySelector('.alertas');

loading = document.querySelector('.wrapperLoading');



// Seleciona o formulário com o ID "form-total"
const form = document.querySelector("#form-total");
// Define a função que será executada quando o formulário for enviado
form.onsubmit = (ev) => {
    // Obtém o caminho da URL
    const path = window.location.pathname;
    // Extrai o nome do arquivo (última parte do caminho)
    const pageName = path.substring(path.lastIndexOf('/') + 1);


    ev.preventDefault();
    if (verificaVazio()) {
        // Exibe o loading
        loading.style.display = 'block';

        // Cria um objeto FormData a partir do formulário
        const formData = new FormData(form);
        
        // Envia os dados usando fetch
        fetch('./php/loginUsuario.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json(); // Transformar a resposta em JSON
        })
        .then(data => {
            if (data.success) {
                if (pageName == "visualizacaoProducao.php"){
                    dialogLogin.close();
                    // Recarrega a página atual
                    location.reload();

                }else{
                    window.location.href = './index.php';
                }
                alerts.style.display = 'none';
            } else {
                alerts.textContent = data.message;
                alerts.style.display = 'inline-block';
                console.error(`Erro: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Erro de conexão ou na API:', error.message);
        })
        .finally(() => {
            // Sempre oculta o loading, independentemente do sucesso ou erro
            loading.style.display = 'none';
        });
    }
};

function verificaVazio(){

    const uUsuario = document.querySelector("#uUsuario");
    const uSenha = document.querySelector("#uSenha");

    // Verifica se os campos estão vazios e, se estiverem, altera a borda para vermelho e sai da função
    if (uUsuario.value === "" || uSenha.value === "") {
        uUsuario.style.border = "1px solid red";
        uSenha.style.border = "1px solid red";
        return false;
    }
    return true
}