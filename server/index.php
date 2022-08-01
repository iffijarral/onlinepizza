<?php
    header('content-type: application/json');
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    require_once 'start.php';
    require_once 'router.php';


    get('/vitalia/getCategories', 'vitalia/'.FRONTEND_PAGE . 'getCategories.php');

    post('/vitalia/customer', 'vitalia/'.FRONTEND_PAGE . 'customer.php');

    post('/vitalia/order', 'vitalia/'.FRONTEND_PAGE . 'order.php');

    post('/vitalia/product', 'vitalia/'.FRONTEND_PAGE . 'product.php');

    post('/vitalia/category', 'vitalia/'.FRONTEND_PAGE . 'category.php');

    post('/vitalia/subCategory', 'vitalia/'.FRONTEND_PAGE . 'subCategory.php');

    post('/vitalia/login', 'vitalia/'.FRONTEND_PAGE . 'login.php');

    post('/vitalia/register', 'vitalia/'.FRONTEND_PAGE . 'register.php');

    post('/vitalia/newPassword', 'vitalia/'.FRONTEND_PAGE . 'newPassword.php');

    get('/vitalia/resetPassword', 'vitalia/'.FRONTEND_PAGE . 'resetPassword.php');

    post('/vitalia/forgotPassword', 'vitalia/'.FRONTEND_PAGE . 'forgotPassword.php');

    post('/vitalia/changePassword', 'vitalia/'.FRONTEND_PAGE . 'changePassword.php');

    post('/vitalia/handleOrder', 'vitalia/'.FRONTEND_PAGE . 'order.php');

    post('/vitalia/transaction', 'vitalia/'.FRONTEND_PAGE . 'transaction.php');

    post('/vitalia/payment', 'vitalia/create.php');

    post('/vitalia/history', 'vitalia/'.FRONTEND_PAGE . 'history.php');

    any('/404','vitalia/404.html');

