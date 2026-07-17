import { useEffect, useState } from "react";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { deletepremgly, getpremgly } from "../../../service/premumGallery.js";
import { toast } from "react-toastify";

function AllPremumGallery({ setPremumgalleryEdit, setPremumgalleryView, onAddPremumGalleryClick, refresh }) {

  const [premumGallery, setPremumGallery] = useState([])

  const getAllPrgly = async () => {
    try {
      const response = await getpremgly()
      console.log(response.data);
      setPremumGallery(response.data.finddata);
    } catch (error) {
      console.log(error);
    }
  }

  const handledeletegallery = async (id) => {
    try {
      const response = await deletepremgly(id);
      toast.success(response.data.message);

      setPremumGallery((prevgallery) =>
        prevgallery.filter((item) => item._id !== id)
      );

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }

  }

  useEffect(() => {
    getAllPrgly();
  }, [refresh])

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">
          All Premium Gallery
        </h2>

        <button
          onClick={onAddPremumGalleryClick}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl"
        >
          <FaPlus />
          Add Premium Gallery
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-800">

        <table className="w-full text-white">

          <thead className="bg-red-600">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Paragraph</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {premumGallery.map((gallery) => (
              <tr key={gallery._id}
                className="border-t border-zinc-800 hover:bg-zinc-900">

                <td className="p-4">
                  <img
                    src={gallery.image}
                    alt="Premium"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </td>

                <td className="p-4">
                  {gallery.name}
                </td>

                <td className="p-4">
                  {gallery.paragraph}
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-3">

                    <button className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700"
                    onClick={() => setPremumgalleryView(gallery)}
                    >
                      <FaEye />
                    </button>

                    <button className="bg-yellow-500 p-2 rounded-lg hover:bg-yellow-600"
                    onClick={()=> setPremumgalleryEdit(gallery)}
                    >
                      <FaEdit />
                    </button>

                    <button className="bg-red-600 p-2 rounded-lg hover:bg-red-700"
                    onClick={()=>handledeletegallery(gallery._id)}
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
  );
}

export default AllPremumGallery;