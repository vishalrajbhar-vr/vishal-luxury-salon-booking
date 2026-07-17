import {
  FaUser,
  FaPhoneAlt,
  FaCalendarAlt,
  FaClock,
  FaCut,
} from "react-icons/fa";

function BookingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4">
      <div className="relative w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        <div className="flex items-start justify-between border-b border-zinc-800 px-4 py-4 sm:px-6 sm:py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[4px] text-red-500">Quick Booking</p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Book Your Appointment</h2>
          </div>
          <button
            onClick={onClose}
            className="text-3xl text-zinc-400 transition hover:text-white"
            aria-label="Close booking form"
          >
            &times;
          </button>
        </div>

        <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-3">
          <div className="space-y-4 sm:space-y-5">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
              <FaCut className="mb-4 text-3xl text-red-600" />
              <h3 className="text-xl font-bold text-white sm:text-2xl">Premium Services</h3>
              <p className="mt-3 text-zinc-400">Haircut, Beard Styling, Facial, Hair Spa and Grooming.</p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
              <FaCalendarAlt className="mb-4 text-3xl text-red-600" />
              <h3 className="text-xl font-bold text-white sm:text-2xl">Easy Scheduling</h3>
              <p className="mt-3 text-zinc-400">Choose your preferred date and time instantly.</p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
              <FaClock className="mb-4 text-3xl text-red-600" />
              <h3 className="text-xl font-bold text-white sm:text-2xl">Open Daily</h3>
              <p className="mt-3 text-zinc-400">Mon - Sun | 9:00 AM - 9:00 PM</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                onClose();
              }}
              className="space-y-4 sm:space-y-5"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="relative">
                  <FaUser className="absolute left-4 top-5 text-red-500" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full rounded-xl border border-zinc-700 bg-black p-4 pl-12 text-white outline-none focus:border-red-600"
                    required
                  />
                </div>

                <div className="relative">
                  <FaPhoneAlt className="absolute left-4 top-5 text-red-500" />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full rounded-xl border border-zinc-700 bg-black p-4 pl-12 text-white outline-none focus:border-red-600"
                    required
                  />
                </div>
              </div>

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-red-600"
                required
              />

              <select
                className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-red-600"
                required
              >
                <option value="">Select Service</option>
                <option>Hair Cut</option>
                <option>Hair Styling</option>
                <option>Beard Styling</option>
                <option>Facial</option>
                <option>Hair Spa</option>
              </select>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="date"
                  className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-red-600"
                  required
                />
                <input
                  type="time"
                  className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-red-600"
                  required
                />
              </div>

              <textarea
                rows="4"
                placeholder="Additional Notes"
                className="w-full resize-none rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-red-600"
              ></textarea>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-zinc-700 px-6 py-3 text-white transition hover:border-red-600 hover:text-red-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-red-600 px-6 py-3 text-white transition hover:bg-red-700"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
