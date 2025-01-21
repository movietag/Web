<?php
header('Content-Type: application/json'); // Define o tipo de conteúdo como JSON

// Obtém a entrada JSON
$data = json_decode(file_get_contents('php://input'), true);

// Verifica se os dados foram recebidos
if ($data) {
    // Aqui você pode processar os dados como quiser
    $pesquisa = htmlspecialchars($data['pesquisa'], ENT_QUOTES, 'UTF-8');

    $status = 'ok'; // Supondo que a validação seja bem-sucedida
    $message = 'Dados recebidos com sucesso!';

    // Retorna a resposta em formato JSON
    echo json_encode(['status' => $status, 'message' => $message]);
} else {
    // Se não receber dados, retornar um erro
    echo json_encode(['status' => 'error', 'message' => 'Nenhum dado recebido']);
}
?>
