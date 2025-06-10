import { useQuiz } from "../hooks/useQuiz";

function Options({ question }) {
  const { dispatch, answer } = useQuiz();
  const hasAnswered = answer !== null;

  // Shuffle answers so the correct one isn't always last
  const answers = [
    ...question.incorrect_answers,
    question.correct_answer,
  ].sort(() => Math.random() - 0.5);

  return (
    <div className="options">
      {answers.map((option) => (
        <button
          className={`option-btn ${option === answer ? "answer" : ""} ${
            hasAnswered
              ? option === question.correct_answer
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: option })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;