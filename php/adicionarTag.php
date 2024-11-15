<?php
session_start();
header('Content-Type: application/json');
require_once 'database.php';

function getIdProducao($idAPI) {
    $sql = "SELECT id FROM PRODUCAO WHERE idAPI = :idAPI";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idAPI', $idAPI);
    $stmt->execute();
    $rows = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$rows) {
        jsonResponse(false, 'Produção não encontrada.');
    }

    return $rows['id'];
}

function jsonResponse($success, $message) {
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

function verificarUsuarioLogado() {
    if (!isset($_SESSION['dados']['id'])) {
        jsonResponse(false, 'Usuário não está logado.');
    }
    return $_SESSION['dados']['id'];
}

function verificarTagExistente($tag) {
    $sql = "SELECT id FROM TAG WHERE nome = :nome";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':nome', $tag);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return $row['id'] ?? null;
}

function inserirTag($tag, $idUsu) {
    $sql = "INSERT INTO TAG (nome, idUsu) VALUES (:nome, :idUsu)";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':nome', $tag);
    $stmt->bindParam(':idUsu', $idUsu);
    if ($stmt->execute()) {
        return Database::lastInsertId();
    }
    return null;
}

function relacaoProducaoTagExiste($idProd, $idTag) {
    $sql = "SELECT * FROM PRODUCAO_TAG WHERE idProd = :idProd AND idTag = :idTag";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idProd', $idProd);
    $stmt->bindParam(':idTag', $idTag);
    $stmt->execute();
    return $stmt->rowCount() > 0;
}

function criarRelacaoProducaoTag($idProd, $idTag) {
    $sql = "INSERT INTO PRODUCAO_TAG (idProd, idTag) VALUES (:idProd, :idTag)";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idProd', $idProd);
    $stmt->bindParam(':idTag', $idTag);
    return $stmt->execute();
}

function processarTags($tags, $idProd, $idUsu) {
    $tagsInseridas = [];
    $tagsExistentes = [];
    foreach ($tags as $tag) {
        $tag = trim($tag);
        if (empty($tag)) {
            continue;
        }

        $idTag = verificarTagExistente($tag);
        if (!$idTag) {
            $idTag = inserirTag($tag, $idUsu);
            if ($idTag) {
                $tagsInseridas[] = $tag;
            }
        } else {
            $tagsExistentes[] = $tag;
        }

        if (!relacaoProducaoTagExiste($idProd, $idTag)) {
            criarRelacaoProducaoTag($idProd, $idTag);
        }
    }
    return ['inseridas' => $tagsInseridas, 'existentes' => $tagsExistentes];
}

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (is_null($data) || !isset($data['tags']) || !is_array($data['tags'])) {
        jsonResponse(false, 'Nenhuma tag foi enviada ou JSON inválido.');
    }

    if (!isset($data['myParam'])) {
        jsonResponse(false, 'ID da produção não fornecido.');
    }

    $myParam = json_decode($data['myParam'], true);
    if (is_null($myParam) || !isset($myParam['query']) || empty($myParam['query'])) {
        jsonResponse(false, 'Parâmetro myParam inválido ou chave "query" ausente.');
    }

    $idAPI = $myParam['query'];
    $idProd = getIdProducao($idAPI);

    $idUsu = verificarUsuarioLogado();
    $resultado = [
        'tagsProcessadas' => processarTags($data['tags'], $idProd, $idUsu),
        'idProd' => $idProd,
        'idUsu' => $idUsu,
        'dataRecebida' => $data
    ];
    

    jsonResponse(true, [
        'message' => 'Processamento concluído.',
        'tags' => $resultado
    ]);
} catch (Exception $e) {
    jsonResponse(false, 'Erro: ' . $e->getMessage());
}
?>
