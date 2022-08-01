<?php
    /*
        When the payment is successfully made, and success status is returned from stripe.
        Here the payment related information and selected package are saved into database.
        And user status is updated, as he has purchased a package, so he is an active user now.
        After saving and updating relevant information, required user information is fetched and
        send to client to update user status in client side.
    */
    require_once BACKEND_BASE.'business/PaymentOperations.php';

    $json = file_get_contents('php://input');

    $obj = json_decode($json);

    $response = array();
    try
    {
        if(isset($obj))
            {
                try
                {
                    $paymentOperations = new PaymentOperations();

                    $packageOperations = new PackageOperations();

                    $userOperations = new UserOperations();

                    $paymentOperations->savePayment($obj); // save payment information

                    $packageOperations->saveUserPackage($obj); // save user selected package information

                    $userOperations->updateUserStatus($userData); // update status field in user table, which shows this is an active user

                    $user = $userOperations->getUser($obj->userid);

                    //After saving payment operations it needs to update user package or allowable tests for user to continue
                    $userInfo = $userOperations->getUserPackageData($obj->userid); // Fetch updated user info and send to client

                    $response['status'] = true;
                    $response['message'] = 'Payment transaction completed successfully';
                    $response['user'] = $userInfo;

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
                $response['message'] = 'Client sent data was empty';
                $response['status'] = false;
            }

    }
    catch (\Throwable $th)
    {
        $response['message'] = 'There was an error';
        $response['status'] = false;
    }

    echo json_encode($response);