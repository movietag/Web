<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Link para ícones da biblioteca Boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' >
    <link rel="shortcut icon" href="img/Logo-Preta.svg" type="image/x-icon">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/cadastro.css">
    <script src="js/script.js" defer></script>
    <script src="js/cadastro.js" defer></script>
    <title>Movie Tag ∙ Cadastro</title>
</head>
<body>
    <!-- Menu -->
    <header>
        <nav>
            <!-- Link para a página inicial com o logo -->
            <a href="index.php"><img src="img/Logo-Branca.svg" alt="logo-MT"></a>
            <ul class="menu">
                <!-- Itens do Menu -->
                <li class="lista-nav"><a href="buscaAvancada.php">Busca Avançada</a></li>
                
                <!-- Item do menu com popup de aviso -->
                <li class="lista-nav" id="popup">
                    <a href="">Minhas Listas</a>
                    <span class="popuptext" id="myPopup">Você precisa estar logado para acessar Watchlist!</span>    
                </li>
                <!-- Item do menu com submenu -->
                <li class="lista-nav" id="btnConta">
                    <div>Conta</div>
                    <ul class="backdown-menu">
                        <li><a href="login.php">Entrar</a></li>
                        <li><a href="cadastro.php">Registrar</a></li>
                        <li><a href="perfilUsuario.php">Perfil</a></li>
                        <li><a href=""></a>Sair</li>
                    </ul>
                </li>
            </ul>
        </nav>
    </header>
    
    <section>
        <div class="secao-caixa">
            <!-- Título da seção -->
            <h1>Criar Conta</h1>
            <div class="conteudo">

                <!-- Icone de usuário -->
                <div class="icone">
                    <i class='bx bxs-user'></i>
                </div>

                <!-- Formulário de cadastro -->
                <form id="form-total">
                    <div class="info-caixas">
                        <label for="uNome">Nome:</label>
                        <input type="text" id="uNome" placeholder="Nome da conta" class="camposInput"> 
                        <small id="alertaN" class="alertas"></small>
                    </div>
                    <div class="info-caixas">
                        <label for="uUsuario">Usuário:</label>
                        <input type="text" id="uUsuario" placeholder="Nome de usuário" class="camposInput"> 
                        <small id="alertaU" class="alertas">Este usuário já existe.</small>
                    </div>
                    <div class="info-caixas">
                        <label for="uEmail">Email:</label>
                        <input type="email" id="uEmail" placeholder="Seu email" class="camposInput">
                        <small id="alertaE" class="alertas">Este email já existe.</small>
                    </div>
                    <div class="info-caixas">
                        <label for="uSenha">Senha:</label>
                        <input type="password" name="uSenha" id="uSenha" placeholder="Sua senha" class="camposInput">
                        <small id="alertaS" class="alertas">A senha deve ter no mínimo 8 caracteres.</small>
                    </div>
                    <div class="info-caixas">
                        <label for="uConfSenha">Confirmar senha:</label>
                        <input type="password" name="uConfSenha" id="uConfSenha" placeholder="Confirme a senha" class="camposInput"> 
                        <small id="alertaCS" class="alertas">As senhas devem ser iguais.</small>
                    </div>
                    <button class="butao" type="submit">Criar Conta</button> 
                    <small id="alertaErro" class="alertas">Corrija as informações erradas!</small>
                    <p id="psenha">Já possui conta? <a href="login.php" id="psenhaA">Login</a></p>
                </form>
                
            </div>
        </div>
        
    </section>

    <!-- Footer -->
    <footer>
        <img src="img/Logo-Branca.svg" alt="logo-MT">
        
        <!-- Coluna Básico -->
        <ul class="column">
            <li><h2>Básico</h2></li>
            <li><a href="sobre.php">Sobre o MovieTag</a></li>
        </ul>

        <!-- Coluna Contato -->
        <ul class="column">
            <li><h2>Contato</h2></li>
            <li>
                <i class='bx bx-envelope' ></i>
                <a href="mailto:movietag.pi@gmail.com">movietag.pi@gmail.com</a>
            </li>
            <li>
                <i class='bx bxl-instagram' ></i>
                <a href="https://www.instagram.com/movietag.pi/">movietag.pi</a>
            </li>
        </ul>
    </footer>
</body>
</html>
