import { FaEye, FaTrash } from "react-icons/fa";
import { deleteMessage, getAllMessage } from "../../service/contact";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AllContact() {
  const [contacts, setContacts] = useState([]);
  const getAllContacts = async () => {
    try {
      const response = await getAllMessage();
      console.log(response.data);
      setContacts(response.data.founddata);
    }
    catch (error) {
      console.error("Error fetching contact messages:", error);
    }
  }

  const handledelete = async (id) => {
    try {
      const responce = await deleteMessage(id);
      toast.success(responce.data.message);

      // UI update
      setContacts((prevContacts) =>
        prevContacts.filter((item) => item._id !== id)
      );
    }
    catch (error) {
      toast.error("responce.data.message")
    }
  }

  useEffect(() => {
    getAllContacts();

    const interval = setInterval(() => {
      getAllContacts();
    }, 5000); // har 5 second me refresh

    return () => clearInterval(interval);
  }, []);
  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Contact Messages
        </h1>

        <span className="bg-red-600 px-5 py-2 rounded-xl font-semibold">
          Total : {contacts.length}
        </span>

      </div>

      {/* Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-red-600">

              <tr>
                <th className="p-5 text-left">Name</th>
                <th className="p-5 text-left">Email</th>
                <th className="p-5 text-left">Phone</th>
                <th className="p-5 text-left">Message</th>
                <th className="p-5 text-center">Action</th>
              </tr>

            </thead>

            <tbody>

              {contacts.map((item) => (

                <tr
                  key={item.id}
                  className="border-t border-zinc-800 hover:bg-zinc-800/50 transition"
                >

                  <td className="p-5 font-semibold">
                    {item.name}
                  </td>

                  <td className="p-5">
                    {item.email}
                  </td>

                  <td className="p-5">
                    {item.phone}
                  </td>


                  <td className="p-5 max-w-sm text-zinc-400">
                    <p className="line-clamp-2">
                      {item.message}
                    </p>
                  </td>

                  <td className="p-5">

                    <div className="flex justify-center gap-3">

                      {/* <button
                        className="bg-green-600 hover:bg-green-700 p-3 rounded-lg transition"
                        title="View"
                      >
                        <FaEye />
                      </button> */}

                      <button
                        className="bg-red-600 hover:bg-red-700 p-3 rounded-lg transition"
                        title="Delete"
                        onClick={()=>handledelete(item._id)}
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

export default AllContact;