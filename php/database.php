<?php
require_once 'configdb.php';

class Database{
  private static $instance;
  
  
  /***************
  Objetivo: Retornar uma conexão com o banco de dados aberta
  Parâmetro de saída: Retorna conexão com o banco de dados.
  ***************/
  public static function getInstance(){
    
    //self é usado para acessar membros estáticos da própria classe.
    if (!isset(self::$instance)){
      try{
        self::$instance = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';port=3307', DB_USER, DB_PASS);
        //Configurações 
        self::$instance->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION); //Caso haja erro, então disparar o erro.
        self::$instance->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_OBJ); //Retorna uma tabela com os nome das colunas correspondentes aos da tabela original.
      }catch(PDOException $e){
        echo $e->getMessage();
      }
      
    }
    return self::$instance;
  }
  
  /***************
  Objetivo: Executar consulta SQL
  Parâmetro de entrada: $sql - query SQL
  Parâmetro de saída: Se o banco foi aberto com sucesso, PDO::prepare() retorna um objeto PDOStatement object. 
            Se o banco NÃO foi aberto com sucesso, retorna false ou emite PDOException (depende da versão).
            O objeto PDOStatement representa uma consulta pronta para ser executada, depois de executada, retornará uma tabela.
  ***************/
  public static function prepare($sql){
    //obtêm uma instância do banco de dados aberta e já prepara para executar uma consulta a qualquer tabela.
    return self::getInstance()->prepare($sql);
  }
}
?>
