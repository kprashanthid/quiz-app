import React from "react";

const QuizResult = ({ score, totalQuestions, onRestart }) => {
  return (
    <div className="text-center bg-white p-8 rounded-xl shadow-xl">
      <h1 className="text-4xl font-semibold text-gray-800 mb-4">
        Quiz Completed!
      </h1>
      <p className="text-2xl text-gray-600 mb-6">
        Your Score: {score} / {totalQuestions}
      </p>
      <button
        onClick={onRestart}
        className="bg-gradient-to-r from-pink-400 to-purple-600 text-white py-3 px-6 rounded-lg text-xl shadow-lg hover:scale-105 transition-transform"
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default QuizResult;
