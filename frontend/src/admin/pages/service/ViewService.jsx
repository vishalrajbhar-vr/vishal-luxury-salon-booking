import {
  FaTimes,
  FaCut,
  FaClock,
  FaRupeeSign,
  FaFileAlt,
} from "react-icons/fa";

function ViewService({ service, onClose }) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-6">

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 z-20 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center px-8 py-6">
          <h2 className="text-3xl font-bold text-white">
            View Service
          </h2>

          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 w-12 h-12 rounded-xl flex items-center justify-center"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-8 space-y-8">

          {/* Image */}
          <img
            src={service.image}
            alt={service.service_name}
            className="w-full h-[350px] object-cover rounded-3xl border border-zinc-800"
          />

          {/* Details */}
          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-black border border-zinc-800 rounded-2xl p-6">
              <p className="text-zinc-500 mb-3">
                Service Name
              </p>

              <div className="flex items-center gap-3">
                <FaCut className="text-red-500 text-xl" />

                <h3 className="text-2xl font-bold">
                  {service.service_name}
                </h3>
              </div>
            </div>

            <div className="bg-black border border-zinc-800 rounded-2xl p-6">
              <p className="text-zinc-500 mb-3">
                Price
              </p>

              <div className="flex items-center gap-2 text-red-500 text-2xl font-bold">
                <FaRupeeSign />
                {service.price}
              </div>
            </div>

            <div className="bg-black border border-zinc-800 rounded-2xl p-6">
              <p className="text-zinc-500 mb-3">
                Duration
              </p>

              <div className="flex items-center gap-2 text-xl">
                <FaClock className="text-red-500" />
                {service.duration}
              </div>
            </div>

          </div>

          {/* Description */}
          <div className="bg-black border border-zinc-800 rounded-3xl p-8">

            <div className="flex items-center gap-3 mb-6">
              <FaFileAlt className="text-red-500 text-2xl" />

              <h3 className="text-2xl font-bold">
                Description
              </h3>
            </div>

            <p className="text-zinc-300 leading-9 text-lg whitespace-pre-wrap">
              {service.description}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ViewService;