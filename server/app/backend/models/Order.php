<?php

class Order
{
    private $id,
            $amount,
            $status,
            $products = array(),
            $user,
            $created,
            $modified;

    public function __construct($id, $amount, $status, $products, $user, $created, $modified)
    {
        $this->setID($id);
        $this->setAmount($amount);
        $this->setStatus($status);
        $this->setProducts($products);
        $this->setUser($user);
        $this->setCreated($created);
        $this->setModified($modified);
    }
    public function setID($id)
    {
        if(!empty($id) && is_int($id))
            $this->id = $id;
        else
            throw new Exception('Please give a valid order id.');
    }
    public function setAmount($amount)
    {
        if(!empty($amount) && is_int($amount))
            $this->amount = $amount;
        else
            throw new Exception('Please give a valid amount.');
    }
    public function setStatus($status)
    {
        $this->status = $status;
    }
    public function setProducts($products)
    {
        foreach($products as $product)
        {
            $this->products[] = $product;
        }
    }
    public function setUser($user)
    {
        $this->user = $user;
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
    public function getAmount()
    {
        return $this->amount;
    }
    public function getStatus()
    {
        return $this->status;
    }
    public function getProducts()
    {
        return $this->products;
    }
    public function getUser()
    {
        return $this->user;
    }
    public function getCreated()
    {
       return $this->created;
    }
   public function getModified()
   {
       return $this->modified;
   }
    public function getOrderInfo() {
        $userInfo = array(
            'id'           => $this->getID(),
            'products'     => $this->getProducts(),
            'customer'     => $this->getUser(),
            'status'       => $this->getStatus(),
            'created'       => $this->getCreated(),
            'modified'       => $this->getModified()
        );

        return $userInfo;
    }
}
