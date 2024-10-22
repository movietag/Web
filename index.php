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
        <?php require 'navbar.php'; ?>


        <!-- Pesquisa -->
        <form id="fPesquisa">
            <input type="text" name="pesquisa" id="pesquisa" placeholder="Digite o nome da produção, tag, diretor...">
            <button id="pesq1" type="submit">Pesquisar</button>
        </form>
    </header>

    <section>


        
        <div class="area">
            <!-- Listas de Filmes -->
            <div class="lista">
                <div>
                    <h1>Popular </h1>
                    <div class="seletores">
                        <div class="seletor">Filme</div> <div class="seletor">Série</div>
                    </div>
                </div>

                <!-- Titulo da Lista -->


                <!-- Div de Itens preenchida via JS  -->
                <div class="itens">
                </div>
            </div>

            <div class="lista">

                <!-- Titulo da Lista -->
                <h1>No Cinema </h1>

                <!-- Div de Itens preenchida via JS  -->
                <div class="itens">
                </div>
            </div>

            <div class="lista">

                <!-- Titulo da Lista -->
                <h1>Top Avaliações </h1>

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
    <?php include 'footer.php'; ?>


</body>
</html>
