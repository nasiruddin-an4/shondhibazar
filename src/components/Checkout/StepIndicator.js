import React from "react";
import { MapPin, CreditCard, Package, Check } from "lucide-react";

const StepIndicator = ({ currentStep }) => {
  const steps = [
    {
      number: 1,
      icon: MapPin,
      label: "Shipping",
      description: "Delivery details",
    },
    {
      number: 2,
      icon: CreditCard,
      label: "Payment",
      description: "Payment method",
    },
    {
      number: 3,
      icon: Package,
      label: "Confirmation",
      description: "Order complete",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div
              key={step.number}
              className="flex flex-1 flex-col items-center relative"
            >
              {/* Connector Line */}
              {!isLast && (
                <div className="absolute top-5 w-full left-[calc(50%+16px)]">
                  <div
                    className={`h-0.5 ${
                      isCompleted ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                </div>
              )}

              {/* Step Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center 
                  ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isActive
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-400"
                  } 
                  transition-all duration-200 relative z-10`}
              >
                {isCompleted ? <Check size={20} /> : <Icon size={20} />}
              </div>

              {/* Step Label */}
              <div className="mt-2 text-center">
                <div
                  className={`font-medium ${
                    isActive || isCompleted ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </div>
                <div
                  className={`text-sm ${
                    isActive || isCompleted ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  {step.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
