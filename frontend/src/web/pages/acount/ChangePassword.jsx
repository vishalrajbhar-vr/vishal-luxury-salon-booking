import { FaLock } from "react-icons/fa";
import { useState } from "react";
import { newpassword } from "../../../service/user.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";

function ChangePassword({ isModal = false, onClose }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate("");

  const handleChangePass = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      return toast.error("Passwords do not match");
    }

    try {

      const email = localStorage.getItem("resetEmail");

      const data = {
        email,
        newPassword,
        conformPassword: confirmNewPassword,
      };

      const response = await newpassword(data);

      toast.success(response.data.message);

      localStorage.removeItem("resetEmail");

      navigate("/")

      if (onClose) {
        onClose();
      }

    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const content = (
    <div className="rounded-[28px] border border-zinc-700 bg-zinc-900/70 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Change Password
        </h1>

        <p className="mt-2 text-sm text-zinc-400 sm:text-base">
          Update your password securely
        </p>
      </div>

      <form onSubmit={handleChangePass} className="space-y-4">
        <div className="relative">
          <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

          <input
            type="password"
            placeholder="New Password"
            className="w-full rounded-2xl border border-zinc-700 bg-black/70 py-3.5 pl-12 pr-4 text-white outline-none transition focus:border-red-600"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full rounded-2xl border border-zinc-700 bg-black/70 py-3.5 pl-12 pr-4 text-white outline-none transition focus:border-red-600"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-red-600 py-3.5 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );

  if (isModal) return content;

  return (
    <>
      <Navbar />
      <section className="flex min-h-screen items-center justify-center bg-black px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="w-full max-w-lg">{content}</div>
      </section>
      <Footer />
    </>
  );
}

export default ChangePassword;