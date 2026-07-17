import { useState, useEffect } from "react";
import { FaCut, FaRupeeSign, FaClock, FaImage } from "react-icons/fa";
import { toast } from "react-toastify";
import { UpdateService } from "../../../service/sevvise";

function EditService({ selectedService, onSuccess, onClose }) {
  const [preview, setPreview] = useState(null);
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // ---------------- LOAD EXISTING DATA ----------------
  useEffect(() => {
    if (selectedService) {
      setServiceName(selectedService.service_name || "");
      setPrice(selectedService.price || "");
      setDuration(selectedService.duration || "");
      setDescription(selectedService.description || "");
      setPreview(selectedService.image || null);
    }
  }, [selectedService]);

  // ---------------- IMAGE CHANGE ----------------
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ---------------- UPDATE SUBMIT ----------------
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!serviceName || !price || !duration || !description) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("service_name", serviceName);
    formData.append("price", price);
    formData.append("duration", duration);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }


    try {
      const response = await UpdateService(selectedService._id, formData);

      if (response.data.success) {
        toast.success("Service updated successfully");

        setTimeout(() => {
          onSuccess && onSuccess();
        }, 1500);

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-[600px] max-h-[90vh] overflow-y-auto">

        <h1 className="text-3xl font-bold mb-6 text-white">
          Edit Service
        </h1>

        <form onSubmit={handleUpdate} className="space-y-5">

          {/* Service Name */}
          <div>
            <label className="text-zinc-300">Service Name</label>
            <div className="relative mt-2">
              <FaCut className="absolute left-4 top-4 text-red-500" />
              <input
                type="text"
                className="w-full bg-black border border-zinc-700 rounded-xl p-3 pl-12"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="text-zinc-300">Price</label>
            <div className="relative mt-2">
              <FaRupeeSign className="absolute left-4 top-4 text-red-500" />
              <input
                type="number"
                className="w-full bg-black border border-zinc-700 rounded-xl p-3 pl-12"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="text-zinc-300">Duration</label>
            <div className="relative mt-2">
              <FaClock className="absolute left-4 top-4 text-red-500" />
              <input
                type="text"
                className="w-full bg-black border border-zinc-700 rounded-xl p-3 pl-12"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-zinc-300">Description</label>
            <textarea
              rows="4"
              className="w-full bg-black border border-zinc-700 rounded-xl p-3 mt-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Image */}
          <div>
            <label className="text-zinc-300">Change Image</label>

            <label className="border-2 border-dashed border-zinc-700 rounded-2xl h-40 flex flex-col justify-center items-center cursor-pointer mt-2">
              <FaImage className="text-4xl text-red-500 mb-2" />
              <span className="text-zinc-400">Upload New Image</span>
              <input type="file" hidden onChange={handleImage} />
            </label>
          </div>

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              className="w-full h-60 object-cover rounded-xl"
            />
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 px-6 py-3 rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-xl font-semibold"
            >
              Update Service
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditService;