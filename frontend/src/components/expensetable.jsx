
function Expensetable({expense}) {
  return (
    <>
        <div className="overflow-x-auto mt-6">
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {expense.map((exp) => (
              <tr
                key={exp._id}
                className="hover:bg-gray-100 transition-colors"
              >
                <td className="px-4 py-2 text-gray-800">
                  {exp.title}
                </td>
                <td className="px-4 py-2 text-gray-800 font-medium">
                  ₹{exp.amount}
                </td>
                <td className="px-4 py-2 text-gray-700">
                  {exp.category?.name|| "others"}
                </td>
                <td className="px-4 py-2 text-gray-600">
                  {new Date(exp.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>   
     </>
  )
}

export default Expensetable