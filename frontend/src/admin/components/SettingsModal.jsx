import { useState } from "react";
import { FaTimes, FaUser } from "react-icons/fa";
import { addprofile } from "../../service/adminprofile.js";
import { toast } from "react-toastify";

function SettingsModal({ isOpen, onClose }) {
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading]= useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }

    setLoading(true)
    try {
      const response = await addprofile(formData);

      if (response.data.success) {
        toast.success(response.data.message);

        // Reset Form
        setName("");
        setImage(null);
        setPreview(null);

        onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Profile Settings
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-zinc-400 transition hover:text-red-500"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Profile Image */}
          <div className="flex flex-col items-center">

            <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-red-600 bg-zinc-800">

              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <FaUser className="text-5xl text-zinc-500" />
                </div>
              )}

            </div>

            <label className="mt-4 cursor-pointer rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700">

              {image ? "Change Image" : "Upload Image"}

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImage}
              />

            </label>

          </div>

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-red-600"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg bg-zinc-800 py-3 font-semibold text-white transition hover:bg-zinc-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!name}
              className="flex-1 rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Saving...": "Save"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default SettingsModal;