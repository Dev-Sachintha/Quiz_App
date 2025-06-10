import { useQuiz } from "../hooks/useQuiz";

function Footer({ children }) {
  const { dispatch, answer, index, numQuestions } = useQuiz();
  
  return (
    <footer>
      {children}
      {answer !== null && (
        <button
          className="btn"
          onClick={() =>
            index < numQuestions - 1
              ? dispatch({ type: "nextQuestion" })
              : dispatch({ type: "finish" })
          }
        >
          {index < numQuestions - 1 ? "Next" : "Finish"}
        </button>
      )}
    </footer>
  );
}

export default Footer;