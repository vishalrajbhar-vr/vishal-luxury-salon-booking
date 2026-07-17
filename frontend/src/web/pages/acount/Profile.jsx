import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getProfile } from "../../../service/userProfile.js";
import { useEffect, useState } from "react";

function Profile() {

  const [user, setUser] = useState({});

  const fetchProfile = async () => {
    try {
      const response = await getProfile();

      console.log(response.data);

      setUser(response.data.user);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-black text-white py-8 px-6">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-4xl font-bold mb-8">
            My Profile
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Profile Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center">

              <FaUserCircle className="text-8xl text-red-600 mx-auto" />

              <h2 className="text-2xl font-bold mt-5">
                {user.name}
              </h2>

              <p className="text-zinc-400">
                {user.phone}
              </p>

            </div>

            {/* Details */}
            <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

              <h2 className="text-2xl font-bold mb-8">
                Personal Information
              </h2>

              <div className="space-y-6">

                <div className="flex items-center gap-4">
                  <FaUserCircle className="text-red-500 text-xl" />

                  <div>
                    <p className="text-zinc-400">
                      Full Name
                    </p>

                    <h3>
                      {user.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-red-500 text-xl" />

                  <div>
                    <p className="text-zinc-400">
                      Email
                    </p>

                    <h3>
                      {user.email}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <FaPhone className="text-red-500 text-xl" />

                  <div>
                    <p className="text-zinc-400">
                      Phone
                    </p>

                    <h3>
                     {user.phone}
                    </h3>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
      <Footer />
    </>
  );
}

export default Profile;