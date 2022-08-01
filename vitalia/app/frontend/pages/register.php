<?php
    /*
        In this file new user is created.
        First given email is checked if it already exists in database.
        If yes, a message is sent to client saying that email already exists.
        If no, the user is created and required information is fetched from database and sent to client.
    */
    $json = file_get_contents('php://input');

    $obj = json_decode($json);

    $response = array();

    $password = '';

    if(isset($obj->password))
    {
        $password = md5($obj->password);
        $type = 'registered';
    }

    $userData = array(
        'name'  => $obj->name,
        'email' => $obj->email,
        'password' => $password,
        'phone' => $obj->phone,
        'type'  => $obj->type,
        'status' => $obj->status,
        'created' => date("Y-m-d H:i:s"),
        'modified' => date("Y-m-d H:i:s"),
    );

    try
    {
        $userOperations = new UserOperations();

        if(!$userOperations->checkEmail($obj->email)) // It returns true if email exists
        {

            $lastInsertedID = $userOperations->create($userData);
            
            $response['status'] = true;
            $response['message'] = 'Konto er oprettet.';
            $response['userID'] = $lastInsertedID;
        }
        else
        {
            $response['status'] = false;
            $response['message'] = 'Emailen eksisterer allerede.';
        }

   }
   catch (\Throwable $th)
   {
       $error = $th->getMessage();
       $response['message'] = $error;
       $response['status'] = false;

   }
    echo json_encode($response);