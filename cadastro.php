<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Link para ícones da biblioteca Boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' >
    <link id='favicon' rel="shortcut icon" href="img/Logo-Preta.svg" type="image/x-icon">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/cadastro.css">
    <script src="js/script.js" defer></script>
    <script src="js/cadastro.js" defer></script>
    <title>Movie Tag ∙ Cadastro</title>
</head>
<body>
    <!-- Menu -->
    <header>
    <?php require 'navbar.php'; ?>
    </header>
    
    <section>
        <div class="secao-caixa">
            <!-- Título da seção -->
            <h1>Cadastro</h1>
            <!-- Formulário de cadastro -->
            <form method="POST" enctype="multipart/form-data" id="form-total">
                <div class="conteudo">
                    <!-- Icone -->
                    <div class="icone">
                        <img id="fotoUser" src="img/circle_user_icon.svg" alt="Imagem de Perfil do Usuário">
                        <!-- Input para arquivos -->
                        <input type="file" accept="image/*" name="uFile" id="uFile"> 
                    </div>
                </div>

                <div class="conteudo">
                    
                    <div class="info-caixas">
                        <label for="uUsuario">Usuário:</label>
                        <input name="uUsuario" type="text" id="uUsuario" placeholder="Nome de usuário" class="camposInput"> 
                        <small id="alertaU" class="alertas">Este usuário já existe.</small>
                    </div>
                    <div class="info-caixas">
                        <label for="uEmail">Email:</label>
                        <input name="uEmail" type="email" id="uEmail" placeholder="Seu email" class="camposInput">
                        <small id="alertaE" class="alertas">Este email já existe.</small>
                    </div>
                    <div class="info-caixas">
                        <label for="uSenha">Senha:</label>
                        <input type="password" name="uSenha" id="uSenha" placeholder="Sua senha" class="camposInput">
                        <small id="alertaS" class="alertas">A senha deve ter no mínimo 8 caracteres.</small>
                    </div>
                    <div class="info-caixas">
                        <label for="uConfSenha">Confirmar senha:</label>
                        <input name="confirmSenha" type="password" name="uConfSenha" id="uConfSenha" placeholder="Confirme a senha" class="camposInput"> 
                        <small id="alertaCS" class="alertas">As senhas devem ser iguais.</small>
                    </div>
                    <button class="butao" name="btn-cadastrar" type="submit">Criar Conta</button> 
                    <small id="alertaErro" class="alertas">Corrija as informações erradas!</small>
                    <p id="psenha">Já possui conta? <a href="login.php" id="psenhaA">Login</a></p>

                
                </div>
            </form>
        </div>
        
    </section>

    <!-- Footer -->
    <?php include 'footer.php'; ?>
</body>
</html>
