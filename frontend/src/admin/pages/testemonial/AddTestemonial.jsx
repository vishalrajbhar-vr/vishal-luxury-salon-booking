import { useState } from "react";
import {
  FaUser,
  FaBriefcase,
  FaImage,
  FaCommentDots,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { addtestemonial } from "../../../service/testemonial.js";

function AddTestemonial({ onSuccess, onAlltestimonialClick }) {
  const [preview, setPreview] = useState(null);

  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Image Preview
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const formdata = new FormData();
    formdata.append("name", name)
    formdata.append("profession", profession)
    formdata.append("description", description)
    formdata.append("image", image)

    setLoading(true);

    try {
      const response = await addtestemonial(formdata);
      console.log(response)
      toast.success(response.data.message);
      if (response.data.success) {
        setName("");
        setProfession("");
        setDescription("");
        setImage("");

        console.log("onSuccess Call");
        setTimeout(() => {
          onSuccess && onSuccess();
        }, 1000);
      }

    }
    catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message)
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Add New Testimonial
      </h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-4xl">

        <form className="space-y-6" onSubmit={handleSubmit} >

          {/* Name */}
          <div>
            <label className="block mb-2 text-zinc-300">
              Customer Name
            </label>

            <div className="relative">
              <FaUser className="absolute left-4 top-5 text-red-500" />

              <input
                type="text"
                placeholder="Rahul Sharma"
                className="w-full bg-black border border-zinc-700 rounded-xl p-4 pl-12 outline-none focus:border-red-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Profession */}

          <div>
            <label className="block mb-2 text-zinc-300">
              Profession
            </label>

            <div className="relative">
              <FaBriefcase className="absolute left-4 top-5 text-red-500" />

              <input
                type="text"
                placeholder="Software Engineer"
                className="w-full bg-black border border-zinc-700 rounded-xl p-4 pl-12 outline-none focus:border-red-600"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
            </div>
          </div>

          {/* Description */}

          <div>
            <label className="block mb-2 text-zinc-300">
              Description
            </label>

            <div className="relative">
              <FaCommentDots className="absolute left-4 top-5 text-red-500" />

              <textarea
                rows="5"
                placeholder="Write testimonial..."
                className="w-full bg-black border border-zinc-700 rounded-xl p-4 pl-12 outline-none resize-none focus:border-red-600"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Upload Image */}

          <div>
            <label className="block mb-3 text-zinc-300">
              Customer Image
            </label>

            <label className="border-2 border-dashed border-zinc-700 rounded-2xl h-60 flex flex-col justify-center items-center cursor-pointer hover:border-red-600 transition">

              <FaImage className="text-5xl text-red-500 mb-4" />

              <span className="text-zinc-400">
                Upload Customer Image
              </span>

              <input
                type="file"
                hidden
                onChange={handleImage}
              />

            </label>
          </div>

          {/* Preview */}

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-40 h-40 rounded-full object-cover border-4 border-red-600 mx-auto"
            />
          )}

          {/* Button */}
          <div className="flex gap-5">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 px-10 py-4 rounded-xl font-semibold transition"
            >
              {loading ? "Uploading..." : "Add testimonial"}
            </button>

            <button
              type="reset"
              onClick={onAlltestimonialClick}
              className="bg-zinc-700 hover:bg-zinc-600 px-8 py-3 rounded-xl flex items-center gap-2"
            >
              <FaTimes />
              Clear
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default AddTestemonial;