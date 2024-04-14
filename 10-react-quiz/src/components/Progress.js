/** @format */
import { useQuiz } from "../hooks/useQuiz";

function Progress() {
  const { index, numQuestions, maxPossiblePoints, points, answer } = useQuiz();
  return (
    <header className='progress'>
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
