import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import Table from "../components/Table";

function Services() {
  return (
    <div className="flex bg-black text-white">
      <div className="flex-1">
        <div className="p-8">
          <button className="bg-red-600 px-5 py-3 rounded-xl mb-5">
            Add Service
          </button>
          <Table
            headers={[
              "Service",
              "Price",
              "Action",
            ]}
            data={[
              [
                "Hair Cut",
                "₹300",
                "Edit/Delete",
              ],
              [
                "Facial",
                "₹800",
                "Edit/Delete",
              ],
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default Services;