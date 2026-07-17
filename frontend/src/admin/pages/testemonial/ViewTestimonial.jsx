import {
  FaTimes,
  FaUser,
  FaBriefcase,
  FaCommentDots,
} from "react-icons/fa";

function ViewTestimonial({ testimonial, onClose }) {
  if (!testimonial) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-6">

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 z-20 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center px-8 py-6">
          <h2 className="text-3xl font-bold text-white">
            View Testimonial
          </h2>

          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 w-12 h-12 rounded-xl flex items-center justify-center"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-8 space-y-8">

          {/* Customer Image */}
          <div className="flex justify-center">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-52 h-52 rounded-full object-cover border-4 border-red-600 shadow-lg"
            />
          </div>

          {/* Details */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Name */}
            <div className="bg-black border border-zinc-800 rounded-2xl p-6">
              <p className="text-zinc-500 mb-3">
                Customer Name
              </p>

              <div className="flex items-center gap-3">
                <FaUser className="text-red-500 text-xl" />

                <h3 className="text-2xl font-bold text-white">
                  {testimonial.name}
                </h3>
              </div>
            </div>

            {/* Profession */}
            <div className="bg-black border border-zinc-800 rounded-2xl p-6">
              <p className="text-zinc-500 mb-3">
                Profession
              </p>

              <div className="flex items-center gap-3">
                <FaBriefcase className="text-red-500 text-xl" />

                <h3 className="text-2xl font-bold text-white">
                  {testimonial.profession}
                </h3>
              </div>
            </div>

          </div>

          {/* Description */}
          <div className="bg-black border border-zinc-800 rounded-3xl p-8">

            <div className="flex items-center gap-3 mb-6">
              <FaCommentDots className="text-red-500 text-2xl" />

              <h3 className="text-2xl font-bold">
                Testimonial
              </h3>
            </div>

            <p className="text-zinc-300 leading-9 text-lg whitespace-pre-wrap">
              {testimonial.description}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ViewTestimonial;