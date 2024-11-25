<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Link para ícones da biblioteca Boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' >
    <link id='favicon' rel="shortcut icon" href="img/Logo-Preta.svg" type="image/x-icon">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/editarPerfil.css">
    <script defer src="js/script.js"></script>
    <title>Movie Tag ∙ Editando Perfil</title>
</head>
<body>

    <!-- Menu -->
    <header>
    <?php require 'navbar.php'; ?>
    </header>

    <section>
        <div class="formulario secao-caixa">
            <h1>Editar Perfil</h1>
            <!-- Formulario -->
            <form method="POST" enctype="multipart/form-data" action="php/alterarDadosUsuario.php" class="form-total">
                <div class="conteudo">
                    <!-- Icone -->
                    <div class="icone">
                        <img id="fotoUser" src=<?php echo htmlspecialchars($imageSrc); ?> alt="Imagem de Perfil do Usuário">
                        <!-- Input para arquivos -->
                        <input type="file" accept="image/*" name="uFile" id="uFile"> 
                    </div>
                </div>
                <div class="conteudo">
                    <!-- Dados do Usuário  -->
                    <label for="uNome">Usuário:</label>
                    <input type="text" id="uNome" name="uUsuario" value=<?php echo $_SESSION['dados']['usuario']?> required> 
                    <label for="uEmail">Email:</label>
                    <input type="email" id="uEmail" name="uEmail" value=<?php echo $_SESSION['dados']['email']?> required>
                    <label for="uSenha">Senha:</label>
                    <input type="password" name="uSenha" id="uSenha" placeholder="Sua senha" required> 
                    <label for="uSenha">Nova Senha:</label>
                    <input type="password" name="confirmSenha" id="confirmSenha" placeholder="Digite sua nova senha" required> 
                    <button name="btn-Atualizar" class="butao">Salvar Mudanças</button>
                    <p><?php echo $_SESSION['mensagem']?></p>
                </div>
            </form>
        </div>
    </section>

    <!-- Footer -->
    <?php include 'footer.php'; ?>
</body>