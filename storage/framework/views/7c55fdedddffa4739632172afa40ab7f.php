<?php
use GuzzleHttp\Client;

$client = new Client();
$headers = [
  'Content-Type' => 'application/x-www-form-urlencoded'
];
$options = [
'form_params' => [
  'name' => 'name php code',
  'slug' => 'slug 2',
  'description' => 'desc 2',
  'price' => '99.09'
]];
$request = new Request('POST', 'http://127.0.0.1:8000/api/products/', $headers);
$res = $client->sendAsync($request, $options)->wait();
echo $res->getBody();
 ?><?php /**PATH D:\php123\sanct29\resources\views/welcome.blade.php ENDPATH**/ ?>