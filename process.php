<?php
// process.php

$errors = array();  // array to hold validation errors
$data = array();        // array to pass back data

//$data['post'] = json_encode($_POST);

$posted_data = file_get_contents("php://input");
//$decoded_posted_data = json_decode

$data['posted'] = $posted_data;

$posted = json_decode($posted_data);

// validate the variables ========
if (!$posted->name){
  $errors['name'] = 'Name is required.';
}

if (!$posted->superheroAlias){
  $errors['superheroAlias'] = 'Superhero alias is required.';
}

// return a response ==============

// response if there are errors
if ( ! empty($errors)) {

  // if there are items in our errors array, return those errors
  $data['success'] = false;
  $data['errors']  = $errors;
} else {

  // if there are no errors, return a message
  $data['success'] = true;
  $data['message'] = 'Success!';
}

// return all our data to an AJAX call
echo json_encode($data);
