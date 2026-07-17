import React, { useEffect, useState } from "react";
import { getSuperdata } from "../../../service/superAdmin.js";
import { getAllData } from "../../../service/AdminAuth.js";

function Profile({ refresh }) {
  const [profile, setProfile] = useState([]);
  const [admindata, setAdmindata] = useState([]);

  const fetchProfile = async () => {
    try {
      const response = await getSuperdata();
      setProfile(response.data.getdata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [refresh]);

  const getadmin = async () => {
    try {
      const response = await getAllData();
      setAdmindata(response.data.finddata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getadmin();
  }, [refresh]);

  return (
    <div className="flex justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-zinc-900 rounded-2xl shadow-lg border border-zinc-800">
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-2xl font-bold text-white">
            Personal Information
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Manage your account details
          </p>
        </div>

        {profile.map((item) => (
          <div key={item._id} className="p-6 space-y-6">

            <div>
              <p className="text-sm text-zinc-500">Full Name</p>
              <p className="text-lg font-medium text-white">{item.name}</p>
            </div>

            <div className="border-b border-zinc-800"></div>

            {admindata.map((admin) => (
              <div>
                <p className="text-sm text-zinc-500">Email</p>
                <p className="text-lg text-white">{admin.email}</p>
              </div>
            ))}


            <div className="border-b border-zinc-800"></div>

            <div>
              <p className="text-sm text-zinc-500">Phone Number</p>
              <p className="text-lg text-white">{item.phone}</p>
            </div>


          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;