<?php
require_once 'database.php'; // Inclui o arquivo de conexão com o banco de dados.
session_start(); // Inicia a sessão para acessar dados do usuário logado.
header('Content-Type: application/json'); // Define que a resposta será no formato JSON.

// Função para enviar respostas JSON
function jsonResponse($success, $message, $data) {
    echo json_encode(['success' => $success, 'message' => $message, 'data' => $data]);
    exit; // Interrompe a execução após enviar a resposta JSON.
}

// Função para obter a avaliação de um produto dado um usuário e um produto específico.
function getAvaliacaoByIdProd($idUsu, $idProd){
    $sql = "SELECT avaliacao FROM AVALIA_PRODUCAO WHERE idProd = :idProd AND idUsu = :idUsu";
    // Consulta SQL para buscar a avaliação do produto e usuário fornecidos.
    
    $stmt = Database::prepare($sql);
    // Prepara a consulta SQL para evitar SQL Injection.

    $stmt->bindParam(':idProd', $idProd); 
    $stmt->bindParam(':idUsu', $idUsu); 
    // Faz a ligação dos parâmetros na consulta SQL.

    $stmt->execute(); // Executa a consulta no banco de dados.
    return $stmt->fetch(PDO::FETCH_ASSOC); // Retorna a avaliação encontrada ou null.
}

try {
    // Obtém os dados do usuário logado e o ID do produto da query string.
    $idUsu = $_SESSION['dados']['id'];
    $idProd = $_GET['idProd'];

    $resultado = getAvaliacaoByIdProd($idUsu, $idProd); 
    // Chama a função para buscar a avaliação do usuário para o produto especificado.

    if ($resultado) {
        jsonResponse(true, 'Avaliacao recebida com sucesso!', $resultado);
        // Se a avaliação foi encontrada, retorna sucesso com a avaliação.
    } else {
        jsonResponse(false, 'Nenhuma avaliacao encontrada.', null);
        // Se não houver avaliação, retorna erro.
    }

} catch (Exception $e) {
    jsonResponse(false, 'Erro: ' . $e->getMessage(), null);
    // Em caso de erro, captura a exceção e retorna um erro genérico com a mensagem.
}
