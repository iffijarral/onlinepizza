<?php

class Language
{
    private $id,  
            $name;            
            

    public function __construct($id, $name)
    {
        $this->id = $id;
        $this->setName($name);        
    }

    public function setName($name) 
    {
        if($name != '')
        {
            $this->name = trim($name);
        } else {
            throw new Exception('Please give a valid language name.');
        }
    }

    public function getID()
    {
        return $this->id;
    }    

    public function getName() 
    {
        return $this->name;
    }

    /*public function update($fields = array(), $id = null)
    {        

        if (!$this->_db->update('languages', $id, $fields))
        {
            throw new Exception('Unable to update the language.');
        }
    }

    public function create($fields = array())
    {
        if (!$this->_db->insert('languages', $fields))
        {
            throw new Exception("Unable to create the language.");
        }
    }           

    public function deleteMe($id)
    {                       

        if (!$this->_db->delete('languages', array('uid', '=', $id)))
        {
            throw new Exception('Unable to update the language.');
        }
    }*/
}
