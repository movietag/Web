<?php
header('Content-Type: application/json');
session_start();

require_once 'database.php';
require_once 'jsonResponse.php';

// Insere a Avaliação no Banco de Dados
function inserirAvaliacao($idUsu, $idBanco, $valor){
    $sql = "INSERT INTO AVALIA_PRODUCAO (idUsu, idProd, avaliacao) VALUES (:idUsu, :idProd, :avaliacao)
            ON DUPLICATE KEY UPDATE avaliacao = :avaliacao";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idUsu', $idUsu);
    $stmt->bindParam(':idProd', $idBanco);
    $stmt-> bindParam(':avaliacao', $valor);
    return $stmt->execute();
}

// Código principal
try {
    $data = json_decode(file_get_contents("php://input"), true);
    $valor = $data['avaliacao'];
    $idUsu = isset($_SESSION['dados']['id']) ? $_SESSION['dados']['id'] : null;
    $idBanco = $_SESSION['dados']['idProd'];
    
    if (!isset($data['avaliacao'])) {
        jsonResponse(false, 'Avaliação não fornecida!');
    }

    if (!is_numeric($valor) || $valor < 1 || $valor > 5) {
        jsonResponse(false, 'Avaliação deve ser um número entre 1 e 5!');
    }
    
    if (!$idUsu || !$idBanco) {
        jsonResponse(false, 'Usuário ou Produção não identificados!');
    }
    





    if (inserirAvaliacao($idUsu, $idBanco, $valor)){
        jsonResponse(true, 'Avaliação inserida com sucesso/Atualiza.');
    } else{
        jsonResponse(false, 'Erro em inserir Avaliação no Banco de Dados');
    }



} catch (Exception $e) {
    jsonResponse(false, 'Erro: ' . $e->getMessage());
}