import React, { useEffect } from "react";

const QuizQuestion = ({
  question,
  onAnswer,
  currentQuestionIndex,
  selectedOptionId,
  setSelectedOptionId,
}) => {
  // Reset selectedOptionId when currentQuestionIndex changes
  useEffect(() => {
    setSelectedOptionId(null);
  }, [currentQuestionIndex, setSelectedOptionId]);

  const handleOptionClick = (option) => {
    setSelectedOptionId(option.id); // Set the selected option's id
    onAnswer(option.is_correct); // Check answer and call the parent function
  };

  return (
    <div className="w-full max-w-2xl shadow-2xl rounded-lg p-8 text-center mx-5">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Question {currentQuestionIndex + 1}: {question.description}
      </h2>
      <div className="space-y-4">
        {question.options.map((option) => (
          <button
            key={option.id}
            className={`w-full p-4 text-xl font-semibold rounded-lg transition-all duration-200 bg-white text-black`}
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
