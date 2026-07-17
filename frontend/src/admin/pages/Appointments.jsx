import { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { deleteappointment, findallappointment, updateAppointmentStatus, } from "../../service/appointment";
import { toast } from "react-toastify";

function Appointments() {

  const [appointments, setAppointments] = useState([])
  const [status, setStatus] = useState("")

  //------------------------fetch all appointment---------------
  const featchappointments = async () => {
    try {
      const response = await findallappointment();
      console.log(response.data);
      setAppointments(response.data.founddata);
    }
    catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }

  //------------------------delete appointment---------------
  const handledelete = async (id) => {
    try {
      const response = await deleteappointment(id);
      toast.success(response.data.message);
      setAppointments((prevAppointments) =>
        prevAppointments.filter((item) => item._id !== id)
      );
    }
    catch (error) {
      toast.error("Error deleting appointment");
    }
  }

  //------------------------status appointment---------------
  const handleStatus = async (id, status) => {
    try {
      const response = await updateAppointmentStatus(id, status);
      toast.success(response.data.message);
      setAppointments((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, status }
            : item
        )
      );

    } catch (error) {
      console.log(error);
      toast.error("Status update failed");
    }
  };


  useEffect(() => {
    featchappointments();
    const interval = setInterval(() => {
      featchappointments();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white p-8">
      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Booking Appointments
        </h1>

        <span className="bg-red-600 px-5 py-2 rounded-lg font-semibold">
          Total : {appointments.length}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-700 shadow-lg">
        <table className="w-full text-sm">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Service</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-left">Notes</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((item, index) => (
              <tr
                key={index}
                className="border-b border-zinc-700 hover:bg-zinc-900 transition duration-200"
              >
                <td className="px-4 py-4">{item.name}</td>
                <td className="px-4 py-4">{item.phone}</td>
                <td className="px-4 py-4">{item.email}</td>
                <td className="px-4 py-4">{item.service}</td>
                <td className="px-4 py-4">{item.date}</td>
                <td className="px-4 py-4">{item.time}</td>
                <td className="px-4 py-4">{item.notes}</td>

                {/* Status Dropdown */}
                <td className="px-4 py-4 text-center">
                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleStatus(item._id, e.target.value)
                    }
                    className={`px-3 py-2 rounded-lg text-white font-medium outline-none cursor-pointer
                         ${item.status === "Pending"
                        ? "bg-yellow-500"
                        : item.status === "Confirm"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }
    `}
                  >
                    <option value="Pending" className="text-black">
                      Pending
                    </option>

                    <option value="Confirm" className="text-black">
                      Confirm
                    </option>

                    <option value="Cancel" className="text-black">
                      Cancel
                    </option>
                  </select>
                </td>

                {/* Action Buttons */}
                <td className="px-4 py-4">
                  <div className="flex justify-center items-center gap-3">
                    {/* <button
                      onClick={() => handleView(item)}
                      className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition"
                    >
                      <FaEye size={16} />
                    </button> */}

                    <button
                      onClick={() => handleDelete(item)}
                      className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition"
                      onClick={() => handledelete(item._id)}
                    >
                      <FaTrash size={16} />
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

export default Appointments;