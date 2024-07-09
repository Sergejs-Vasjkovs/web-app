<?php

require_once "Product.php";

class Furniture extends Product
{
    private $height;
    private $width;
    private $length;

    public function getHeight()
    {
        return $this->height;
    }

    public function setHeight($height)
    {
        $this->height = $height;
    }


    public function getWidth()
    {
        return $this->width;
    }


    public function setWidth($width)
    {
        $this->width = $width;
    }


    public function getLength()
    {
        return $this->length;
    }

    public function setLength($length)
    {
        $this->length = $length;
    }

    public function saveProduct()
    {
        try {
            $productId = $this->saveBasicProduct();

            $query = "INSERT INTO " . $this->table . " (product_id, height, width, length) VALUES (:product_id, :height, :width, :length)";
            $stmt = $this->connection->prepare($query);
            $stmt->execute([
                "product_id" => $productId,
                "height" => $this->getHeight(),
                "width" => $this->getWidth(),
                "length" => $this->getLength(),
            ]);
            $this->connection->commit();
        } catch (Exception $e) {
            $this->connection->rollBack();
            throw $e;
        }
    }
}
