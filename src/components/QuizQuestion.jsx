import React, { useEffect } from "react";

const QuizQuestion = ({
  question,
  onAnswer,
  currentQuestionIndex,
  selectedOptionId,
  setSelectedOptionId,
}) => {
  useEffect(() => {
    setSelectedOptionId(null);
  }, [currentQuestionIndex, setSelectedOptionId]);

  const handleOptionClick = (option) => {
    setSelectedOptionId(option.id);
    onAnswer(option.is_correct);
  };

  return (
    <div className="w-full max-w-2xl shadow-xl rounded-lg p-8 bg-white text-center mx-5 mt-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        {question.description}
      </h2>
      <div className="space-y-4">
        {question.options.map((option) => (
          <button
            key={option.id}
            className={`w-full p-4 text-xl font-semibold rounded-xl transition-all duration-300 ease-in-out transform
              ${
                selectedOptionId === option.id
                  ? option.is_correct
                    ? "bg-green-500 text-white shadow-lg"
                    : "bg-red-500 text-white shadow-lg"
                  : "bg-indigo-200 hover:bg-indigo-300"
              }`}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOptionId !== null}
          >
            {option.description}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
