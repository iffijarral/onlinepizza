<?php

class Database
{
    private static $_instance = null;
    private $connection;                    

    private function __construct()
    {
        
        try
        {
        $this->connection = new PDO('mysql:host='.Config::get('mysql/host').';'.
                                'dbname='.Config::get('mysql/db_name'),
                                Config::get('mysql/username'),
                                Config::get('mysql/password')
            );           
                        
        }
        catch(PDOException $e)
        {               
            die($e->getMessage());
        }
    }

    public static function getInstance()
    {
        if (!isset(self::$_instance))
        {
            self::$_instance = new Database();
        }

        return self::$_instance;
    }

    // Insert a row/s in a Database Table
    public function Insert( $statement = "" , $parameters = [] )
    {
        try {            
            $this->executeStatement( $statement , $parameters );
            return $this->connection->lastInsertId();
            
        } catch(Throwable $e) {
            throw new Exception($e->getMessage());   
        }		
    }

    // Select a row/s in a Database Table
    public function Select( $statement = "" , $parameters = [] )
    {
        try {
            
            $stmt = $this->executeStatement( $statement , $parameters );
            return $stmt->fetchAll();

        } catch(Throwable $e){
            throw new Exception($e->getMessage());   
        }		
    }
    
    // Update a row/s in a Database Table
    public function Update( $statement = "" , $parameters = [] )
    {
        try {
            
            $this->executeStatement( $statement , $parameters );
            
        } catch(Throwable $e) {
            throw new Exception($e->getMessage());   
        }		
    }

    public function Update2( $statement = "" , $parameters = [] )
    {
        try {

            return $this->executeStatement( $statement , $parameters )->rowCount();

        } catch(Throwable $e) {
            throw new Exception($e->getMessage());
        }
    }
    
    // Remove a row/s in a Database Table
    public function Remove( $statement = "" , $parameters = [] )
    {
        try{
            
            return $this->executeStatement( $statement , $parameters )->rowCount();
            
        } catch(Throwable $e) {
            throw new Exception($e->getMessage());   
        }		
    }		
    
    // execute statement
    private function executeStatement( $statement = "" , $parameters = [] )
    {
        try {
        
            $stmt = $this->connection->prepare($statement);
            $stmt->execute($parameters);
            return $stmt;
            
        } catch(Throwable $e) {
            throw new Exception($e->getMessage());   
        }		
    }
    
}
