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

try {
    if (isset($_SESSION['dados']['id'])) {
        $idUsu = $_SESSION['dados']['id'];
        if (criarNovaLista($idUsu)) {
            echo json_encode(['success' => true, 'message' => "Lista criada com sucesso!"]);
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
