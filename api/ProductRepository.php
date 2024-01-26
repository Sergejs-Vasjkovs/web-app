<?php
    abstract class ProductRepository {
        protected $conn;

        public function __construct($conn) {
            $this->conn = $conn;
        }

        abstract public function execute();
    }
?>