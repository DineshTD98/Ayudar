import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setSubscription } from "../redux/slices/subscriptionslice";
import useapi from "../customehooks/useapi";

function Subscriptions() {
  const [form, setForm] = useState({
    name: "",
    renewal: "monthly",
    duedate: "",
    price: "",
  });

  const { request, error, loading } = useapi();
  const [createsubscription, setCreateSubscription] = useState(false);
  const subscriptionitems = useSelector(
    (state) => state.Subscriptionlist?.value || [],
  );
  const dispatch = useDispatch();

  const handlechange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubscription = async (e) => {
    e.preventDefault();
    try {
      const response = await request({
        url: "/budget/createsubscription",
        method: "post",
        data: form,
      });
      console.log(response);
      dispatch(
        setSubscription([...subscriptionitems, response.subscriptionlist]),
      );
      setForm({ name: "", renewal: "monthly", duedate: "", price: "" });
      setCreateSubscription(false);
    } catch (err) {
      console.log(err.message);
    }
  };


  // getting the subscription list
     
     useEffect(() => {
         async function datafetch() {
               try {
                 const data = await request({
                   url: "/budget/getsubscription",
                   method: "GET",
                 });
                 if (data.subscription) {
                   dispatch(setSubscription(data.subscription));
                 }
               } catch (err) {
                 console.log(err.message);
               }
             }
             datafetch();
           }, []);
  

  const handledelete = async (id) => {
    try {
      const response = await request({
        url: `/budget/deletesubscription/${id}`,
        method: "delete",
      });
      console.log(response.deletedid);
      dispatch(
        setSubscription(
          subscriptionitems.filter((item) => item._id !== response.deletedid),
        ),
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
              Your Subscriptions
            </h1>
            <p className="text-gray-600 mt-2">
              Manage all your subscriptions in one place
            </p>
          </div>
          <button
            className="bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium py-3 px-6 rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg w-full md:w-auto"
            onClick={() => setCreateSubscription(true)}
          >
            + Add a subscription
          </button>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
        {/* {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                        <p className="text-red-700 font-medium">{error}</p>
                    </div>
                )} */}

        {/* Create Subscription Modal */}
        {createsubscription && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fadeIn">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Add Subscription
                </h2>
                <button
                  onClick={() => setCreateSubscription(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handlesubscription}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subscription Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      name="name"
                      onChange={handlechange}
                      placeholder="Netflix, Spotify, etc."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Billing Cycle
                    </label>
                    <select
                      name="renewal"
                      value={form.renewal}
                      onChange={handlechange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={form.duedate}
                      name="duedate"
                      onChange={handlechange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (Rs)
                    </label>
                    <input
                      type="number"
                      value={form.price}
                      name="price"
                      onChange={handlechange}
                      placeholder="0.00"
                      step="0.01"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => setCreateSubscription(false)}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-200"
                  >
                    Add Subscription
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Subscription Cards Grid */}
        {subscriptionitems.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="text-6xl mb-4 text-gray-300">📊</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No subscriptions yet
            </h3>
            <p className="text-gray-500 mb-4">
              Add your first subscription to get started
            </p>
            <button
              className="bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium py-2.5 px-6 rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-200"
              onClick={() => setCreateSubscription(true)}
            >
              + Add your first subscription
            </button>
          </div>
        )}

        {subscriptionitems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscriptionitems.map((list) => (
              <div
                key={list._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 truncate">
                        {list.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            list.renewal === "monthly"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {list.renewal.charAt(0).toUpperCase() +
                            list.renewal.slice(1)}
                        </span>
                      </div>
                    </div>
                    <button
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-2"
                      onClick={() => handledelete(list._id)}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gray-900">
                        Rs.{list.price}
                      </span>
                      <span className="text-gray-500 ml-2">
                        / {list.renewal === "monthly" ? "month" : "year"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Next Payment
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {new Date(list.duedate).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Status
                      </p>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
                    @keyframes fadeIn {
                        from {
                        opacity: 0;
                        transform: scale(0.95);
                        }
                        to {
                        opacity: 1;
                        transform: scale(1);
                        }
                    }
                    .animate-fadeIn {
                        animation: fadeIn 0.2s ease-out;
                    }
                    `}</style>
    </>
  );
}
export default Subscriptions;
