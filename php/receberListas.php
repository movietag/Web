<?php

session_start();
header('Content-Type: application/json');
require_once 'database.php';

function getListas($idUsu) {
    $sql = "SELECT id, nome FROM LISTA WHERE idUsu = :idUsu";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idUsu', $idUsu, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC); // Retorna todas as listas como um array associativo
}

function getProducoesLista($idLista) {
    $sql = "SELECT idProd FROM PRODUCAO_LISTA WHERE idLista = :idLista";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idLista', $idLista, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_COLUMN); // Retorna apenas os IDs das produções
}

try {
    if (isset($_SESSION['dados']['id'])) {
        $idUsu = $_SESSION['dados']['id'];
        $listas = getListas($idUsu); // Busca todas as listas do usuário

        $resultado = [];
        foreach ($listas as $lista) {
            $idLista = $lista['id'];
            $nomeLista = $lista['nome'];
            $producoes = getProducoesLista($idLista); // Busca as produções da lista

            // Monta o resultado final
            $resultado[] = [
                'idLista' => $idLista,
                'nomeLista' => $nomeLista,
                'producoes' => $producoes
            ];
        }

        echo json_encode(['success' => true, 'listas' => $resultado]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Usuário não autenticado']);
    }
} catch (Exception $e) {
    error_log("Erro: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Erro: ' . $e->getMessage()]);
}
