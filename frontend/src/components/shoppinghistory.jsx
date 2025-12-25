function Shoppinghistory({ activeshopping, setActiveshopping }) {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  const date = new Date().toLocaleDateString();
  return (
    <div>
      {activeshopping === "A" && (
        <div>
          <div className=" text-right mt-5">
            <button
              type="button"
              onClick={() => setActiveshopping("")}
              className="border border-green-800 mr-14 bg-red-600 p-1 text-white rounded"
            >
              back
            </button>
          </div>
          <table className="border w-1/2 m-auto">
            <thead className="border border-black">
              <tr>
                <th className="border  border-black">Itemlist</th>
                <th className="border  border-black">Date</th>
              </tr>
            </thead>
            <tbody>
              {history.length > 0 &&
                history.map((items, index) => (
                  <tr key={index}>
                    <td className="border border-black text-center">
                      {items.Productname}-{items.Quantity}
                    </td>
                    <td className="border border-black text-center">
                      {index == 0 ? date : ""}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Shoppinghistory;
