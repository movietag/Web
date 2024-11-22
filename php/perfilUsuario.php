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

    // Consulta para obter as três produções mais acessadas
    $sqlTopProducao = "
        SELECT AP.idProd, COUNT(*) AS total_acessos
        FROM ACESSA_PRODUCAO AP
        WHERE YEAR(AP.dataHora) = YEAR(CURDATE()) -- Considera apenas o ano atual
        GROUP BY AP.idProd
        ORDER BY total_acessos DESC
        LIMIT 3;
    ";

    $stmt = Database::prepare($sqlTopProducao);
    $stmt->execute();

    // Armazena os IDs das produções mais acessadas
    $topProducoes = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $topProducoes[] = $row['idProd'];
    }

    if (empty($topProducoes)) {
        jsonResponse(false, 'Nenhuma produção encontrada.', []);
    }

    // Consulta para obter os acessos por mês para as produções mais acessadas
    $sqlAcessosPorMes = "
        SELECT AP.idProd, DATE_FORMAT(AP.dataHora, '%m') AS mes, COUNT(*) AS total_acessos
        FROM ACESSA_PRODUCAO AP
        WHERE AP.idProd IN (" . implode(',', $topProducoes) . ")
        GROUP BY AP.idProd, mes
        ORDER BY AP.idProd, mes;
    ";

    $stmt = Database::prepare($sqlAcessosPorMes);
    $stmt->execute();

    // Processar os resultados
    $dados = [];
    foreach ($topProducoes as $idProd) {
        $dados[$idProd] = array_fill(1, 12, 0); // Inicializa com 0 acessos para os 12 meses
    }

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $idProd = $row['idProd'];
        $mes = (int)$row['mes'];
        $dados[$idProd][$mes] = (int)$row['total_acessos'];
    }

    jsonResponse(true, 'Dados enviados com sucesso!', $dados);

} catch (PDOException $e) {
    // Tratamento de erro
    $_SESSION['mensagem'] = "Erro ao conectar ao banco de dados: " . $e->getMessage();
    header('Location: /Web/erro.php');
    exit;
}
