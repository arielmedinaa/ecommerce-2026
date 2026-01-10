import React, { useState } from "react";
import Stepper from "../steps/Stepper";
import PersonalInfoStep from "../step/PersonalInfoStep";
import PaymentMethodSelector from "../PaymentMethodSelector";
import CardPaymentForm from "../form/CardPaymentForm";
import TransferPaymentForm from "../form/TransferPaymentForm";
import CashPaymentForm from "../form/CashPaymentForm";
import SuccessStep from "../step/SuccessStep";
import NavigationButtons from "../NavigationButtons";

const CardInfoPayment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    healthFunds: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cash",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      return (
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.phone &&
        formData.healthFunds &&
        formData.address &&
        formData.city &&
        formData.postalCode
      );
    }
    if (currentStep === 2) {
      return (
        formData.paymentMethod &&
        (formData.paymentMethod !== "card" ||
          (formData.cardNumber && formData.expiry && formData.cvc))
      );
    }
    return true;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg w-full h-[700px] font-poppins flex flex-col">
      <Stepper currentStep={currentStep} />
      <div className="flex-1 min-h-0">
        {currentStep === 1 && (
          <div className="h-full flex flex-col p-3">
            <PersonalInfoStep 
              formData={formData} 
              handleInputChange={handleInputChange} 
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="h-full flex flex-col animate-fadeIn p-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 shrink-0">
              Método de Pago
            </h3>
            <div className="flex-1 min-h-0 overflow-y-auto">
              <PaymentMethodSelector 
                formData={formData} 
                handleInputChange={handleInputChange} 
              />

              {formData.paymentMethod === "card" && (
                <CardPaymentForm 
                  formData={formData} 
                  handleInputChange={handleInputChange} 
                />
              )}

              {formData.paymentMethod === "transfer" && (
                <TransferPaymentForm />
              )}

              {formData.paymentMethod === "cash" && (
                <CashPaymentForm />
              )}
            </div>
          </div>
        )}

        {currentStep === 3 && <SuccessStep />}
      </div>

      {currentStep < 3 && (
        <div className="shrink-0 mt-4">
          <NavigationButtons
            currentStep={currentStep}
            onPrev={handlePrevStep}
            onNext={handleNextStep}
            isStepValid={isStepValid}
          />
        </div>
      )}
    </div>
  );
};

export default CardInfoPayment;
