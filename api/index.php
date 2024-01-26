<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    include 'DbConnect.php';
    include 'ProductSaveRepository.php';
    include 'ProductDeleteRepository.php';
    include 'Product.php';

    $objDb = new DbConnect;
    $conn = $objDb->connect();

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case "POST":
            $productData = json_decode(file_get_contents('php://input'));

            $product = new Product();
            $product->setSku($productData->sku);
            $product->setName($productData->name);
            $product->setPrice($productData->price);
            $product->setType($productData->type);

            $productRepository = new ProductSaveRepository($conn, $product);
            echo json_encode($productRepository->execute());
            break;

        case "GET":
            try {
                $sql = "SELECT * FROM product";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $product = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode(['status' => 1, 'data' => $product]);
            } catch (Exception $e) {
                echo json_encode(['status' => 0, 'message' => 'Failed to retrieve products.']);
            }
            break;

        case "DELETE":
            $checkbox = json_decode(file_get_contents('php://input'), true);
            $productRepository = new ProductDeleteRepository($conn, $checkbox);
            echo json_encode($productRepository->execute());
            break;
    }
?>