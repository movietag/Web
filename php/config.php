<?php
$host = "sql202.infinityfree.com";  // MySQL Hostname
$usuario = "if0_37517870";          // MySQL Username
$senha = "f1lminho";                // MySQL Password
$banco = "if0_37517870_movietagdb"; // Nome do Banco de Dados
$porta = 3306;                      // MySQL Port (opcional)

// Montando a DSN
$connect =mysqli_connect($host,$usuario,$senha,$banco);
if(mysqli_connect_error()):
	echo "Falha na conexão: ". mysqli_connect_error();
endif;
?>