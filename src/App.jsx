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

  // Load quiz data from API
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

  // Timer logic
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

  // Start quiz
  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  // Handle answer selection
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  // Handle next question logic
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
      <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex flex-col items-center justify-center text-white font-semibold">
        <p className="text-2xl">Loading quiz data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 flex flex-col items-center justify-center text-white font-semibold">
        <p className="text-2xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="px-5 w-full min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex flex-col items-center justify-center text-white font-semibold">
      {!quizStarted && <QuizStart onStart={handleStartQuiz} />}
      {quizStarted && !quizCompleted && (
        <>
          <div className="w-full max-w-2xl bg-gray-100 rounded-full h-4 mb-8 shadow-md">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between w-full max-w-2xl mb-8 text-lg">
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
