<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Link para ícones da biblioteca Boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="shortcut icon" href="img/Logo-Preta.svg" type="image/x-icon">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/sobre.css">
    <script src="js/script.js" defer></script>
    <title>Movie Tag ∙ Sobre Nós</title>
</head>
<body>
    <!-- Menu -->
    <header>
        <nav>
            <a href="index.html"><img src="img/Logo-Branca.svg" alt="logo-MT"></a>
            <ul class="menu">
                <!-- Itens do Menu  -->
                <li class="lista-nav"> <a href="buscaAvancada.html">Busca Avançada</a></li>
                <li class="lista-nav" id="popup">
                    <a href="">Minhas Listas</a>
                    <span class="popuptext" id="myPopup">Você precisa estar logado para acessar Watchlist!</span>    
                </li>
                <li class="lista-nav" id="btnConta">
                    <div>Conta</div>
                    <ul class="backdown-menu">
                        <li ><a href="login.html">Entrar</a></li>
                        <li><a href="cadastro.html">Registrar</a></li>
                        <li><a href="perfilUsuario.html">Perfil</a></li>
                        <li><a href=""></a>Sair</li>
                    </ul>
                </li>
            </ul>
        </nav>
    </header>
    <section>
        <h1>Sobre o MovieTag</h1>
        <div id="caixaProjeto">
            <div class="projeto">
                <h2>O Que é?</h2>
                <p>Esse projeto foi criado por alunos do IFES com o intuito de facilitar o acesso a filmes e séries. Percebemos, como pessoas que consumem muitas produções audiovisuais, que não existem aplicativos ou sites nos quais pesquisar filmes específicos; decidimos, então, criar o MovieTag. Nosso site exibe aos usuários dados das produções e seu elenco, e permite aos usuários que salvem produções em suas Watchlists, além de possuir uma função de busca avançada através de tags.</p>
            </div>
        </div>
        <div id="caixaImagens">
            <img src="img/guilherme.enc" alt="Guilherme Omena">
            <img src="img/lucas.jpg" alt="Lucas Santos">
            <img src="img/gabi.jfif" alt="Gabriela Machado">
            <img src="img/luan.jpg" alt="Luan Otoni">
        </div>
    </section>
    <!-- Footer -->
    <footer>
        <img src="img/Logo-Branca.svg" alt="logo-MT">
        <ul class="column">
            <li><h2>Básico</h2></li>
            <li><a href="sobre.html">Sobre o MovieTag</a></li>
        </ul>
        <ul class="column">
            <li><h2>Contato</h2></li>
            <li>
                <i class='bx bx-envelope' ></i>
                <a href="mailto:movietag.pi@gmail.com">movietag.pi@gmail.com</a>
            </li>
            <li>
                <i class='bx bxl-instagram'></i>
                <a href="https://www.instagram.com/movietag.pi/">movietag.pi</a>
            </li>
        </ul>
    </footer>
</body>
</html>