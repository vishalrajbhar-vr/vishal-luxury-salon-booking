import { useState } from "react";
import { FaCut, FaRupeeSign, FaClock, FaImage } from "react-icons/fa";
import { addedservice } from "../../../service/sevvise";
import { toast } from "react-toastify";

function AddService({ onSuccess }) {
  const [preview, setPreview] = useState(null);
const[loading, setloading]= useState(false);

   // ---------------- IMAGE HANDLER ----------------
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
//------------------------logic----------------------------------------
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("service_name", serviceName);
    formData.append("price", price);
    formData.append("duration", duration);
    formData.append("description", description);
    formData.append("image", image);

    setloading(true);

    try {
      const response = await addedservice(formData);

      console.log(response);

      if (response.data.success) {
        toast.success(response.data.message);

        setServiceName("");
        setPrice("");
        setDuration("");
        setDescription("");
        setImage(null);
        setPreview(null);

        setTimeout(() => {
          onSuccess && onSuccess();
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Add New Service</h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Service Name */}
          <div>
            <label className="block mb-2 text-zinc-300">Service Name</label>
            <div className="relative">
              <FaCut className="absolute left-4 top-5 text-red-500" />
              <input
                type="text"
                placeholder="Hair Cut"
                className="w-full bg-black border border-zinc-700 rounded-xl p-4 pl-12 outline-none focus:border-red-600"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 text-zinc-300">Price</label>
            <div className="relative">
              <FaRupeeSign className="absolute left-4 top-5 text-red-500" />
              <input
                type="number"
                placeholder="499"
                className="w-full bg-black border border-zinc-700 rounded-xl p-4 pl-12 outline-none focus:border-red-600"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block mb-2 text-zinc-300">Duration</label>
            <div className="relative">
              <FaClock className="absolute left-4 top-5 text-red-500" />
              <input
                type="text"
                placeholder="30 Minutes"
                className="w-full bg-black border border-zinc-700 rounded-xl p-4 pl-12 outline-none focus:border-red-600"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-zinc-300">Description</label>
            <textarea
              rows="5"
              placeholder="Write service details..."
              className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none focus:border-red-600 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Upload Image */}
          <div>
            <label className="block mb-3 text-zinc-300">Service Image</label>

            <label className="border-2 border-dashed border-zinc-700 rounded-2xl h-60 flex flex-col justify-center items-center cursor-pointer hover:border-red-600 transition">
              <FaImage className="text-5xl text-red-500 mb-4" />
              <span className="text-zinc-400">Upload Service Image</span>

              <input type="file" hidden onChange={handleImage} />
            </label>
          </div>

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-full h-72 object-cover rounded-2xl"
            />
          )}

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 px-10 py-4 rounded-xl font-semibold transition"
          >
            {loading ? "Uploading..." : "Add Service"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddService;