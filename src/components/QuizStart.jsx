const QuizStart = ({ onStart }) => {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold mb-8">Welcome to the Quiz!</h1>
      <button
        onClick={onStart}
        className="bg-white text-purple-600 px-8 py-4 rounded-full text-2xl font-semibold hover:bg-purple-100 transition-all"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuizStart;
