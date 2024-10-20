<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Link para ícones da biblioteca Boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'  rel='stylesheet' >
    <link rel="shortcut icon" href="img/Logo-Preta.svg" type="image/x-icon">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/login.css">
    <script src="js/script.js" defer></script>
    <script src="js/login.js" defer></script>
    <title>Movie Tag ∙ Login</title>
</head>
<body>
    <header>
    <?php require 'navbar.php'; ?>
    </header>

    <!-- Seção principal de login -->
    <section>
        <div class="secao-caixa">
            <h1>Bem-vindo de volta!</h1>
            <div class="conteudo">
                <!-- Formulário de login -->
                <form id="form-total">
                    <label for="uUsuario">Usuário/Email:</label>
                    <input type="text" id="uUsuario" placeholder="Digite seu Usuário">
                    <label for="uSenha">Senha:</label>
                    <input type="password" name="uSenha" id="uSenha" placeholder="Digite sua senha">
                    <a href="#">Esqueceu a senha?</a>
                    <button type="submit" class="butao">Enviar</button>
                    <p>Não possui conta? <a href="cadastro.php">Cadastrar</a></p>
                </form>
            </div>
        </div>

        <!-- Diálogo para redefinição de senha -->
        <dialog>
            <form method="dialog">
                <span>Acesse o E-mail para redefinir a sua senha:</span>
                <label for="recEmail">E-mail para recuperação: </label>
                <input type="email" name="recEmail" id="recEmail">
                <button type="submit" class="butao">Enviar</button>
            </form> 
        </dialog>
    </section>

    <!-- Footer -->
    <?php include 'footer.php'; ?>
</body>
</html>
