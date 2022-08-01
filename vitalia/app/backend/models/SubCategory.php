<?php

class SubCategory
{
    private $id,
            $categoryId,
            $name,
            $image,
            $created,
            $modified;

    public function __construct($id, $categoryId, $name, $image, $created, $modified)
    {
        $this->setID($id);
        $this->setCategoryID($categoryId);
        $this->setName($name);
        $this->setImage($image);
        $this->setCreated($created);
        $this->setModified($modified);
    }
    public function setID($id)
    {
        if(!empty($id))
            $this->id = $id;
        else
            throw new Exception('Please give a valid SubCategory id.');
    }
    public function setCategoryID($categoryId)
    {
        if(!empty($categoryId))
            $this->categoryId = $categoryId;
        else
            throw new Exception('Please give a valid Category id.');
    }
    public function setName($name)
    {
        $this->name = $name;
    }
    public function setImage($image)
    {
        if(is_null($image))
            $this->image = '';
        else
            $this->image = $image;
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
    public function getCategoryID()
    {
        return $this->categoryId;
    }
    public function getName()
    {
        return $this->name;
    }
    public function getImage()
    {
        return $this->image;
    }
    public function getCreated()
    {
        return $this->created;
    }
    public function getModified()
    {
        return $this->modified;
    }
    public function getSubCategory()
    {
        return array(
            'id'            => $this->getID(),
            'categoryId'    => $this->getCategoryID(),
            'name'          => $this->getName(),
            'image'         => $this->getImage(),
            'created'       => $this->getCreated(),
            'modified'      => $this->getModified()
        );
    }
}
