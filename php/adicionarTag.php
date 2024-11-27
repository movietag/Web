<?php
// Inicia a sessão, define o tipo de conteúdo como JSON e importa arquivos necessários para a conexão com o banco e formatação de respostas.
session_start();
header('Content-Type: application/json');
require_once 'database.php';
require_once 'jsonResponse.php';

// Função para verificar se o usuário está logado. Se não estiver, retorna uma resposta JSON de erro.
function verificarUsuarioLogado() {
    if (!isset($_SESSION['dados']['id'])) {
        jsonResponse(false, 'Usuário não está logado.');
    }
    return $_SESSION['dados']['id'];
}

// Função para verificar se uma tag já existe no banco de dados com base no nome. Retorna o ID da tag se encontrada, ou null se não existir.
function verificarTagExistente($tag) {
    $sql = "SELECT id FROM TAG WHERE nome = :nome";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':nome', $tag);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return $row['id'] ?? null;
}

// Função para inserir uma nova tag no banco de dados. Retorna o ID da tag inserida.
function inserirTag($tag, $idUsu) {
    $sql = "INSERT INTO TAG (nome, idUsu) VALUES (:nome, :idUsu)";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':nome', $tag);
    $stmt->bindParam(':idUsu', $idUsu);
    if ($stmt->execute()) {
        return verificarTagExistente($tag); // Busca o ID da tag recém-inserida.
    }
}

// Função para verificar se já existe uma relação entre uma produção e uma tag no banco de dados.
function relacaoProducaoTagExiste($idProd, $idTag) {
    $sql = "SELECT * FROM PRODUCAO_TAG WHERE idProd = :idProd AND idTag = :idTag";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idProd', $idProd);
    $stmt->bindParam(':idTag', $idTag);
    $stmt->execute();
    return $stmt->rowCount() > 0; // Retorna true se a relação existir.
}

// Função para criar uma relação entre uma produção e uma tag no banco de dados. Retorna true em caso de sucesso.
function criarRelacaoProducaoTag($idProd, $idTag) {
    $sql = "INSERT INTO PRODUCAO_TAG (idProd, idTag) VALUES (:idProd, :idTag)";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idProd', $idProd);
    $stmt->bindParam(':idTag', $idTag);
    return $stmt->execute();
}

// Função principal para processar uma lista de tags. 
// Verifica se as tags já existem, insere as novas no banco de dados, e cria relações entre a produção e as tags.
function processarTags($tags, $idProd, $idUsu) {
    $tagsInseridas = [];  // Armazena as novas tags que foram inseridas.
    $tagsExistentes = []; // Armazena as tags que já existiam no banco de dados.
    
    foreach ($tags as $tag) {
        $tag = trim($tag); // Remove espaços em branco no início e no final.
        if (empty($tag)) {
            continue; // Ignora tags vazias.
        }
    
        // Verifica se a tag já existe no banco de dados.
        $idTag = verificarTagExistente($tag);
    
        // Se a tag não existir, insere uma nova.
        if (is_null($idTag)) {
            $idTag = inserirTag($tag, $idUsu);
            if (is_null($idTag)) {
                jsonResponse(false, "Erro ao inserir a tag '$tag'.");
                continue; // Pula para a próxima tag se a inserção falhar.
            }
            $tagsInseridas[] = $tag; // Adiciona a nova tag à lista de inseridas.
        } else {
            $tagsExistentes[] = $tag; // Adiciona a tag à lista de existentes.
        }
    
        // Verifica e cria a relação entre a produção e a tag.
        if (!is_null($idTag) && !relacaoProducaoTagExiste($idProd, $idTag)) {
            if (!criarRelacaoProducaoTag($idProd, $idTag)) {
                jsonResponse(false, "Erro ao criar a relação para a tag '$tag'.");
            }
        }
    }
    
    return ['inseridas' => $tagsInseridas, 'existentes' => $tagsExistentes];
}

try {
    // Decodifica os dados recebidos no corpo da requisição como JSON.
    $data = json_decode(file_get_contents("php://input"), true);

    // Valida o JSON recebido e verifica se os campos necessários foram fornecidos.
    if (is_null($data) || !isset($data['tags']) || !is_array($data['tags'])) {
        jsonResponse(false, 'Nenhuma tag foi enviada ou JSON inválido.');
    }

    if (!isset($data['id'])) {
        jsonResponse(false, 'ID da produção não fornecido.');
    }

    // Obtém o ID da produção e do usuário logado.
    $idProd = $data['id'];
    $idUsu = verificarUsuarioLogado();

    // Processa as tags recebidas, gerando as relações e inserindo novas tags no banco de dados.
    $resultado = [
        'tagsProcessadas' => processarTags($data['tags'], $idProd, $idUsu),
        'idProd' => $idProd,
        'idUsu' => $idUsu,
        'dataRecebida' => $data
    ];
    
    // Retorna uma resposta de sucesso com as informações processadas.
    jsonResponse(true, [
        'message' => 'Processamento concluído.',
        'tags' => $resultado
    ]);

} catch (Exception $e) {
    // Retorna uma resposta JSON em caso de erro, com a mensagem da exceção.
    jsonResponse(false, 'Erro: ' . $e->getMessage());
}