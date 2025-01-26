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
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, subscriptionPrice]);

//   const handleSubmit = async (event) => {
//     // Block native form submission.
//     event.preventDefault();

    // if (!stripe || !elements) {
    //   return;
    // }

    // const card = elements.getElement(CardElement);

    // if (card == null) {
    //   return;
    // }

    // // Use your card Element with other Stripe.js APIs
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card,
    // });

    // if (error) {
    //   console.log("Payment error", error);
    //   setError(error.message);
    // } else {
    //   console.log("Payment successful", paymentMethod);
    //   setError("");
    // }

    // // Confirm Payment
    // const { paymentIntent, error: confirmError } =
    //   await stripe.confirmCardPayment(clientSecret, {
    //     payment_method: {
    //       card: card,
    //       billing_details: {
    //         email: user?.email || "anonymous",
    //         name: user?.displayName || "anonymous",
    //       },
    //     },
    //   });

//     if (confirmError) {
//       console.log("Confirm error");
//     } else {
//       console.log("Payment intent", paymentIntent);
//       if (paymentIntent.status === "succeeded") {
//         const subscriptionPeriod =
//           plan.title === "1 Minute Plan"
//             ? 1 / 1440 // 1 minute in days
//             : plan.title === "5-Day Plan"
//             ? 5
//             : 10; // Customize periods based on plans

//         const premiumExpirationDate = new Date(
//           Date.now() + subscriptionPeriod * 24 * 60 * 60 * 1000
//         ); // Add days to current time

//         // Update the user document with the premium expiration date
//         await axiosSecure.patch(`/users/${user.email}`, {
//           premiumTaken: premiumExpirationDate,
//           isPremium: true,
//         });

//         console.log("Updated premium expiration date:", premiumExpirationDate);

//         // Save subscription data
//         const subscriptionData = {
//           email: user?.email,
//           name: user?.displayName,
//           price: subscriptionPrice,
//           transactionId: paymentIntent.id,
//           date: new Date(),
//         };

//         const res = await axiosSecure.post("/subscriptions", subscriptionData);
//         if (res.data?.insertedId) {
//           Swal.fire({
//             position: "center",
//             icon: "success",
//             title: "Thank you for taking a subscription",
//             showConfirmButton: false,
//             timer: 1500,
//           });
//           navigate("/subscription");
//         }
//       }
//     }
//   };

    // const handleSubmit = async (event) => {
    //   event.preventDefault();

    //   if (!stripe || !elements) {
    //     return;
    //   }

    //   const card = elements.getElement(CardElement);

    //   if (card == null) {
    //     return;
    //   }

    //   // Use your card Element with other Stripe.js APIs
    //   const { error, paymentMethod } = await stripe.createPaymentMethod({
    //     type: "card",
    //     card,
    //   });

    //   if (error) {
    //     console.log("Payment error", error);
    //     setError(error.message);
    //   } else {
    //     console.log("Payment successful", paymentMethod);
    //     setError("");
    //   }

    //   // Confirm Payment
    //   const { paymentIntent, error: confirmError } =
    //     await stripe.confirmCardPayment(clientSecret, {
    //       payment_method: {
    //         card: card,
    //         billing_details: {
    //           email: user?.email || "anonymous",
    //           name: user?.displayName || "anonymous",
    //         },
    //       },
    //     });

    //   if (paymentIntent?.status === "succeeded") {
    //     const premiumTaken = new Date().toISOString();
    //     const premiumPeriodDays =
    //       plan.title === "1 Minute Plan"
    //         ? 1 / 1440 // 1 minute in days
    //         : plan.title === "5-Day Plan"
    //         ? 5
    //         : 10;

    //     await axiosSecure.patch(`/users/${user.email}`, {
    //       premiumTaken,
    //       isPremium: true,
    //       premiumPeriodDays,
    //     });

    //     // Save subscription data
    //     const subscriptionData = {
    //       email: user?.email,
    //       name: user?.displayName,
    //       price: subscriptionPrice,
    //       transactionId: paymentIntent.id,
    //       date: new Date(),
    //     };

    //     const res = await axiosSecure.post("/subscriptions", subscriptionData);
    //     if (res.data?.insertedId) {
    //       Swal.fire({
    //         position: "center",
    //         icon: "success",
    //         title: "Thank you for taking a subscription",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //       navigate("/subscription");
    //     }
    //   } else if (confirmError) {
    //     console.error("Payment failed:", error.message);
    //     setError(error.message);
    //   }
    // };


    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!stripe || !elements) return;

      const card = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card,
            billing_details: {
              email: user?.email || "anonymous",
              name: user?.displayName || "anonymous",
            },
          },
        }
      );

      if (paymentIntent?.status === "succeeded") {
        const premiumTaken = new Date().toISOString();
        const premiumPeriodDays =
          plan.title === "1 Minute Plan"
            ? 1 / 1440 // 1 minute in days
            : plan.title === "5-Day Plan"
            ? 5
            : 10;

        await axiosSecure.patch(`/users/${user.email}`, {
          premiumTaken,
          isPremium: true,
          premiumPeriodDays,
        });

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thank you for subscribing!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/subscription");
      } else if (error) {
        console.error("Payment failed:", error.message);
        setError(error.message);
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
      <p className="text-red-600 mb-2">{error}</p>
      {transactionId && (
        <p className="text-green-600 mb-3">
          {" "}
          Your transaction id: {transactionId}
        </p>
      )}
      <Button
        type="submit"
        disabled={!stripe || !clientSecret}
        label={`Pay ${plan.price}$`}
      />
    </form>
  );
};

export default PaymentForm;
