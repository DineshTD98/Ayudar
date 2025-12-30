function Historymodal({data,onClose}){
    return(
       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-1/3 rounded p-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">
            Shopping Details - {data.date}
          </h2>
          <button
            onClick={onClose}
            className="text-red-600 font-bold"
          >
            X
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr>
              <th className="border">Product</th>
              <th className="border">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index}>
                <td className="border text-center">
                  {item.Productname}
                </td>
                <td className="border text-center">
                  {item.Quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right mt-4">
          <button
            onClick={onClose}
            className="bg-gray-700 text-white px-4 py-1 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    )
}

export default Historymodal;