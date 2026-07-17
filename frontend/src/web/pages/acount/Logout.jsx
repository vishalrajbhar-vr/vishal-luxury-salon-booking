import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <h1 className="text-3xl font-bold">
        Logging Out...
      </h1>
    </div>
  );
}

export default Logout;