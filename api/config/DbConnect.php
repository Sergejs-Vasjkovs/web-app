<?php

final class DbConnect
{
    private $connection = null;

    public function connect($db_config)
    {
        $dsn = "mysql:host={$db_config['host']};dbname={$db_config['dbname']};charset={$db_config['charset']}";

        try {
            $this->connection = new PDO($dsn, $db_config['username'], $db_config['password'], $db_config['options']);
            return $this->connection;
        } catch (PDOException $e) {
            echo "DB Error: {$e->getMessage()}";
        }
    }
}
