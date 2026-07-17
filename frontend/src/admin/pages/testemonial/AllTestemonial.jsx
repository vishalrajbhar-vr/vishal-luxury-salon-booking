import { useEffect, useState } from "react";
import {
    FaPlus,
    FaSearch,
    FaEye,
    FaEdit,
    FaTrash,
} from "react-icons/fa";
import { deletetestemonial, gettestemonial } from "../../../service/testemonial.js";
import { toast } from "react-toastify";

function AllTestemonial({ setTestimonialEdit, setTestimonialView, onAddTestemonialClick, refresh }) {
    const [testemonial, setTestemonial] = useState([])

    const getAlltestemonial = async () => {
        try {
            const response = await gettestemonial();

            console.log(response.data);

            setTestemonial(response.data.getdata);
        } catch (error) {
            console.error(error);
        }
    };

    const handledelete = async (id) => {
        try {
            const response = await deletetestemonial(id)
            toast.success(response.data.message);

            // UI update
            setTestemonial((prevTestemonial) =>
                prevTestemonial.filter((item) => item._id !== id))
        }
        catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Failed to delete testimonial");
        }
    }

    useEffect(() => {
        getAlltestemonial();
    }, [refresh]);

    return (
        <div>

            {/* Header */}

            <div className="flex items-center justify-between mb-8">

                <h1 className="text-4xl font-bold">
                    All Testimonial
                </h1>

                <button
                    onClick={onAddTestemonialClick}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl transition"
                >
                    <FaPlus />
                    Add Testimonial
                </button>

            </div>


            {/* Table */}

            <div className="overflow-x-auto rounded-2xl border border-zinc-800">

                <table className="w-full">

                    <thead className="bg-zinc-900">

                        <tr className="text-left">

                            <th className="p-4">Image</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Profession</th>
                            <th className="p-4">Description</th>
                            <th className="p-4 text-center">Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {testemonial.map((item) => (

                            <tr
                                key={item._id}
                                className="border-t border-zinc-800 hover:bg-zinc-900 transition"
                            >

                                {/* Image */}

                                <td className="p-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-red-600"
                                    />
                                </td>

                                {/* Name */}

                                <td className="p-4">
                                    {item.name}
                                </td>

                                {/* Profession */}

                                <td className="p-4">
                                    {item.profession}
                                </td>

                                {/* Description */}

                                <td className="p-4 max-w-sm">
                                    <p className="line-clamp-2">
                                        {item.description}
                                    </p>
                                </td>

                                {/* Action */}

                                <td className="p-4">

                                    <div className="flex items-center justify-center gap-3">

                                        <button
                                            className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg transition"
                                            onClick={() => setTestimonialView(item)}
                                        >
                                            <FaEye />
                                        </button>

                                        <button
                                            className="bg-green-600 hover:bg-green-700 p-3 rounded-lg transition"
                                            onClick={() => setTestimonialEdit(item)}
                                        >
                                            <FaEdit />
                                        </button>

                                        <button
                                            className="bg-red-600 hover:bg-red-700 p-3 rounded-lg transition"
                                            onClick={() => handledelete(item._id)}
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

export default AllTestemonial;