import React, { useEffect, useState } from "react";
import { fetchQuizData } from "./utils/api";
import QuizStart from "./components/QuizStart";
import QuizQuestion from "./components/QuizQuestion";
import QuizResult from "./components/QuizResult";

function App() {
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const data = await fetchQuizData();
        if (data) {
          setQuizData(data);
        } else {
          setError("Failed to load quiz data. Please try again later.");
        }
      } catch (err) {
        setError("An error occurred while fetching quiz data.");
      } finally {
        setLoading(false);
      }
    };
    loadQuizData();
  }, []);

  useEffect(() => {
    if (quizStarted && !quizCompleted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleNextQuestion();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizStarted, quizCompleted, currentQuestionIndex]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < quizData.questions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedOptionId(null);
      setTimeLeft(30);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setQuizStarted(false);
    setTimeLeft(30);
    setSelectedOptionId(null);
  };

  const progress = quizData
    ? ((currentQuestionIndex + 1) / quizData.questions.length) * 100
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-600 to-indigo-600 bg-[length:400%_400%] animate-gradient-animation flex flex-col items-center justify-center text-white">
        <p className="text-2xl">Loading quiz data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-500 via-blue-600 to-indigo-700 bg-[length:400%_400%] animate-gradient-animation flex flex-col items-center justify-center text-white">
        <p className="text-2xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-purple-500 via-pink-600 to-indigo-600 bg-[length:400%_400%] animate-gradient-animation flex flex-col items-center justify-center text-white">
      {!quizStarted && <QuizStart onStart={handleStartQuiz} />}
      {quizStarted && !quizCompleted && (
        <>
          <div className="w-full max-w-2xl bg-gray-200 rounded-full h-4 mb-8">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between w-full max-w-2xl mb-8 text-lg text-gray-800">
            <p>Time Left: {timeLeft}s</p>
            <p>
              Question {currentQuestionIndex + 1} / {quizData.questions.length}
            </p>
          </div>
          <QuizQuestion
            question={quizData.questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            currentQuestionIndex={currentQuestionIndex}
            selectedOptionId={selectedOptionId}
            setSelectedOptionId={setSelectedOptionId}
          />
        </>
      )}
      {quizCompleted && (
        <QuizResult
          score={score}
          totalQuestions={quizData.questions.length}
          onRestart={handleRestartQuiz}
        />
      )}
    </div>
  );
}

export default App;
