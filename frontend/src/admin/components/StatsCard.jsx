function StatsCard({ title, value }) {
  return (
    <div className=" border border-zinc-800 rounded-3xl  p-6">

      <h3 className="text-zinc-400">
        {title}
      </h3>

      <h2 className="text-4xl font-bold text-red-500 mt-3">
        {value}
      </h2>

    </div>
  );
}

export default StatsCard;