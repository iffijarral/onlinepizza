<?php
    /*
        Payment related operations are performed here.
    */
class PaymentOperations {
    private $_db;

    public function __construct()
    {
        $this->_db = Database::getInstance();
    }

    public function savePayment($obj)
    {
        $paymentData = array(
            'userid'            => $obj->userid,

            'txn_id'            => $obj->txn_id,

            'packageid'         => $obj->packageid,

            'payment_gross'     => $obj->payment_gross,

            'currency_code'     =>  $obj->currency_code,

            'payer_email'       =>  $obj->payer_email,

            'payment_status'    =>  $obj->payment_status,

            'created'           =>  date("Y-m-d H:i:s")
        );

        $statement = "INSERT INTO payments (userid, txn_id, packageid, payment_gross, currency_code, payer_email, payment_status, created)
                    VALUES (:userid, :txn_id, :packageid, :payment_gross, :currency_code, :payer_email, :payment_status, :created)";

        if (!$this->_db->insert($statement, $paymentData))
        {
            throw new Exception("Unable to save payments.");
        }
        return true;
    }

}