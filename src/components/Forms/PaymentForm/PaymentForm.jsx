import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Button from "../../Shared/Buttons/Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./PaymentForm.css";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const PaymentForm = ({ plan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const subscriptionPrice = plan?.price;

  useEffect(() => {
    if (subscriptionPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: subscriptionPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, subscriptionPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("Confirm error");
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      const premiumTaken = new Date().toISOString();
      const premiumPeriodDays =
        plan.title === "1 Minute Plan"
          ? 1 / 1440
          : plan.title === "5-Day Plan"
          ? 5
          : 10;

      await axiosSecure.patch(`/users/${user.email}`, {
        premiumTaken,
        isPremium: true,
        premiumPeriodDays,
      });

      const subscriptionData = {
        email: user?.email,
        name: user?.displayName,
        price: subscriptionPrice,
        transactionId: paymentIntent.id,
        date: new Date(),
      };

      const res = await axiosSecure.post("/subscriptions", subscriptionData);
      if (res.data?.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thank you for taking a subscription",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/subscription");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="dark:text-white">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }}
        className="dark:bg-gray-800 dark:text-white p-3 border rounded-lg"
      />
      <select className="mb-4 w-full border p-2 rounded dark:bg-gray-700 dark:text-white">
        <option>{plan.title}</option>
      </select>
      <p className="text-red-600 mb-2">{error}</p>
      {transactionId && (
        <p className="text-green-600 mb-3">
          Your transaction id: {transactionId}
        </p>
      )}
      <Button
        type="submit"
        disabled={!stripe || !clientSecret}
        label={`Pay ${plan.price}$`}
        className="dark:bg-indigo-600 dark:hover:bg-indigo-700"
      />
    </form>
  );
};

export default PaymentForm;
