<?php
header('Content-Type: application/json');
session_start();

require_once 'database.php';
require_once 'jsonResponse.php';

// Função para verificar se a produção já existe no banco
function producaoExiste($idAPI) {
    $sql = "SELECT id FROM PRODUCAO WHERE idAPI = :idAPI";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idAPI', $idAPI);
    $stmt->execute();
    return $stmt->rowCount() > 0;
}

// Função para inserir uma nova produção no banco
function criarProducao($idAPI, $nomeProd, $tipoProd) {
    $sql = "INSERT INTO PRODUCAO (idAPI, nomeProd, tipoProd) VALUES (:idAPI, :nomeProd, :tipoProd)";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idAPI', $idAPI);
    $stmt->bindParam(':nomeProd', $nomeProd);
    $stmt->bindParam(':tipoProd', $tipoProd);
    return $stmt->execute();
}

// Função para pegar o Id da produção via IdAPI
function getIdProducao($idAPI){
    $sql = "SELECT id FROM PRODUCAO WHERE idAPI = :idAPI";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idAPI', $idAPI);
    $stmt->execute();
    $rows = $stmt->fetch(PDO::FETCH_ASSOC);
    return $rows['id'];
}

function insertProdLista($idBanco, $idLista) {
    try {
        $sql = "INSERT INTO PRODUCAO_LISTA (idProd, idLista) VALUES (:idProd, :idLista)";
        $stmt = Database::prepare($sql);
        $stmt->bindParam(':idProd', $idBanco);
        $stmt->bindParam(':idLista', $idLista);
        return $stmt->execute();
    } catch (PDOException $e) {
        error_log('Erro ao inserir produção na lista: ' . $e->getMessage());
        return false;
    }
}

function prodListaExiste($idBanco, $idLista) {
    try {
        $sql = "SELECT COUNT(*) FROM PRODUCAO_LISTA WHERE idProd = :idProd AND idLista = :idLista";
        $stmt = Database::prepare($sql);
        $stmt->bindParam(':idProd', $idBanco);
        $stmt->bindParam(':idLista', $idLista);
        $stmt->execute();
        $count = $stmt->fetchColumn();
        return $count > 0; // Retorna true se a produção já existir na lista
    } catch (PDOException $e) {
        error_log('Erro ao verificar se produção já existe na lista: ' . $e->getMessage());
        return false;
    }
}


try {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data) {
        jsonResponse(false, 'Dados de entrada inválidos ou inexistentes.');
    }

    $idLista = $data['idLista'] ?? null;
    $idAPI = $data['idProd'] ?? null;
    $nomeProd = $data['nome'] ?? null;
    $tipoProd = $data['tipoProd'] ?? null;

    if (empty($idLista)) {
        jsonResponse(false, 'ID Lista não fornecido ou está vazio.');
    }

    if (empty($idAPI)) {
        jsonResponse(false, 'ID Prod não fornecido ou está vazio.');
    }

    if (empty($nomeProd)) {
        jsonResponse(false, 'Nome não fornecido ou está vazio.');
    }

    if (empty($tipoProd)) {
        jsonResponse(false, 'Tipo de Produção não fornecido.');
    }

    // Verificar se a produção já existe
    if (!producaoExiste($idAPI)) {
        // Criar nova produção se não existir
        if (!criarProducao($idAPI, $nomeProd, $tipoProd)) {
            jsonResponse(false, 'Erro ao inserir a produção no banco.');
        }
    }

    // Obter o ID da produção no banco de dados
    $idBanco = getIdProducao($idAPI);

    if (!$idBanco) {
        jsonResponse(false, 'Erro ao recuperar o ID da produção no banco de dados.');
    }

    // Verificar se a produção já está na lista
    if (prodListaExiste($idBanco, $idLista)) {
        jsonResponse(false, 'A produção já está associada a esta lista.');
    }

    // Inserir a produção na lista
    if (insertProdLista($idBanco, $idLista)) {
        jsonResponse(true, 'Produção adicionada com sucesso!');
    } else {
        jsonResponse(false, 'Erro ao adicionar produção à lista.');
    }

} catch (Exception $e) {
    error_log('Erro no script: ' . $e->getMessage());
    jsonResponse(false, 'Erro interno no servidor.');
}
