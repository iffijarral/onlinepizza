<?php
    /*
        This file is responsible of stripe or payment process.
        In this process, a paymentIntent is generated.
        clientSecret is received from paymentIntent and sent to client along with amount to charge.
    */
require 'vendor/autoload.php';

$response = array(
    'status' => false,
    'message' => 'transaction failed'
);

$stripe = new Stripe\StripeClient('key'); //Here will be static key of stripe account

try {
  // retrieve JSON from POST body
  $json_str = file_get_contents('php://input');
  $json_obj = json_decode($json_str);

  if( $json_obj->packageID == 'undefined' )
  {
    http_response_code(500);
    echo json_encode(['error' => 'Bad Request']);
    exit();
  }

  $packageInfo = getPackageInfo($json_obj->packageID);

  $amount =  $packageInfo['price']* 100;

  $paymentIntent = $stripe->paymentIntents->create([
    'amount' => $amount,
    'currency' => 'dkk',
    'payment_method_types' => ['card'],
  ]);

  $output = [
    'clientSecret' => $paymentIntent->client_secret,
    'amount' => $amount,
    'packageName' => $packageInfo['name']
  ];

  echo json_encode($output);

} catch (Error $e) {
  http_response_code(500);
  echo json_encode(['error' => $e->getMessage()]);
}

function getPackageInfo($packageID) {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // customers from directly manipulating the amount on the client
  try
  {
    $packageOperations = new PackageOperations();
    $package = $packageOperations->getPackage($packageID);

    $objPackage = array(
        'name' => $package->getName(),
        'price' => $package->getPrice()
    );
    return $objPackage;
  }
  catch (Error $e)
  {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
  }

}
