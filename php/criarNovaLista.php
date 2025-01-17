<?php

session_start();
header('Content-Type: application/json');
require_once 'database.php'; // 

function criarNovaLista($idUsu) {
    try {
        // Função para registrar o acesso à produção
        $sql = "INSERT INTO LISTA (nome, idUsu) VALUES ('Nova Lista', :idUsu)";
        $stmt = Database::prepare($sql);
        $stmt->bindParam(':idUsu', $idUsu, PDO::PARAM_INT);
        return $stmt->execute();
    } catch (Exception $e) {
        error_log("Erro ao criar nova lista: " . $e->getMessage());
        return false;
    }
}

function getUltimaIdListaPorUsuario($idUsu) {
    try {
        // SQL para buscar a maior ID da lista para o usuário específico
        $sql = "SELECT idLista FROM LISTA WHERE idUsu = :idUsu ORDER BY idLista DESC";
        $stmt = Database::prepare($sql);
        $stmt->bindParam(':idUsu', $idUsu, PDO::PARAM_INT);
        $stmt->execute();
        
        // Retorna o maior idLista encontrado
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ? $result['idLista'] : null;
    } catch (Exception $e) {
        error_log("Erro ao buscar última ID de lista para o usuário: " . $e->getMessage());
        return null;
    }
}


try {
    if (isset($_SESSION['dados']['id'])) {
        $idUsu = $_SESSION['dados']['id'];
        if (criarNovaLista($idUsu)) {
            echo json_encode(['success' => true, 'message' => "Lista criada com sucesso!", 'idLista' => getUltimaIdListaPorUsuario($idUsu)]);
            exit;
        } else {
            echo json_encode(['success' => false, 'message' => "Lista não foi criada!"]);
            exit;
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Usuário não autenticado']);
        exit;
    }
} catch (Exception $e) {
    error_log("Erro: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Erro: ' . $e->getMessage()]);
    exit;
}
