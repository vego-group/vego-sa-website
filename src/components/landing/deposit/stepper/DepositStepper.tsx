import type { ReactElement } from "react";

import type { DepositStepperProps } from "@/interfaces/landing/deposit";
import DepositStepItem from "./DepositStepItem";

const activeStepByPhase = {
  details: 2,
  "pay-deposit": 3,
  "booking-confirmed": 4,
};

function DepositStepper({ steps, phase }: DepositStepperProps): ReactElement {
  const activeStep = activeStepByPhase[phase];

  return (
    <nav aria-label="خطوات الحجز" className="overflow-x-auto pb-2">
      <ol className="mx-auto flex min-w-[44rem] items-start lg:min-w-0 lg:max-w-4xl">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < activeStep;
          const isActive = stepNumber === activeStep;

          return (
            <li
              key={step.id}
              className={`flex items-start ${
                stepNumber < steps.length ? "flex-1" : "shrink-0"
              }`}
            >
              <DepositStepItem
                index={stepNumber}
                isActive={isActive}
                isCompleted={isCompleted}
                label={step.label}
              />
              {stepNumber < steps.length ? (
                <span
                  aria-hidden="true"
                  className={`mt-6 h-1 flex-1 rounded-full ${
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
