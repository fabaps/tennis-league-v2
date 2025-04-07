import { useAuthContext } from "@/providers/auth/hooks";
import { useState } from "react";
import questions from "../utils";
import { LOGIN_STEP } from "../../../utils";

const useHandleAnswer = () => {
  const { setCategory, setUtr , setStep} = useAuthContext();
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questions[questionIndex];

  const handler = (name: string) => (value: string) => {
    const newAnswers = { ...answers, [name]: Number(value) };
    setAnswers(newAnswers);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      let totalUtr = 0;
      Object.values(newAnswers).forEach((value) => {
        totalUtr += value;
      });

      let category = "Principiante";
      if (totalUtr > 13) category = "Mayor";
      else if (totalUtr > 10.5) category = "A";
      else if (totalUtr > 8.5) category = "B";
      else if (totalUtr > 6) category = "C";
      else if (totalUtr > 2) category = "D";

      setCategory(category);
      setUtr(totalUtr);
      setStep(LOGIN_STEP.RESULT)
    }
  };

  return {
    handler,
    question,
    answers,
    questionIndex,
    setQuestionIndex,
  };
};

export default useHandleAnswer;
