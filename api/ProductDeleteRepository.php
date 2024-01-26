<?php
    include_once 'ProductRepository.php';

    class ProductDeleteRepository extends ProductRepository {
        private $checkbox;

        public function __construct($conn, $checkbox) {
            parent::__construct($conn);
            $this->checkbox = $checkbox;
        }

        public function execute() {
        try {
            $placeholders = implode(', ', array_fill(0, count($this->checkbox), '?'));

            $sql = "DELETE FROM product WHERE sku IN ({$placeholders})";
            $stmt = $this->conn->prepare($sql);

            $i = 1;
            foreach ($this->checkbox as $value) {
                $stmt->bindValue($i++, $value);
            }

        if ($stmt->execute()) {
                return ['status' => 1, 'message' => 'Products deleted successfully.'];
            } else {
                return ['status' => 0, 'message' => 'Failed to delete products.'];
            }
        } catch (Exception $e) {
            return ['status' => 0, 'message' => 'An error occurred while processing the request.'];
        }
        }
    }
?>