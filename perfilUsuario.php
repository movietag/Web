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
        <!-- dados do usuario -->
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
                <p><?php echo $_SESSION['dados']['total_avaliacoes']?></p>
            </div>
            <div class="dados2">
                <p class="rotulo">Tags Criadas</p>
                <p><?php echo $_SESSION['dados']['total_tags']?></p>
            </div>
            <button id="botao">Editar Perfil</button>
        </div>
        <hr>
        <!--segmented button -->
        <div class="tabs">
            <input type="radio" id="estatisticas" name="menuPartes" value="estatisticas" checked>
            <label for="estatisticas">Estatísticas</label>
            <input type="radio" id="tags" name="menuPartes" value="tags">
            <label for="tags">Tags</label>
            <input type="radio" id="avaliacoes" name="menuPartes" value="avaliacoes">
            <label for="avaliacoes">Avaliações</label>
        </div>

        <!-- dashboard -->
        <div class="dashboard"> 
            <div class="chart-containerP">
                <canvas id="chartBarrasV" class="chartBarras"></canvas>
            </div>
            <div class="chart-container">
                <canvas id="chartLinhas"></canvas>
            </div>
            <div class="chart-container">
                <canvas id="chartBarrasH" class="chartBarras"></canvas>
            </div> 
        </div>

        <!-- tags pertencentes ao usuario -->
        <div class="show pagTags">
            <ul class="tags">
                <?php if (!empty($tagsCriadas)): ?>
                    <?php foreach ($tagsCriadas as $tag): ?>
                        <li><?php echo htmlspecialchars($tag['nome']); ?></li>
                    <?php endforeach; ?>
                <?php else: ?>
                    <li>Nenhuma tag criada ainda.</li>
                <?php endif; ?>
            </ul> 
        </div>

        <!-- avaliacoes do usuario -->
        <div class="show itens pagAvals">
            <a href="visualizacaoProducao.php?type=movie&query=142" class="item filme">
                <div id="caixinha">
                    <div class="avali">
                        <p>4,5</p>
                        <i class='bx bxs-star'></i>
                    </div>
                    <img src="img/posteres/brokebackmountain.jpg" alt="Poster do Filme">
                </div>
                <h2>O Segredo de Brokeback Mountain<span>(2005)</span></h2>
            </a>
        </div>
    </section>

    <!-- Footer -->
    <?php include_once 'footer.php'; ?>
<!--chart.js-->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.6"></script>
</body>
</html>