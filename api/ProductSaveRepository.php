<?php
    include_once 'ProductRepository.php';

    class ProductSaveRepository extends ProductRepository {
        private $product;

        public function __construct($conn, $product) {
            parent::__construct($conn);
            $this->product = $product;
        }

        public function execute() {
            $sql = "INSERT INTO product(id, sku, name, price, type, created_at) VALUES(null, :sku, :name, :price, :type, :created_at)";
            $stmt = $this->conn->prepare($sql);
            $created_at = date('Y-m-d H:i:s');

            $stmt->bindParam(':sku', $this->product->getSku());
            $stmt->bindParam(':name', $this->product->getName());
            $stmt->bindParam(':price', $this->product->getPrice());
            $stmt->bindParam(':type', json_encode($this->product->getType()));
            $stmt->bindValue(':created_at', $created_at);

            if ($stmt->execute()) {
                return ['status' => 1, 'message' => 'Product added successfully.'];
            } else {
                return ['status' => 0, 'message' => 'Failed to add product.'];
            }
        }
    }
?>
