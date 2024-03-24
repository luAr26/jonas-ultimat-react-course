/** @format */

function StartScreen({ numQuestions, dispatch }) {
  const plural = numQuestions === 1 ? "" : "s";
  return (
    <div className='start'>
      <h2>Welcome to The React Quiz!</h2>
      <h3>
        {numQuestions} question{plural} to test your React mastery.
      </h3>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}
export default StartScreen;
