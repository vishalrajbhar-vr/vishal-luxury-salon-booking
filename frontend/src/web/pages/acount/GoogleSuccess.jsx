import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleSuccess() {

    const navigate = useNavigate();

    useEffect(() => {

        const params = new URLSearchParams(window.location.search);

        const token = params.get("token");
        const user = params.get("user");

        if (token) {

            localStorage.setItem("token", token);

            if (user) {
                localStorage.setItem(
                    "user",
                    decodeURIComponent(user)
                );
            }

            window.dispatchEvent(new Event("authChange"));

            navigate("/");
        }

    }, []);

    return (
        <h2 className="text-center mt-10">
            Logging in...
        </h2>
    );
}

export default GoogleSuccess;