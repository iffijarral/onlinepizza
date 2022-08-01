 <?php
    /*
        In this file password changed link is sent to the user via email.
        Jwt is generated and sent to user in the form of a link.
        The link is basically the route to client side page, where new password operation is performed.
    */
    $json = file_get_contents('php://input');

    $obj = json_decode($json);

    $response = array();

    if(isset($obj->email))
    {
        try
        {
            $userOperations = new UserOperations();

            $userInfo = $userOperations->checkEmail($obj->email); // if email does not exist exception will occur and control will go to catch section.

            if($userInfo)
            {
                $userId = $userInfo[0]['id'];

                $jwtToken = generateToken($userId); // Generate token resides in Helpers.php in core directory. It generates jwt.

                $emailSubject = "Password Change Instructions";

                $emailMessage = emailBody($jwtToken);

                sendMail($obj->email, $emailSubject, $emailMessage); // if it fails an exception will be occored and catched in catch section below.

                $response['message'] = 'An email has been sent to the given email address';

                $response['status'] = true;
            }
            else
            {
                $response['message'] = 'Given email address does not exist in our system';

                $response['status'] = false;
            }

        }
        catch (\Throwable $th)
        {
            $error = $th->getMessage();
            $response['error'] = $error;
            $response['status'] = false;
        }

    }
    else
    {
        $response['status'] = false;
        $response['message'] = 'Bad Request';
    }


    echo json_encode($response);

    function emailBody($token)
    {
        $output = '<p>Dear user,</p>';
        $output .= '<p>Please click following link to reset you password</p>';
        $output .= '<p>-------------------------------------------------------------</p>';
        $output .= '<p><a href="'.Config::get('app/base_url').'vitalia/resetPassword?token='.$token.'"> click here to reset your password</a></p>';

        $output .= '<p>-------------------------------------------------------------</p>';
        $output .= '<p>The link expires after 15 min for security reasons.</p>';

        $output .= '<p>Thanks,</p>';
        $output .= '<p>Medborgerskabsprøve</p>';

        return $output;
    }