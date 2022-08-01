<?php
    /*
        In this file user statistics (the history of his practice) is either saved or
        fetched from database and send to client.
        'action' decides what to do.
    */
    $json = file_get_contents('php://input');

    $obj = json_decode($json);

    $response = array();

    try
    {
        $userOperations = new UserOperations();

        $history = $userOperations->getHistory($obj->userid);

        $response['message'] = 'Record fetched successfully';
        $response['status'] = true;
        $response['history'] = $history;
    }
    catch (\Throwable $th)
    {
       $error = $th->getMessage();
       $response['message'] = $error;
       $response['status'] = false;
    }
    echo json_encode($response);