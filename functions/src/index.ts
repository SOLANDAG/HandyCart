import axios from "axios";
import { onCall } from "firebase-functions/v2/https";
import { Buffer } from "node:buffer";

// GCash Payment Function (PayMongo Checkout Session)
export const createGcashPayment = onCall(async (request) => {
  const { amount, orderId, customerName, email } = request.data;

  try {
    const response = await axios.post(
      "https://api.paymongo.com/v1/checkout_sessions",
      {
        data: {
          attributes: {
            billing: {
              name: customerName,
              email: email,
            },
            send_email_receipt: false,
            show_description: true,
            cancel_url: "https://yourapp.com/payment-cancelled",
            success_url: "https://yourapp.com/payment-successful",
            line_items: [
              {
                amount: amount * 100, // convert PHP to centavos
                currency: "PHP",
                name: `HandyCart Order #${orderId}`,
                quantity: 1,
              },
            ],
            payment_method_types: ["gcash"],
          },
        },
      },
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from("pk_test_4nhMC5cR5qkf78qvws33AmWp" + ":").toString("base64"),
          "Content-Type": "application/json",
        },
      }
    );

    return {
      checkoutUrl: response.data.data.attributes.checkout_url,
    };
  } catch (error) {
    console.error("PayMongo error:", error);
    throw new Error("Failed to create GCash payment.");
  }
});