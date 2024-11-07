<?php
session_start();

function verificaLogado() {
    if (isset($_SESSION['status'])) {
        return $_SESSION['status'];
        }
}
?>
