<?php

function validation($product)
{
    $errors = [];

    foreach ($product as $k => $v) {
        if (empty($v)) {
            $errors[$k] = "{$k} is required";
        }
    }
    return $errors;
}

function load($product)
{
    $fillable = ["sku", "name", "price", "options"];
    $options = ["height", "width", "length", "weight", "size"];
    $data = [];

    foreach ($product as $k => $v) {
        if ($k === "options") {
            foreach ($v as $k => $v) {
                if (in_array($k, $options)) {
                    $data[$k] = trim($v);
                }
            }
        } else {
            if (in_array($k, $fillable)) {
                $data[$k] = trim($v);
            }
        }
    }
    return $data;
}
