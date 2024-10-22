<?php
// Verifica se o método da requisição é POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recebe os dados do fetch (json)
    $data = json_decode(file_get_contents("php://input"));

    // Aqui você pode adicionar suas verificações, por exemplo:
    if (isset($data->username) && isset($data->password)) {
        // Supondo que você valide o usuário e senha de alguma forma
        if ($data->username === 'admin' && $data->password === '12345') {
            echo json_encode(['status' => 'ok', 'message' => 'Dados validados com sucesso!']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Usuário ou senha inválidos.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Dados incompletos.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método de requisição inválido.']);
}
?>
