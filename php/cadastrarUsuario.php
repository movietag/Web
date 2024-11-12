<?php
// // Iniciar Sessão

// session_start();

// if (isset($_POST['btn-cadastrar'])):
//     // Tratamento dos inputs
//     $uUsuario = filter_input(INPUT_POST, 'uUsuario', FILTER_SANITIZE_SPECIAL_CHARS);
//     $uEmail = filter_input(INPUT_POST, 'uEmail', FILTER_SANITIZE_EMAIL);
//     $uSenha = filter_input(INPUT_POST, 'uSenha', FILTER_SANITIZE_SPECIAL_CHARS);
//     $confirmSenha = filter_input(INPUT_POST, 'confirmSenha', FILTER_SANITIZE_SPECIAL_CHARS);

//     // Processamento da imagem
//     if (isset($_FILES['uFile']) && $_FILES['uFile']['error'] == 0) {
//         // Obter o conteúdo do arquivo e converter para Base64
//         $imageData = file_get_contents($_FILES['uFile']['tmp_name']);
//         $imageBase64 = base64_encode($imageData);
//     }

//     // Hash da senha
//     $uSenha = password_hash($uSenha, PASSWORD_DEFAULT);

//     // Conexão
//     require_once 'config.php';

//     // Verificar se o usuário ou e-mail já existe
//     $sql = "SELECT * FROM USUARIO WHERE usuario = '$uUsuario' OR email = '$uEmail'";
//     $result = mysqli_query($conn, $sql);

//     if (mysqli_num_rows($result) > 0) {
//         $_SESSION['mensagem'] = "Nome de usuário ou e-mail já cadastrado!";
//         header('Location: /cadastro.php');
//     } else {
//         // Inserir no banco de dados com pathImg nulo
//         $sql = "INSERT INTO USUARIO (usuario, email, senha, pathImg) VALUES ('$uUsuario', '$uEmail', '$uSenha', " . ($imageBase64 ? "'" . mysqli_real_escape_string($conn, $imageBase64) . "'" : "NULL") . ")";

//         if (mysqli_query($conn, $sql)) {
//             $_SESSION['mensagem'] = "Cadastro com sucesso!";
//             $_SESSION['status'] = true;
//             $sql = "SELECT * FROM USUARIO WHERE usuario = '$uUsuario' OR email = '$uEmail'";
//             $result = mysqli_query($conn, $sql);
//             $rows = mysqli_fetch_assoc($result);
//             $_SESSION['dados'] = [
//                 "id" => $rows['id'],
//                 "usuario" => $rows["usuario"],
//                 "email" => $rows["email"],
//                 "foto" => $rows['pathImg']
//         ];
//             header('Location: /index.php');
//         } else {
//             $_SESSION['mensagem'] = "Erro ao cadastrar!";
//             header('Location: /cadastro.php');
//         }
//     }
// endif;
?>

<?php
// Iniciar Sessão
session_start();

if (isset($_POST['btn-cadastrar'])):
    // Tratamento dos inputs
    $uUsuario = filter_input(INPUT_POST, 'uUsuario', FILTER_SANITIZE_SPECIAL_CHARS);
    $uEmail = filter_input(INPUT_POST, 'uEmail', FILTER_SANITIZE_EMAIL);
    $uSenha = filter_input(INPUT_POST, 'uSenha', FILTER_SANITIZE_SPECIAL_CHARS);
    $confirmSenha = filter_input(INPUT_POST, 'confirmSenha', FILTER_SANITIZE_SPECIAL_CHARS);

    // Processamento da imagem
    if (isset($_FILES['uFile']) && $_FILES['uFile']['error'] == 0) {
        // Obter o conteúdo do arquivo e converter para Base64
        $imageData = file_get_contents($_FILES['uFile']['tmp_name']);
        $imageBase64 = base64_encode($imageData);
    }

    // Hash da senha
    $uSenha = password_hash($uSenha, PASSWORD_DEFAULT);

    // Conexão
    require_once 'database.php';

    try {
        // Verificar se o usuário ou e-mail já existe
        $sql = "SELECT * FROM USUARIO WHERE usuario = :usuario OR email = :email";
        $stmt = Database::prepare($sql);
        $stmt->bindParam(':usuario', $uUsuario);
        $stmt->bindParam(':email', $uEmail);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $_SESSION['mensagem'] = "Nome de usuário ou e-mail já cadastrado!";
            header('Location: /cadastro.php');
        } else {
            // Inserir no banco de dados com pathImg nulo
            $sql = "INSERT INTO USUARIO (usuario, email, senha, pathImg) VALUES (:usuario, :email, :senha, :pathImg)";
            $stmt = Database::prepare($sql);
            $stmt->bindParam(':usuario', $uUsuario);
            $stmt->bindParam(':email', $uEmail);
            $stmt->bindParam(':senha', $uSenha);
            $pathImg = $imageBase64 ? $imageBase64 : null;
            $stmt->bindParam(':pathImg', $pathImg);
            
            if ($stmt->execute()) {
                $_SESSION['mensagem'] = "Cadastro com sucesso!";
                $_SESSION['status'] = true;

                // Buscar dados do usuário recém cadastrado
                $sql = "SELECT * FROM USUARIO WHERE usuario = :usuario OR email = :email";
                $stmt = Database::prepare($sql);
                $stmt->bindParam(':usuario', $uUsuario);
                $stmt->bindParam(':email', $uEmail);
                $stmt->execute();
                $rows = $stmt->fetch(PDO::FETCH_ASSOC);

                $_SESSION['dados'] = array(
                    "id" => $rows['id'],
                    "usuario" => $rows["usuario"],
                    "email" => $rows["email"],
                    "foto" => $rows['pathImg']
                );
                header('Location: /Web/index.php');
            } else {
                $_SESSION['mensagem'] = "Erro ao cadastrar!";
                header('Location:  /Web/cadastro.php');
            }
        }
    } catch (PDOException $e) {
        $_SESSION['mensagem'] = "Erro ao conectar ao banco de dados: " . $e->getMessage();
        header('Location:  /Web/cadastro.php');
    }
endif;
?>

