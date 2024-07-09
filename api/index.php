<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

require_once __DIR__ . "/config/DbConnect.php";
require_once __DIR__ . "./controllers/ProductsController.php";

require_once __DIR__ . "/funcs.php";

$db_config = require __DIR__ . "/config/db.php";

$database = new DbConnect();
$db = $database->connect($db_config);

$controller = new ProductsController($db);
$controller->handleRequestMethod($_SERVER['REQUEST_METHOD']);





















/*
require_once __DIR__ . "/funcs.php";
require_once __DIR__ . "/classes/Product.php";

//require_once __DIR__ . '/public/Db';
//require_once __DIR__ . '/funcs.php';

//$method = $_SERVER['REQUEST_METHOD']; // return POST

$data = json_decode(file_get_contents("php://input"));

if (!empty($data)) {
    $product = new Product();
    $product->setSku($data->sku);
    $product->setName($data->name);
    $product->setPrice($data->price);
    $product->setType($data->type);
    debug($product);
}

addProduct($data);

function addProduct($data)
{
    global $pdo;

    function is_valid($value)
    {
        return isset($value) && trim($value) !== '';
    }

    // Validate the input data



    $sku = !empty($data->sku) ? trim($data->sku) : "";
    $name = !empty($data->name) ? trim($data->name) : "";
    $price = !empty($data->price) ? trim($data->price) : "";
    $type = !empty($data->type) ? trim($data->type) : "";

    if (empty($sku) || empty($name) || empty($price) || empty($type)) {
        echo json_encode(['message' => 'All fields are required and must not be empty']);
    }
}

function is_valid($value)
{
    return !empty($value) ? trim($value) : "";
}
    */