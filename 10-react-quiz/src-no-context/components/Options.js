/** @format */

function Options({ question, dispatch, answer }) {
  const { options, correctOption } = question;

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
