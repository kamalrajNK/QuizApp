import React, { useState, useEffect } from 'react';
import './App.css';

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 'Paris',
  },
  {
    question: 'What is the largest mammal?',
    options: ['Elephant', 'Blue Whale', 'Giraffe', 'Kangaroo'],
    correctAnswer: 'Blue Whale',
  },
  // {
  //   question: "what is the captal of india:",
  //   options:["Tamil Nadu","Kerala","Munbi","Dilhe"],
  //   correctAnswer:'Dilhe',
  // },
  // {
  //   question: "who is tha Monkey D Lufy is father name",
  //   options:["Monkey D Drogan","Monkey D Grap","Gol D Roger","Shanks"],
  //   correctAnswer:'Monkey D Drogan',
  // },
  // {
  //   question: "wich one of them Lufy is Pirates Crew:",
  //   options:["Zoro","Marco","Sabo","Asce"],
  //   correctAnswer:'Zoro',
  // },

  // Add more questions as needed
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [timer, setTimer] = useState(60);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showScore, setShowScore] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        clearInterval(interval);
        setIsTimeUp(true);

      }
    }, 1000);
    return () => clearInterval(interval);

  }, []);


  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion();
      setTimer(60);
    }
  });

  const handleNextQuestion = () => {
    if (!isTimeUp) {
      if (!showScore && selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }

      if (currentQuestion + 1 < questions.length) {
        setSelectedAnswer('');
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        setTimer(60);
      } else {
        // console.log(score);
        setShowScore(true);
      }
    }
  };
  return (
    <div className="quiz">
      <div className="quiz-continer">
        {
          showScore ? (<h1>Your Score is : {score}</h1>) : (
            <div className='quiz-continer_question'>
              <div className='quiz-navbar'>
                <h1>React Quiz App</h1>
                <div className='timer'>
                  <p>Timer: <span className={timer <= 15 ? "warning" : ""}>{(timer).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
                  }</span> seconds left</p>
                  <h3>Question {currentQuestion + 1}</h3>
                  <p>{questions[currentQuestion].question}</p>
                  <div className='quiz-option'>
                    <ul className='quiz-ul'>
                      {questions[currentQuestion].options.map((option, index) => (
                        <li
                          key={index}
                          className={selectedAnswer === option ? "quiz-li selected" : "quiz-li"}
                          onClick={() => setSelectedAnswer(option)}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
              {!showScore ? <button className='button' onClick={handleNextQuestion}>Next</button> : ""}
            </div>
          )
        }
      </div>
    </div>
  );
}
export default App;
