<?php

require_once "./models/Book.php";
require_once "./models/DVD.php";
require_once "./models/Furniture.php";

class ProductType
{
    public static function defineType($data, $connection)
    {
        $type = strtolower($data['type']);
        switch ($type) {
            case 'furniture':
                $product = new Furniture($connection);
                $product->setHeight($data['options']['height']);
                $product->setWidth($data['options']['width']);
                $product->setLength($data['options']['length']);
                break;

            case 'book':
                $product = new Book($connection);
                $product->setWeight($data['options']['weight']);
                break;

            case 'dvd':
                $product = new DVD($connection);
                $product->setSize($data['options']['size']);
                break;

            default:
                throw new Exception('Unknown product type');
        }

        $product->setSku($data['sku']);
        $product->setName($data['name']);
        $product->setPrice($data['price']);
        $product->setType($type);
        $product->setTable($type);

        return $product;
    }

    public static function prepareProducts($products)
    {
        $result = [];

        foreach ($products as $product) {
            $options = [];
            switch ($product['type']) {
                case 'DVD':
                    $options['size'] = $product['size'];
                    break;
                case 'Book':
                    $options['weight'] = $product['weight'];
                    break;
                case 'Furniture':
                    $options['height'] = $product['height'];
                    $options['width'] = $product['width'];
                    $options['length'] = $product['length'];
                    break;
            }

            $result[] = [
                'id' => $product['id'],
                'sku' => $product['sku'],
                'name' => $product['name'],
                'price' => $product['price'],
                'type' => $product['type'],
                'options' => $options,
                'created_at' => $product['created_at'],
            ];
        }
        return $result;
    }
}
