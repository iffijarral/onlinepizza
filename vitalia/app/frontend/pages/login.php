<?php
    /*

        In this file login operation is performed, where it is check that it is a valid user.
        If its a valid user, then the relevant information is fetched from database and sent to client.

    */
    $json = file_get_contents('php://input');

    $obj = json_decode($json);

    $response = array();

    if(isset($obj))
    {
        $userData = array(
            'email'=> $obj->email,
            'password' => md5($obj->password)
        );

        $error = '';

       try
       {

            $userOperations = new UserOperations();

            $user = $userOperations->getUserWithEmailAndPassword($userData);

            $response['status'] = true; // Its true here, because if there are wrong credentials, there will be exception and status is false in catch section
            $response['message'] = 'login successfully';
            $response['user'] = $user->getUserInfo();

       }
       catch (\Throwable $th)
       {
           $error = $th->getMessage();
           $response['message'] = $error;
           $response['status'] = false;
       }
    }
    else
    {
        $response['error'] = 'Missing Required Data from client';
        $response['status'] = false;
    }

    echo json_encode($response);