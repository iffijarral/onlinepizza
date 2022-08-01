<?php

class TestQuestions
{
    private $test;
    private $questions = array();

    public function __construct(Test $test, $questions=array())
    {
        $this->test = $test;
        $this->setQuestions($questions);
    }

    public function setQuestions($questions = array())
    {
        if(sizeOf($questions) < 1)
            throw new Exception('questions array should not be empty.');

        foreach($questions as $question)
        {
            array_push($this->questions, $question);
        }
    }
    public function getTestQuestions()
    {
        $questionsList = array();

        foreach($this->questions as $question)
        {
            $myQuestion = array(
                'id'        => $question->getID(),
                'question'  => $question->getQuestion(),
                'op1'       => $question->getOp1(),
                'op2'       => $question->getOp2(),
                'op3'       => $question->getOp3(),
                'answer'    => $question->getAnswer()
            );
            array_push($questionsList, $myQuestion);
        }

        return array(
            'testID' => $this->test->getID(),
            'testTitle' => $this->test->getTitle(),
            'questions' => $questionsList
        );
    }
}