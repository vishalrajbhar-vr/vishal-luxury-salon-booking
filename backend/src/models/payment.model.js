import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user_data" },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "appointment_data" },
    amount: Number,
    orderId: String,
    paymentId: String,
    status: {
        type: String,
        enum: ["created", "paid", "failed"],
        default: "created"
    }
},
    { timestamps: true });
const paymentModel = mongoose.model("payment", paymentSchema);
export default paymentModel;