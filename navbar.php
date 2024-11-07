<?php 
    session_start();
    require_once 'php/imagemBase64.php';

?>
<nav>
    <a href="index.php"><img src="img/Logo-Branca.svg" alt="logo-MT"></a>
    <ul class="menu">
        <!-- Itens do Menu  -->
        <li class="lista-nav"> <a href="buscaAvancada.php">Busca Avançada</a></li>
    
        <li class="lista-nav" id="popup">
            <a href="">Minhas Listas</a>
            <span class="popuptext" id="myPopup">Você precisa estar logado para acessar Minhas Listas</span>    
        </li>
        <li class="lista-nav" id="btnConta">
            <div class="img-user">
                <img src="<?php echo htmlspecialchars($imageSrc); ?>" alt="" srcset="">
                <p><?php echo $_SESSION['dados']['usuario']?></p>
            </div>

            <ul class="backdown-menu">
                <li><a href="login.php">Entrar</a></li>
                <li><a href="cadastro.php">Registrar</a></li>
                <li class="item-show"><a href="perfilUsuario.php">Perfil</a></li>
                <li class="item-show"><a href=""></a>Sair</li>
            </ul>

        </li>
    </ul>
</nav>