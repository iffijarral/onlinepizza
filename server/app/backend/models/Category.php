<?php

class Category
{
    private $id,
            $name,
            $image,
            $status,
            $created,
            $modified;
    public function __construct($id, $name, $image, $status, $created, $modified)
    {
        $this->setID($id);
        $this->setName($name);
        $this->setImage($image);
        $this->setStatus($status);
        $this->setCreated($created);
        $this->setModified($modified);
    }
    public function setID($id)
    {
        if(!empty($id))
            $this->id = $id;
        else
            throw new Exception('Please give a valid Category id.');
    }
    public function setName($name)
    {
        $this->name = $name;
    }
    public function setImage($image)
    {
        $this->image = $image;
    }
    public function setStatus($status)
    {
        $this->status = $status;
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
    public function getName()
    {
        return $this->name;
    }
    public function getImage()
    {
        return $this->image;
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
    public function getCategory()
    {
        return array(
            'id'    => $this->getID(),
            'name' => $this->getName(),
            'image' => $this->getImage(),
            'status'       => $this->getStatus(),
            'created'       => $this->getCreated(),
            'modified'       => $this->getModified()
        );
    }
}
