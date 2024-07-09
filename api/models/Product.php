<?php

class Product
{
    protected $sku;
    protected $name;
    protected $price;
    protected $type;
    protected $table = "products";
    protected $connection;

    public function __construct($connection)
    {
        $this->connection = $connection;
    }

    public function getSku()
    {
        return $this->sku;
    }

    public function setSku($sku)
    {
        $this->sku = $sku;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getPrice()
    {
        return $this->price;
    }

    public function setPrice($price)
    {
        $this->price = $price;
    }

    public function getType()
    {
        return $this->type;
    }

    public function setType($type)
    {
        $this->type = $type;
    }

    public function getTable()
    {
        return $this->table;
    }

    public function setTable($table)
    {
        $this->table = $table;
    }

    protected function saveBasicProduct()
    {
        $this->connection->beginTransaction();

        $query = "INSERT INTO products (`sku`, `name`, `type`, `price`) VALUES (:sku, :name, :type, :price)";
        $stmt = $this->connection->prepare($query);
        $stmt->execute([
            "sku" => $this->getSku(),
            "name" => $this->getName(),
            "type" => $this->getType(),
            "price" => $this->getPrice(),
        ]);
        return $this->connection->lastInsertId();
    }

    public function getAllProducts()
    {
        $query = "SELECT 
                    p.id, p.sku, p.name, p.type, p.price, p.created_at,
                    d.size, 
                    b.weight, 
                    f.height, f.width, f.length
                FROM " . $this->table . " p
                LEFT JOIN dvd d ON p.id = d.product_id
                LEFT JOIN book b ON p.id = b.product_id
                LEFT JOIN furniture f ON p.id = f.product_id
            ";
        $stmt = $this->connection->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function deleteProduct($data)
    {
        $string = "'" . implode("', '", $data) . "'";
        $query = "DELETE FROM " . $this->table . " WHERE sku IN ({$string})";
        $stmt = $this->connection->prepare($query);
        $stmt->execute();
    }

    public function checkIfSkuExist()
    {
        $query = "SELECT COUNT(*) FROM products WHERE sku = :sku";
        $stmt = $this->connection->prepare($query);
        $stmt->execute([
            "sku" => $this->getSku()
        ]);
        return $stmt->fetchColumn();
    }
}
