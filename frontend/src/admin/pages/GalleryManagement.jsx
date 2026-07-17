import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

function GalleryManagement() {
  return (
    <div className="flex bg-black text-white">

      

      <div className="flex-1">


        <div className="p-8">

          <button className="bg-red-600 px-5 py-3 rounded-xl mb-8">
            Upload Image
          </button>

          <div className="grid md:grid-cols-4 gap-6">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-zinc-900 rounded-2xl overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1200"
                  alt=""
                  className="w-full h-56 object-cover"
                />

                <button className="w-full bg-red-600 py-3">
                  Delete
                </button>
              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default GalleryManagement;