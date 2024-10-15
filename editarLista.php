<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Link para ícones da biblioteca Boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="shortcut icon" href="img/Logo-Preta.svg" type="image/x-icon">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/filmes.css">
    <link rel="stylesheet" href="css/watchlist.css">
    <link rel="stylesheet" href="css/editarLista.css">
    <script src="js/script.js" defer></script>
    <script src="js/watchlist.js" defer></script>
    <title>Movie Tag ∙ Editar Lista</title>
</head>
<body>
    <!-- Menu -->
    <header>
    <?php require 'navbar.php'; ?>
    </header>
    <section>
        <div id="caixinha">
            <h1><input type="text" name="nomeLista" id="nomeLista" autofocus value="Nome da Lista"><spam id="novaProducao">+ Nova Produção</spam></h1>
            <!-- dialog adicionar produção -->
            <dialog id="buscarFilme">
                <div class="dialog-header">
                    <input type="text" name="tituloFilme" id="tituloFilme" placeholder="Digite o nome da produção..."><i class='bx bx-search-alt-2'></i>
                </div>
                <div class="dialog-content">
                    <a href="" class="filmeBusca">
                        <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ckklq45UxUkwgHve9xItXqXr06r.jpg" alt="Poster do Filme">
                        <!-- texto -->
                        <div>
                            <h2>Midnight Cowboy<span>(1969)</span></h2>
                            <p>Dirigido por John Schlesinger</p>
                            <p>Filme</p>
                        </div>
                    </a>
                    <hr>
                    <a href="" class="filmeBusca">
                        <img src="https://www.themoviedb.org/t/p/w1280/3eVSQJdiBin6A7F7nsg62eJFf0Y.jpg" alt="Poster do Filme">
                        <!-- texto -->
                        <div>
                            <h2>Midnight Mass<span>(2021)</span></h2>
                            <p>Criado por Mike Flanagan</p>
                            <p>Série</p>
                        </div>
                    </a>
                </div>
            </dialog>
            <a href="visualizacaoWatchlist.php"><i class='bx bx-check'></i></a>
        </div>
        <!--caixa com todos os filmes-->
        <div class="itens resultados">
            <!-- Item -->
            <a href="visualizacaoProducao.php?query=382614"  class="item filme">
                <img src="img/posteres/Poster-TBH.jpg" alt="Poster do Filme">
                <!-- texto -->
                <div>
                    <div id="tituloLixo">
                        <h2>O Livro de Henry<span>(2017)</span></h2>
                        <i class='bx bxs-trash'></i>
                    </div>
                    <p>Henry e Peter são dois irmãos criados pela sua mãe solteira, Susan. 
                        Henry, apaixonado pela sua vizinha Christina, escreve um livro de resgate para tirá-la dos maus tratos do pai policial. 
                        Quando sua mãe descobre sobre o seu plano, ela decide que eles irão colocar a ideia em prática.</p>    
                </div>
            </a>
            <a href="visualizacaoProducao.php?query=438631" class="item filme">
                <img src="img/posteres/Poster-Duna-1.jpg" alt="Poster do Filme">
                <!-- texto -->
                <div>
                    <div id="tituloLixo">
                        <h2>Duna<span>(2021)</span></h2>
                        <i class='bx bxs-trash'></i>
                    </div>
                    <p>Em um futuro distante, planetas são comandados por casas nobres que fazem parte de um império feudal intergalático.
                        Paul Atreides é um jovem cuja família toma o controle do planeta deserto Arrakis, também conhecido como Duna.
                        A única fonte da especiaria Melange, a substância mais importante do cosmos, Arrakis se mostra ser um planeta nem um pouco fácil de governar.</p>
                </div>
            </a>
            <a href="visualizacaoProducao.php?query=142" class="item filme">
                <img src="img/posteres/brokebackmountain.jpg" alt="Poster do Filme">
                <!-- texto -->
                <div>
                    <div id="tituloLixo">
                        <h2>O Segredo de Brokeback Mountain<span>(2005)</span></h2>
                        <i class='bx bxs-trash'></i>
                    </div>
                    <p>Um conto de amor sobre o relacionamento de dois jovens, Ennis Del Mar, um rancheiro de Wyoming e Jack Twist, um vaqueiro de rodeio, que se encontram no verão de 1963, e nos anos seguintes lutam secretamente para entender e se manter o amor que nutrem um pelo outro.</p>
                </div>
            </a>
            <a href="visualizacaoProducao.php?query=324857" class="item filme">
                <img src="img/posteres/miranhaverso.jpg" alt="Poster do Filme">
                <!-- texto -->
                <div>
                    <div id="tituloLixo">
                        <h2>Homem-Aranha: No Aranhaverso<span>(2018)</span></h2>
                        <i class='bx bxs-trash'></i>
                    </div>
                    <p>Miles Morales é um jovem negro do Brooklyn que se tornou o Homem-Aranha inspirado no legado de Peter Parker, já falecido. Entretanto, ao visitar o túmulo de seu ídolo em uma noite chuvosa, ele é surpreendido com a presença do próprio Peter, vestindo o traje do herói aracnídeo sob um sobretudo. A surpresa fica ainda maior quando Miles descobre que ele veio de uma dimensão paralela, assim como outras variações do Homem-Aranha.</p>
                </div>
            </a>
        </div>
    </section>
    <!-- Footer -->
    <?php include 'footer.php'; ?>
</body>
</html>