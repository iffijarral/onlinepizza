<?php
    /*
        In this file new user data is retrieved/save from/into db.

    */

    $json = file_get_contents('php://input');

    $obj = json_decode($json);

       if(isset($obj->action))
       {
            if($obj->action === 'get')
            {
                getUserData($obj);
            }
            else
            {
                updateUserData($obj);
            }


       }

       function getUserData($obj)
       {
            try
            {
                if(isset($obj->userID))
                {
                    $userID = $obj->userID;

                    $userOperations = new UserOperations();

                    $userInfo = $userOperations->getUser($userID);

                    $response['status'] = true;
                    $response['userInfo'] = $userInfo;
                    $response['message'] = 'Data  fetched successfully.';
                }
                else
                {
                    $response['status'] = false;
                    $response['message'] = 'Bad Request.';
                }

            }
            catch (\Throwable $th)
           {
               $error = $th->getMessage();
               $response['message'] = $error;
               $response['status'] = false;
           }

            echo json_encode($response);
       }

       function updateUserData($obj)
       {
            $userData = array(
                    'id'   => $obj->id,
                   'name'  => $obj->name,
                   'phone' => $obj->phone,
                   'address' => $obj->address,
                   'postcode' => $obj->postcode,
                   'city' => $obj->city,
                   'modified' => date("Y-m-d H:i:s"),
               );

               try
               {
                    $userOperations = new UserOperations();
                    $noRows = $userOperations->updateUser($userData);
                    $response['status'] = true;
                    $response['message'] = 'Record updated successfullly.';
                    $response['affectedRows'] = $noRows;
                    /*if($noRows >=0 )
                    {
                        $response['status'] = true;
                        $response['message'] = 'Record updated successfullly.';

                    }
                    else
                    {
                        $response['status'] = false;
                        $response['message'] = "Record couldn't be updated. Please try again later";
                    }
                    */

              }
              catch (\Throwable $th)
              {
                  $error = $th->getMessage();
                  $response['message'] = $error;
                  $response['status'] = false;

              }
               echo json_encode($response);
       }
