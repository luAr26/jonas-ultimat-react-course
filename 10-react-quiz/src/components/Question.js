/** @format */
import { useQuiz } from "../hooks/useQuiz";

import Options from "./Options";

function Question() {
  const { questions, index } = useQuiz();
  const question = questions[index];
  const { question: questionText } = question;
  return (
    <div>
      <h4>{questionText}</h4>
      <Options />
    </div>
  );
}

export default Question;
