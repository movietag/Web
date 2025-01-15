<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Link para ícones da biblioteca Boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' >
    <link id = 'favicon' rel="shortcut icon" href="img/Logo-Preta.svg" type="image/x-icon">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/visualizacaoProducao.css">
    <script src="js/script.js" defer></script>
    <script src="js/visualizacaoProducao.js" defer></script>
    <script src="js/login.js" defer></script>
    <link rel="stylesheet" href="css/style_progressbar.css"/>
    <!-- <script src="js/script_progressbar.js" defer></script> -->
    <title>MovieTag ∙ Produção</title>
</head>
    


<body>
    <!-- Menu -->
    <header>
    <?php require_once 'navbar.php'; ?>
    </header>

    <!--Banner-->
    <section id="banner">
        <!--Backdrop-->
        <section class="backdrop">
            <!--Conteudo Principal-->
            <div id="contents">
                <!--Banner Principal com botão para plataformas-->
                <div class="wrapper">
                    <img class="main-banner" src="" alt="">
                    <button id="plataformas_button">
                        Plataformas Disponíveis
                    </button>
                </div>
                <div>
                    <section id="dados_gerais">
                        <!--Conteudo do Banner-->
                        <div class="banner_contents">
                            <!--Titulo Principal-->
                            <div class="banner_dados_titulo">
                                <div class="banner_titulo">
                                    <h1 class="titulo"></h1>
                                    <span class="ano"></span>
                                </div>
                                <!--Dados Adicionais-->
                                <div class="dados_adicionais">
                                    <span id="classification"></span>
                                    <span class="data_estreia"></span>
                                    <span class="duracao"></span>
                                </div>
                            </div>

                            <!--Avaliacao-->
                            <div class="score">
                            <div class="container">
                                <div class="circular-progress">
                                    <div class="value-container">N/A</div>
                                </div>
                                </div>

                                <!-- <h2 class="porcentagem"></h2> -->

                                <h3 class="porcentagem_titulo">Avaliacação dos Usuários</h3>
                            </div>

                            <div class="banner_buttons">
                                <button class="banner_button tooltip_avaliar icon_button" id="openDialogAvaliar" ><i class='bx bx-star'></i></i></button>
                                <button class="banner_button tooltip_add_a_lista icon_button" id = "openDialog_salvar_prod"><i id="mark" class='bx bx-bookmark'></i></button>
                                <a href="#" class="banner_button" id="btnTrailer" target=""><i class='bx bx-play'></i>Assistir Trailer</a>                                

                            </div>

                            <!--Sinopse da Producao-->
                            <div class="sinopse_info">
                                <h2 class="sinopse_titulo">Sinopse</h2>

                                <p class="sinopse"></p>
                            </div>

                            <!-- Lista de produtores -->
                            <ol id="produtores"></ol>
                        </div>
                    </section>
                </div>

                <!--Seção de plataformas-->
                <section id="plataformas">
                    <h2>Stream</h2>
                    <div class="lista" id="lista-stream">
                        <img src="" alt="">
                    </div>

                    <h2>Alugar</h2>
                    <div class="lista" id="lista-aluguel">
                        <img src="" alt="">
                    </div>

                    <h2>Comprar</h2>
                    <div class="lista" id="lista-compra">
                        <img src="" alt="">
                    </div>
                </section>

                <!--Tags Associadas-->
                <div class="lista" id="lista-tag">

                    <div id="tagsAssociadas_add">
                        <h2>Tags Associadas</h2>
                        <button class="banner_button" id="openDialogAdicionarTag">Adicionar Tag</button>
                    </div>

                    <div class="tags">
                    </div>

                </div>
            </div>
        </section>
    </section>

    <!--Lista do Elenco da Producao-->
    <div class="lista" id="elenco">
        <h1>Elenco</h1>
        <div class="itens">
        </div>

    </div>

    <div class="lista" id="temporadas">
        <h1>Lista de Temporadas</h1>
        <div class="itens vertical">
        </div>

    </div>

    <?php require_once 'dialogsVisualizacaoProducao.php'; ?>
    <!-- Footer -->
    <?php include_once 'footer.php'; ?>
</body>
</html>