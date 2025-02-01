import React from "react";

const QuizResult = ({ score, totalQuestions, onRestart }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Quiz Completed!</h1>
      <p className="text-2xl text-white mb-4">
        Your Score: {score} / {totalQuestions}
      </p>
      <button
        onClick={onRestart}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg text-xl"
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default QuizResult;
