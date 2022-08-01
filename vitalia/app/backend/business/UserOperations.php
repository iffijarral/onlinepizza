<?php

class UserOperations{
    private $_db;

    public function __construct()
    {
        $this->_db = Database::getInstance();
    }
    public function getCustomers()
    {
        $sql = "SELECT * from users where type = 'customer'";

        try
        {
            $results = $this->_db->Select($sql);

            return $results;
        }
        catch(Throwable $e) {
            throw new Exception("Unable to fetch customers record.");
         }
    }
    public function getUsers()
    {
        $sql = "SELECT * from users";

        $results = $this->_db->Select($sql);

        $usersList = array();

        foreach($results as $result)
        {

            array_push(
                $usersList,
                new User(
                    $result['id'],
                    $result['name'],
                    $result['email'],
                    $result['phone'],
                    $result['type'],
                    $result['status'],
                    $result['created'],
                    $result['modified']
                )
            );
        }

        return $usersList;
    }
    public function getUserWithEmailAndPassword($fields = array())
    {
        $sql = "SELECT * FROM users
                WHERE email = :email
                AND password = :password
                ";

        $results = $this->_db->Select($sql, $fields);

        if(empty($results)) {
            throw new Exception('Wrong credentials');
        }

        $user = new User(
           (int) $results[0]['id'],
            $results[0]['name'],
            $results[0]['email'],
            $results[0]['phone'],
            $results[0]['type'],
            $results[0]['status'],
            $results[0]['created'],
            $results[0]['modified']
        );
        return $user;

    }


    public function checkEmail($email)
    {
        $sql = "SELECT * FROM users
        WHERE email = :email";


        $params = array(
            'email' => $email
        );

        $results = $this->_db->Select($sql, $params);

        if(empty($results)) {

            return false;

        }

        return $results;
    }
    public function getUser($userID)
    {
        $sql = "SELECT * FROM users
        WHERE id = :id";


        $params = array(
            'id' => $userID
        );

        $results = $this->_db->Select($sql, $params);

        if(empty($results)) {
            throw new Exception('Invalid user ID');
        }

        $user = new User(
            $results[0]['id'],
            $results[0]['name'],
            $results[0]['email'],
            $results[0]['phone'],
            $results[0]['type'],
            $results[0]['status'],
            $results[0]['created'],
            $results[0]['modified']
        );

        return $user->getUserInfo();
    }

    public function create($fields = array())
    {
        $statement = "INSERT INTO users (name, email, password, phone, type, status, created, modified)
        VALUES (:name, :email, :password, :phone, :type, :status, :created, :modified)";

        try
        {

            $lastInsertedID = $this->_db->insert($statement, $fields);
            if (!$lastInsertedID)
            {
                throw new Exception("Unable to create the user.");
            }
        }
        catch (\Throwable $th)
       {
           throw new Exception($th->getMessage());
       }

        return $lastInsertedID;
    }
    public function updatePassword($fields)
    {

        $statement = "UPDATE users SET password=:password WHERE id=:id";
         try {

            $this->_db->update($statement, $fields);

         } catch(Throwable $e) {
            throw new Exception("Unable to update the password.");
         }
    }
    public function updateUser($fields)
    {
        $queryResult = false;

        $statement = "UPDATE users
                        SET name=:name,
                        phone=:phone,
                        status=:status,
                        modified=:modified
                        WHERE id=:id";
        try
        {
            return $this->_db->update2($statement, $fields);
            /*if($this->_db->update2($statement, $fields) >= 0)
                return true;
            else
                return false;
            */
        } catch(Throwable $e) {
            throw new Exception($e->getMessage());
        }

    }

    public function saveToken($fields = array())
    {
        $statement = "INSERT INTO temp (userId, token) VALUES (:userId, :token)";
        if (!$this->_db->insert($statement, $fields))
        {
            throw new Exception("Unable to save token.");
        }
        return true;
    }

    public function deleteToken($userId)
    {
        try {

            if(!$this->_db->Remove("Delete from password-change-temp where userId = :userId",['userId' => $userID])) {
                throw new Exception('Unable to delete token');
            }
        } catch(Throwable $e) {
            throw new Exception('The token has already been used');
        }

    }
    public function deleteUser($userID)
    {

        try {
            if($this->_db->Remove("Delete from users where id = :id",['id' => $userID])) {

                return true;

            } else {
                return false;
            }

        } catch(Throwable $e) {
            throw new Exception($e->getMessage());
        }

    }

    public function getHistory($userID)
    {
        $sql = "SELECT o.id as orderID, b.name as boxName, o.created as orderDate, o.tracking_code, o.status
                FROM box b
                LEFT JOIN orders o
                ON o.boxid = b.id
                WHERE o.userid = :userid";

        $params = array(
            'userid' => $userID
        );

        $results = $this->_db->Select($sql, $params);

        if(empty($results)) {
            throw new Exception('Invalid user ID, Statics record not found');
        }

        $historyList = array();

        foreach($results as $result)
        {
            $history = new History($result['boxName'], $result['orderDate'], $result['tracking_code'], $result['status']);

            array_push($historyList, $history->getHistory());
        }

        return $historyList;
    }

    public function saveStatistics($fields = array())
    {
        $statement = "INSERT INTO statistics(testid, userid, testdate, answers) 
                VALUES (:testid, :userid, :testdate, :answers)";

        if (!$this->_db->insert($statement, $fields))
        {
            throw new Exception("Unable to save statistics.");
        }
        return true;
    }
}
