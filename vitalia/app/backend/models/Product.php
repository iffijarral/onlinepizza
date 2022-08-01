<?php

class Product
{
    private $id,
            $catID,
            $subCatID,
            $name,
            $description,
            $price,
            $image,
            $created,
            $modified;
            

    public function __construct($id, $catID, $subCatID, $name, $description, $price, $image, $created, $modified)
    {
        $this->setProdID($id);
        $this->setCatID($catID);
        $this->setSubCatID($subCatID);
        $this->setProdName($name);
        $this->setProdDescription($description);
        $this->setProdPrice($price);
        $this->setProdImage($image);
        $this->setCreated($created);
        $this->setModified($modified);
    }
    
    public function setProdID($prodID)
    {
        if(!empty($prodID) && is_int($prodID))
        {
            $this->id = $prodID;
        } else 
            throw new Exception('Please give a valid product ID.');
    }

    public function setCatID($catID)
    {
        if(!empty($catID) && is_int($catID))
        {
            $this->catID = $catID;
        } else
            throw new Exception('Please give a valid category ID.');
    }

    public function setSubCatID($subCatID)
    {
        $this->subCatID = $subCatID;
        /* if(!empty($subCatID) && is_int($subCatID))
        {
            $this->subCatID = $subCatID;
        } else
            throw new Exception('Please give a valid sub category ID.'); */
    }

    public function setProdName($prodName)
    {
        if(!empty($prodName))
        {
            $this->name = $prodName;
        } else
            throw new Exception('Please give a valid product Name.');
    }

    public function setProdDescription($prodDescription)
    {
        $this->description = $prodDescription;
    }

    public function setProdPrice($price)
    {
        if(!empty($price) && is_int($price))
        {
            $this->price = $price;
        } else
            throw new Exception('Please give a valid price.');
    }
    public function setProdImage($image)
    {
        if(!empty($image))
        {
            $this->image = $image;
        } else
            throw new Exception('Please give a valid image.');
    }
    public function setCreated($created)
    {
        if(!empty($created))
            $this->created = $created;
        else
            $this->created = '';
    }
    public function setModified($modified)
    {
        if(!empty($modified))
            $this->modified = $modified;
        else
            $this->modified = '';
    }
    public function getID()
    {
        return $this->id;
    } 
    
    public function getCatID()
    {
        return $this->catID;
    }
    public function getSubCatID()
    {
        return $this->subCatID;
    }

    public function getName()
    {
        return $this->name;
    }
    
    public function getDescription()
    {
        return $this->description;
    }
    public function getImage()
    {
        return $this->image;
    }
    public function getPrice()
    {
        return $this->price;
    }
    public function getCreated()
    {
        return $this->created;
    }
    public function getModified()
    {
        return $this->modified;
    }
    public function getProduct()
    {
        return array(
        'id'                => $this->getID(),
            'catID'         => $this->getCatID(),
            'subCatID'      => $this->getSubCatID(),
            'name'          => $this->getName(),
            'description'   => $this->getDescription(),
            'image'         => $this->getImage(),
            'price'         => $this->getPrice(),
            'created'       => $this->getCreated(),
            'modified'      => $this->getModified()
        );
    }
    /*public function update($fields = array(), $id = null)
    {        

        if (!$this->_db->update('products', $id, $fields))
        {
            throw new Exception('Unable to update the product.');
        }
    }

    public function create($fields = array())
    {
        if (!$this->_db->insert('products', $fields))
        {
            throw new Exception("Unable to create the product.");
        }
    }           

    public function deleteMe($id)
    {                       

        if (!$this->_db->delete('products', array('uid', '=', $id)))
        {
            throw new Exception('Unable to update the product.');
        }
    }*/
}
