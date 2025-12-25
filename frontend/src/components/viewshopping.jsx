import { useState, useEffect } from "react";

function Viewshopping({ setActiveshopping, activeshopping }) {
  const [itemlist, setItemlist] = useState([]);

  useEffect(() => {
    const shoppingitems = JSON.parse(localStorage.getItem("shopping")) || [];
    const withstatus = shoppingitems.map((items) => ({
      ...items,
      completed: false,
    }));
    console.log(withstatus);
    setItemlist(withstatus);
  }, []);
  const togglecomplete = (index) => {
    const updatedlist = itemlist.map((item, i) =>
      index === i ? { ...item, completed: !item.completed } : item,
    );
    setItemlist(updatedlist);
  };
  const handlecomplete = () => {
    const checkeditems = itemlist.filter((items) => items.completed);
    const cleanitems = checkeditems.map(({ completed, ...rest }) => rest);

    const oldhistory = JSON.parse(localStorage.getItem("history")) || [];
    const updatedhistory = [...oldhistory, ...cleanitems];
    localStorage.setItem("history", JSON.stringify(updatedhistory));

    localStorage.removeItem("shopping");
    setItemlist([]);
    alert("shopping completed");
    console.log(cleanitems);
  };
  return (
    <>
      {activeshopping === "" && (
        <div>
          <div className="text-right mt-5 mr-10">
            <button
              className="border border-black bg-green-300 text-black p-1 rounded"
              onClick={() => setActiveshopping("A")}
            >
              History
            </button>
          </div>
          <div className="mt-6 w-[800px] ms-80 overflow-x-auto">
            <h1 className="text-center text-[22px] font-bold mb-5">
              Shopping List
            </h1>
            <table className="w-full border border-gray-300 border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 font-semibold text-center">
                    Slno
                  </th>
                  <th className="border px-4 py-2 font-semibold text-center">
                    Productname
                  </th>
                  <th className="border px-4 py-2 font-semibold text-center">
                    Quantity
                  </th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {itemlist.length > 0 &&
                  itemlist.map((items, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-50 text-center ${items.completed ? "opacity-60 blur-[1px]" : ""}`}
                    >
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{items.Productname}</td>
                      <td className="border px-4 py-2">{items.Quantity}</td>
                      <td className="border px-4 py-2">
                        <input
                          type="checkbox"
                          onChange={() => togglecomplete(index)}
                        />
                      </td>
                    </tr>
                  ))}
                {itemlist.length == 0 && (
                  <tr>
                    <td colSpan={3} className="text-center p-2">
                      No item to shop
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {itemlist.length > 0 && (
              <div className="text-center mt-5">
                <button
                  onClick={() => handlecomplete()}
                  className="border border-green-800 p-1 bg-green-800 text-white rounded"
                >
                  Complete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default Viewshopping;
