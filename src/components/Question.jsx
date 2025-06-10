import { useQuiz } from "../hooks/useQuiz";
import Options from "./Options";

function Question() {
  const { questions, index } = useQuiz();
  const question = questions[index];

  return (
    <div className="question">
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Question;