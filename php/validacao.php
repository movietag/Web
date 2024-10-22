<?php
// Verifica se o método da requisição é POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recebe os dados do fetch (json)
    $pesquisa = $_POST['pesquisa'];


    // Aqui você pode adicionar suas verificações, por exemplo:
    if (isset($pesquisa)) {
        // Supondo que você valide o usuário e senha de alguma forma
        $pesquisa = filter_var($pesquisa, FILTER_SANITIZE_SPECIAL_CHARS);
        echo json_encode(['status' => 'ok', 'message' => 'Dados validados com sucesso!']);
    } else {
    echo json_encode(['status' => 'error', 'message' => 'Método de requisição inválido.']);
}}
?>
