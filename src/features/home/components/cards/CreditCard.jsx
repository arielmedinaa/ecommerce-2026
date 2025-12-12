import React from 'react';
import CreditCardImg from '@assets/images/categories/creditCard.webp';

const CreditCard = () => {
  return (
    <div className="w-full">
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full rounded-2xl">
                <img src={CreditCardImg} alt="credit card" className="rounded-2xl"/>
            </div>
            <div className="w-full h-full bg-yellow-400">
                <p>credit card</p>
            </div>
        </div>
    </div>
  )
}

export default CreditCard