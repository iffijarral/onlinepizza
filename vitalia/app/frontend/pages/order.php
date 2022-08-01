<?php
    /*
       When user completes transaction or make an order, all the order related information is saved into database here
    */
    require_once BACKEND_BASE.'business/OrderOperations.php';
    //require_once BACKEND_BASE.'business/ProductOperations.php';

    $json = file_get_contents('php://input');

    $obj = json_decode($json);

    $response = array();
    try
    {
        if(isset($obj))
        {
            switch($obj->action)
            {
                case 'save':
                    saveOrder($obj);
                break;
                case 'get':
                    getOrders($obj);
                break;
                case 'updateOrderStatus':
                    updateOrderStatus($obj);
                break;
                case 'getAll':
                    getAllOrders();
                break;
                default:
                    getOrders(1);
            }

        }
        else
        {
            $response['message'] = 'Client sent data was empty';
            $response['status'] = false;
        }

    }
    catch (\Throwable $th)
    {
        $response['message'] = 'There was an error';
        $response['status'] = false;
    }

    //echo json_encode($response);
    function updateOrderStatus($obj)
    {
        try
        {
            $orderOperations = new OrderOperations();
            $data = array(
                'id'=> $obj->id,
                'status'=> $obj->status,
                'modified' => date("Y-m-d H:i:s")
            );

            if($orderOperations->updateOrderStatus($data))
            {
                $response['msg'] = 'Category updated successfully';
                $response['status'] = true;
            }
            else
            {
                $response['msg'] = 'Order could not be updated ';
                $response['status'] = false;
            }
        }
        catch (\Throwable $th)
        {
            $response['message'] = $th->getMessage();
            $response['status'] = false;
        }
        echo json_encode($response);
    }

    function getAllOrders()
    {
        try
        {
            $orderOperations = new OrderOperations();

            $orders = $orderOperations->getAllOrders();

            $orderData = array();
            foreach($orders as $order)
            {
                $products = $orderOperations->getOrderedProducts($order['id']);
                $temp = array(
                    'id' => $order['id'],
                    'products' => $products,
                    'customer' => $order['name'],
                    'status' => $order['status'],
                    'created' => $order['created']
                );
                $orderData[] = $temp;
            }
            $response['orderData'] = $orderData;
            $response['status'] = true;
        }
        catch (\Throwable $th)
        {
            $response['message'] = $th->getMessage();
            $response['status'] = false;
        }
        echo json_encode($response);
    }

    function getOrders($obj)
    {
        try
        {
            $orderOperations = new OrderOperations();
            $orders = $orderOperations->getOrders();

            foreach($orders as $order) // Idea is to change the status, so these orders will not be fetched in next turn
            {

                $data = array(
                    'id'=> $order['id'],
                    'status'=> 'Fetched',
                    'modified' => date("Y-m-d H:i:s")
                );

                $orderOperations->updateOrderStatus($data);
            }

            $orderData = array();
            foreach($orders as $order)
            {
                $products = $orderOperations->getOrderedProducts($order['id']);
                $temp = array(
                    'id' => $order['id'],
                    'products' => $products,
                    'customer' => $order['name'],
                    'status' => $order['status'],
                    'created' => $order['created']
                );
                $orderData[] = $temp;
            }
            $response['orderData'] = $orderData;
            $response['status'] = true;
        }
        catch (\Throwable $th)
        {
            $response['message'] = $th->getMessage();
            $response['status'] = false;
        }
        echo json_encode($response);
    }

    function saveOrder($obj)
    {
        $userData = array(
            'name'      => $obj->customer->name,
            'email'     => $obj->customer->email,
            'password'  => '',
            'phone'     => (int)$obj->customer->phone,
            'type'      => 'customer',
            'status'    => 0,
            'created'   => date("Y-m-d H:i:s"),
            'modified'  => date("Y-m-d H:i:s")
        );

        try
        {
            $orderOperations = new OrderOperations();
            $userOperations = new UserOperations();

            $lastInsertedUserID = $userOperations->create($userData);

            $trackingCode = substr(str_shuffle("0123456789abcdefghijklmnopqrstvwxyz"), 0, 8);

            if($lastInsertedUserID > 0)
            {
                $products = $obj->products;
                $amount = 0;

                foreach($products as $product)
                {
                    $subTotal = $product->price * $product->quantity;
                    $amount += $subTotal;
                }

                $orderData = array(
                    'user_id' => $lastInsertedUserID,
                    'amount'  => $amount,
                    'status'  => 'Placed',
                    'tracking_code' => $trackingCode,
                    'created' => date("Y-m-d H:i:s"),
                    'modified' => date("Y-m-d H:i:s")
                );

                $lastInsertedOrderID = $orderOperations->saveOrder($orderData);

                if($lastInsertedOrderID > 0)
                {
                    $products = $obj->products;

                    foreach($products as $product)
                    {
                        $productOrderData = array(
                            'order_id' => $lastInsertedOrderID,
                            'product_id' => $product->id
                        );

                        $orderOperations->saveOrderedProducts($productOrderData);
                    }

                    $response['status'] = true;
                    $response['message'] = 'Order saved successfully.';
                    $response['trackingCode'] = $trackingCode;
                }

            }
            else
            {
                $response['status'] = false;
                $response['message'] = 'Order not saved successfylly.';
                $response['trackingCode'] = $trackingCode;
            }

        }
        catch (\Throwable $th)
        {
            $response['message'] = 'There was an error';
            $response['status'] = false;
        }
        echo json_encode($response);

    }

    function getTodaySale()
    {
        $orderOperations = new OrderOperations();

        try
        {
            $sale = $orderOperations->getOrders();
            $response['sale'] = $sale;
            $response['status'] = true;
        }
        catch (\Throwable $th)
        {
            $response['message'] = 'There was an error';
            $response['status'] = false;
        }
        echo json_encode($response);


    }