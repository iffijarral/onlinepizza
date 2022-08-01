<?php

class User
{
    private $id,
            $name,
            $type,
            $email,
            $phone,
            $password,
            $status,
            $created,
            $modified;

    public function __construct($id, $name, $email, $phone, $type, $status, $created, $modified)
    {
        $this->setID($id);
        $this->setName($name);
        $this->setType($type);
        $this->setEmail($email);
        $this->setPhone($phone);
        $this->setStatus($status);
        $this->setCreated($created);
        $this->setModified($modified);
    }
    public function setID($id)
    {
        if(!empty($id) && is_int($id) )
            $this->id = $id;
        else
            throw new Exception('Please give a valid user id.');
    }
    public function setName($name)
    {
        if(!empty($name))
            $this->name = $name;
        else
            throw new Exception('Please give a valid user name.');
    }
    public function setType($type)
    {
        if(!empty($type))
            $this->type = $type;
        else
            $this->type = '';
    }
    public function setEmail($email)
    {
        if(!empty($email))
            $this->email = $email;
        else
            throw new Exception('Please give a valid user email.');
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
    public function setPhone($phone)
    {
        $this->phone = $phone;
    }
    public function setStatus($status)
    {
        $this->status = $status;
    }
    public function getID()
    {
        return $this->id;
    }
    public function getName()
    {
        return $this->name;
    }
    public function getType()
    {
        return $this->type;
    }
    public function getEmail()
    {
        return $this->email;
    }
    public function getPhone()
    {
        return $this->phone;
    }
    public function getStatus()
    {
        return $this->status;
    }

    public function getCreated()
    {
        return $this->created;
    }
    public function getModified()
    {
        return $this->modified;
    }
    public function getUserInfo() {
        $userInfo = array(
            'id'           => $this->getID(),
            'name'         => $this->getName(),
            'type'         => $this->getType(),
            'email'        => $this->getEmail(),
            'phone'        => $this->getPhone(),
            'status'       => $this->getStatus(),
            'created'       => $this->getCreated(),
            'modified'       => $this->getModified()
        );

        return $userInfo;
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
