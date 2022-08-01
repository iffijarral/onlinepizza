<?php

    $json = file_get_contents('php://input');

    $obj = json_decode($json);

    $response = array();

    if(isset($obj))
    {
        switch($obj->action)
        {
            case 'get':
                getCustomers();
            break;
            default:
                getCustomers();
        }
    }

    function getCustomers()
    {
        $userOperations = new UserOperations();

        try
        {
            $customers = $userOperations->getCustomers();
            $response['customers'] = $customers;
            $response['status'] = true;
        }
        catch (\Throwable $th)
        {
            $response['message'] = 'There was an error';
            $response['status'] = false;
        }

        echo json_encode($response);
    }

?>