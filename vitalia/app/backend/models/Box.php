<?php

class Box
{
    private $id,
            $name,            
            $price;


    public function __construct($id, $name, $price)
    {
        $this->setBoxID($id);
        $this->setName($name);        
        $this->setPrice($price);
    }

    public function setBoxID($BoxID)
    {
        if(!empty($BoxID) && is_int($BoxID))
        {
            $this->id = $BoxID;
        } else
            throw new Exception('Please give a valid Box ID.');
    }

    public function setName($name)
    {
        if(!empty($name))
            $this->name = $name;
        else
            throw new Exception('Please give a valid Box Name.');
    }

    public function setPrice($price)
    {
        if(is_int($price) && !empty($price))
            $this->price = $price;
        else
            throw new Exception('Please give a valid price.');
    }

    public function getID()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getPrice()
    {
        return $this->price;
    }

    public function getBox()
    {
        return array(
            'id' => $this->getID(),
            'name'  => $this->getName(),
            'price' => $this->getPrice()
        );
    }

    /*public function update($fields = array(), $id = null)
    {

        if (!$this->_db->update('Boxucts', $id, $fields))
        {
            throw new Exception('Unable to update the Boxuct.');
        }
    }

    public function create($fields = array())
    {
        if (!$this->_db->insert('Boxucts', $fields))
        {
            throw new Exception("Unable to create the Boxuct.");
        }
    }

    public function deleteMe($id)
    {

        if (!$this->_db->delete('Boxucts', array('uid', '=', $id)))
        {
            throw new Exception('Unable to update the Boxuct.');
        }
    }*/
}
