import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../hooks/useQuiz';

function Score() {
  const { points, maxPossiblePoints, dispatch } = useQuiz();
  const navigate = useNavigate();

  const percentage = (points / maxPossiblePoints) * 100;

  function handleRestart() {
    dispatch({ type: 'restart' });
    navigate('/');
  }

  return (
    <div className="result">
      <p>
        You scored <span>{points}</span> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <button className="btn" onClick={handleRestart}>
        Restart Quiz
      </button>
    </div>
  );
}

export default Score;