<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Link para ícones da biblioteca Boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="shortcut icon" href="img/Logo-Preta.svg" type="image/x-icon">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/integrante.css">
    <script src="js/script.js" defer></script>
    <script src="js/visualizacaoIntegrante.js" defer></script>
    <title>Movie Tag ∙ Integrante</title>
</head>
<body>
    <!-- Menu -->
    <header>
    <?php require 'navbar.php'; ?>
    </header>

    <section>

        <div class="container">

            <!-- Informações do Integrante -->
            <div class="info">
                <img src="" alt="Foto" id="foto">

                <div class="texto">
                    <h2>Informações Pessoais </h2> <br>
                    <h3> <b>Conhecido por</b></h3>
                    <p id="idAtividade"></p> <br>
    
                    <!-- <h3><b>Gênero</b></h3>
                    <p id="idGenero">Masculino</p> <br> -->
    
                    <h3><b>Data de Nascimento</b></h3>
                    <p id="aniversario"></p>
                </div>



            </div>
            <div>
                <h1 id="nome"></h1>
                <h2> <b>Biografia</b></h2>
                <p id="bio"></p>

                <!-- Lista de filmes relacionados ao integrante  -->
                <div class="lista">
                    <h2>Filmes Relacionados</h2>
                    <div class="itens">
                        <div class="item">
                            <a href="visualizacaoProducao.php?query=693134">  
                                <img src="img/posteres/Poster-Duna.jpg" alt="Poster-Filme">
                                <span>Duna: Parte Dois (2024)</span>
                            </a>
                        </div>

                        <div class="item">
                            <a href="visualizacaoProducao.php?query=438631"> 
                                <img src="img/posteres/Poster-Duna-1.jpg" alt="Poster-Filme">
                                <span>Duna (2021)</span>
                            </a>
                        </div>

                        <div class="item">
                            <a href="visualizacaoProducao.php?query=398818"> 
                                <img src="img/posteres/Poster-MCPSN.jpg" alt="Poster-Filme">
                                <span>Me Chame Pelo Seu Nome (2017)</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <?php include 'footer.php'; ?>
</body>
</html>
