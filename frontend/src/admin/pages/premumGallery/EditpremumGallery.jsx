import React, { useEffect, useState } from "react";
import {
  FaHeading,
  FaFileAlt,
  FaImage,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { updatepremgly } from "../../../service/premumGallery";

function EditpremumGallery({
  selectedPremumGallery,
  onSuccess,
  onClose,
}) {
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---------------- IMAGE CHANGE ----------------
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ---------------- LOAD EXISTING DATA ----------------
  useEffect(() => {
    if (selectedPremumGallery) {
      setName(selectedPremumGallery.name || "");
      setParagraph(selectedPremumGallery.paragraph || "");
      setPreview(selectedPremumGallery.image || null);
      setImage(null);
    }
  }, [selectedPremumGallery]);

  // ---------------- UPDATE ----------------
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !paragraph) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("paragraph", paragraph);

    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);

      const response = await updatepremgly(
        selectedPremumGallery._id,
        formData
      );

      toast.success(response.data.message);

      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-[600px] max-h-[90vh] overflow-y-auto">

        <h1 className="text-3xl font-bold mb-6 text-white">
          Edit Premium Gallery
        </h1>

        <form onSubmit={handleUpdate} className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-zinc-300">
              Gallery Name
            </label>

            <div className="relative mt-2">
              <FaHeading className="absolute left-4 top-4 text-red-500" />

              <input
                type="text"
                className="w-full bg-black border border-zinc-700 rounded-xl p-3 pl-12 text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Gallery Name"
              />
            </div>
          </div>

          {/* Paragraph */}
          <div>
            <label className="text-zinc-300">
              Paragraph
            </label>

            <div className="relative mt-2">
              <FaFileAlt className="absolute left-4 top-4 text-red-500" />

              <textarea
                rows="4"
                className="w-full bg-black border border-zinc-700 rounded-xl p-3 pl-12 text-white resize-none"
                value={paragraph}
                onChange={(e) => setParagraph(e.target.value)}
                placeholder="Enter Paragraph"
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="text-zinc-300">
              Change Image
            </label>

            <label className="border-2 border-dashed border-zinc-700 rounded-2xl h-40 flex flex-col justify-center items-center cursor-pointer mt-2 hover:border-red-500 transition">

              <FaImage className="text-4xl text-red-500 mb-2" />

              <span className="text-zinc-400">
                Upload New Image
              </span>

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImage}
              />
            </label>
          </div>

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-60 object-cover rounded-xl"
            />
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-xl text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-xl font-semibold text-black"
            >
              {loading ? "Updating..." : "Update"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default EditpremumGallery;