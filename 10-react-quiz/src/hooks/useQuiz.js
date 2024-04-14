/** @format */

import { useContext } from "react";
import { QuizContext } from "../contexts/QuizContext";

export function useQuiz() {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error("QuizContext must be used within an QuizProvider");
  }

  return context;
}
