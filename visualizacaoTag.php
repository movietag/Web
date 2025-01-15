<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Link para ícones da biblioteca Boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link id='favicon' rel="shortcut icon" href="img/Logo-Preta.svg" type="image/x-icon">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/filmes.css">
    <link rel="stylesheet" href="css/tag.css">
    <script src="js/script.js" defer></script>
    <script src="js/visualizacaoTag.js" defer></script>
    <title>Movie Tag ∙ Tag</title>
</head>
<body>
    <!-- Menu -->
    <header>
    <?php require_once 'navbar.php'; ?>
    </header>
    <section>
        <h1>Alien</h1>
        <h2 id="subtitulo">20.000 acessos</h2>
        <!--caixa com todos os filmes-->
        <div class="itens resultados">
            <!-- dados do filme -->
            <a href="visualizacaoProducao.php?query=335983" class="item filme">
                <img src="img/posteres/venom.jpg" alt="Poster do Filme">
                <!-- texto -->
                <div>
                    <h2>Venom<span>(2018)</span></h2>
                    <ul class="tags">
                        <li>Alien</li>
                        <li>Baseado em HQs</li>
                        <li>Anti-Herói</li>
                        <li>Marvel</li>
                        <li>MCU</li>
                    </ul>
                    <p>O jornalista Eddie Brock desenvolve força e poder sobre-humanos quando seu corpo se funde com o alienígena Venom. Dominado pela raiva, Venom tenta controlar as novas e perigosas habilidades de Eddie.</p>    
                </div>
            </a>
            <!-- dados do filme -->
            <a href="visualizacaoProducao.php?query=601" class="item filme">
                <img src="img/posteres/et.jpg" alt="Poster do Filme">
                <!-- texto -->
                <div>
                    <h2>E.T. - O Extra-Terrestre<span>(1982)</span></h2>
                    <ul class="tags">
                        <li>Alien</li>
                        <li>Nomeado ao Oscar</li>
                        <li>Feliz</li>
                        <li>Baseado em HQs</li>
                    </ul>
                    <p>A história da amizade entre um extraterrestre perdido na Terra e um menino de 10 anos que o esconde em casa, procurando evitar a todo o custo que ele seja capturado e transformado numa cobaia pelos serviços secretos e ajudando-o, finalmente, a regressar a casa.</p>    
                </div>
            </a>
        </div>
    </section>

    <!-- Footer -->
    <?php include_once 'footer.php'; ?>
</body>
</html>
