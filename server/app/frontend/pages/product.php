<?php
    require_once BACKEND_BASE.'business/ProductOperations.php';
    /*
        In this file Products related operations are performed.
    */

    /* $json = file_get_contents('php://input');
    $obj = json_decode($json); */


    $action = $_POST['action'];

    if($action === 'get')
    {
        getProducts();
    }
    else if($action === 'delete')
    {
        $id = $_POST['id'];

        try
        {
            $productOperations = new productOperations();

            if($productOperations->deleteProduct($id))
            {
                $response['msg'] = "product deleted successfully";
                $response['status'] = true;
            }
            else
            {
                $response['error'] = "Unable to delete product";
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
        $id = $_POST['id'];
        $cat_id = $_POST['cat_id'];
        $sub_cat_id = $_POST['sub_cat_id'];
        $name = $_POST['name'];
        $description = $_POST['description'];
        $price = $_POST['price'];

        if(isset($_FILES['file']) && "" != trim($_FILES['file']['name']))
        {
            $response = imageUpload();

            $image = $response['imageUrl'];

            if($response['status'])
            {
                $data = array(
                    'id' => $id,
                    'cat_id' => $cat_id,
                    'sub_cat_id' => $sub_cat_id,
                    'name' => $name,
                    'description' => $description,
                    'image' => $response['imageUrl'],
                    'price' => $price,
                    'modified' => date("Y-m-d H:i:s")
                );
                try
                {
                    $productOperations = new productOperations();

                    if($productOperations->updateProduct($data))
                    {
                        $response['msg'] = 'product updated successfully';
                        $response['status'] = true;
                    }
                    else
                    {
                        unlink($response['imageUrl']);
                        $response['error'] = 'product could not be updated';
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
                'id' => $id,
                'cat_id' => $cat_id,
                'sub_cat_id' => $sub_cat_id,
                'name' => $name,
                'description' => $description,
                'price' => $price,
                'modified' => date("Y-m-d H:i:s")
            );
            try
            {
                $productOperations = new productOperations();

                if($productOperations->updateProduct($data))
                {
                    $response['msg'] = 'product updated successfully';
                    $response['status'] = true;
                }
                else
                {
                    $response['error'] = 'product could not be updated';
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
            $response = imageUpload();

            $cat_id = $_POST['cat_id'];
            $sub_cat_id = $_POST['sub_cat_id'];
            $name = $_POST['name'];
            $description = $_POST['description'];
            $price = $_POST['price'];
            $image = $response['imageUrl'];


            if($response['status'])
            {
                $prodData = array(
                    'cat_id'  => $cat_id,
                    'sub_cat_id'  => $sub_cat_id,
                    'name'  => $name,
                    'description'  => $description,
                    'price' => $price,
                    'image' => $image,
                    'created' => date("Y-m-d H:i:s"),
                    'modified' => date("Y-m-d H:i:s")
                );

                $productOperations = new productOperations();

                if($productOperations->saveProduct($prodData))
                {
                    $response['msg'] = 'product saved successfully';
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


    function getProducts()
    {
        $productOperations = new productOperations();
        try
        {
            $catId = $_POST['cat_id'];
            $subCatId = $_POST['sub_cat_id'];

            $products = $productOperations->getProducts($catId, $subCatId);

            $response['products'] = $products;
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
        $productName = $_POST['name'];
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
                    $fileNewName = $productName.".".$fileActualExt;
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


