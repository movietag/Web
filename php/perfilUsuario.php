<?php
// Iniciar Sessão
session_start();

header('Content-Type: application/json');

// Função para enviar respostas JSON
function jsonResponse($success, $message, $data) {
    echo json_encode(['success' => $success, 'message' => $message, 'data' => $data]);
    exit;
}

try {
    // Conexão com o banco usando PDO
    require_once 'database.php'; // Inclui o arquivo com a classe Database

    // Consulta ao banco de dados
    $sql = "SELECT DATE_FORMAT(dataHora, '%m') AS mes, COUNT(*) AS total_acessos
            FROM ACESSA_PRODUCAO
            GROUP BY mes
            ORDER BY mes";

    $stmt = Database::prepare($sql);
    $stmt->execute();

    // Inicializando arrays para armazenar os resultados
    $labels = [];
    $data = [];

    // Processa os resultados
    if ($stmt->rowCount() > 0) {
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $labels[] = $row['mes'];        // Mês formatado
            $data[] = $row['total_acessos']; // Total de acessos
        }
    }
    jsonResponse(true, 'Dados enviados com sucesso!', [$labels, $data]);

} catch (PDOException $e) {
    // Tratamento de erro
    $_SESSION['mensagem'] = "Erro ao conectar ao banco de dados: " . $e->getMessage();
    header('Location: /Web/erro.php');
    exit;
}


?>
