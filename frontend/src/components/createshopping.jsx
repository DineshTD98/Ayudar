import { useEffect, useState } from "react";

function Createshopping({ activeshopping, setActiveshopping }) {
  const [form, setForm] = useState({
    Slno: "",
    Productname: "",
    Quantity: "",
  });
  const [list, setList] = useState([]);
  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const shoppinglist = JSON.parse(localStorage.getItem("shopping")) || [];
  const handlesubmit = (e) => {
    e.preventDefault();
    const newlist = [...list, form];
    setList(newlist);
    setForm({ Id: "", Productname: "", Quantity: "" });
  };
  const keys = Object.keys(form);
  keys.push("Delete");

  const handledelete = (index) => {
    const updatedlist = list.filter((_, i) => i !== index);
    setList(updatedlist);
  };
  const handlesave = () => {
    const updatedlist = [...shoppinglist, ...list];
    setList([]);
    localStorage.setItem("shopping", JSON.stringify(updatedlist));
    alert("saved to the local storage");
  };
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex w-full">
          <div className="mt-5 w-2/3 mr-10 text-[20px] text-right">
            <h1 className="font-bold text-[32px] bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mr-36">
              Shopping list
            </h1>
            <p className="mr-24">Create your shopping list here</p>
          </div>
          <div className="mt-5 w-1/3 text-right mr-10">
            <button
              className="border border-black bg-green-800 text-white p-1 rounded w-[100px] text-[18px]"
              onClick={() => setActiveshopping("A")}
            >
              history
            </button>
          </div>
        </div>
        {activeshopping === "" && (
          <div>
            <form
              action=""
              onSubmit={handlesubmit}
              className="mt-12 text-center ml-40"
            >
              {/* <div className="w-[500px] mb-3">
                   <label htmlFor="id" className="inline-block w-[200px]">Id</label>
                   <input type="number" name="Id" value={form.Id} onChange={handlechange}
                    className="border border-black inline-block w-[200px]"
                   />
                 </div> */}
              <div className="w-[500px] mb-3">
                <label htmlFor="productname" className="inline-block w-[200px]">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  name="Productname"
                  value={form.Productname}
                  onChange={handlechange}
                  className="border border-black inline-block w-[200px] focus:outline-none focus:ring-2 rounded focus:border-green-800"
                />
              </div>
              <div className="w-[500px] mb-3">
                <label htmlFor="quantity" className="inline-block w-[200px]">
                  Quantity
                </label>
                <input
                  type="text"
                  required
                  name="Quantity"
                  value={form.Quantity}
                  onChange={handlechange}
                  className="border border-black inline-block w-[200px] focus:outline-none rounded focus:ring-2 focus:border-green-800"
                />
              </div>
              <div className="text-center ml-20">
                <button
                  type="submit"
                  className="border border-black block w-[70px] mt-5 bg-green-700 ml-60 text-white text-[20px] rounded"
                >
                  Add
                </button>
              </div>
            </form>
            <div className="mt-6 w-[1000px] overflow-x-auto">
              <table className="w-full border border-gray-300 border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    {keys.map((heading, index) => (
                      <th
                        key={index}
                        className="border px-4 py-2 font-semibold text-left"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {list.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{item.Productname}</td>
                      <td className="border px-4 py-2">{item.Quantity}</td>

                      <td className="border px-4 py-2">
                        <button
                          onClick={() => handledelete(index)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {list.length > 0 && (
                <div className="text-center">
                  <button
                    className=" border border-green-800 p-1 rounded w-[80px] font-bold text-[20px] bg-yellow-300 mt-5"
                    type="submit"
                    onClick={() => handlesave()}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Createshopping;
