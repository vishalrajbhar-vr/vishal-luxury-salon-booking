import { Link } from "react-router-dom";
import { FaLock, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { newpassword } from "../../../service/user";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function ResetPassword({ isModal = false, onSwitchMode, onClose }) {
  const [newPassword, setNewPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("resetEmail");

    if (!email) {
      toast.error("Email not found. Please verify OTP again.");
      return;
    }

    if (!newPassword || !conformPassword) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const response = await newpassword({
        email,
        newPassword,
        conformPassword,
      });

      toast.success(response.data.message);

      localStorage.removeItem("resetEmail");

      setNewPassword("");
      setConformPassword("");

      setTimeout(() => {
        if (onSwitchMode) {
          onSwitchMode("login");
        }
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Password reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <div className="rounded-[28px] border border-zinc-700 bg-zinc-900/70 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="mb-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-3xl text-white sm:h-20 sm:w-20 sm:text-4xl">
          <FaUserCircle />
        </div>

        <h1 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
          Reset Password
        </h1>

        <p className="mt-2 text-sm text-zinc-400 sm:text-base">
          Create a new password
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="relative">
          <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="password"
            placeholder="New Password"
            className="w-full rounded-2xl border border-zinc-700 bg-black/70 py-3.5 pl-12 pr-4 text-white outline-none transition focus:border-red-600"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="relative">
          <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full rounded-2xl border border-zinc-700 bg-black/70 py-3.5 pl-12 pr-4 text-white outline-none transition focus:border-red-600"
            value={conformPassword}
            onChange={(e) => setConformPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-red-600 py-3.5 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        Want to go back?{" "}
        {onSwitchMode ? (
          <button
            type="button"
            onClick={() => onSwitchMode("login")}
            className="font-semibold text-red-500 hover:text-red-400"
          >
            Login
          </button>
        ) : (
          <Link
            to="/login"
            className="font-semibold text-red-500 hover:text-red-400"
          >
            Login
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

export default ResetPassword;