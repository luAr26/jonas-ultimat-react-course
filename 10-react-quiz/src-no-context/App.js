/** @format */

import { useEffect, useReducer } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(currentState, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...currentState,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...currentState,
        status: "error",
      };
    case "start":
      return {
        ...currentState,
        status: "active",
        secondsRemaining: currentState.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = currentState.questions[currentState.index];
      const isCorrect = question.correctOption === action.payload;
      return {
        ...currentState,
        answer: action.payload,
        points: isCorrect
          ? currentState.points + question.points
          : currentState.points,
      };
    case "nextQuestion":
      return { ...currentState, index: currentState.index + 1, answer: null };
    case "finish":
      return {
        ...currentState,
        status: "finished",
        highscore:
          currentState.points > currentState.highscore
            ? currentState.points
            : currentState.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: currentState.questions,
        status: "ready",
        highscore: currentState.highscore,
      };
    case "tick":
      return {
        ...currentState,
        secondsRemaining: currentState.secondsRemaining - 1,
        status:
          currentState.secondsRemaining === 0
            ? "finished"
            : currentState.status,
      };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

/** @format */
function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );
  useEffect(() => {
    // if (status !== "loading") return;
    async function getQuestions() {
      try {
        const response = await fetch("http://localhost:8000/questions");
        const data = await response.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    getQuestions();
  }, []);
  return (
    <div className='app'>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              maxPossiblePoints={maxPossiblePoints}
              points={points}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
