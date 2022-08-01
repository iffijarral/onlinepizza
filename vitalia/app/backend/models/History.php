<?php

class History
{
    private $boxName,
            $orderDate,
            $trackingID,
            $status;

    public function __construct($boxName, $orderDate, $trackingID, $status)
    {

        $this->boxName = $boxName;
        $this->orderDate = $orderDate;
        $this->trackingID = $trackingID;
        $this->status = $status;
    }
    public function getBoxName()
    {
        return $this->boxName;
    }
    public function getOrderDate()
    {
        return $this->orderDate;
    }
    public function getTrackingID()
    {
        return $this->trackingID;
    }
    public function getStatus()
    {
        return $this->status;
    }
    public function getHistory()
    {
        return array(
            'boxName'     => $this->getBoxName(),
            'orderDate'  => $this->getOrderDate(),
            'trackingID'   => $this->getTrackingID(),
            'status'        => $this->getStatus()
        );
    }
}