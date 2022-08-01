<?php
    /*
        In this file packages information is fetched from database and sent to client.
    */
    $response = array();

    try
    {
        $packageOperations = new PackageOperations();

        $packages = $packageOperations->getPackages();

        $response['packages'] = $packages;

        $response['message'] = 'Data fetched successfully';

        $response['status'] = true;
    }
    catch (\Throwable $th)
    {
       $error = $th->getMessage();
       $response['error'] = $error;
       $response['status'] = false;
   }


    echo json_encode($response);