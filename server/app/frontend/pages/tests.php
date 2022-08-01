<?php
    /*
        In this file two requests are handled.
        In one kind of request is to fetch tests data.
        The other request fetches detail of single test.
        If id is set, then fetch test details of that specific testid.
    */
    $json = file_get_contents('php://input');

    $obj = json_decode($json);

    $response = array();

   if(isset($id))
    {
        try
        {
            $testID = $id;

            $testOperations = new TestOperations();

            $questions = $testOperations->getTest($testID);

            $response['questions'] = $questions;

            $response['status'] = true;

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
        try
        {
            $testOperations = new TestOperations();

            $tests = $testOperations->getTests();

            $response['tests'] = $tests;

            $response['status'] = true;

        }
        catch (\Throwable $th)
        {
           $error = $th->getMessage();
           $response['error'] = $error;
           $response['status'] = false;
       }
    }


    echo json_encode($response);