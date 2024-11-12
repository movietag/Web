<?php
$servername = "sql202.infinityfree.com";
$username = "if0_37517870";
$password = "f1lminho";
$dbname = "if0_37517870_movietagdb";

// Criando a conexão
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Verificando a conexão
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";
?>
