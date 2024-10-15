<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Link para ícones da biblioteca Boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="shortcut icon" href="img/Logo-Preta.svg" type="image/x-icon">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/listas.css">
    <script src="js/script.js" defer></script>
    <title>Movie Tag ∙ Minhas Listas</title>
</head>
<body>
    <!-- Menu -->
    <header>
        <nav>
            <a href="index.php"><img src="img/Logo-Branca.svg" alt="logo-MT"></a>
            <ul class="menu">
                <!-- Itens do Menu  -->
                <li class="lista-nav"> <a href="buscaAvancada.php">Busca Avançada</a></li>
            
                <li class="lista-nav" id="popup">
                    <a href="">Minhas Listas</a>
                    <span class="popuptext" id="myPopup">Você precisa estar logado para acessar Watchlist!</span>    
                </li>
                <li class="lista-nav" id="btnConta">
                    <div>Conta</div>
                    <ul class="backdown-menu">
                        <li ><a href="login.php">Entrar</a></li>
                        <li><a href="cadastro.php">Registrar</a></li>
                        <li><a href="perfilUsuario.php">Perfil</a></li>
                        <li><a href=""></a>Sair</li>
                    </ul>
                </li>
            </ul>
        </nav>
    </header>
    <h1>Minhas Listas</h1>
    <section>  
        <div id="caixa-listas">
            <a href="editarLista.php">
                <div id="criarListas">
                    <div id="caixaUm"><p>+</p></div>
                    <div id="caixaDois"></div>
                    <div id="caixaTres"></div>
                </div>
            </a>
            <a href="visualizacaoWatchlist.php" class="caixinha-listas">
                <div id="criarListas">
                    <img src="img/posteres/brokebackmountain.jpg" alt="Pôster de Brokeback Mountain" class="poster">
                    <div id="caixaDois"></div>
                    <div id="caixaTres"></div>
                </div>
                <div id="info-listas">
                    <h2>Lista 1</h2>
                    <p>5 produções</p>
                </div>
            </a>
            <a href="visualizacaoWatchlist.php" class="caixinha-listas">
                <div id="criarListas">
                    <img src="img/posteres/brokebackmountain.jpg" alt="Pôster de Brokeback Mountain" class="poster">
                    <div id="caixaDois"></div>
                    <div id="caixaTres"></div>
                </div>
                <div id="info-listas">
                    <h2>pra chorar até dormir</h2>
                    <p>5 produções</p>
                </div>
            </a>
            <a href="visualizacaoWatchlist.php" class="caixinha-listas">
                <div id="criarListas">
                    <img src="img/posteres/brokebackmountain.jpg" alt="Pôster de Brokeback Mountain" class="poster">
                    <div id="caixaDois"></div>
                    <div id="caixaTres"></div>
                </div>
                <div id="info-listas">
                    <h2>Lista 2</h2>
                    <p>5 produções</p>
                </div>
            </a>
            <a href="visualizacaoWatchlist.php" class="caixinha-listas">
                <div id="criarListas">
                    <img src="img/posteres/brokebackmountain.jpg" alt="Pôster de Brokeback Mountain" class="poster">
                    <div id="caixaDois"></div>
                    <div id="caixaTres"></div>
                </div>
                <div id="info-listas">
                    <h2>Lista 1</h2>
                    <p>5 produções</p>
                </div>
            </a>
            <a href="visualizacaoWatchlist.php" class="caixinha-listas">
                <div id="criarListas">
                    <img src="img/posteres/brokebackmountain.jpg" alt="Pôster de Brokeback Mountain" class="poster">
                    <div id="caixaDois"></div>
                    <div id="caixaTres"></div>
                </div>
                <div id="info-listas">
                    <h2>Lista 2</h2>
                    <p>5 produções</p>
                </div>
            </a>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <img src="img/Logo-Branca.svg" alt="logo-MT">
        
        <ul class="column">
            <li><h2>Básico</h2></li>
            <li><a href="sobre.php">Sobre o MovieTag</a></li>
        </ul>

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
