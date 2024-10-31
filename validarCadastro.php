<?php
// validarDados.php
header("Content-Type: application/json");
session_start();

// Variáveis de retorno para a resposta JSON
$response = [
    "usuario" => "valido",
    "email" => "valido",
    "senha" => "valido",
    "confSenha" => "valido",
    "mensagem" => "Validação concluída com sucesso."
];

// Conexão com o banco de dados
require_once 'config.php';

// Função para sanitizar inputs
function sanitize($data) {
    return htmlspecialchars(trim($data));
}

// Receber e sanitizar dados enviados
$uUsuario = sanitize($_POST['uUsuario'] ?? '');
$uEmail = sanitize($_POST['uEmail'] ?? '');
$uSenha = sanitize($_POST['uSenha'] ?? '');
$uConfSenha = sanitize($_POST['uConfSenha'] ?? '');

// Verificar usuário
if (strlen($uUsuario) < 6) {
    $response["usuario"] = "invalido";
    $response["mensagem"] = "Usuário deve ter pelo menos 6 caracteres.";
} else {
    $sql = "SELECT id FROM USUARIO WHERE usuario = '$uUsuario'";
    $result = mysqli_query($connect, $sql);
    if (mysqli_num_rows($result) > 0) {
        $response["usuario"] = "emUso";
        $response["mensagem"] = "Usuário já está em uso.";
    }
}

// Verificar email
if (!filter_var($uEmail, FILTER_VALIDATE_EMAIL)) {
    $response["email"] = "invalido";
    $response["mensagem"] = "Formato de email inválido.";
} else {
    $sql = "SELECT id FROM USUARIO WHERE email = '$uEmail'";
    $result = mysqli_query($connect, $sql);
    if (mysqli_num_rows($result) > 0) {
        $response["email"] = "emUso";
        $response["mensagem"] = "Email já está em uso.";
    }
}

// Verificar senha
if (strlen($uSenha) < 8) {
    $response["senha"] = "invalido";
    $response["mensagem"] = "Senha deve ter pelo menos 8 caracteres.";
}

// Verificar confirmação de senha
if ($uSenha !== $uConfSenha) {
    $response["confSenha"] = "diferente";
    $response["mensagem"] = "As senhas não coincidem.";
}

// Enviar resposta JSON para o JavaScript
echo json_encode($response);
exit;
?>
