import { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";
import { deleteService, getAllService } from "../../../service/sevvise";
import { toast } from "react-toastify";

function AllService({ setServiceEdit, setServiceView, onAddServiceClick, refresh, }) {

  const [getServices, setGetServices] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await getAllService();
      setGetServices(response.data.getdata);

      console.log(response.data.getdata[0]);
    }
    catch (error) {
      console.error(error);
    }
  };


  const handleDeleteService = async (id) => {

    try {

      const res = await deleteService(id);

      toast.success(res.data.message);

        // UI update
        setGetServices((prevServices) =>
          prevServices.filter((item) => item._id !== id)
        );

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [refresh]);

  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Manage Services
        </h1>

        <button
          onClick={onAddServiceClick}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold"
        >
          + Add Service
        </button>

      </div>

      {/* Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-red-600 text-white">
              <tr>
                <th className="p-5 text-left">Image</th>
                <th className="p-5 text-left">Service</th>
                <th className="p-5 text-left">Price</th>
                <th className="p-5 text-left">Duration</th>
                <th className="p-5 text-left">Description</th>
                <th className="p-5 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>

              {getServices.map((service) => (
                <tr
                  key={service.id}
                  className="border-t border-zinc-800 hover:bg-zinc-800/40 transition"
                >

                  {/* Image */}
                  <td className="p-4">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                  </td>

                  {/* Name */}
                  <td className="p-4 font-semibold">
                    {service.service_name}
                  </td>



                  {/* Price */}
                  <td className="p-4 text-green-500 font-bold">
                    ₹ {service.price}
                  </td>

                  {/* Duration */}
                  <td className="p-4 font-semibold">
                    {service.duration}
                  </td>



                  {/* Description */}
                  <td className="p-4 max-w-xs font-semibold">
                    <p className="line-clamp-2">
                      {service.description}
                    </p>
                  </td>



                  {/* Actions */}
                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      <button
                        className="bg-green-600 hover:bg-green-700 p-3 rounded-lg"
                        title="View"
                        onClick={() => setServiceView(service)}
                      >
                        <FaEye />
                      </button>

                      <button
                        className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg"
                        title="Edit"
                        onClick={() => setServiceEdit(service)}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="bg-red-600 hover:bg-red-700 p-3 rounded-lg"
                        title="Delete"
                        onClick={() => handleDeleteService(service._id)}
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

export default AllService;