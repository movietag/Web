<?php
require_once 'database.php';
session_start();
header('Content-Type: application/json'); // Define o tipo de conteúdo como JSON

// Função para enviar respostas JSON
function jsonResponse($success, $message, $data) {
    echo json_encode(['success' => $success, 'message' => $message, 'data' => $data]);
    exit;
}

function getAvaliacaoByIdProd($idUsu, $idProd){
    $sql = "SELECT avaliacao FROM AVALIA_PRODUCAO WHERE idProd = :idProd AND idUsu = :idUsu";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idProd', $idProd);
    $stmt->bindParam(':idUsu', $idUsu);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

try {

    $idUsu = $_SESSION['dados']['id'];
    $idProd = $_GET['idProd'];
    $resultado = getAvaliacaoByIdProd($idUsu, $idProd);

    if ($resultado) {
        jsonResponse(true, 'Avaliacao recebida com sucesso!', $resultado);
    } else {
        jsonResponse(false, 'Nenhuma avaliacao encontrada.', null);
    }

} catch (Exception $e) {
    jsonResponse(false, 'Erro: ' . $e->getMessage(), null);
}
