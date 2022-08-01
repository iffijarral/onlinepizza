<?php
    /*
        This file handles different operations related to Category.
    */

class ProductOperations{
    private $_db;

    public function __construct()
    {
        $this->_db = Database::getInstance();
    }

    public function getProducts($catID, $subCatId)
    {
        $sql = "SELECT * from products where cat_id = :catID AND sub_cat_id= :subCatId";

        $params = array(
            'catID' => $catID,
            'subCatId' => $subCatId
        );
        $results = $this->_db->Select($sql, $params);

        if(empty($results)) {
            throw new Exception('No product found');
        }

        $prodList = array();

        foreach($results as $result)
        {
            $prod = new Product(
               (int)$result['id'],
               (int)$result['cat_id'],
               (int)$result['sub_cat_id'],
               $result['name'],
               $result['description'],
               (int)$result['price'],
               $result['image'],
               $result['created'],
               $result['modified']
            );

            array_push($prodList, $prod->getProduct());
        }

        return $prodList;
    }


    public function getProduct($id)
    {
        $sql = "SELECT * FROM products WHERE id = :id " ;

        $params = array(
            'id' => $id
        );
        try
        {
            $results = $this->_db->Select($sql, $params);

            if(empty($results))
            {
                throw new Exception('Invalid Product');
            }

            $product = new Product(
                (int)$results[0]['id'],
                (int)$results[0]['cat_id'],
                (int)$results[0]['sub_cat_id'],
                $results[0]['name'],
                $results[0]['description'],
                (int)$results[0]['price'],
                $results[0]['image'],
                $results[0]['created'],
                $results[0]['modified']
            );

            return $product;
        }
        catch(Throwable $e)
        {
            throw new Exception($e->message);
        }

    }


    public function saveProduct($fields = array())
    {

        $statement = "INSERT INTO products (cat_id, sub_cat_id, name, description, image, price, created, modified)
                    VALUES (:cat_id, :sub_cat_id, :name, :description, :image, :price, :created, :modified)";
        try
        {
            $lastInsertedID = $this->_db->insert($statement, $fields);

            if (!$lastInsertedID)
            {
                throw new Exception("Unable to save Product.");
            }
            return $lastInsertedID;
        }
        catch(Throwable $e)
        {
            throw new Exception($e->message);
        }

    }

    public function updateProduct($fields)
    {
        $queryResult = false;
        if(array_key_exists('image', $fields))
        {
            $statement = "UPDATE products
            SET
            cat_id=:cat_id,
            sub_cat_id=:sub_cat_id,
            name=:name,
            description=:description,
            image=:image,
            price=:price,
            modified=:modified
            WHERE id=:id";
        }
        else
        {
            $statement = "UPDATE products
            SET
            cat_id=:cat_id,
            sub_cat_id=:sub_cat_id,
            name=:name,
            description=:description,
            price=:price,
            modified=:modified
            WHERE id=:id";
        }
        try
        {
            //return $this->_db->update($statement, $fields);
            if($this->_db->update2($statement, $fields) > 0)
                return true;
            else
                return false;


        } catch(Throwable $e) {
            throw new Exception($e->getMessage());
        }

    }

    public function deleteProduct($catId)
    {
        try
        {
            if($this->_db->Remove("Delete from products where id = :id",['id' => $catId]))
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
