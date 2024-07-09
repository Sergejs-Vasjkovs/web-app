<?php

require_once "Product.php";

class Book extends Product
{
    private $weight;

    public function getWeight()
    {
        return $this->weight;
    }

    public function setWeight($weight)
    {
        $this->weight = $weight;
    }

    public function saveProduct()
    {
        try {
            $productId = $this->saveBasicProduct();

            $query = "INSERT INTO " . $this->table . " (product_id, weight) VALUES (:product_id, :weight)";
            $stmt = $this->connection->prepare($query);
            $stmt->execute([
                "product_id" => $productId,
                "weight" => $this->getWeight(),
            ]);

            $this->connection->commit();
        } catch (Exception $e) {
            self::$connection->rollBack();
            throw $e;
        }
    }
}
