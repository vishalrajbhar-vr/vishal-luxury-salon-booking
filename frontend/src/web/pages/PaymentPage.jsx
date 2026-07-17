import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function PaymentPage() {

    const navigate = useNavigate();

    const handlePayment = async () => {
        try {
            // Step 1: Create Order
            const response = await axios.post("http://localhost:5000/api/web/payment/create-order",
                { amount: 299 },
                { headers: { Authorization: `Bearer ${token}` } });
            const order = response.data.order; console.log(order);
            // Step 2: Open Razorpay
            const options = {
                key: "rzp_test_xxxxxxxxxx",
                amount: order.amount,
                currency: order.currency,
                name: "Anish Kumar",
                description: "MERN Stack Course",
                order_id: order.id,
                handler: async function (response) {
                    console.log(response);
                    // Step 3: Verify Payment
                    const verifyResponse = await axios.post("http://localhost:5000/api/web/payment/verify",
                        {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        },
                        { headers: { Authorization: `Bearer ${token}` } });
                    console.log(verifyResponse.data);
                    alert("Payment Success");
                }
            };
            const razorpay = new window.Razorpay(options); razorpay.open();

            navigate("/Payment-success")
        }
        catch (error) {
            console.log(error); alert("Something Went Wrong");

        }
    };
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-10 rounded-xl shadow-lg text-center">
                <h1 className="text-3xl font-bold"> MERN Stack Course </h1>
                <h2 className="text-2xl font-semibold mt-4">₹499 </h2>
                <button onClick={handlePayment} className="bg-green-600 text-white px-6 py-3 rounded-lg mt-6" > Pay Now </button>
            </div>
        </div>
    );
}
export default PaymentPage;