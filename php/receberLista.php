<?php

session_start();
header('Content-Type: application/json');
ob_start();

require_once 'database.php';
require_once 'receberListas.php';

// Função para buscar a lista com base no ID
function getLista($idLista) {
    $sql = "SELECT id, nome FROM LISTA WHERE id = :idLista";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idLista', $idLista, PDO::PARAM_INT);
    $stmt->execute();
    $lista = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($lista) {
        // Adiciona as produções da lista
        $lista['producoes'] = getProducoesListaComTipo($idLista) ?? [];
        // Adiciona uma nova coluna com idProd e idAPI
        foreach ($lista['producoes'] as $key => $producao) {
            $idProd = $producao['idProd'];
            $idAPI = getIdApi($idProd);

            // Adiciona uma nova chave 'idMap' que contém ambos os IDs
            $lista['producoes'][$key]['idAPI'] = $idAPI;
        }
    }

    return $lista;
}

// Função para obter o idAPI de uma produção
function getIdApi($idProd) {
    $sql = "SELECT idAPI FROM PRODUCAO WHERE id = :idProd";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idProd', $idProd, PDO::PARAM_INT);
    $stmt->execute();
    $rows = $stmt->fetch(PDO::FETCH_ASSOC);
    return $rows['idAPI'] ?? null; // Retorna null se não encontrar o idAPI
}

try {
    // Verifica se o ID da lista foi fornecido
    if (!isset($_GET['idLista'])) {
        ob_clean();
        echo json_encode(['success' => false, 'message' => 'IdLista não fornecido!']);
        exit;
    }

    $idLista = (int)$_GET['idLista'];
    $lista = getLista($idLista);

    if ($lista) {
        ob_clean();
        echo json_encode(['success' => true, 'lista' => $lista]);
    } else {
        ob_clean();
        echo json_encode(['success' => false, 'message' => 'Lista não encontrada']);
    }
} catch (Exception $e) {
    error_log("Erro: " . $e->getMessage());
    ob_clean();
    echo json_encode(['success' => false, 'message' => 'Erro: ' . $e->getMessage()]);
}
