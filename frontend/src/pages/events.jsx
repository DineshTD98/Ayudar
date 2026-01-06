import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addnewEvent, addevent } from "../redux/slices/eventslice";
import useApi from "../customehooks/useapi";
import Eventsbgimage from "../assets/bgimageevents.jpg";

const COLORS = [
  "bg-blue-500",
  "bg-green-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-purple-500",
];

const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function Events() {
  const { request } = useApi();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const events = useSelector((state) => state.Events.value);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    color: COLORS[0],
  });

  // 📆 Calendar helpers
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await request({
        url: "/event/createevent",
        method: "POST",
        data: formData,
      });

      dispatch(addnewEvent(response.eventdetails));

      setFormData({
        title: "",
        description: "",
        date: "",
        color: COLORS[0],
      });

      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  const selectedDateString = formatLocalDate(selectedDate);

  const filteredEvents = events.filter(
    (event) => event.date === selectedDateString
  );

  return (
    <div className="relative min-h-screen">
      <div
        className={`relative z-10 min-h-screen flex flex-col lg:flex-row p-6 transition-all duration-300 ${
          showForm ? "justify-start" : "justify-center"
        }`}
      >
        {/* LEFT SIDE */}
        <div className="flex flex-col w-full lg:w-[800px]">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-black font-bold">
              {selectedDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>

            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              + Add Event
            </button>
          </div>

          {/* Calendar */}
          <div className="grid grid-cols-7 gap-2 bg-white p-4 rounded-xl shadow">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center font-semibold text-gray-500"
              >
                {day}
              </div>
            ))}

            {Array(firstDay)
              .fill("")
              .map((_, i) => (
                <div key={i}></div>
              ))}

            {Array(daysInMonth)
              .fill("")
              .map((_, i) => {
                const day = i + 1;
                const date = new Date(year, month, day);
                const dateString = formatLocalDate(date);
                const isSelected =
                  date.toDateString() === selectedDate.toDateString();

                const dayEvents = events.filter(
                  (e) => e.date === dateString
                );

                return (
                  <div
                    key={day}
                    onClick={() => setSelectedDate(date)}
                    className={`cursor-pointer text-center p-2 rounded-lg relative min-h-[50px] flex flex-col items-center justify-center ${
                      isSelected
                        ? "bg-green-600 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <span className="z-10">{day}</span>
                    <div className="flex gap-1 mt-1 flex-wrap justify-center">
                      {dayEvents.map((event, idx) => (
                        <div
                          key={idx}
                          className={`w-3.5 h-3.5 rounded-full ${event.color} border border-white`}
                          title={event.title}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Events Section */}
          <div className="mt-6 bg-white p-4 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">
              Events on {selectedDateString}
            </h3>

            {filteredEvents.length === 0 && (
              <p className="text-gray-500">No events for this date</p>
            )}

            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className={`p-3 mb-2 rounded-lg text-white ${event.color}`}
              >
                <h4 className="font-bold">{event.title}</h4>
                <p className="text-sm">{event.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT / BOTTOM FORM */}
        {showForm && (
          <div
            className="
              bg-white shadow-xl p-6 rounded-xl
              w-full lg:w-[500px]
              h-auto lg:h-[500px]

              fixed lg:static
              bottom-0 left-0
              lg:ml-6 lg:mt-16
              z-20
            "
          >
            <h2 className="text-xl font-bold mb-4">Add Event</h2>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <input
                type="text"
                placeholder="Event Name"
                className="w-full border p-2 rounded"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />

              <input
                type="date"
                className="w-full border p-2 rounded"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />

              <textarea
                placeholder="Description"
                className="w-full border p-2 rounded"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              {/* Color Picker */}
              <div className="flex gap-2">
                {COLORS.map((color) => (
                  <div
                    key={color}
                    onClick={() => setFormData({ ...formData, color })}
                    className={`w-6 h-6 rounded-full cursor-pointer ${color} ${
                      formData.color === color ? "ring-2 ring-black" : ""
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;