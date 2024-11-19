<?php
// Iniciar Sessão
session_start();

try {
    // Conexão com o banco usando PDO
    require_once 'database.php'; // Inclui o arquivo com a classe Database

    // Consulta ao banco de dados
    $sql = "SELECT DATE_FORMAT(dataHora, '%Y-%m') AS mes, COUNT(*) AS total_acessos
            FROM ACESSA_PRODUCAO
            GROUP BY mes
            ORDER BY mes";

    $stmt = Database::prepare($sql);
    $stmt->execute();

    // Inicializando arrays para armazenar os resultados
    $labels = [];
    $data = [];

    // Processa os resultados
    if ($stmt->rowCount() > 0) {
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $labels[] = $row['mes'];        // Mês formatado
            $data[] = $row['total_acessos']; // Total de acessos
        }
    }
} catch (PDOException $e) {
    // Tratamento de erro
    $_SESSION['mensagem'] = "Erro ao conectar ao banco de dados: " . $e->getMessage();
    header('Location: /Web/erro.php');
    exit;
}
?>

<script>
    // Enviando dados do PHP para o JavaScript
    global phpLabels = <?php echo json_encode($labels); ?>;
    global phpData = <?php echo json_encode($data); ?>;
</script>
