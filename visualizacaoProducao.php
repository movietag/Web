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
    <link rel="stylesheet" href="css/style_progressbar.css"/>
    <!-- <script src="js/script_progressbar.js" defer></script> -->
    <title>MovieTag ∙ Produção</title>
</head>
    


<body>
    <!-- Menu -->
    <header>
    <?php require 'navbar.php'; ?>
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
                                    <!-- <span class="classificacao_idade">14</span> -->
                                    <span class="data_estreia"></span>
                                    <span class="duracao"></span>
                                </div>
                            </div>

                            <!--Avaliacao-->
                            <div class="score">
                            <div class="container">
                                <div class="circular-progress">
                                    <div class="value-container">Não Avaliado</div>
                                </div>
                                </div>

                                <!-- <h2 class="porcentagem"></h2> -->

                                <h3 class="porcentagem_titulo">Classificação dos Usuários</h3>
                            </div>

                            <div class="banner_buttons">
                                <button class="banner_button tooltip_avaliar icon_button" id="openDialogAvaliar" ><i class='bx bx-star'></i></i></button>
                                <button class="banner_button tooltip_add_a_lista icon_button" id = "openDialog_salvar_prod"><i id="mark" class='bx bx-bookmark'></i></button>
                                <a href="https://www.youtube.com/watch?v=QqmbrvluQRA" class="banner_button"><i class='bx bx-play'></i>Assistir Trailer</a>                                

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

    <!-- Dialog Salvar Produção-->
    <dialog id="myDialogSalvarProd">
        <div class="dialog-header">
            <span>Salvar Produção em</span>
            <a id="novaLista">+ Nova Lista</a>
        </div>
        <hr>
        <div class="dialog-content">
            <label>
                <input type="checkbox"> Lista 1
            </label>
            <hr>
            <label>
                <input type="checkbox"> Lista 2
            </label>
            <hr>
            <label>
                <input type="checkbox"> Lista 1
            </label>
            <hr>
            <label>
                <input type="checkbox"> Lista 1
            </label>
            <hr>
        </div>
        <div class="dialog-footer">
            <button class="cancel-btn" id="cancelDialogSalvarProd">Cancelar</button>
            <button class="confirm-btn" id="confirmDialogSalvarProd">OK</button>
        </div>
    </dialog>

    <!-- Dialog Nova Lista -->
    <dialog id="myDialogNovaLista">
        <div class="dialog-header">
            Nova Lista
        </div>
        <hr>
        <div class="dialog-content">
            <input type="text" placeholder="Inserir título da lista...">
        </div>
        <div class="dialog-footer">
            <button class="cancel-btn" id="cancelDialogNovaLista">Cancelar</button>
            <button class="confirm-btn" id="confirmDialogCriarNovaLista">Criar</button>
        </div>
    </dialog>

    <!-- Dialog Avaliar -->
    <dialog id="myDialogAvaliar">
        <div class="dialog-header">
            Avaliação
        </div>
        <hr>
        <div class="dialog-content">
            <p id="tituloAvaliacao">Como você avalia {Produção}?</p>
            <div class="star-rating">
                <input type="radio" name="rating" id="star1" value="1">
                <label for="star1" class="star">&#9733;</label> <!-- Código HTML da estrela -->
                
                <input type="radio" name="rating" id="star2" value="2">
                <label for="star2" class="star">&#9733;</label>
                
                <input type="radio" name="rating" id="star3" value="3">
                <label for="star3" class="star">&#9733;</label>
                
                <input type="radio" name="rating" id="star4" value="4">
                <label for="star4" class="star">&#9733;</label>
                
                <input type="radio" name="rating" id="star5" value="5">
                <label for="star5" class="star">&#9733;</label>
            </div>
        </div>
        <div class="dialog-footer">
            <button class="cancel-btn" id="cancelDialogAvaliar">Cancelar</button>
            <button class="confirm-btn" id="confirmDialogAvaliar">Avaliar</button>
        </div>
    </dialog>

        <!-- Dialog Adicionar Tag -->
    <dialog id="myDialogAdicionarTag">
        <div class="dialog-header">Adicionar Tag</div>
        <hr>

        <div class="dialog-content">
            <!-- Contêiner das tags adicionadas -->
            <div id="tagsContainer" class="tags-container"></div>

            <!-- Input para adicionar novas tags -->
            <div class="tag-input-wrapper">
                <input type="text" id="inputTag" placeholder="Adicionar Tag">
                <button id="confirmTag" class="check-btn">&#10004;</button> <!-- Adicionar tag -->
            </div>
        </div>

        <div class="dialog-footer">
            <button class="cancel-btn" id="cancelDialogAdicionarTag">Cancelar</button>
            <button class="confirm-btn" id="confirmDialogAdicionarTag">Adicionar</button>
        </div>
    </dialog>


    


        <!-- Dialog de Login -->
    <dialog id="myDialogLogin">
        <div class="dialog-header">Faça login para executar essa ação</div>
        <hr>
        <div class="dialog-content">
            <label for="loginUsuario">Usuário / Email</label>
            <input type="text" id="loginUsuario" placeholder="Digite seu usuário">

            <label for="loginSenha">Senha</label>
            <div class="password-wrapper">
                <input type="password" id="loginSenha" placeholder="Digite sua senha">
                <button type="button" id="toggleSenha" class="eye-btn">&#128065;</button> <!-- Ícone de olho -->
            </div>

            <a href="#" class="forgot-link">Esqueceu a senha?</a>

            <button id="login-btn">Entrar</button>

            <div class="separator">OU</div>

            <div class="register-link">
                Não possui conta? <a href="cadastro.php">Cadastrar</a>
            </div>
        </div>
    </dialog>




    <!-- Footer -->
    <?php include 'footer.php'; ?>
</body>
</html>