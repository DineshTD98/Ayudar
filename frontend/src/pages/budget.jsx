import { userContext } from "../App";
import Budgetcards from "../components/budgetcards";
import { useContext, useEffect, useState } from "react";
import Createbudget from "../components/createbudget";
import Expenses from "../components/expenses";
import Transactions from "../components/transactions";
import Subscriptions from "../components/subscriptions";
import MyPieChart from "../components/piechart";
import useapi from "../customehooks/useapi";
import Expensetable from "../components/expensetable";

function Budget() {
  const { active,setActive,} = useContext(userContext);

  const [expense, setExpense] = useState([]);
  const [totalexpense, setAmount] = useState(null);
  const { request, error, loading } = useapi();
  const [creditcardamount, setCreditcardamount] = useState(0);

  useEffect(() => {
    const fetchexpense = async () => {
      try {
        const data = await request({
          url: "/budget/getexpense",
          method: "GET",
        });

        if (data) {
          const totalamount = data.Expense.reduce(
            (sum, item) => sum + item.amount,
            0
          );
          setAmount(totalamount);
          setExpense(data.Expense);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchexpense();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}
      <aside className="w-[260px] bg-white shadow-lg p-4">
        <h1 className="text-2xl font-bold text-green-700 mb-8 text-center">
          Budget App
        </h1>

        <nav className="flex flex-col gap-3">
          {[
            { key: "A", label: "Overview" },
            { key: "B", label: "Create Budget" },
            { key: "C", label: "Expenses" },
            { key: "D", label: "Transactions" },
            { key: "E", label: "Subscriptions" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`text-left px-4 py-2 rounded-lg font-semibold transition-all
                ${
                  active === item.key
                    ? "bg-green-700 text-white"
                    : "hover:bg-green-100 text-gray-700"
                }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        {error ? (
          <p className="text-red-600 text-center">
            Couldn't fetch the data
          </p>
        ) : (
          <>
            {/* OVERVIEW */}
            {active === "A" && (
              <>
                <Budgetcards totalexpense={totalexpense} />

                <div className="mt-6 grid grid-cols-12 gap-6">
                  {/* Expense Table */}
                  <div className="col-span-7 bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold mb-4">
                      Recent Expenses
                    </h2>
                    <Expensetable expense={expense} />
                  </div>

                  {/* Pie Chart */}
                  <div className="col-span-5 bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold mb-4 text-center">
                      Expense Breakdown
                    </h2>
                    {loading && <p>Loading chart...</p>}
                    {!loading && <MyPieChart expense={expense} />}
                  </div>
                </div>
              </>
            )}

            {/* CREATE BUDGET */}
            {active === "B" && (
              <div className="bg-white rounded-lg shadow p-6">
                <Createbudget
                  creditcardamount={creditcardamount}
                  setCreditcardamount={setCreditcardamount}
                />
              </div>
            )}

            {/* EXPENSES */}
            {active === "C" && (
              <div className="bg-white rounded-lg shadow p-6">
                <Expenses
                  setExpense={setExpense}
                  setAmount={setAmount}
                />
              </div>
            )}

            {/* TRANSACTIONS */}
            {active === "D" && (
              <div className="bg-white rounded-lg shadow p-6">
                <Transactions />
              </div>
            )}

            {/* SUBSCRIPTIONS */}
            {active === "E" && (
              <div className="bg-white rounded-lg shadow p-6">
                <Subscriptions />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Budget;