import { Link, useNavigate } from "react-router-dom";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaLock,
    FaUserCircle,
    FaGoogle,
} from "react-icons/fa";
import { useState } from "react";
import { googleLogin, signup } from "../../../service/user";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function SignUp({ isModal = false, onSwitchMode, onClose }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [conformPassword, setConformPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== conformPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const formdata = {
            name,
            email,
            phone,
            password,
            conformPassword,
        };

        try {

            setLoading(true)
            const response = await signup(formdata);
            toast.success(response.data.message);

            if (response.data?.token) {
                localStorage.setItem("token", response.data.token);
            }
            if (response.data?.user) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }


            window.dispatchEvent(new Event("authChange"));

            setName("");
            setEmail("");
            setPhone("");
            setPassword("");
            setConformPassword("");

            if (onClose) onClose();
            navigate("/")

        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    // const loginbyGoogle = () => {
    //     try {
    //         const res = googleLogin()
    //         toast.success()
    //     }
    //     catch (error) {


    //     }
    // }

    const content = (
        <div className="rounded-[28px] border border-zinc-700 bg-zinc-900/70 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="mb-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-3xl text-white sm:h-20 sm:w-20 sm:text-4xl">
                    <FaUserCircle />
                </div>

                <h1 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
                    Create Account
                </h1>

                <p className="mt-2 text-sm text-zinc-400 sm:text-base">
                    Join our luxury salon community
                </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="relative">
                    <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full rounded-2xl border border-zinc-700 bg-black/70 py-3.5 pl-12 pr-4 text-white outline-none transition focus:border-red-600"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="relative">
                    <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full rounded-2xl border border-zinc-700 bg-black/70 py-3.5 pl-12 pr-4 text-white outline-none transition focus:border-red-600"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="relative">
                    <FaPhone className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full rounded-2xl border border-zinc-700 bg-black/70 py-3.5 pl-12 pr-4 text-white outline-none transition focus:border-red-600"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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

                <label className="flex items-start gap-3 text-sm text-zinc-400">
                    <input type="checkbox" className="mt-1 accent-red-600" required />
                    <span>I agree to the Terms & Conditions and Privacy Policy</span>
                </label>

                <button
                    type="submit"
                    className="w-full rounded-2xl bg-red-600 py-3.5 font-semibold text-white transition hover:bg-red-700"

                >
                    {loading ? "Creating Acount...." : "Create Account"}
                </button>
            </form>

            <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-zinc-700"></div>
                <span className="text-sm text-zinc-500">or</span>
                <div className="h-px flex-1 bg-zinc-700"></div>
            </div>

            <p className="mt-6 text-center text-sm text-zinc-400">
                Already have an account?{" "}
                {onSwitchMode ? (
                    <button
                        type="button"
                        onClick={() => onSwitchMode("login")}
                        className="font-semibold text-red-500 transition hover:text-red-400"
                    >
                        Login
                    </button>
                ) : (
                    <Link to="/login" className="font-semibold text-red-500 transition hover:text-red-400">
                        Login
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
                <div className="w-full max-w-lg">{content}</div>
            </section>
            <Footer />
        </>

    );
}

export default SignUp;