import React, { useState, useRef, useEffect } from "react";
import {
    getSuperdata,
    updateSuperdata,
} from "../../../service/superAdmin.js";
import { toast } from "react-toastify";
import { FaCamera, FaUser } from "react-icons/fa";

function EditProfile({ onClose, onSuccess }) {
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const [profile, setProfile] = useState({
        _id: "",
        name: "",
        email: "",
        phone: "",
        role: "",
        date: "",
        time: "",
        image: null,
    });

    // Fetch Profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getSuperdata();

                const data = response.data.getdata[0]; // First Profile

                setProfile({
                    _id: data._id,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    role: data.role,
                    date: data.date,
                    time: data.time,
                    image: data.image,
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            setProfile((prev) => ({
                ...prev,
                image: file,
            }));
        }
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const formdata = new FormData();

        formdata.append("name", profile.name);
        formdata.append("email", profile.email);
        formdata.append("phone", profile.phone);
        formdata.append("role", profile.role);
        formdata.append("date", profile.date);
        formdata.append("time", profile.time);

        if (profile.image instanceof File) {
            formdata.append("image", profile.image);
        }

        try {
            const response = await updateSuperdata(profile._id, formdata);

            toast.success(response.data.message);

            if (onSuccess) {
                onSuccess();
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Update Failed");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="px-4 py-10">
            <div className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">

                <div className="h-28 bg-gradient-to-r from-red-600 to-red-500"></div>

                <div className="-mt-14 flex justify-center">
                    <div
                        onClick={handleImageClick}
                        className="relative w-28 h-28 rounded-full bg-white border-4 border-zinc-900 shadow-lg overflow-hidden cursor-pointer group"
                    >
                        {profile.image ? (
                            <img
                                src={
                                    profile.image instanceof File
                                        ? URL.createObjectURL(profile.image)
                                        : profile.image
                                }
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                                <FaUser className="text-4xl text-zinc-500" />
                            </div>
                        )}

                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <FaCamera className="text-white text-2xl" />
                        </div>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                        className="hidden"
                    />
                </div>

                <div className="p-8">
                    <form onSubmit={handlesubmit} className="space-y-5">

                        <div>
                            <label className="block text-zinc-400 mb-2">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500"
                            />
                        </div>

                        <div>
                            <label className="block text-zinc-400 mb-2">
                                Phone Number
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500"
                            />
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? "Updating..." : "Save Changes"}
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default EditProfile;