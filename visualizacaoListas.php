<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Link para ícones da biblioteca Boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link id='favicon' rel="shortcut icon" href="img/Logo-Preta.svg" type="image/x-icon">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/listas.css">
    <script src="js/script.js" defer></script>
    <script src="js/listas.js" defer></script>
    <title>Movie Tag ∙ Minhas Listas</title>
</head>
<body>
    <!-- Menu -->
    <header>
    <?php require_once 'navbar.php'; ?>
    </header>
    <h1>Minhas Listas</h1>
    <section>  
        <div id="caixa-listas">
            <!-- "botão" para criar uma nova lista -->
            <a href="editarLista.php">
                <div id="criarListas">
                    <div id="caixaUm"><p>+</p></div>
                    <div id="caixaDois"></div>
                    <div id="caixaTres"></div>
                </div>
                <div id="info-listas">
                    <h2>Criar Nova Lista</h2>
                </div>
            </a>
            <!-- navegar para uma lista ja existente -->
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
            <!-- navegar para uma lista ja existente -->
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
            <!-- navegar para uma lista ja existente -->
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
            <!-- navegar para uma lista ja existente -->
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
            <!-- navegar para uma lista ja existente -->
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
    <?php include_once 'footer.php'; ?>
</body>
</html>
