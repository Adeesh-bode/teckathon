import { useState, useEffect } from "react";

function Quiz() {
  const [quizData, setQuizData] = useState(null);
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(21); // Default category is "Sports"
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(0); // State for timer
  const [timerInterval, setTimerInterval] = useState(null); // State for timer interval

  useEffect(() => {
    fetchQuiz();
  }, [selectedCategory]);

  useEffect(() => {
    if (quizData) {
      startTimer();
    }
  }, [quizData]);

  const fetchQuiz = () => {
    setLoading(true);
    fetch(`https://opentdb.com/api.php?amount=1&category=${selectedCategory}&difficulty=easy&type=multiple`)
      .then((response) => response.json())
      .then((data) => {
        setQuizData(data.results[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quiz:", error);
        setLoading(false);
      });
  };

  const handleOptionSelect = (selectedOption) => {
    if (selectedOption === quizData.correct_answer) {
      setScore(score + 1);
      alert("Correct!");
    } else {
      alert("Incorrect!");
    }
    fetchQuiz();
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSaveScore = () => {
    setLeaderboard([...leaderboard, { username, score }]);
    setUsername("");
    setScore(0);
  };

  const startTimer = () => {
    clearInterval(timerInterval);
    setTime(0);
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime >= 45) {
          clearInterval(interval);
          fetchQuiz();
          return 0;
        } else {
          return prevTime + 1;
        }
      });
    }, 1000);
    setTimerInterval(interval);
  };

  const handleNextQuestion = () => {
    fetchQuiz();
  };

  return (
    <div className={`flex justify-center mt-4 mb-4 pt-5 items-center min-h-screen bg-black text-white`}>
      <div className="quiz-container w-full max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-2 text-center">Quiz</h2>
        <p className="text-center text-sm mb-4">Time: {time} seconds</p>
        <div className="category-dropdown mb-4">
          <label htmlFor="category" className="block mb-2 text-lg">
            Select Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value={21}>Sports</option>
            <option value={17}>Science & Nature</option>
            <option value={9}>General Knowledge</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          quizData && (
            <>
              <div className="question mb-4 text-lg">{quizData.question}</div>
              <div className="options grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...quizData.incorrect_answers, quizData.correct_answer].sort().map((option, index) => (
                  <div
                    key={index}
                    className={`option p-4 rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-500 hover:text-white ${
                      darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </>
          )
        )}
        <div className="scoreboard mt-4">
          <p className="text-lg">Score: {score}</p>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={handleUsernameChange}
            className="w-full px-4 py-2 mt-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSaveScore}
            className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md transition-colors duration-300 hover:bg-blue-600 focus:outline-none"
          >
            Save Score
          </button>
        </div>
        <div className="leaderboard mt-4">
          <ul>
            {leaderboard.map((entry, index) => (
              <li key={index} className="text-base">
                {entry.username}: {entry.score}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 bg-blue-500 text-white rounded-md transition-colors duration-300 hover:bg-blue-600 focus:outline-none"
          >
            Next
          </button>
        </div>
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed bottom-6 right-6 px-4 py-2 bg-gray-800 text-white rounded-full transition-colors duration-300 hover:bg-gray-700 focus:outline-none ${
          darkMode && "bg-yellow-400"
        }`}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}

export default Quiz;
