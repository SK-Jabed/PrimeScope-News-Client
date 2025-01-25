import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import PaymentForm from "../components/Forms/PaymentForm/PaymentForm";

const PaymentPage = () => {
  const { state } = useLocation();
  const { plan } = state;

  // Add publishable key
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold text-center">Your Card Information</h2>
        <p className="text-center mt-2">Plan: {plan.title}</p>
        {/* <form>
          <input
            type="text"
            className="mt-4 w-full border p-2 rounded"
            placeholder="Card Number"
          />
          <input
            type="text"
            className="mt-4 w-full border p-2 rounded"
            placeholder="MM/YY"
          />
          <select className="mt-4 w-full border p-2 rounded">
            <option>{plan.title}</option>
          </select>
          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          >
            Pay ${plan.price}
          </button>
        </form> */}
        {/* Checkout Form */}
        <Elements stripe={stripePromise}>
          <PaymentForm plan={plan} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
