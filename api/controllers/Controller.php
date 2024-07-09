<?php

abstract class Controller
{
    protected $connection = null;

    public function __construct($db)
    {
        $this->connection = $db;
    }

    public function handleRequestMethod(string $method): void
    {
    }
}
