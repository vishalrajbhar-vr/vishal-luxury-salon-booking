import { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";
import { deleteGallery, getAllGallery } from "../../../service/gallery";
import { toast } from "react-toastify";

function AllGallery({ setgalleryEdit, setgalleryView, onAddGalleryClick, refresh }) {
  const [getGallery, setGetGallery] = useState([]);
  const fetchGallery = async () => {
    try {
      const response = await getAllGallery();
      setGetGallery(response.data.getdata);
    }
    catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGallery = async (id) => {
    try {
      const responce = await deleteGallery(id);
      toast.success(responce.data.message);

      // UI update
      setGetGallery((prevGallery) =>
        prevGallery.filter((item) => item._id !== id)
      );
    }
    catch (error) {
      console.error(error);

    }
  }


  useEffect(() => {
    fetchGallery();
  }, [refresh]);

  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Gallery Management
        </h1>

        <button
          onClick={onAddGalleryClick}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold">
          + Add Gallery
        </button>

      </div>

      {/* Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-red-600 text-white">
              <tr>
                <th className="p-5 text-left">Image</th>
                <th className="p-5 text-left">Title</th>
                <th className="p-5 text-left">Category</th>
                <th className="p-5 text-left">Description</th>
                <th className="p-5 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>

              {getGallery.map((gallery) => (
                <tr
                  key={gallery._id}
                  className="border-t border-zinc-800 hover:bg-zinc-800/50 transition"
                >

                  <td className="p-4">
                    <img
                      src={gallery.image}
                      alt={gallery.title}
                      className="w-24 h-20 rounded-xl object-cover"
                    />
                  </td>

                  <td className="p-4 font-semibold">
                    {gallery.image_title}
                  </td>

                  <td className="p-4">
                    <span className="bg-red-600/20 text-red-500 px-3 py-1 rounded-full text-sm">
                      {gallery.category}
                    </span>
                  </td>

                  <td className="p-4 text-zinc-400 max-w-sm">
                    <p className="line-clamp-2">
                      {gallery.description}
                    </p>
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      <button
                        className="bg-green-600 hover:bg-green-700 p-3 rounded-lg"
                        title="View"
                        onClick={() => setgalleryView(gallery)}
                      >
                        <FaEye />
                      </button>

                      <button
                        className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg"
                        title="Edit"
                        onClick={() => setgalleryEdit(gallery)}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="bg-red-600 hover:bg-red-700 p-3 rounded-lg"
                        title="Delete"
                        onClick={() => handleDeleteGallery(gallery._id)}
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AllGallery;