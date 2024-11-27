<?php
session_start();
header('Content-Type: application/json');
require_once 'database.php';
require_once 'jsonResponse.php';

// Função para verificar se é um JSON válido
function isJson($string) {
    json_decode($string);
    return (json_last_error() === JSON_ERROR_NONE);
}

// Função para verificar se o usuário está logado
function verificarUsuarioLogado() {
    if (!isset($_SESSION['dados']['id'])) {
        jsonResponse(false, 'Usuário não está logado.');
    }
    return $_SESSION['dados']['id'];
}

// Função para verificar se a Tag existe no banco
function verificarTagExistente($tag) {
    $sql = "SELECT id FROM TAG WHERE nome = :nome";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':nome', $tag);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return $row['id'] ?? null;
}

// Função para inserir a tag
function inserirTag($tag, $idUsu) {
    $sql = "INSERT INTO TAG (nome, idUsu) VALUES (:nome, :idUsu)";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':nome', $tag);
    $stmt->bindParam(':idUsu', $idUsu);
    if ($stmt->execute()) {
        return verificarTagExistente($tag);
    }
}

// Função para verificar se a relação Produção x Tag existe
function relacaoProducaoTagExiste($idProd, $idTag) {
    $sql = "SELECT * FROM PRODUCAO_TAG WHERE idProd = :idProd AND idTag = :idTag";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idProd', $idProd);
    $stmt->bindParam(':idTag', $idTag);
    $stmt->execute();
    return $stmt->rowCount() > 0;
}

// Função para criar o relacionamernto Produção x Tag
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
        $tag = trim($tag); // Remove espaços em branco
        if (empty($tag)) {
            continue; // Ignora tags vazias
        }
    
        // Verifica se a tag já existe
        $idTag = verificarTagExistente($tag);
    
        // Se a tag não existir, insere uma nova
        if (is_null($idTag)) {
            $idTag = inserirTag($tag, $idUsu);
            if (is_null($idTag)) {
                jsonResponse(false, "Erro ao inserir a tag '$tag'.");
                continue; // Pula para a próxima tag se a inserção falhar
            }
            $tagsInseridas[] = $tag;
        } else {
            $tagsExistentes[] = $tag;
        }
    
        // Verifica e cria a relação entre a produção e a tag
        if (!is_null($idTag) && !relacaoProducaoTagExiste($idProd, $idTag)) {
            if (!criarRelacaoProducaoTag($idProd, $idTag)) {
                jsonResponse(false, "Erro ao criar a relação para a tag '$tag'.");
            }
        }
    }      
    return ['inseridas' => $tagsInseridas, 'existentes' => $tagsExistentes];
}

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (is_null($data) || !isset($data['tags']) || !is_array($data['tags'])) {
        jsonResponse(false, 'Nenhuma tag foi enviada ou JSON inválido.');
    }

    if (!isset($data['id'])) {
        jsonResponse(false, 'ID da produção não fornecido.');
    }

    $idProd = $data['id'];
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
