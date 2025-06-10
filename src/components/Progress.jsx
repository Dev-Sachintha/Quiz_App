import { useQuiz } from "../hooks/useQuiz";

function Progress() {
  const { index, numQuestions, points, maxPossiblePoints, answer } = useQuiz();

  return (
    <header className="progress">
      <div className="progress-bar">
        <div 
          className="progress-bar-inner" 
          style={{ width: `${((index + (answer !== null ? 1 : 0)) / numQuestions) * 100}%` }}
        ></div>
      </div>

      <div className="progress-text">
        <p>
          Question <strong>{index + 1}</strong> / {numQuestions}
        </p>
        <p>
          <strong>{points}</strong> / {maxPossiblePoints}
        </p>
      </div>
    </header>
  );
}

export default Progress;