import clsx from "clsx";
import React from "react";

import View from "@/components/layout/view";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radioGroup";

import useHandleAnswer from "./hooks";
import { animationDelay } from "./utils";

const QuestionsStep: React.FC = () => {
  const {
    handler: handleAnswer,
    questionIndex,
    question,
    answers,
  } = useHandleAnswer();

  const Icon = question.icon;

  const percent = 100 / 4;
  const progress = Math.round((questionIndex + 1) * percent);

  return (
    <View data-id="personal-info" className="bg-primary h-[80dvh]">
      <div className="bg-white rounded-lg w-full p-5 h-full overflow-hidden">
        <div className="animate-fade-left flex flex-col space-y-5 h-full overflow-auto">
          <div className="flex flex-col items-center justify-center space-y-2 text-sm text-gray-500">
            <Progress value={progress} className="w-20" />
            <p className="text-md text-primary font-semibold">
              Pregunta {questionIndex + 1}
            </p>
          </div>

          <div
            className="flex flex-col space-y-4 animate-fade-left"
            key={`container-${question.name}-${questionIndex}`}
          >
            <div className="w-full flex items-center justify-center">
              <div className="flex flex-row items-center justify-center h-10 w-10 bg-green-50 rounded-full">
                <Icon className="size-6 text-green-500" />
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <h2 className="text-lg font-bold text-primary">
                {question.title}
              </h2>
              <p className="text-md text-gray-500">{question.description}</p>
            </div>

            <RadioGroup
              className="space-y-2"
              key={`radio-${question.name}-${questionIndex}`}
              onValueChange={handleAnswer(question.name)}
              value={answers[question.name]?.toString()}
            >
              {question.options.map((option, index) => {
                return (
                  <label
                    key={`radio-label-${question.name}-${index}`}
                    className={clsx("animate-fade-left", animationDelay[index])}
                  >
                    <Card className="hover:bg-gray-100 shadow-xs text-gray-600 rounded-lg border-2 border-input hover:border-gray-400 transition-colors duration-150 gap-0 py-2 px-4 flex flex-row items-center space-x-4">
                      <RadioGroupItem
                        value={option.value.toString()}
                        id={`${question.name}-${index}`}
                        className="h-4 w-4 border-2 border-green-500 text-green-500"
                      />

                      <p className="text-lg text-gray-600">{option.label}</p>
                    </Card>
                  </label>
                );
              })}
            </RadioGroup>
          </div>
        </div>
      </div>
    </View>
  );
};

export default QuestionsStep;
