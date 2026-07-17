import { useState } from "react";
import { FaImage, FaUpload } from "react-icons/fa";
import { addGallery } from "../../../service/gallery";
import { toast } from "react-toastify";


function AddGallery({ onSuccess }) {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];

    console.log(file)
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ---------------------logic------------------------
  const [imageTitle, setImageTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image_title", imageTitle);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", image);

     setLoading(true);

    try {
      const response = await addGallery(formData);
      console.log(response);

      if (response.data.success) {
        toast.success(response.data.message);

        setImageTitle("");
        setCategory("");
        setDescription("");
        setImage(null);
        setPreview(null);

          setTimeout(() => {
          onSuccess && onSuccess();
        }, 1000);

      }
      else {
        toast.error(response.data.message);
      }
    }
    catch (error) {
      console.log(error);
      toast.error("Error adding the gallery image");

    }
  }
  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Add Gallery Image
      </h1>

      <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 max-w-3xl">


        

        <form className="space-y-6" onSubmit={handleSubmit}>

          <div>
            <label className="block mb-2 text-zinc-300">
              Image Title
            </label>

            <input
              type="text"
              placeholder="Enter image title"
              value={imageTitle}
              onChange={(e) => setImageTitle(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none focus:border-red-600"
            />
          </div>

          <div>
            <label className="block mb-2 text-zinc-300">
              Category
            </label>

            <select className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none focus:border-red-600"
              value={category}
              onChange={(e) => setCategory(e.target.value)}>
              <option>Hair Cut</option>
              <option>Beard Style</option>
              <option>Hair Color</option>
              <option>Kids Style</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-zinc-300">
              Description
            </label>

            <input
              type="text"
              placeholder="Enter image description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none focus:border-red-600"
            />
          </div>

          <div>

            <label className="block mb-3 text-zinc-300">
              Upload Image
            </label>

            <label className="border-2 border-dashed border-zinc-700 rounded-2xl h-64 flex flex-col justify-center items-center cursor-pointer hover:border-red-600 transition">

              <FaUpload className="text-5xl text-red-500 mb-4" />

              <span className="text-zinc-400">
                Click To Upload Image
              </span>

              <input
                type="file"
                hidden
                onChange={handleImage}
              />

            </label>

          </div>

          {preview && (
            <div>

              <h3 className="mb-3 font-semibold">
                Preview
              </h3>

              <img
                src={preview}
                alt="preview"
                className="w-full h-72 object-cover rounded-2xl"
              />

            </div>
          )}

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold transition"
          >
             {loading ? "Uploading..." : "Add Image"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddGallery;
