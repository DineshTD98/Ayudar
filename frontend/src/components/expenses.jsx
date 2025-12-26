import { useState, useEffect } from "react";
import useapi from "../customehooks/useapi";

function Expenses({ setExpense, setAmount }) {
  const { request, error, loading } = useapi();

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
        Headers: "application/form",
      });

      const newexpense = response.expense;

      setExpense((prev) => {
        const updated = [...prev, ...newexpense];
        const newtotal = updated.reduce(
          (sum, item) => sum + Number(item.amount),
          0,
        );
        setAmount(newtotal);
        return updated;
      });
    } catch (err) {
      console.log(err.message);
    }

    setRows([{ title: "", category: "", amount: "", date: "" }]);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl w-full">
      <h1 className="text-2xl font-bold mb-4">Add Your Expenses</h1>

      <form onSubmit={submitExpenses}>
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

                {/* ✅ ONLY CATEGORY FIELD CHANGED */}
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
                    className="bg-red-500 text-white px-3 rounded"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={addRow}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Row
          </button>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Expenses
          </button>
        </div>
      </form>
    </div>
  );
}

export default Expenses;
