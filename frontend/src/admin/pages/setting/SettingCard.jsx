import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaUserEdit,
  FaLock,
  FaSignOutAlt,
} from "react-icons/fa";

function SettingCard({ settingOption, setSettingOption }) {
  const navigate = useNavigate();

  const items = [
    { key: "profile", icon: <FaUser />, label: "Personal Information" },
    { key: "editProfile", icon: <FaUserEdit />, label: "Edit Profile" },
    { key: "changePassword", icon: <FaLock />, label: "Change Password" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>

      <div className="flex flex-col gap-5">
        {items.map((item) => (
          <div
            key={item.key}
            onClick={() => setSettingOption(item.key)}
            className={`flex items-center gap-3 cursor-pointer group p-3 rounded-xl transition ${
              settingOption === item.key
                ? "bg-red-600 text-white"
                : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white"
            }`}
          >
            <span
              className={`text-lg ${
                settingOption === item.key ? "text-white" : "text-red-500"
              }`}
            >
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
          </div>
        ))}

        <div className="border-t border-zinc-800 pt-5 mt-2">
          <div
            onClick={handleLogout}
            className="flex items-center gap-3 cursor-pointer group p-3 rounded-xl bg-zinc-800 hover:bg-red-600 transition"
          >
            <span className="text-lg text-red-500 group-hover:text-white transition">
              <FaSignOutAlt />
            </span>
            <span className="font-medium text-red-500 group-hover:text-white transition">
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingCard;
