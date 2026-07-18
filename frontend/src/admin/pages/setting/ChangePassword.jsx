import React, { useState } from "react";
import { FaLock, FaKey, FaArrowLeft, FaEye,FaEyeSlash, } from "react-icons/fa";
import { toast } from "react-toastify";
import { changePassword } from "../../../service/AdminAuth.js";

function ChangePassword({ setActivePage }) {
const [showPassword, setShowPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const admin = JSON.parse(localStorage.getItem("admin"));
const adminId = admin?._id;

    const [formData, setFormData] = useState({
        password: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.password ||
            !formData.newPassword ||
            !formData.confirmNewPassword
        ) {
            toast.error("Please fill all fields");
            return;
        }

        if (formData.newPassword !== formData.confirmNewPassword) {
            toast.error("New Password and Confirm Password do not match");
            return;
        }

        if (formData.newPassword.length < 6) {
            toast.error("New Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            const response = await changePassword({
                password: formData.password,
                newPassword: formData.newPassword,
                // Backend ke liye
                conformNewPassword: formData.confirmNewPassword,
            });

            toast.success(response.data.message);

            setFormData({
                password: "",
                newPassword: "",
                confirmNewPassword: "",
            });

            setActivePage("profile");
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

                <div className="text-center mb-6">
                    <div className="w-20 h-20 rounded-full border-2 border-red-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-red-500/20">
                        <FaKey className="text-3xl text-red-500" />
                    </div>

                    <h2 className="text-3xl font-bold text-white">
                        Change Password
                    </h2>

                    <p className="text-zinc-500 mt-2">
                        Update your account password
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-7">

                    {/* Old Password */}
                    <div>
                        <label className="block text-zinc-400 mb-1">
                            Old Password
                        </label>

                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter old password"
                                className="w-full bg-black border border-zinc-700 rounded-xl py-3 pl-12 pr-12 text-white outline-none focus:border-red-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-zinc-400 mb-1">
                            New Password
                        </label>

                        <div className="relative">
                            <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                            <input
                                type={showNewPassword ? "text" : "password"}
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                className="w-full bg-black border border-zinc-700 rounded-xl py-3 pl-12 pr-12 text-white outline-none focus:border-red-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                            >
                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-zinc-400 mb-1">
                            Confirm New Password
                        </label>

                        <div className="relative">
                            <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmNewPassword"
                                value={formData.confirmNewPassword}
                                onChange={handleChange}
                                placeholder="Confirm new password"
                                className="w-full bg-black border border-zinc-700 rounded-xl py-3 pl-12 pr-12 text-white outline-none focus:border-red-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </button>

                </form>

                <button
                    onClick={() => setActivePage("profile")}
                    className="flex items-center gap-2 mt-5 text-zinc-400 hover:text-white"
                >
                    <FaArrowLeft />
                    Back to Profile
                </button>

            </div>
        </div>
    );
}

export default ChangePassword;