<?php
header('Content-Type: application/json'); // Define o tipo de conteúdo como JSON

// Obtém a entrada JSON
$data = json_decode(file_get_contents('php://input'), true);

// Verifica se os dados foram recebidos
if ($data) {
    if (isset($data['termoPesquisa'])) {
        // Para pesquisa normal
        $pesquisa = htmlspecialchars($data['termoPesquisa'], ENT_QUOTES, 'UTF-8');
        $status = 'ok';
        $message = 'Dados recebidos com sucesso!';
    } else if (isset($data['pesquisa'])) {
        // Mantém compatibilidade com o formato antigo
        $pesquisa = htmlspecialchars($data['pesquisa'], ENT_QUOTES, 'UTF-8');
        $status = 'ok';
        $message = 'Dados recebidos com sucesso!';
        
    } else {
        $status = 'error';
        $message = 'Campo de pesquisa não encontrado';
    }

    echo json_encode(['status' => $status, 'message' => $message]);
} else {
    // Se não receber dados, retornar um erro
    echo json_encode(['status' => 'error', 'message' => 'Nenhum dado recebido']);
}
?>
