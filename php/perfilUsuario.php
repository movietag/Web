<?php
// Iniciar Sessão
session_start();

header('Content-Type: application/json');

// Função para enviar respostas JSON
function jsonResponse($success, $message, $data) {
    echo json_encode(['success' => $success, 'message' => $message, 'data' => $data]);
    exit;
}


try {
    // Conexão com o banco usando PDO
    require_once 'database.php'; // Inclui o arquivo com a classe Database

    $idUsuario = $_SESSION['dados']['id']; // Supondo que o ID do usuário está armazenado na sessão

    // Consulta para obter o número de avaliações feitas pelo usuário
    $sqlAvaliacoes = "
    SELECT COUNT(*) AS total_avaliacoes
    FROM AVALIA_PRODUCAO
    WHERE idUsu = :idUsu
    ";

    $stmt = Database::prepare($sqlAvaliacoes);
    $stmt->execute(['idUsu' => $idUsuario]);
    $totalAvaliacoes = $stmt->fetch(PDO::FETCH_ASSOC)['total_avaliacoes'];

    // Consulta para obter o número de tags criadas pelo usuário
    $sqlTags = "
    SELECT COUNT(*) AS total_tags
    FROM TAG
    WHERE idUsu = :idUsu
    ";
    
    $stmt = Database::prepare($sqlTags);
    $stmt->execute(['idUsu' => $idUsuario]);
    $totalTags = $stmt->fetch(PDO::FETCH_ASSOC)['total_tags'];

    // Adicionar os valores à sessão para reutilização no HTML
    $_SESSION['dados']['total_avaliacoes'] = $totalAvaliacoes;
    $_SESSION['dados']['total_tags'] = $totalTags; 
    //end
    //emd

    // Consulta para obter as três produções mais acessadas com seus nomes
    $sqlTopProducao = "
        SELECT P.nomeProd, AP.idProd, COUNT(*) AS total_acessos
        FROM ACESSA_PRODUCAO AP
        JOIN PRODUCAO P ON P.id = AP.idProd
        WHERE YEAR(AP.dataHora) = YEAR(CURDATE()) -- Considera apenas o ano atual
        GROUP BY AP.idProd, P.nomeProd
        ORDER BY total_acessos DESC
        LIMIT 5;
    ";

    $stmt = Database::prepare($sqlTopProducao);
    $stmt->execute();

    // Armazena os nomes e IDs das produções mais acessadas
    $topProducoes = [];
    $nomesProducoes = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $topProducoes[] = $row['idProd'];
        $nomesProducoes[$row['idProd']] = $row['nomeProd'];
    }

    if (empty($topProducoes)) {
        jsonResponse(false, 'Nenhuma produção encontrada.', []);
    }

    // Consulta para obter os acessos por mês para as produções mais acessadas
    $sqlAcessosPorMes = "
        SELECT AP.idProd, DATE_FORMAT(AP.dataHora, '%m') AS mes, COUNT(*) AS total_acessos
        FROM ACESSA_PRODUCAO AP
        WHERE AP.idProd IN (" . implode(',', $topProducoes) . ")
        GROUP BY AP.idProd, mes
        ORDER BY AP.idProd, mes;
    ";

    $stmt = Database::prepare($sqlAcessosPorMes);
    $stmt->execute();

    // Processar os resultados
    $dados = [];
    foreach ($topProducoes as $idProd) {
        $dados[$nomesProducoes[$idProd]] = array_fill(1, 12, 0); // Inicializa com 0 acessos para os 12 meses
    }

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $idProd = $row['idProd'];
        $mes = (int)$row['mes'];
        $nomeProd = $nomesProducoes[$idProd];
        $dados[$nomeProd][$mes] = (int)$row['total_acessos'];
    }
    
    //consulta pra obter as tags mais utilizadas
    $sql = "
        SELECT T.nome AS tag, COUNT(PT.idProd) AS total
        FROM TAG T
        JOIN PRODUCAO_TAG PT ON T.id = PT.idTag
        GROUP BY T.id
        ORDER BY total DESC
        LIMIT 5;
    ";

    $stmt = Database::prepare($sql);
    $stmt->execute();
    $tagsMaisUtilizadas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    //consulta pra obter os usuarios com maior atividade (acesso a produção + tags criadas + avaliações feitas)
    $sqlUsuariosAtivos = "
        SELECT U.usuario, 
        COALESCE(SUM(AP.total_acessos), 0) + COALESCE(SUM(AT.total_tags), 0) + COALESCE(SUM(AV.total_avaliacoes), 0) AS atividade_total
        FROM USUARIO U
        LEFT JOIN (
            SELECT idUsu, COUNT(*) AS total_acessos FROM ACESSA_PRODUCAO GROUP BY idUsu
        ) AP ON U.id = AP.idUsu
        LEFT JOIN (
            SELECT idUsu, COUNT(*) AS total_tags FROM TAG GROUP BY idUsu
        ) AT ON U.id = AT.idUsu
        LEFT JOIN (
            SELECT idUsu, COUNT(*) AS total_avaliacoes FROM AVALIA_PRODUCAO GROUP BY idUsu
        ) AV ON U.id = AV.idUsu
        GROUP BY U.id
        ORDER BY atividade_total DESC
        LIMIT 5;
    ";

    $stmt = Database::prepare($sqlUsuariosAtivos);
    $stmt->execute();
    $usuariosAtivos = $stmt->fetchAll(PDO::FETCH_ASSOC);


    
    //enviando os resultados das consultas para o js
    $enviar = [$tagsMaisUtilizadas, $dados, $usuariosAtivos];
    jsonResponse(true, 'Dados enviados com sucesso!', $enviar);


    //pegando tags feitas pelo usuario
    $sqlTagsUsu = "
    SELECT nome
    FROM TAG
    WHERE idUsu = :idUsu";
    $stmt = Database::prepare($sqlTagsUsu);
    $stmt->bindParam(':idUsu', $idUsuario, PDO::PARAM_INT);
    $stmt->execute();
    $tagsCriadas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "<script>console.log($tagsCriadas)</script>";

} catch (PDOException $e) {
    // Tratamento de erro
    $_SESSION['mensagem'] = "Erro ao conectar ao banco de dados: " . $e->getMessage();
    header('Location: /Web/erro.php');
    exit;
}
