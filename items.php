<?php 

//die('wtf');

class item {
	var $foo;
	var $bar;
}



$items = Array();

$item = new item;
$item->foo = 'cheese';
$item->bar = 'eggs';

$items[] = $item;

$item = new item;
$item->foo = 'red';
$item->bar = 'green';

$items[] = $item;

$json = json_encode($items);

header('Content-Type: application/json');
echo $json;

?>