<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Link para ícones da biblioteca Boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'  rel='stylesheet' >
    <link id='favicon' rel="shortcut icon" href="img/Logo-Preta.svg" type="image/x-icon">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/login.css">
    <script src="js/script.js" defer></script>
    <script src="js/login.js" defer></script>
    <script src="js/esqueceusenha.js" defer></script>
    <title>Movie Tag ∙ Login</title>
</head>
<body>
    <header>
    <?php 
    require_once 'navbar.php'; ?>
    </header>

    <!-- Seção principal de login -->
    <section>
        <div class="secao-caixa">
            <h1>Login</h1>
            <div class="conteudo">
                <!-- Formulário de login -->
                <form method="POST" id="form-total">
                    <label for="uUsuario">Usuário/Email:</label>
                    <input type="text" name="uUsuario-Email" id="uUsuario" placeholder="Digite seu Usuário">
                    <label for="uSenha">Senha:</label>
                    <input type="password" name="uSenha" id="uSenha" placeholder="Digite sua senha">
                    <a href="#">Esqueceu a senha?</a>
                    <button type="submit" name="btn-Login" class="butao">Enviar</button>
                    <p>Não possui conta? <a href="cadastro.php">Cadastrar</a></p>
                    <small class="alertas"></small>

                    <div class="wrapperLoading">
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="shadow"></div>
                        <div class="shadow"></div>
                        <div class="shadow"></div>
                    </div>
                </form>
            </div>
        </div>

        <dialog id="myDialogNovaLista">
            <form action="POST" method="dialog">
                <div class="dialog-header">
                    Acesse o E-mail para redefinir a sua senha
                </div>
                <hr>
                <div class="dialog-content">
                    <input type="email" name="recEmail" id="recEmail" placeholder="E-mail para recuperação">
                </div>
                <div class="dialog-footer">
                    <button class="cancel-btn" id="cancelDialogNovaLista">Cancelar</button>
                    <button class="confirm-btn" type="submit">Enviar</button>
                </div>
            </form>
    </dialog>
    </section>

    <!-- Footer -->
    <?php include_once 'footer.php'; ?>
</body>
</html>
