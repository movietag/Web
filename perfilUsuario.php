<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Link para ícones da biblioteca Boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' >
    <link rel="shortcut icon" href="img/Logo-Preta.svg" type="image/x-icon">
    <!--css para a div class="tabs"-->
    <link rel="stylesheet" href="css/segmentedButton.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/perfilUsuario.css">
    <script src="js/perfilUsuario.js" defer></script>
    <script src="js/script.js" defer></script>
    <title>Movie Tag ∙ Perfil</title>
</head>
<body>
    <header>
        <nav>
            <!-- Logo que leva à página inicial -->
            <a href="index.php"><img src="img/Logo-Branca.svg" alt="logo-MT"></a>
            <ul class="menu">
                <!-- Itens do Menu -->
                <li class="lista-nav"> <a href="buscaAvancada.php">Busca Avançada</a></li>
                <li class="lista-nav" id="popup">
                    <a href="">Minhas Listas</a>
                    <span class="popuptext" id="myPopup">Você precisa estar logado para acessar Watchlist!</span>    
                </li>
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
        <div id="grandeUsuario">
            <div class="dados1">
                <i class='bx bxs-user'></i>
                <div>
                    <p id="username">UserName</p>
                    <p id="email">email@gmail.com</p>
                </div>
            </div>
            <div class="dados2">
                <p class="rotulo">Avaliações</p>
                <p>27</p>
            </div>
            <div class="dados2">
                <p class="rotulo">Tags Criadas</p>
                <p>15</p>
            </div>
            <button id="botao">Editar Perfil</button>
        </div>
        <hr>
        <div class="tabs">
            <input type="radio" id="estatisticas" name="menuPartes" value="estatisticas" checked>
            <label for="estatisticas">Estatísticas</label>
            <input type="radio" id="tags" name="menuPartes" value="tags">
            <label for="tags">Tags</label>
            <input type="radio" id="avaliacoes" name="menuPartes" value="avaliacoes">
            <label for="avaliacoes">Avaliações</label>
        </div>

        <div class="pagCharts">
            <canvas id="chartLinhas"></canvas>
            <canvas id="chartBarras"></canvas>
        </div>

        <div class="show pagTags">
            <ul class="tags">
                <li>Alien</li>
                <li>Baseado em HQs</li>
                <li>Anti-Herói</li>
                <li>Marvel</li>
                <li>Alien</li>
                <li>Baseado em HQs</li>
                <li>Anti-Herói</li>
                <li>Marvel</li>
                <li>Alien</li>
                <li>Baseado em HQs</li>
                <li>Anti-Herói</li>
                <li>Marvel</li>
                <li>Alien</li>
                <li>Baseado em HQs</li>
                <li>Anti-Herói</li>
                <li>Marvel</li>
            </ul>    
        </div>

        <div class="show pagAvals">
            <a href="visualizacaoProducao.php?type=movie&query=142" class="filme">
                <img src="img/posteres/brokebackmountain.jpg" alt="Poster do Filme">
                <h2>O Segredo de Brokeback Mountain<span>(2005)</span></h2>
            </a>
            <a href="visualizacaoProducao.php?type=movie&query=873" class="filme">
                <img src="https://www.themoviedb.org/t/p/w1280/xMiXnyVOIM8ZXr1DlnsKKcwHuil.jpg" alt="Poster do Filme">
                <h2>A Cor Púrpura<span>(1985)</span></h2>
            </a>
            <a href="visualizacaoProducao.php?type=tv&query=76331" class="filme">
                <img src="https://www.themoviedb.org/t/p/w1280/7HW47XbkNQ5fiwQFYGWdw9gs144.jpg" alt="Poster do Filme">
                <h2>Succession<span>(2018)</span></h2>
            </a>
            <a href="visualizacaoProducao.php?type=movie&query=12155" class="filme">
                <img src="https://www.themoviedb.org/t/p/w1280/fjaiHtykx4LcHJLzhKhn7tNPpAj.jpg" alt="Poster do Filme">
                <h2>Alice no País das Maravilhas<span>(2010)</span></h2>
            </a>
            <a href="visualizacaoProducao.php?type=tv&query=61889" class="filme">
                <img src="https://www.themoviedb.org/t/p/w1280/x7zUHG5cko4ZXQO2209Qc2aoyrc.jpg" alt="Poster do Filme">
                <h2>Demolidor<span>(2015)</span></h2>
            </a>
            <a href="visualizacaoProducao.php?type=movie&query=858017" class="filme">
                <img src="https://www.themoviedb.org/t/p/w1280/xDpqCK2MSaz5vCUHymed12sPFyR.jpg" alt="Poster do Filme">
                <h2>Eu Vi o Brilho da TV<span>(2024)</span></h2>
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
                <i class='bx bx-envelope'></i>
                <a href="mailto:movietag.pi@gmail.com">movietag.pi@gmail.com</a>
            </li>
            <li>
                <i class='bx bxl-instagram'></i>
                <a href="https://www.instagram.com/movietag.pi/">movietag.pi</a>
            </li>
        </ul>
    </footer>
<!--chart.js-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
</body>
</html>