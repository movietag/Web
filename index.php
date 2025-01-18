<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Link para ícones da biblioteca Boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' >
    <link id='favicon' rel="shortcut icon" href="img/Logo-Preta.svg" type="image/x-icon">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/inicio.css">
    <script defer src="js/inicio.js"></script>
    <script defer src="js/script.js"></script>
    <title>MovieTag</title>
</head>

<body>

    <!-- Menu -->
    <header>
        <?php require_once 'navbar.php'; ?>


        <!-- Pesquisa -->
        <form id="fPesquisa">
            <div class="input-container">
                
                <input type="text" name="pesquisa" id="pesquisa" placeholder="Digite o nome da produção, #tag, diretor...">
            </div>
            <button id="pesq1" type="submit">Pesquisar</button>
            
        </form>
        <div id="highlight"></div>

    </header>
    
    <section>
        
        <div class="area">
            <!-- Listas de Filmes -->
            <div class="lista">
                <div>
                    <h1>Popular </h1>
                    <div class="seletores">
                        <div class="seletor selecionado" data-name='filmePopular'>Filme</div> <div class="seletor" data-name="seriePopular">Série</div>
                    </div>
                </div>
                <div class="itens">
                </div>
            </div>

            <div class="lista">

                <!-- Titulo da Lista -->
                <div>
                <h1>Novidades</h1>
                <div class="seletores">
                        <div class="seletor selecionado" data-name='filmeNovidade'>Filme</div> <div class="seletor" data-name="serieNovidade">Série</div>
                    </div>
                </div>


                <!-- Div de Itens preenchida via JS  -->
                <div class="itens">
                </div>
            </div>

            <div class="lista">

                <!-- Titulo da Lista -->

                <div>
                <h1>Top Avaliações </h1>
                <div class="seletores">
                        <div class="seletor selecionado" data-name='filmeTop'>Filme</div> <div class="seletor" data-name="serieTop">Série</div>
                    </div>
                </div>


                <!-- Div de Itens preenchida via JS  -->
                <div class="itens">
                </div>
            </div>
        </div>
        

        <div class="area" id="s02">
            <!-- Pesquisa -->
    
            <div class="lista">
                <h1>Resultados</h1>
                <div class="itens">
                </div>
            </div>
    
        </div>

    </section>
    
    <!-- Footer -->
    <?php include_once 'footer.php'; ?>


</body>
</html>
