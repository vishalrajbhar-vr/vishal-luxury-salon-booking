import { Link, useNavigate } from "react-router-dom";
import { FaShieldAlt } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { verifyingotp } from "../../../service/user";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function VerifyOtp({ isModal = false, onSwitchMode, onClose }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("resetEmail");

    if (!email) {
      toast.error("Email not found. Please send OTP again.");
      return;
    }

    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      setLoading(true)
      const response = await verifyingotp({
        email,
        otp,
      });

      toast.success(response.data.message);
      navigate("/changepassword");
      setTimeout(() => {
        if (onSwitchMode) {
          onSwitchMode("reset");
        }
      }, 1000);



    } catch (error) {
      toast.error(
        error.response?.data?.message || "OTP verification failed"
      );
    }
    finally {
      setLoading(false);
    }
  };

  const content = (
    <div className="rounded-[28px] border border-zinc-700 bg-zinc-900/70 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="mb-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-3xl text-white sm:h-20 sm:w-20 sm:text-4xl">
          <FaShieldAlt />
        </div>

        <h1 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
          Verify OTP
        </h1>

        <p className="mt-2 text-sm text-zinc-400 sm:text-base">
          Enter the OTP sent to your email
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-4">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full rounded-2xl border border-zinc-700 bg-black/70 px-4 py-3.5 text-center text-xl tracking-[8px] text-white outline-none transition focus:border-red-600"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-red-600 py-3.5 font-semibold text-white transition hover:bg-red-700"

        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        Didn’t receive the code?{" "}
        {onSwitchMode ? (
          <button
            type="button"
            onClick={() => onSwitchMode("forgot")}
            className="font-semibold text-red-500 transition hover:text-red-400"
          >
            Resend
          </button>
        ) : (
          <Link
            to="/forgot-password"
            className="font-semibold text-red-500 transition hover:text-red-400"
          >
            Resend
          </Link>
        )}
      </p>
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

export default VerifyOtp;