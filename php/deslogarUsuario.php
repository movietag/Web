<?php
session_start();

if (isset($_SESSION['status'])) {
    session_unset();         // Limpa todas as variáveis da sessão
    session_destroy();       // Destroi a sessão no servidor
    $_SESSION = [];          // Remove as variáveis da sessão do código
    echo "Usuário deslogado com sucesso.";        
}

?>