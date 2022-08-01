<?php
    /*
        This file is the part of the process of password change request.
        When user clicks the link, which was sent to him in email, the control comes here.
        Here the jwt is fetched from query string and varified after decoding it.
        If its a valid jwt, then control is redirected to the interface in client side,
        where user has form to give new password.
    */
 if (isset($_GET['token']))
 {

    try
    {

        $token = decodeToken($_GET['token']);

        $now = new DateTimeImmutable();

        if ($token->nbf > $now->getTimestamp() || $token->exp < $now->getTimestamp())
        {
            echo '<h1>Token Expired</h1>';
            exit;
        }
        else
        {
            // redirect to given location
            header("Location: ".Config::get('app/base_url')."resetpassword/".$_GET['token']);
            die();
        }

    }
    catch (\Throwable $th)
    {
        $error = $th->getMessage();
        echo '<h1>'.$error.'</h1>';
        exit;
    }
 }
 else
 {
    echo '<h1>Bad Request</h1>';
    exit;
 }