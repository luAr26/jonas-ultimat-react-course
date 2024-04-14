/** @format */
import { useQuiz } from "../hooks/useQuiz";
import { QuizContext } from "../contexts/QuizContext";

import Options from "./Options";

function Question() {
  const { questions, index } = useQuiz(QuizContext);
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
