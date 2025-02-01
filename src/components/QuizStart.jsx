import React from "react";

const QuizStart = ({ onStart }) => {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-semibold text-white mb-4">
        Welcome to the Quiz!
      </h1>
      <button
        onClick={onStart}
        className="bg-gradient-to-r from-pink-400 to-purple-600 text-white py-3 px-6 rounded-lg text-xl shadow-lg hover:scale-105 transition-transform"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuizStart;
