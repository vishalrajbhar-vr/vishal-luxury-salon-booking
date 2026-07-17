import { FaTimes, FaHeading, FaFileAlt, FaImage } from "react-icons/fa";

function Viewpremumgallery({ premumgallery, onClose }) {
  if (!premumgallery) return null;
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center p-6">
          <h2 className="text-3xl font-bold">
            Premium Gallery Details
          </h2>

          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 w-12 h-12 rounded-xl flex justify-center items-center"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-8 space-y-8">

          {/* Image */}
          <div className="flex justify-center">
            <img
              src={premumgallery?.image}
              alt="Premium Gallery"
              className="w-72 h-72 rounded-2xl object-cover border-4 border-red-600"
            />
          </div>

          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-red-500 font-semibold mb-2">
              <FaHeading />
              Gallery Name
            </label>

            <div className="bg-black border border-zinc-700 rounded-xl p-4">
              {premumgallery?.name}
            </div>
          </div>

          {/* Paragraph */}
          <div>
            <label className="flex items-center gap-2 text-red-500 font-semibold mb-2">
              <FaFileAlt />
              Paragraph
            </label>

            <div className="bg-black border border-zinc-700 rounded-xl p-4 leading-7">
              {premumgallery?.paragraph}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="flex items-center gap-2 text-red-500 font-semibold mb-2">
              <FaImage />
              Image URL
            </label>

            <div className="bg-black border border-zinc-700 rounded-xl p-4 break-all">
              {premumgallery?.image}
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-xl"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Viewpremumgallery;