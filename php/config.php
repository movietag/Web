<?php
$host = "sql202.infinityfree.com";  // MySQL Hostname
$usuario = "if0_37517870";          // MySQL Username
$senha = "f1lminho";                // MySQL Password
$banco = "if0_37517870_movietagdb"; // Nome do Banco de Dados
$porta = 3306;                      // MySQL Port (opcional)

// Montando a DSN
$conn = "mysql:host=$host;port=$porta;dbname=$banco;";

try {
    // Criando uma nova conexão PDO
    $pdo = new PDO($conn, $usuario, $senha);
    $pdo->exec("SET NAMES 'utf8'");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT VERSION()");
    print($stmt->fetchColumn());
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
