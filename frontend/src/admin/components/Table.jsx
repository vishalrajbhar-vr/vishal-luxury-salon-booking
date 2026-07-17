function Table({ headers, data }) {
  return (
    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="bg-zinc-900">

            {headers.map((item, index) => (
              <th
                key={index}
                className="p-4 text-left"
              >
                {item}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b border-zinc-800"
            >
              {row.map((item, i) => (
                <td
                  key={i}
                  className="p-4"
                >
                  {item}
                </td>
              ))}
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Table;