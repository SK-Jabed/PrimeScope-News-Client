import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Button from "../../Shared/Buttons/Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./PaymentForm.css";

const PaymentForm = ({ plan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();

  const subscriptionPrice = plan?.price;

  useEffect(() => {
    if (subscriptionPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: subscriptionPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, subscriptionPrice]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <select className="mb-4 w-full border p-2 rounded">
        <option>{plan.title}</option>
      </select>
      <p className="text-red-600 mb-3">{error}</p>
      <Button
        type="submit"
        disabled={!stripe || !clientSecret}
        label={`Pay ${plan.price}$`}
      />
    </form>
  );
};

export default PaymentForm;
