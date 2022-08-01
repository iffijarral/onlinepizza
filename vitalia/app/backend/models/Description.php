<?php 

class Description {
    private $langName,
            $prodID,
            $prodName,
            $shortDescription,
            $longDescription;
    
    public function __construct($prodID, $prodName, $lang = null, $shortDescription = null, $longDescription = null)
    {           
        $this->setProdID($prodID);
        $this->setProdName($prodName);
        $this->setLangName($lang);
        $this->setShortDescription($shortDescription);
        $this->setLongDescription($longDescription);
    }

    public function setLangName($langName)
    {        
        $this->langName = $langName;        
    }

    public function setProdID($prodID)
    {
        if(!empty($prodID) && is_int($prodID))
        {
            $this->prodID = $prodID;
        } else 
            throw new Exception('Please give a valid product ID.');
    }

    public function setProdName($prodName)
    {
        if(!empty($prodName))
            $this->prodName = $prodName;
        else
            throw new Exception('Please give a valid product name.');
    }

    public function setShortDescription($shortDescription)
    {
        $this->shortDescription = $shortDescription;
    }

    public function setLongDescription($longDescription)
    {
        $this->longDescription = $longDescription;
    }

    public function getProdID()
    {
        return $this->prodID;
    }

    public function getProdName()
    {
        return $this->prodName;
    }

    public function getLangName()
    {
        return $this->langName;
    }

    public function getShortDescription()
    {
        return $this->shortDescription;
    }

    public function getLongDescription()
    {
        return $this->longDescription;
    }
}