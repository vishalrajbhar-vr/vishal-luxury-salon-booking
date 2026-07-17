import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";

function Error404() {
    const navigate = useNavigate();

    return (
        <section className="min-h-screen bg-black flex items-center justify-center px-5 relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-red-600/10 blur-3xl"></div>
            <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-red-600/10 blur-3xl"></div>

            <div className="relative text-center max-w-2xl">

                {/* Icon */}
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-red-600 bg-red-600/10">
                    <AlertTriangle className="h-12 w-12 text-red-600" />
                </div>

                {/* 404 */}
                <h1 className="mt-8 text-8xl md:text-9xl font-black text-white">
                    4<span className="text-red-600">0</span>4
                </h1>

                {/* Heading */}
                <h2 className="mt-4 text-3xl font-bold text-white">
                    Oops! Page Not Found
                </h2>

                {/* Description */}
                <p className="mt-5 text-zinc-400 leading-8">
                    The page you're looking for doesn't exist or has been moved.
                    Please return to the homepage or go back to the previous page.
                </p>

                {/* Buttons */}
                <div className="mt-10 flex flex-wrap justify-center gap-4">

                    <Link
                        to="/"
                        className="flex items-center gap-2 rounded-xl bg-red-600 px-7 py-3 font-semibold text-white transition hover:bg-red-700"
                    >
                        <Home size={18} />
                        Back To Home
                    </Link>

                    <button
                        onClick={() => navigate(-1)}
                        className="rounded-xl border border-zinc-700 px-7 py-3 font-semibold text-white transition hover:border-red-600 hover:text-red-500"
                    >
                        Go Back
                    </button>

                </div>

            </div>
        </section>
    );
}

export default Error404;