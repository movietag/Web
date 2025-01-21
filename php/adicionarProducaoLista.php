<?php
header('Content-Type: application/json');
session_start();

require_once 'database.php';
require_once 'acessarProducao.php';

try {
    $data = json_decode(file_get_contents("php://input"), true);
    if (empty($data['id'])) {
        jsonResponse(false, 'ID não fornecido ou está vazio.');
        exit;
    }
    
    if (empty($data['nome'])) {
        jsonResponse(false, 'Nome não fornecido ou está vazio.');
        exit;
    }

    if (empty($data['tipoProd'])) {
        jsonResponse(false, 'Tipo de Produção não fornecido.');
        exit;
    }
    
    $idLista = $data['idLista'];
    $idAPI = $data['idProd'];
    $nomeProd = $data['nome'];
    $tipoProd = $data['tipoProd'];

    // Verificar se a produção já existe
    if (!producaoExiste($idAPI)) {
        // Criar nova produção se não existir
        if (!criarProducao($idAPI, $nomeProd, $tipoProd)) {
            jsonResponse(false, 'Erro ao inserir a produção no banco!');
            exit;
        }
    }

    $idBanco = getIdProducao($idAPI);

    if ($idUsu) {

        
    } else {
        
    }

} catch (Exception $e) {
    jsonResponse(false, 'Erro: ' . $e->getMessage());
}
