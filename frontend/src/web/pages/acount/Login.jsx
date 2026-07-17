import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaEnvelope, FaGoogle, FaLock, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { googleLogin, login } from "../../../service/user";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Login({ isModal = false, onSwitchMode, onClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formdata = {
            email,
            password,
        };

        try {

            setLoading(true);

            const response = await login(formdata);

            // localStorage.getItem("token")
            // console.log(response.data.token);
            // localStorage.setItem("token", response.data.token);
            // console.log(localStorage.getItem("token"));

            toast.success(response.data?.message || "Login Successful");

            if (response.data?.token) {
                localStorage.setItem("token", response.data.token);
            }
            if (response.data?.user) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }

            window.dispatchEvent(new Event("authChange"));

            setEmail("");
            setPassword("");

            if (onClose) {
                onClose();
            }

            Navigate("/")

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        }
        finally {
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
                    Welcome Back
                </h1>

                <p className="mt-2 text-sm text-zinc-400 sm:text-base">
                    Login to your salon account
                </p>
            </div>

            {/* FORM START */}
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="relative">
                    <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full rounded-2xl border border-zinc-700 bg-black/70 py-3.5 pl-12 pr-4 text-white outline-none transition focus:border-red-600"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="relative">
                    <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-2xl border border-zinc-700 bg-black/70 py-3.5 pl-12 pr-4 text-white outline-none transition focus:border-red-600"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="flex items-center justify-between text-sm text-zinc-400">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="accent-red-600" required
                        />
                        Remember me
                    </label>

                    {onSwitchMode ? (
                        <button
                            type="button"
                            onClick={() => onSwitchMode("forgot")}
                            className="text-red-500 hover:text-red-400"
                        >
                            Forgot Password?
                        </button>
                    ) : (
                        <Link
                            to="/forgot-password"
                            className="text-red-500 hover:text-red-400"
                        >
                            Forgot Password?
                        </Link>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl bg-red-600 py-3.5 font-semibold text-white transition hover:bg-red-700"
                >
                    {loading ? "Loging....." : "login"}

                </button>

            </form>
            {/* FORM END */}

            <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-zinc-700"></div>
                <span className="text-sm text-zinc-500">OR</span>
                <div className="h-px flex-1 bg-zinc-700"></div>
            </div>

            <p className="mt-6 text-center text-sm text-zinc-400">
                Don’t have an account?{" "}
                {onSwitchMode ? (
                    <button
                        type="button"
                        onClick={() => onSwitchMode("signup")}
                        className="font-semibold text-red-500 hover:text-red-400"
                    >
                        Sign Up
                    </button>
                ) : (
                    <Link
                        to="/signup"
                        className="font-semibold text-red-500 hover:text-red-400"
                    >
                        Sign Up
                    </Link>
                )}
            </p>

            <div className="bg-orange-200 flex gap-1 p-2 items-center justify-center rounded-full font-bold text-xl">
                <button onClick={googleLogin} className="text-black ">Google Login </button>
                <FaGoogle className="text-red-500" />
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

export default Login;