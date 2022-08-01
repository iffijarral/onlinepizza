<?php
    require_once BACKEND_BASE.'business/SubCategoryOperations.php';

    $action = $_POST['action'];
    $subCategoryOperations = new SubCategoryOperations();
    
    if($action === 'get')
    {
        getSubCategories();
    }
    else if($action === 'delete')
    {
        $id = $_POST['id'];

        try
        {            
            if($subCategoryOperations->deleteSubCategory($id))
            {
                $response['msg'] = "Sub Category deleted successfully";
                $response['status'] = true;
            }
            else
            {
                $response['error'] = "Unable to delete subcategory";
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
                    'categoryid' => $_POST['categoryId'],
                    'name' => $_POST['subCategory'],
                    'image' => $response['imageUrl'],
                    'modified' => date("Y-m-d H:i:s")
                );
                try
                {
                    if($subCategoryOperations->updateSubCategory($data))
                    {
                        $response['msg'] = 'Category updated successfully';
                        $response['status'] = true;
                    }
                    else
                    {
                        unlink($response['imageUrl']);
                        $response['error'] = 'Sub category could not be updated';
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
                'categoryid' => $_POST['categoryId'],
                'name' => $_POST['subCategory'],
                'modified' => date("Y-m-d H:i:s")
            );
            try
            {
                $subCategoryOperations = new subCategoryOperations();

                if($subCategoryOperations->updateSubCategory($data))
                {
                    $response['msg'] = 'SubCategory updated successfully';
                    $response['status'] = true;
                }
                else
                {
                    $response['error'] = 'SubCategory could not be updated';
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
            $categoryId = $_POST['categoryId'];
            $subCategoryName = $_POST['subCategory'];

            $response = imageUpload();

            if($response['status'])
            {
                $subCatData = array(
                    'categoryid' => $categoryId,
                    'name'  => $subCategoryName,
                    'image' => $response['imageUrl'],
                    'created' => date("Y-m-d H:i:s"),
                    'modified' => date("Y-m-d H:i:s")
                );

                if($subCategoryOperations->saveSubCategory($subCatData))
                {
                    $response['msg'] = 'SubCategory saved successfully';
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


    function getSubCategories()
    {
        try
        {
            $catID = $_POST['catID'];
            $subCategoryOperations = new SubCategoryOperations();
            $subCategories = $subCategoryOperations->getSubCategories($catID);

            $response['subCategories'] = $subCategories;
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
        $subCategoryName = $_POST['subCategory'];
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
                    $fileNewName = $subCategoryName.".".$fileActualExt;
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


