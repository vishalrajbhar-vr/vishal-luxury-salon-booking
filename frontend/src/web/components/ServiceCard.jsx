function ServiceCard({ title, price }) {
  return (
    <div className="bg-zinc-900 p-5 rounded-lg">

      <h2 className="text-xl font-bold text-red-600">
        {title}
      </h2>

      <p className="text-white mt-3">
        ₹{price}
      </p>

      <button className="mt-4 bg-red-600 px-4 py-2 rounded">
        Book Now
      </button>

    </div>
  );
}

export default ServiceCard;