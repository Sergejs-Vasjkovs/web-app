<?php

require_once __DIR__ . "/Controller.php";
require_once __DIR__ . "/../models/Product.php";
require_once __DIR__ . "/../models/Book.php";
require_once __DIR__ . "/../models/DVD.php";
require_once __DIR__ . "/../models/Furniture.php";
require_once __DIR__ . "/../utils/validator.php";
require_once "./type/ProductType.php";


class ProductsController extends Controller
{

    public function __construct($db)
    {
        parent::__construct($db);
    }

    public function handleRequestMethod(string $method): void
    {
        switch ($method) {
            case "GET":
                $this->getAllProducts();
                break;

            case "POST":
                $this->createProduct();
                break;

            case "DELETE":
                $this->deleteProduct();
                break;
        }
    }

    private function getAllProducts()
    {
        try {
            $data = (new Product($this->connection))->getAllProducts();
            $products = ProductType::prepareProducts($data);
            echo json_encode($products);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    private function createProduct()
    {
        try {
            $data = (array) json_decode(file_get_contents("php://input"), true);
            $product = ProductType::defineType($data, $this->connection);

            if ($product->checkIfSkuExist()) {
                http_response_code(409);
                $errors['sku'] = 'SKU already exist';
                echo json_encode([
                    'status' => 'error',
                    "message" => "SKU number already exist",
                    'errors' => $errors
                ]);
                return;
            }

            $errors =  $this->validation($data);
            if (!empty($errors)) {
                http_response_code(400);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Validation errors occurred',
                    'errors' => $errors
                ]);
                return;
            }

            $product->saveProduct();
            echo json_encode(['status' => 'ok', "message" => "Product created successfully"]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    private function deleteProduct()
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            (new Product($this->connection))->deleteProduct($data);
            echo json_encode(['status' => 'ok', "message" => "Products deleted successfully"]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', "error" => $e->getMessage()]);
        }
    }

    private function validation($data)
    {
        return validation(load($data));
    }
}
