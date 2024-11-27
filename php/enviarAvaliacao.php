<?php
// Define o tipo de conteúdo como JSON para as respostas e inicia uma sessão.
header('Content-Type: application/json');
session_start();

// Importa as dependências necessárias para o funcionamento do script.
require_once 'database.php';
require_once 'jsonResponse.php';

// Função para inserir ou atualizar uma avaliação no banco de dados.
function inserirAvaliacao($idUsu, $idBanco, $valor) {
    $sql = "INSERT INTO AVALIA_PRODUCAO (idUsu, idProd, avaliacao) 
            VALUES (:idUsu, :idProd, :avaliacao)
            ON DUPLICATE KEY UPDATE avaliacao = :avaliacao";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idUsu', $idUsu); // Associa o ID do usuário.
    $stmt->bindParam(':idProd', $idBanco); // Associa o ID da produção.
    $stmt->bindParam(':avaliacao', $valor); // Associa o valor da avaliação.
    return $stmt->execute(); // Executa a consulta.
}

try {
    // Obtém os dados enviados no corpo da requisição (JSON) e os decodifica.
    $data = json_decode(file_get_contents("php://input"), true);
    $valor = $data['avaliacao']; // Avaliação enviada pelo cliente.
    $idUsu = isset($_SESSION['dados']['id']) ? $_SESSION['dados']['id'] : null; // ID do usuário na sessão.
    $idBanco = $_SESSION['dados']['idProd']; // ID da produção na sessão.

    // Verifica se a avaliação foi enviada.
    if (!isset($data['avaliacao'])) {
        jsonResponse(false, 'Avaliação não fornecida!');
    }

    // Valida se a avaliação é um número entre 1 e 5.
    if (!is_numeric($valor) || $valor < 1 || $valor > 5) {
        jsonResponse(false, 'Avaliação deve ser um número entre 1 e 5!');
    }

    // Verifica se o usuário e a produção estão identificados.
    if (!$idUsu || !$idBanco) {
        jsonResponse(false, 'Usuário ou Produção não identificados!');
    }

    // Insere ou atualiza a avaliação no banco de dados.
    if (inserirAvaliacao($idUsu, $idBanco, $valor)) {
        jsonResponse(true, 'Avaliação inserida com sucesso/Atualizada.');
    } else {
        jsonResponse(false, 'Erro ao inserir Avaliação no Banco de Dados.');
    }

} catch (Exception $e) {
    // Captura erros gerais e retorna uma mensagem com o erro.
    jsonResponse(false, 'Erro: ' . $e->getMessage());
}
