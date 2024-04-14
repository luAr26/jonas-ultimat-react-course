/** @format */
import { useQuiz } from "../hooks/useQuiz";
import { QuizContext } from "../contexts/QuizContext";

import Options from "./Options";

function Question() {
  const { questions, index, dispatch, answer } = useQuiz(QuizContext);
  const question = questions[index];
  const { question: questionText } = question;
  return (
    <div>
      <h4>{questionText}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
