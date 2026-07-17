import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { useState } from "react";
import { sendotp } from "../../../service/user";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function ForgotPassword({ isModal = false, onSwitchMode, onClose }) {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();

    const formdata = {
      email,
    };

    setLoading(true);

    try {

      const response = await sendotp(formdata);

      localStorage.setItem("resetEmail", email);

      toast.success(response.data.message);

      setEmail("");

      if (isModal && onSwitchMode) {
        onSwitchMode("otp");
      } else {
        navigate("/verify-otp");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <div className="rounded-[28px] border border-zinc-700 bg-zinc-900/70 p-6 shadow-2xl backdrop-blur-xl sm:p-8">

      <div className="mb-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-3xl text-white sm:h-20 sm:w-20 sm:text-4xl">
          <FaKey />
        </div>

        <h1 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
          Forgot Password
        </h1>

        <p className="mt-2 text-sm text-zinc-400 sm:text-base">
          Enter your email and we'll send you an OTP to reset your password.
        </p>
      </div>

      <form onSubmit={handlesubmit} className="space-y-4">

        <div className="relative">
          <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-zinc-700 bg-black/70 py-3.5 pl-12 pr-4 text-white outline-none transition focus:border-red-600"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-red-600 py-3.5 text-center font-semibold text-white transition hover:bg-red-700"
        >
          {loading ? "Sending otp..." : "Send OTP"}
        </button>

      </form>

      <div className="mt-6 text-center text-sm text-zinc-400 sm:text-base">
        Back to{" "}

        {onSwitchMode ? (
          <button
            type="button"
            onClick={() => onSwitchMode("login")}
            className="font-semibold text-red-500 transition hover:text-red-400"
          >
            Login
          </button>
        ) : (
          <Link
            to="/login"
            className="font-semibold text-red-500 transition hover:text-red-400"
          >
            Login
          </Link>
        )}
      </div>

    </div>
  );

  if (isModal) return content;

  return (
    <>
      <Navbar />
      <section className="flex min-h-screen items-center justify-center bg-black px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {content}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ForgotPassword;