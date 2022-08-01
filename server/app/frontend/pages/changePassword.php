<?php
    /*
        In this file password changed operation is performed.
        Client sends new password along with jwt token.
        The token is decoded, where it is checked that its a valid token.
        If the token is valid, the new password is set.
    */
    $json = file_get_contents('php://input');

    $obj = json_decode($json);

    $response = array();

    $token = $obj->token;

    try
    {
        $userOperations = new UserOperations();

        $decodedToken = decodeToken($token); // this function resides in Helpers.php, it decodes the jwt code.

        $userId = $decodedToken->userId; // Extract userId from decodedToken

        $fields = array(
            'id'=> $userId,
            'password' => md5($obj->password)
        );

        $userOperations->updatePassword($fields);

        $response['status'] = true;
        $response['message'] = 'Adgangskoden blev ændret';

    }
    catch (\Throwable $th)
    {
        $error = $th->getMessage();
        $response['message'] = $error;
        $response['status'] = false;
    }

    echo json_encode($response);