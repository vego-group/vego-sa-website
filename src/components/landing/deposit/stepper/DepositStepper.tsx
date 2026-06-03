import type { ReactElement } from "react";

import type { DepositStepperProps } from "@/interfaces/landing/deposit";
import DepositStepItem from "./DepositStepItem";

const activeStepByPhase = {
  details: 2,
  review: 3,
};

function DepositStepper({ steps, phase }: DepositStepperProps): ReactElement {
  const activeStep = activeStepByPhase[phase];

  return (
    <nav aria-label="خطوات الحجز" className="overflow-x-auto pb-2">
      <ol className="mx-auto flex w-max min-w-full items-start justify-between gap-4 lg:max-w-4xl">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < activeStep;
          const isActive = stepNumber === activeStep;

          return (
            <li key={step.id} className="flex items-center gap-4">
              <DepositStepItem
                index={stepNumber}
                isActive={isActive}
                isCompleted={isCompleted}
                label={step.label}
              />
              {stepNumber < steps.length ? (
                <span
                  aria-hidden="true"
                  className={`mt-6 hidden h-1 w-14 rounded-full sm:block ${
                    stepNumber < activeStep ? "bg-secondary" : "bg-white/12"
                  }`}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default DepositStepper;
