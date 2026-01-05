import { useState, useEffect } from "react";
import useapi from "../customehooks/useapi";

import { addExpense } from "../redux/slices/expenseslice";
import { useDispatch } from "react-redux";
function Expenses() {
  const { request, error, loading } = useapi();

  const dispatch = useDispatch();

  const [rows, setRows] = useState([
    { title: "", category: "", amount: "", date: "" },
  ]);

  // NEW STATE (only for category list)
  const [categories, setCategories] = useState([]);

  // FETCH CATEGORIES
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await request({
          url: "/Budget/categories",
          method: "get",
        });
        setCategories(res.categories);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchCategories();
  }, []);

  const addRow = () => {
    setRows([...rows, { title: "", category: "", amount: "", date: "" }]);
  };

  const updateRow = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const deleteRow = (index) => {
    if(rows[index].title !== ""|| rows.length === 1){
    const confirmdelete = window.confirm("Are you sure you want to delete this row?");
    if (!confirmdelete) return;
    }
    setRows(rows.filter((_, i) => i !== index));
  };

  const submitExpenses = async (e) => {
    e.preventDefault();
    console.log(rows);

    try {
      const response = await request({
        url: "/Budget/createexpense",
        method: "post",
        data: rows,
      });

      const newexpense = response.expense;
      dispatch(addExpense(newexpense));
    } 
    catch (err) {
      console.log(err.message);
    }

    setRows([{ title: "", category: "", amount: "", date: "" }]);
  };

  return (
    <div className="p-4 lg:p-6 bg-white shadow-lg rounded-xl w-full">
      {/* Header with buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Add Your Expenses</h1>
        
        <div className="flex gap-3">
          <button
            type="button"
            onClick={addRow}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            + Add Row
          </button>

          <button
            type="submit"
            form="expense-form"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
          >
            Save Expenses
          </button>
        </div>
      </div>

      <form id="expense-form" onSubmit={submitExpenses}>
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Amount (₹)</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2 border">
                    <input
                      className="border p-1 w-full rounded"
                      value={row.title}
                      onChange={(e) => updateRow(index, "title", e.target.value)}
                      placeholder="Expense Title"
                      required
                    />
                  </td>

                  <td className="p-2 border">
                    <select
                      className="border p-1 w-full rounded"
                      value={row.category}
                      onChange={(e) =>
                        updateRow(index, "category", e.target.value)
                      }
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="p-2 border">
                    <input
                      type="number"
                      className="border p-1 w-full rounded"
                      value={row.amount}
                      onChange={(e) => updateRow(index, "amount", e.target.value)}
                      placeholder="₹ Amount"
                      required
                    />
                  </td>

                  <td className="p-2 border">
                    <input
                      type="date"
                      className="border p-1 w-full rounded"
                      value={row.date}
                      onChange={(e) => updateRow(index, "date", e.target.value)}
                      required
                    />
                  </td>

                  <td className="p-2 border">
                    <button
                      type="button"
                      onClick={() => deleteRow(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {rows.map((row, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-700">Expense #{index + 1}</h3>
                <button
                  type="button"
                  onClick={() => deleteRow(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Delete
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={row.title}
                    onChange={(e) => updateRow(index, "title", e.target.value)}
                    placeholder="Expense Title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={row.category}
                    onChange={(e) =>
                      updateRow(index, "category", e.target.value)
                    }
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={row.amount}
                    onChange={(e) => updateRow(index, "amount", e.target.value)}
                    placeholder="₹ Amount"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={row.date}
                    onChange={(e) => updateRow(index, "date", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default Expenses;
