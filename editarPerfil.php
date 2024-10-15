<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Link para ícones da biblioteca Boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' >
    <link rel="shortcut icon" href="img/Logo-Preta.svg" type="image/x-icon">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/formulario.css">
    <script defer src="js/script.js"></script>
    <title>Movie Tag ∙ Editando Perfil</title>
</head>
<body>

    <!-- Menu -->
    <header>
    <?php require 'navbar.php'; ?>
    </header>

    <section>
        <div class="formulario">
            <h1>Editar Perfil</h1>
            <!-- Formulario -->
            <form class="form-total"></form>
                <fieldset>
                <!-- Icone -->
                <div class="icone">
                    <i class='bx bxs-user'></i>
                    <!-- Input para arquivos -->
                    <input type="file" name="uFile" id="uFile"> 
                </div>
                </fieldset>

                <!-- Dados do Usuário  -->
                <fieldset>
                    <label for="uNome">Usuário:</label>
                    <input type="text" id="uNome" placeholder="Nome de usuário" required> 
                    <label for="uEmail">Email:</label>
                    <input type="email" id="uEmail" placeholder="Seu email" required>
                    <label for="uSenha">Senha:</label>
                    <input type="password" name="uSenha" id="uSenha" placeholder="Sua senha" required> 
                    <label for="uSenha">Confirmar Nova Senha:</label>
                    <input type="password" name="confirmSenha" id="confirmSenha" placeholder="Confirme a senha" required> 
                    <button class="butao">Salvar Mudanças</button> 
                </fieldset>

            </form>
                
        </div>
       
    </section>

    <!-- Footer -->
    <?php include 'footer.php'; ?>
</body>