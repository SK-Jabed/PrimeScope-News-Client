import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import PaymentForm from "../components/Forms/PaymentForm/PaymentForm";

const PaymentPage = () => {
  const { state } = useLocation();
  const { plan } = state;

  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

  if (!plan) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 shadow-lg rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold text-center dark:text-white">
          Your Card Information
        </h2>
        <p className="text-center mt-2 dark:text-gray-300">Plan: {plan.title}</p>

        <Elements stripe={stripePromise}>
          <PaymentForm plan={plan} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
