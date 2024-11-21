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
    // $sql = "SELECT DATE_FORMAT(dataHora, '%m') AS mes, COUNT(*) AS total_acessos
    //         FROM ACESSA_PRODUCAO
    //         GROUP BY mes
    //         ORDER BY mes";
    
    
    
    // pega as 3 produções com mais acessos
    $sql = "SELECT 
                AP.idProd, 
                COUNT(*) AS total_acessos
            FROM 
                ACESSA_PRODUCAO AP
            WHERE 
                YEAR(AP.dataHora) = YEAR(CURDATE()) -- Considera apenas o ano atual
            GROUP BY 
                AP.idProd
            ORDER BY 
                total_acessos DESC
            LIMIT 3;
            ";

    $stmt = Database::prepare($sql);
    $stmt->execute();

    // Inicializando arrays para armazenar os resultados
    $labels = [];
    $data = [];

    // Processa os resultados
    if ($stmt->rowCount() > 0) {
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $labels[] = $row['idProd'];        // Mês formatado
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
