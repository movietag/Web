<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Link para ícones da biblioteca Boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link id='favicon' rel="shortcut icon" href="img/Logo-Preta.svg" type="image/x-icon">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/sobre.css">
    <script src="js/script.js" defer></script>
    <title>Movie Tag ∙ Sobre Nós</title>
</head>
<body>
    <!-- Menu -->
    <header>
    <?php require 'navbar.php'; ?>
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
    <?php include 'footer.php'; ?>
</body>
</html>