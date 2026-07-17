import { useEffect, useState } from "react";
import {
  FaTimes,
  FaUser,
  FaBriefcase,
  FaCommentDots,
  FaImage,
} from "react-icons/fa";
import { updateestemonial } from "../../../service/testemonial.js";
import { toast } from "react-toastify";

function EditTestimonial({ selectedTestimonial, onClose, onSuccess, }) {
  const [preview, setPreview] = useState(null);
const[loading, setLoading]= useState(false);

  // ---------------- IMAGE CHANGE ----------------
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (selectedTestimonial) {
      setName(selectedTestimonial.name);
      setProfession(selectedTestimonial.profession);
      setDescription(selectedTestimonial.description);
      setPreview(selectedTestimonial.image);
    }
  }, [selectedTestimonial]);

  const handleUpdate = async (e) => {
    e.preventDefault();


    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("profession", profession);
    formdata.append("description", description);
    if (image) {
      formdata.append("image", image);
    }

    setLoading(true);

    try {
      const response = await updateestemonial(selectedTestimonial._id, formdata);

      if (response.data.success) {
        toast.success("Testimonial updated successfully");


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
  }



  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-6">

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center p-6">
          <h2 className="text-3xl font-bold">
            Edit Testimonial
          </h2>

          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 w-12 h-12 rounded-xl flex justify-center items-center"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-8">

          <form
            onSubmit={handleUpdate}
            className="space-y-6"
          >

            {/* Name */}
            <div>
              <label className="block mb-2">
                Customer Name
              </label>

              <div className="relative">
                <FaUser className="absolute left-4 top-5 text-red-500" />

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black border border-zinc-700 rounded-xl p-4 pl-12 outline-none focus:border-red-600"
                />
              </div>
            </div>

            {/* Profession */}
            <div>
              <label className="block mb-2">
                Profession
              </label>

              <div className="relative">
                <FaBriefcase className="absolute left-4 top-5 text-red-500" />

                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full bg-black border border-zinc-700 rounded-xl p-4 pl-12 outline-none focus:border-red-600"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2">
                Description
              </label>

              <div className="relative">
                <FaCommentDots className="absolute left-4 top-5 text-red-500" />

                <textarea
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-black border border-zinc-700 rounded-xl p-4 pl-12 resize-none outline-none focus:border-red-600"
                />
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="block mb-3">
                Customer Image
              </label>

              <label className="border-2 border-dashed border-zinc-700 rounded-2xl h-60 flex flex-col justify-center items-center cursor-pointer hover:border-red-600">

                <FaImage className="text-5xl text-red-500 mb-4" />

                <span className="text-zinc-400">
                  Change Image
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
                alt="Preview"
                className="w-40 h-40 rounded-full object-cover border-4 border-red-600 mx-auto"
              />
            )}

            {/* Buttons */}
            <div className="flex gap-4">

              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-xl"
              >
                {loading ? "Updating..." : "Update Testimonial"}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="bg-zinc-700 hover:bg-zinc-600 px-8 py-3 rounded-xl"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditTestimonial;