<?php

class UserTests {
    private $user;
    private $totalTests;

    public function __construct(User $user, $totalTests) {

        $this->user = $user;

        $this->totalTests = $totalTests;
    }

    public function getUserInfo() {
        $userInfo = array(
            'status'        => $this->user->getStatus(),
            'id'            => $this->user->getID(),
            'email'         => $this->user->getEmail(),
            'totalTests'    => $this->totalTests
        );

        return $userInfo;
    }
}