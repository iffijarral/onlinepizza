<?php
    /*
        This file handles different operations related to Category.
    */

class CategoryOperations{
    private $_db;

    public function __construct()
    {
        $this->_db = Database::getInstance();
    }

    public function getCategories()
    {
        $sql = "SELECT * from categories";

        $results = $this->_db->Select($sql);

        if(empty($results)) {
            throw new Exception('No category found');
        }

        $catList = array();

        foreach($results as $result)
        {
            $cat = new Category(
               (int)$result['id'],
               $result['name'],
               $result['image'],
               $result['status'],
               $result['created'],
               $result['modified']
            );

            array_push($catList, $cat->getCategory());
        }

        return $catList;
    }


    public function getCategory($id)
    {
        $sql = "SELECT * FROM categories WHERE id = :id " ;

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

            $category = new Category(
                (int)$results[0]['id'],
                $results[0]['name'],
                $results[0]['image'],
                $result[0]['status'],
                $result[0]['created'],
                $result[0]['modified']
            );

            return $category;
        }
        catch(Throwable $e)
        {
            throw new Exception($e->message);
        }

    }


    public function saveCategory($fields = array())
    {

        $statement = "INSERT INTO categories (name, image, status, created, modified)
                    VALUES (:name, :image, :status, :created, :modified)";

        $lastInsertedID = $this->_db->insert($statement, $fields);

        if (!$lastInsertedID)
        {
            throw new Exception("Unable to save Category.");
        }
        return $lastInsertedID;
    }

    public function updateCategory($fields)
    {
        $queryResult = false;
        if(array_key_exists('image', $fields))
        {
            $statement = "UPDATE categories
            SET name=:name,
            image=:image,
            status=:status,
            modified=:modified
            WHERE id=:id";
        }
        else
        {
            $statement = "UPDATE categories
            SET name=:name,
            status=:status,
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

    public function deleteCategory($catId)
    {
        try
        {
            if($this->_db->Remove("Delete from categories where id = :id",['id' => $catId]))
            {
                return true;
            }
            else
            {
                return false;
            }

        } catch(Throwable $e) {
            throw new Exception('Unable to delete category');
        }

    }
}
