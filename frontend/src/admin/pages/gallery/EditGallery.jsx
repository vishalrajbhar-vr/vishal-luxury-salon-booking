import React, { useEffect, useState } from 'react'
import { FaCut, FaImage, FaTag } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { UpdateGallery } from '../../../service/gallery';

function EditGallery({ selectedGallery, onSuccess, onClose }) {
    const [preview, setPreview] = useState(null);
    // ---------------- IMAGE CHANGE ----------------
    const handleImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const [imageTitle, setImageTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    // ---------------- LOAD EXISTING DATA ----------------
    useEffect(() => {
        if (selectedGallery) {
            setImageTitle(selectedGallery.image_title || "");
            setCategory(selectedGallery.category || "");
            setDescription(selectedGallery.description || "");
            setPreview(selectedGallery.image || null);
        }
    }, [selectedGallery]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!imageTitle || !category || !description) {
            toast.error("All fields are required");
            return;
        }

        const formData = new FormData();
        formData.append("image_title", imageTitle);
        if (image) {
            formData.append("image", image);
        }
        formData.append("category", category);
        formData.append("description", description);

        try {
            setLoading(true);
            const response = await UpdateGallery(selectedGallery._id, formData);
            toast.success(response.data.message);
            setTimeout(() => {
                onSuccess();
            }, 1000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-[600px] max-h-[90vh] overflow-y-auto">

                <h1 className="text-3xl font-bold mb-6 text-white">
                    Edit Gallery
                </h1>

                <form onSubmit={handleUpdate} className="space-y-5">

                    {/* Image title */}
                    <div>
                        <label className="text-zinc-300">Image Title</label>
                        <div className="relative mt-2">
                            <FaCut className="absolute left-4 top-4 text-red-500" />
                            <input
                                type="text"
                                className="w-full bg-black border border-zinc-700 rounded-xl p-3 pl-12"
                                value={imageTitle}
                                onChange={(e) => setImageTitle(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* category */}
                    <div>
                        <label className="text-zinc-300">Category</label>
                        <div className="relative mt-2">
                            <FaTag className="absolute left-4 top-4 text-red-500" />
                            <input
                                type="text"
                                className="w-full bg-black border border-zinc-700 rounded-xl p-3 pl-12"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
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
                            {loading ? "Updating..." : "Update"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditGallery