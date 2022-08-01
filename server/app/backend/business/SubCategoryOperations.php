<?php
    /*
        This file handles different operations related to Category.
    */

class SubCategoryOperations{
    private $_db;

    public function __construct()
    {
        $this->_db = Database::getInstance();
    }

    public function getSubCategories($catID)
    {
        $sql = "SELECT * from subcategories WHERE categoryid = :categoryid " ;

        $params = array(
            'categoryid' => $catID
        );
        $results = $this->_db->Select($sql, $params);

        if(empty($results)) {
            throw new Exception('No category found');
        }

        $subCatList = array();

        foreach($results as $result)
        {
            $subCat = new SubCategory(
               (int)$result['id'],
               (int)$result['categoryid'],
               $result['name'],
               $result['image'],
               $result['created'],
               $result['modified']
            );

            array_push($subCatList, $subCat->getSubCategory());
        }

        return $subCatList;
    }


    public function getSubCategory($id)
    {
        $sql = "SELECT * FROM subcategories WHERE id = :id " ;

        $params = array(
            'id' => $id
        );
        try
        {
            $results = $this->_db->Select($sql, $params);

            if(empty($results))
            {
                throw new Exception('Invalid CategoryID');
            }

            $subCategory = new SubCategory(
                (int)$results[0]['id'],
                (int)$results[0]['categoryid'],
                $results[0]['name'],
                $results[0]['image'],
                $result[0]['created'],
                $result[0]['modified']
            );

            return $subCategory;
        }
        catch(Throwable $e)
        {
            throw new Exception($e->message);
        }

    }


    public function saveSubCategory($fields = array())
    {

        $statement = "INSERT INTO subcategories (categoryid, name, image, created, modified)
                    VALUES (:categoryid, :name, :image, :created, :modified)";

        $lastInsertedID = $this->_db->insert($statement, $fields);

        if (!$lastInsertedID)
        {
            throw new Exception("Unable to save SubCategory.");
        }
        return $lastInsertedID;
    }

    public function updateSubCategory($fields)
    {
        $queryResult = false;
        if(array_key_exists('image', $fields))
        {
            $statement = "UPDATE subcategories
            SET
            categoryid=:categoryid,
            name=:name,
            image=:image,
            modified=:modified
            WHERE id=:id";
        }
        else
        {
            $statement = "UPDATE subcategories
            SET
            categoryid=:categoryid,
            name=:name,
            modified=:modified
            WHERE id=:id";
        }
        try
        {
            //return $this->_db->update2($statement, $fields);
            if($this->_db->update2($statement, $fields) >= 0)
                return true;
            else
                return false;

        } catch(Throwable $e) {
            throw new Exception($e->getMessage());
        }

    }

    public function deleteSubCategory($subCatId)
    {
        try
        {
            if($this->_db->Remove("Delete from subcategories where id = :id",['id' => $subCatId]))
            {
                return true;
            }
            else
            {
                return false;
            }

        } catch(Throwable $e) {
            throw new Exception('Unable to delete sub category');
        }

    }
}
