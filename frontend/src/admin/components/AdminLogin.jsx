import { useState } from "react";
import { FaEnvelope, FaLock, FaUserShield } from "react-icons/fa";
import { loginadminAuth } from "../../service/AdminAuth.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            email,
            password,
        };

        try {
            const response = await loginadminAuth(formData);

            // ✅ Admin Token Save
            localStorage.setItem("adminToken", response.data.token);

            // ✅ Admin Data Save (Optional)
            localStorage.setItem(
                "admin",
                JSON.stringify(response.data.admin)
            );


            toast.success(response.data?.message || "Login Successful");

            window.dispatchEvent(new Event("authChange"));

            setEmail("");
            setPassword("");

            navigate("/adminLayout");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Login Failed");
        }
    };

    return (
        <section className="min-h-screen bg-white flex items-center justify-center px-5">

            <div className="w-full max-w-md bg-white border border-zinc-200 rounded-3xl shadow-xl p-10">

                {/* Admin Icon */}

                <div className="flex justify-center mb-8">

                    <div className="w-24 h-24 rounded-full border-2 border-red-500 flex items-center justify-center shadow-lg shadow-red-500/20">

                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="w-20 h-20 object-contain"
                        />

                    </div>

                </div>

                {/* Heading */}

                <div className="text-center mb-10">

                    <h1 className="text-3xl font-bold text-zinc-800">
                        Admin Login
                    </h1>

                    <p className="text-zinc-500 mt-2">
                        Login to access the admin dashboard
                    </p>

                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-7"
                >

                    {/* Email */}

                    <div className="relative">

                        <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />

                        <input
                            type="email"
                            placeholder="Enter Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border-b-2 border-zinc-300 bg-transparent py-4 pl-10 text-zinc-700 outline-none transition-all duration-300 focus:border-red-500"
                        />

                    </div>

                    {/* Password */}

                    <div className="relative">

                        <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />

                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full border-b-2 border-zinc-300 bg-transparent py-4 pl-10 text-zinc-700 outline-none transition-all duration-300 focus:border-red-500"
                        />

                    </div>

                    {/* Login Button */}

                    <button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-red-500/30"
                    >
                        Login
                    </button>

                </form>

            </div>

        </section>
    );
}

export default AdminLogin;