<?php

require_once "Product.php";

class DVD extends Product
{
    private $size;

    public function getSize()
    {
        return $this->size;
    }

    public function setSize($size)
    {
        $this->size = $size;
    }

    public function saveProduct()
    {
        try {
            $productId = $this->saveBasicProduct();

            $query = "INSERT INTO " . $this->table . " (product_id, size) VALUES (:product_id, :size)";
            $stmt = $this->connection->prepare($query);
            $stmt->execute([
                "product_id" => $productId,
                "size" => $this->getSize(),
            ]);

            $this->connection->commit();
        } catch (Exception $e) {
            $this->connection->rollBack();
            throw $e;
        }
    }
}
