import { useState } from "react";
import "./App.css";
import { clsx } from "clsx";

const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "London", correct: false },
    ],
  },
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: false },
    ],
  },
];

function App() {
  const [start, setStart] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [bgAnswer, setBgAnswer] = useState(0);

  const handleStart = () => {
    setStart(false);
    setCurrentQuestion(0);
    setSelectedAnswer(0);
    setBgAnswer(0);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(0);
      setBgAnswer(0);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedAnswer(0);
      setBgAnswer(0);
    }
  };

  const handleSelectAnswer = (correct:boolean) => {
    setSelectedAnswer(1);
    
    if (correct == true) {
      setBgAnswer(1);
    } else {
      setBgAnswer(2);
    }
  };
  
  return (
    <div className={clsx("flex items-center justify-center h-screen",{
      "bg-white": bgAnswer === 0,
      "bg-green-500": bgAnswer === 1,
      "bg-red-500": bgAnswer === 2,
    })}>
      <div className="w-[800px] max-w-[80%] bg-gray-100  rounded-md p-4 shadow-md">
        {start ? (
          <button
            className="bg-blue-500 border border-2 border-black rounded-md text-white outline-none hover:border-black text-3xl font-bold px-6 p-3"
            onClick={handleStart}
          >
            Start
          </button>
        ) : (
          <div>
            <div className="text-lg font-bold mb-4">
              {questions[currentQuestion].question}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {questions[currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  className={clsx(
                    "border border-2 border-black rounded-md px-3 py-1 text-white outline-none hover:border-black transition-all duration-200",
                    {
                      "bg-blue-500": selectedAnswer === 0,
                      "bg-green-500": selectedAnswer === 1  && answer.correct,
                      "bg-red-500": selectedAnswer === 1 && !answer.correct,
                    }
                  )}
                  onClick={() => handleSelectAnswer(answer.correct)}
                >
                  {answer.text}
                </button>
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <button
                className={clsx(
                  "bg-blue-500 border border-2 border-black rounded-md px-3 py-1 text-white outline-none hover:border-black",
                  { hidden: currentQuestion === 0 }
                )}
                onClick={handleBack}
              >
                Back
              </button>
              <button
                className={clsx(
                  "bg-blue-500 border border-2 border-black rounded-md px-3 py-1 text-white outline-none hover:border-black",
                  { hidden: currentQuestion === questions.length - 1 }
                )}
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
