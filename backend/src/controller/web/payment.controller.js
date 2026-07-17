import crypto from "crypto";
import paymentModel from "../../models/payment.model.js";
import appointmentModel from "../../models/appointment.model.js";
import razorpay from "../../config/razorpay.js";


export const createOrder = async (req, res) => {
    try {
        const { amount, appointmentId } = req.body;
        const options = { amount: amount * 100, currency: "INR", receipt: `receipt_${Date.now()}` };
        const order = await razorpay.orders.create(options);
        await paymentModel.create({ userId: req.user.id, appointmentId, amount, orderId: order.id, status: "created" });
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.log(error); res.status(500)
            .json({ success: false, message: "Failed to create order" });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const sign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");
        if (sign !== razorpay_signature) {
            return res.status(400)
                .json({ success: false, message: "Payment verification failed" });
        }
        const payment = await paymentModel.findOneAndUpdate({ orderId: razorpay_order_id },
            { paymentId: razorpay_payment_id, status: "paid" }, { new: true });

        if (payment && payment.appointmentId) {
            await appointmentModel.findByIdAndUpdate(payment.appointmentId, { paymentStatus: "Paid" });
        }

        res.status(200)
            .json({ success: true, message: "Payment verified successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "Verification failed" });
    }
};
