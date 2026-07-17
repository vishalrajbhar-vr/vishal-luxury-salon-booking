import { useEffect, useState } from "react";
import { getSuperdata } from "../../service/superAdmin.js";

function AdminNavbar({ refresh }) {
  const [profile, setProfile] = useState(null);
  const fetchProfile = async () => {
    try {
      const response = await getSuperdata();
      const data = response.data.getdata;
      if (data && data.length > 0) {
        setProfile(data[data.length - 1]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, [refresh]);

  return (
    <div className="bg-zinc-950 border-b border-zinc-800 p-5 flex justify-between items-center">

      <h2 className="text-2xl font-bold">
        Dashboard
      </h2>
      {profile && (
        <div className="flex items-center gap-4">

          <img
            src={profile.image}
            alt=""
            className="w-10 h-10 rounded-full"
          />

          <span>{profile.name}</span>

        </div>
      )}

    </div>
  );
}

export default AdminNavbar;