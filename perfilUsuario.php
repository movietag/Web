<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Link para ícones da biblioteca Boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' >
    <link id='favicon' rel="shortcut icon" href="img/Logo-Preta.svg" type="image/x-icon">
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
    <?php 
    require_once 'navbar.php'; ?>
    </header>

    <section>
        <div id="grandeUsuario">
            <div class="dados1">
            <img id="fotoUser" src="<?php echo htmlspecialchars($imageSrc); ?>" alt="Imagem de Perfil do Usuário">
                <div>
                    <p id="username"><?php echo $_SESSION['dados']['usuario']?></p>
                    <p id="email"><?php echo $_SESSION['dados']['email']?></p>
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

        <div class="dashboard"> 
            <div class="chart-containerP">
                <canvas id="chartPizzas" class="chartPizzas"></canvas>
            </div>
            <div class="chart-container">
                <canvas id="chartLinhas"></canvas>
            </div>
            <div class="chart-container">
                <canvas id="chartBarras"></canvas>
            </div> 
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

        <div id="aa" class="show itens pagAvals">
            <a href="visualizacaoProducao.php?type=movie&query=142" class="item filme">
                <img src="img/posteres/brokebackmountain.jpg" alt="Poster do Filme">
                <h2>O Segredo de Brokeback Mountain<span>(2005)</span></h2>
            </a>
            <a href="visualizacaoProducao.php?type=movie&query=873" class="item filme">
                <img src="https://www.themoviedb.org/t/p/w1280/xMiXnyVOIM8ZXr1DlnsKKcwHuil.jpg" alt="Poster do Filme">
                <h2>A Cor Púrpura<span>(1985)</span></h2>
            </a>
            <a href="visualizacaoProducao.php?type=tv&query=76331" class="item filme">
                <img src="https://www.themoviedb.org/t/p/w1280/7HW47XbkNQ5fiwQFYGWdw9gs144.jpg" alt="Poster do Filme">
                <h2>Succession<span>(2018)</span></h2>
            </a>
            <a href="visualizacaoProducao.php?type=movie&query=12155" class="item filme">
                <img src="https://www.themoviedb.org/t/p/w1280/fjaiHtykx4LcHJLzhKhn7tNPpAj.jpg" alt="Poster do Filme">
                <h2>Alice no País das Maravilhas<span>(2010)</span></h2>
            </a>
            <a href="visualizacaoProducao.php?type=tv&query=61889" class="item filme">
                <img src="https://www.themoviedb.org/t/p/w1280/x7zUHG5cko4ZXQO2209Qc2aoyrc.jpg" alt="Poster do Filme">
                <h2>Demolidor<span>(2015)</span></h2>
            </a>
            <a href="visualizacaoProducao.php?type=movie&query=858017" class="item filme">
                <img src="https://www.themoviedb.org/t/p/w1280/xDpqCK2MSaz5vCUHymed12sPFyR.jpg" alt="Poster do Filme">
                <h2>Eu Vi o Brilho da TV<span>(2024)</span></h2>
            </a>
        </div>
    </section>

    <!-- Footer -->
    <?php include 'footer.php'; ?>
<!--chart.js-->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.6"></script>
</body>
</html>