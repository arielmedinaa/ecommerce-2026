import React, { useState } from "react";
import Stepper from "../steps/Stepper";
import PersonalInfoStep from "../PersonalInfoStep";
import PaymentMethodSelector from "../PaymentMethodSelector";
import CardPaymentForm from "../CardPaymentForm";
import TransferPaymentForm from "../TransferPaymentForm";
import CashPaymentForm from "../CashPaymentForm";
import SuccessStep from "../SuccessStep";
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
    <div className="bg-white rounded-2xl p-6 shadow-lg w-full h-full font-poppins flex flex-col">
      <Stepper currentStep={currentStep} />
      <div className="flex-1 min-h-[300px]">
        {currentStep === 1 && (
          <PersonalInfoStep 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />
        )}

        {currentStep === 2 && (
          <div className="animate-fadeIn">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Método de Pago
            </h3>
            <div className="space-y-6">
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
        <NavigationButtons
          currentStep={currentStep}
          onPrev={handlePrevStep}
          onNext={handleNextStep}
          isStepValid={isStepValid}
        />
      )}
    </div>
  );
};

export default CardInfoPayment;
