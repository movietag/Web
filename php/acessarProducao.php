<?php
header('Content-Type: application/json');
session_start();

require_once 'database.php';

// Função para enviar respostas JSON
function jsonResponse($success, $message) {
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

// Função para verificar se a produção já existe no banco
function producaoExiste($idAPI) {
    $sql = "SELECT * FROM PRODUCAO WHERE idAPI = :idAPI";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idAPI', $idAPI);
    $stmt->execute();
    return $stmt->rowCount() > 0;
}

// Função para inserir uma nova produção no banco
function criarProducao($idAPI) {
    $sql = "INSERT INTO PRODUCAO (idAPI) VALUES (:idAPI)";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idAPI', $idAPI);
    return $stmt->execute();
}

// Função para registrar o acesso à produção
function registrarAcesso($idUsu, $idProd) {
    $sql = "INSERT INTO ACESSA_PRODUCAO (idUsu, idProd) VALUES (:idUsu, :idProd)
            ON DUPLICATE KEY UPDATE dataHora = CURRENT_TIMESTAMP";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idUsu', $idUsu);
    $stmt->bindParam(':idProd', $idProd);
    return $stmt->execute();
}

function getIdProducao($idAPI){
    $sql = "SELECT * FROM PRODUCAO WHERE idAPI = :idAPI";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idAPI', $idAPI);
    $stmt->execute();
    $rows = $stmt->fetch(PDO::FETCH_ASSOC);
    return $rows['id'];
}

// Código principal
try {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data['id'])) {
        jsonResponse(false, 'ID não fornecido.');
    }

    $idAPI = $data['id'];
    $idUsu = isset($_SESSION['dados']['id']) ? $_SESSION['dados']['id'] : null;

    // Verificar se a produção já existe
    if (!producaoExiste($idAPI)) {
        // Criar nova produção se não existir
        if (!criarProducao($idAPI)) {
            jsonResponse(false, 'Erro ao inserir a produção no banco!');
        }
    }

    $idBanco = getIdProducao($idAPI);
    $_SESSION['dados']['idProd'] = $idBanco;

    // Registrar acesso se o usuário estiver logado
    if ($idUsu) {
        if (registrarAcesso($idUsu, $idBanco)) {
            jsonResponse(true, 'Produção e acesso à produção registrados com sucesso!');
        } else {
            jsonResponse(false, 'Produção criada, mas houve um erro ao registrar o acesso.');
        }
    } else {
        jsonResponse(true, 'Produção criada, mas o usuário não estava logado para registrar o acesso.');
    }

} catch (Exception $e) {
    jsonResponse(false, 'Erro: ' . $e->getMessage());
}
?>
