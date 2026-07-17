import { useState } from "react";
import {
  FaImage,
  FaHeading,
  FaFileAlt,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { addpremgly } from "../../../service/premumGallery.js";

function AddPremumGallery({ onAllGalleryClick, onSuccess }) {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false)

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [paragraph, setParagraph] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("please select an Image");
      return;
    }

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("image", image);
    formdata.append("paragraph", paragraph);

    setLoading(true);

    try {
      const response = await addpremgly(formdata);
      console.log(response)

      if (response.data.success) {
        toast.success(response.data.message)

        setName("");
        setImage("");
        setParagraph("");
        setPreview(null);

        setTimeout(() => {
          onSuccess && onSuccess();
        }, 1000);
      }
      else {
        toast.error(response.data.message)
      }

    }
    catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }


  return (
    <div className="bg-zinc-950 rounded-3xl border border-zinc-800 p-8">

      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">
          Add Premium Gallery
        </h2>
      </div>

      <form className="space-y-8" onSubmit={handlesubmit}>

        {/* Name */}
        <div>
          <label className="block mb-3 font-medium">
            Gallery Name
          </label>

          <div className="relative">
            <FaHeading className="absolute left-4 top-5 text-red-500" />

            <input
              type="text"
              placeholder="Enter gallery name"
              className="w-full bg-black border border-zinc-700 rounded-xl p-4 pl-12 outline-none focus:border-red-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* Paragraph */}
        <div>
          <label className="block mb-3 font-medium">
            Paragraph
          </label>

          <div className="relative">
            <FaFileAlt className="absolute left-4 top-5 text-red-500" />

            <textarea
              rows="6"
              placeholder="Write paragraph..."
              className="w-full bg-black border border-zinc-700 rounded-xl p-4 pl-12 resize-none outline-none focus:border-red-600"
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
            />
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block mb-3 font-medium">
            Gallery Image
          </label>

          <label className="border-2 border-dashed border-zinc-700 rounded-2xl h-60 flex flex-col justify-center items-center cursor-pointer hover:border-red-600 transition">

            <FaImage className="text-6xl text-red-500 mb-4" />

            <span className="text-zinc-400">
              Click to Upload Image
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
          <div className="flex justify-center">
            <img
              src={preview}
              alt="Preview"
              className="w-64 h-64 rounded-2xl object-cover border-4 border-red-600"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-5">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-xl font-semibold"
          >
            {loading ? "Adding..." : "Add Premium Gallery"}
          </button>

          <button
            type="reset"
            onClick={onAllGalleryClick}
            className="bg-zinc-700 hover:bg-zinc-600 px-8 py-3 rounded-xl flex items-center gap-2"
          >
            <FaTimes />
            Clear
          </button>


        </div>

      </form>

    </div>
  );
}

export default AddPremumGallery;