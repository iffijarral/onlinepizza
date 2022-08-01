<?php
//require_once BACKEND_BASE.'models/orderQuestions.php';

class OrderOperations{
    private $_db;

    public function __construct()
    {
        $this->_db = Database::getInstance();
    }
    public function getTodaySale()
    {
        $sql = "SELECT SUM(amount)
                FROM orders
                WHERE created >= date_sub(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY)
                AND created < date_add(CURDATE(), INTERVAL 1 DAY)";
        try
        {
            $results = $this->_db->Select($sql);

            return $results;
        }
        catch(Throwable $e)
        {
            throw new Exception('Unable to fetch orders');
        }
    }
    public function getAllOrders()
    {
        $sql = "SELECT o.id, o.status, o.created, u.name from orders o
               LEFT JOIN users u
               ON o.user_id = u.id";

        try
        {
            $results = $this->_db->Select($sql);

            return $results;
        }
        catch(Throwable $e)
        {
            throw new Exception('Unable to fetch orders');
        }

    }
    public function getOrders()
    {
        $sql = "SELECT o.id, o.status, o.created, u.name from orders o
                LEFT JOIN users u
                ON o.user_id = u.id
                WHERE o.status = 'Placed'";
        try
        {
            $results = $this->_db->Select($sql);

            return $results;
        }
        catch(Throwable $e)
        {
            throw new Exception('Unable to fetch orders');
        }

    }


    public function getOrder($orderID)
    {
        $sql = "SELECT t.id as orderID, t.title as orderTitle, q.id, q.question, q.op1, q.op2, q.op3, q.answer FROM orderquestions tq
                INNER JOIN questions as q
                ON q.id = tq.questionid
                INNER JOIN orders t
                ON t.id = tq.orderid
                AND tq.orderid = :orderID GROUP BY q.question";

        $params = array(
            'orderID' => $orderID
        );

        $results = $this->_db->Select($sql, $params);

        $questionsList = array();

        if(empty($results)) {
            throw new Exception('Invalid order ID');
        }

        foreach($results as $result)
        {
            array_push(
            $questionsList,
                new Question(
                    $result['id'],
                    $result['question'],
                    $result['op1'],
                    $result['op2'],
                    $result['op3'],
                    $result['answer']
                )
            );

        }
        $order = new order($results[0]['orderID'], $results[0]['orderTitle']);

        $orderquestions = new orderQuestions($order, $questionsList);

        return $orderquestions->getorderQuestions();
    }

    public function getOrderedProducts($orderID)
    {
        $sql = "SELECT p.name
                FROM products p
                LEFT JOIN ordered_products op
                ON p.id = op.product_id
                WHERE op.order_id = :order_id " ;

        $params = array(
            'order_id' => $orderID
        );

        try
        {
            $results = $this->_db->Select($sql, $params);
            return $results;
        }
        catch(Throwable $e) {
            throw new Exception('Unable to get data from ordered_products.');
        }


    }
    public function saveOrder($fields = array())
    {
        $statement = "INSERT INTO
        orders (user_id, amount, status, tracking_code, created, modified )
        VALUES (:user_id, :amount, :status, :tracking_code, :created, :modified)";

        $lastInsertedID = $this->_db->insert($statement, $fields);
        if (!$lastInsertedID)
        {
            throw new Exception("Unable to save the order.");
        }
        return $lastInsertedID;
    }

    public function saveOrderedProducts($fields = array())
    {
        $statement = "INSERT INTO
        ordered_products (order_id, product_id )
        VALUES (:order_id, :product_id)";
        try
        {
            $lastInsertedID = $this->_db->insert($statement, $fields);

            if (!$lastInsertedID)
            {
                throw new Exception("Unable to save into ordered_products.");
            }
        }
        catch(Throwable $e) {
            throw new Exception('Unable to save into ordered_products.');
        }

        return $lastInsertedID;
    }

    public function updateOrderStatus($fields = array())
    {
        $statement = "UPDATE orders
                    SET
                    status=:status,
                    modified=:modified
                    WHERE id=:id";
        try
        {
            //return $this->_db->update2($statement, $fields);
            if($this->_db->update2($statement, $fields) >= 0)
                return true;
            else
                return false;

        } catch(Throwable $e) {
            throw new Exception($e->getMessage());
        }
    }
}
