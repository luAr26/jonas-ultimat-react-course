/** @format */
import { useQuiz } from "../hooks/useQuiz";
import { QuizContext } from "../contexts/QuizContext";

function Options() {
  const { questions, index, answer, dispatch } = useQuiz(QuizContext);
  const { options, correctOption } = questions[index];

  return (
    <div className='options'>
      {options.map((option, index) => (
        <button
          key={index}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            answer !== null
              ? index === correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={answer !== null}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
export default Options;
