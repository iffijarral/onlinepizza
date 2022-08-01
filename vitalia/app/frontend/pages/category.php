<?php
    require_once BACKEND_BASE.'business/CategoryOperations.php';
    /*
        In this file categories related operations are performed.
    */

    /* $json = file_get_contents('php://input');
    $obj = json_decode($json); */


    $action = $_POST['action'];

    if($action === 'get')
    {
        getCategories();
    }
    else if($action === 'delete')
    {
        $id = $_POST['id'];

        try
        {
            $categoryOperations = new CategoryOperations();

            if($categoryOperations->deleteCategory($id))
            {
                $response['msg'] = "Category deleted successfully";
                $response['status'] = true;
            }
            else
            {
                $response['error'] = "Unable to delete category";
                $response['status'] = false;
            }
        }
        catch(\Throwable $th)
        {
           $error = $th->getMessage();
           $response['error'] = $error;
           $response['status'] = false;
        }

        echo json_encode($response);
    }
    else if($action === 'edit')
    {
        if(isset($_FILES['file']) && "" != trim($_FILES['file']['name']))
        {
            $response = imageUpload();
            if($response['status'])
            {
                $data = array(
                    'id' => $_POST['id'],
                    'name' => $_POST['category'],
                    'image' => $response['imageUrl'],
                    'status' =>  true,
                    'modified' => date("Y-m-d H:i:s")
                );
                try
                {
                    $categoryOperations = new CategoryOperations();

                    if($categoryOperations->updateCategory($data))
                    {
                        $response['msg'] = 'Category updated successfully';
                        $response['status'] = true;
                    }
                    else
                    {
                        unlink($response['imageUrl']);
                        $response['error'] = 'Category could not be updated';
                        $response['status'] = false;
                    }
                }
                catch(\Throwable $th)
                {
                   $error = $th->getMessage();
                   $response['error'] = $error;
                   $response['status'] = false;

                   if($imageUploaded)
                   {
                       unlink($fileDestination);
                   }
                }
            }
        }
        else
        {
            $data = array(
                'id' => $_POST['id'],
                'name' => $_POST['category'],
                'status' =>  true,
                'modified' => date("Y-m-d H:i:s")
            );
            try
            {
                $categoryOperations = new CategoryOperations();

                if($categoryOperations->updateCategory($data))
                {
                    $response['msg'] = 'Category updated2 successfully';
                    $response['status'] = true;
                }
                else
                {
                    $response['error'] = 'Category could not be updated';
                    $response['status'] = false;
                }
            }
            catch(\Throwable $th)
            {
               $error = $th->getMessage();
               $response['error'] = $error;
               $response['status'] = false;
            }

        }
        echo json_encode($response);
    }
    else if($action === 'save')
    {
        try
        {
            $categoryName = $_POST['category'];

            $response = imageUpload();

            if($response['status'])
            {
                $catData = array(
                    'name'  => $categoryName,
                    'image' => $response['imageUrl'],
                    'status' => true,
                    'created' => date("Y-m-d H:i:s"),
                    'modified' => date("Y-m-d H:i:s")
                );

                $categoryOperations = new CategoryOperations();

                if($categoryOperations->saveCategory($catData))
                {
                    $response['msg'] = 'Category saved successfully';
                    $response['status'] = true;
                }
                else
                {
                    unlink($fileDestination);
                    $response['status'] = false;
                }

            }
        }
        catch(\Throwable $th)
        {
           $error = $th->getMessage();
           $response['error'] = $error;
           $response['status'] = false;

           if($imageUploaded)
           {
               unlink($fileDestination);
           }
        }

        echo json_encode($response);
    }


    function getCategories()
    {
        $categoryOperations = new CategoryOperations();
        try
        {
            $categories = $categoryOperations->getCategories();

            $response['categories'] = $categories;
            $response['status'] = true;
        }
        catch(\Throwable $th)
        {
           $error = $th->getMessage();
           $response['error'] = $error;
           $response['status'] = false;
        }

        echo json_encode($response);
    }

    function imageUpload()
    {
        $baseUrl = $_SERVER['DOCUMENT_ROOT'].'/vitalia';
        $imageUploaded = false;
        $categoryName = $_POST['category'];
        $fileName = $_FILES['file']['name'];
        $fileTmpName= $_FILES['file']['tmp_name'];
        $fileError = $_FILES['file']['error'];
        $fileType = $_FILES['file']['type'];
        $fileSize = $_FILES['file']['size'];

        $fileExt = explode('.', $fileName); // returns an array having left and right parts of '.'.
        $fileActualExt = strtolower(end($fileExt));
        $allowed = array('jpg', 'jpeg', 'png', 'svg');

        $response = array();

        if(in_array($fileActualExt, $allowed))
        {
            if($fileError === 0)
            {
                if($fileSize < 1000000)
                {
                    $fileNewName = $categoryName.".".$fileActualExt;
                    $fileDestination = $baseUrl.'/uploads/'.$fileNewName;
                    move_uploaded_file($fileTmpName, $fileDestination);

                    $imageUploaded = true;
                    $response['msg'] = 'Image uploaded successfully';
                    $response['status'] = true;
                    $response['imageUrl'] = $fileNewName;
                }
                else
                {
                    $response['error'] = 'The Image is too big, this is not allowed';
                    $response['status'] = false;
                }
            }
            else
            {
                $response['error'] = 'There was an error while uploading';
                $response['status'] = false;
            }
        }
        else
        {
            $response['error'] = 'This type of image is not allowed';
            $response['status'] = false;
        }

        return $response;
    }



   /*  $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["file"]["name"]);
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    // Check if image file is a actual image or fake image
      $check = getimagesize($_FILES["file"]["tmp_name"]);
      if($check !== false) {
        $response['res'] = $imageFileType;
      }
       echo json_encode($response); */
   /* try
    {
        if(isset($obj))
        {
            switch($obj->action)
            {
                case 'save':
                    saveCategory($obj);
                break;
                default:
                    getCategories($obj);
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
       $error = $th->getMessage();
       $response['error'] = $error;
       $response['status'] = false;
   }

    function saveCategory($obj)
    {

    }

    function getCategories()
    {
        $operations = new CategoryOperations();

        $categories = $operations->getCategories();

        $response['categories'] = $categories;

        $response['message'] = 'Data fetched successfully';

        $response['status'] = true;
    }
    echo json_encode($response);*/