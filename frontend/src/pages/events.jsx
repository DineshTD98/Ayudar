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
  "bg-pink-500",
  "bg-indigo-500",
  "bg-orange-500",
];

const CATEGORIES = [
  { name: "Work", icon: "💼", color: "bg-blue-500" },
  { name: "Personal", icon: "👤", color: "bg-green-500" },
  { name: "Family", icon: "👨‍👩‍👧‍👦", color: "bg-purple-500" },
  { name: "Birthday", icon: "🎂", color: "bg-pink-500" },
  { name: "Medical", icon: "🏥", color: "bg-red-500" },
  { name: "Other", icon: "📌", color: "bg-gray-500" },
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
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    color: COLORS[0],
    category: "Personal",
  });

  // Fetch events on load
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await request({
          url: "/event/getevents",
          method: "GET",
        });
        if (response.events) {
          dispatch(addevent(response.events));
        }
      } catch (err) {
        console.log("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  // Calendar helpers
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  // Navigation functions
  const goToPreviousMonth = () => {
    setSelectedDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setSelectedDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        // Update existing event
        const response = await request({
          url: `/event/updateevent/${editingEvent._id}`,
          method: "PUT",
          data: formData,
        });
        // Update in Redux store - replace the old event with updated one
        const updatedEvents = events.map((evt) =>
          evt._id === editingEvent._id ? response.eventdetails : evt
        );
        dispatch(addevent(updatedEvents));
      } else {
        // Create new event
        const response = await request({
          url: "/event/createevent",
          method: "POST",
          data: formData,
        });
        dispatch(addnewEvent(response.eventdetails));
      }

      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        color: COLORS[0],
        category: "Personal",
      });

      setShowForm(false);
      setEditingEvent(null);
    } catch (err) {
      console.log(err);
      alert("Failed to save event. Please try again.");
    }
  };

  const handleEditEvent = (event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time || "",
      color: event.color,
      category: event.category || "Personal",
    });
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await request({
        url: `/event/deleteevent/${eventId}`,
        method: "DELETE",
      });
      // Remove from Redux store
      const filteredEvents = events.filter((e) => e._id !== eventId);
      dispatch(addevent(filteredEvents));
    } catch (err) {
      console.log(err);
      alert("Failed to delete event. Please try again.");
    }
  };

  const selectedDateString = formatLocalDate(selectedDate);

  const filteredEvents = events
    .filter((event) => event.date === selectedDateString)
    .filter((event) =>
      searchQuery
        ? event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .sort((a, b) => {
      if (a.time && b.time) return a.time.localeCompare(b.time);
      return 0;
    });

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
     
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div
        className={`relative z-10 min-h-screen flex flex-col lg:flex-row p-4 sm:p-6 gap-6 transition-all duration-300`}
      >
        {/* LEFT SIDE - Calendar */}
        <div className="flex flex-col w-full lg:w-[850px]">
          {/* Header with Navigation */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 mb-6 border border-white/20 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl text-white font-bold">
                  {selectedDate.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </h2>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={goToPreviousMonth}
                  className="flex-1 sm:flex-none bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all"
                >
                  ← Prev
                </button>
                <button
                  onClick={goToToday}
                  className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all font-semibold"
                >
                  Today
                </button>
                <button
                  onClick={goToNextMonth}
                  className="flex-1 sm:flex-none bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Add Event Button */}
            <button
              onClick={() => {
                setShowForm(true);
                setEditingEvent(null);
                setFormData({
                  title: "",
                  description: "",
                  date: selectedDateString,
                  time: "",
                  color: COLORS[0],
                  category: "Personal",
                });
              }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
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
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add New Event
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 shadow-xl">
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center font-bold text-white/80 text-xs sm:text-sm py-2"
                >
                  {day}
                </div>
              ))}

              {Array(firstDay)
                .fill("")
                .map((_, i) => (
                  <div key={`empty-${i}`}></div>
                ))}

              {Array(daysInMonth)
                .fill("")
                .map((_, i) => {
                  const day = i + 1;
                  const date = new Date(year, month, day);
                  const dateString = formatLocalDate(date);
                  const isSelected =
                    date.toDateString() === selectedDate.toDateString();
                  const isToday =
                    date.toDateString() === new Date().toDateString();

                  const dayEvents = events.filter((e) => e.date === dateString);

                  return (
                    <div
                      key={day}
                      onClick={() => setSelectedDate(date)}
                      className={`cursor-pointer text-center p-2 sm:p-3 rounded-xl relative min-h-[50px] sm:min-h-[70px] flex flex-col items-center justify-start transition-all ${
                        isSelected
                          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                          : isToday
                          ? "bg-white/30 text-white border-2 border-white"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      <span className="font-semibold text-sm sm:text-base">
                        {day}
                      </span>
                      <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
                        {dayEvents.slice(0, 3).map((event, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${event.color}`}
                            title={event.title}
                          />
                        ))}
                        {dayEvents.length > 3 && (
                          <span className="text-[8px] sm:text-[10px] text-white/70">
                            +{dayEvents.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Events Section */}
          <div className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Events on {selectedDateString}
              </h3>

              {/* Search */}
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 mx-auto text-white/30 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-white/60 text-lg">No events for this date</p>
                <p className="text-white/40 text-sm mt-2">
                  Click "Add New Event" to create one
                </p>
              </div>
            )}

            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {filteredEvents.map((event) => (
                <div
                  key={event._id}
                  className={`p-4 rounded-xl text-white ${event.color} shadow-lg hover:shadow-xl transition-all`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">
                          {CATEGORIES.find((c) => c.name === event.category)
                            ?.icon || "📌"}
                        </span>
                        <h4 className="font-bold text-lg">{event.title}</h4>
                      </div>
                      <p className="text-sm opacity-90 mb-2">
                        {event.description}
                      </p>
                      {event.time && (
                        <p className="text-xs opacity-75">🕐 {event.time}</p>
                      )}
                      {event.category && (
                        <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-xs">
                          {event.category}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all"
                        title="Edit"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event._id)}
                        className="bg-red-500/30 hover:bg-red-500/50 p-2 rounded-lg transition-all"
                        title="Delete"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Form */}
        {showForm && (
          <div className="bg-white/10 backdrop-blur-md shadow-2xl p-6 rounded-2xl w-full lg:w-[450px] h-fit border border-white/20 lg:sticky lg:top-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingEvent ? "Edit Event" : "Add New Event"}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingEvent(null);
                }}
                className="text-white/70 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-white/80 mb-2 font-medium">
                  Event Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter event name"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/80 mb-2 font-medium">
                    Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2 font-medium">
                    Time
                  </label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 mb-2 font-medium">
                  Category
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.name} value={cat.name} className="bg-gray-800">
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/80 mb-2 font-medium">
                  Description
                </label>
                <textarea
                  placeholder="Add event details..."
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-white/80 mb-3 font-medium">
                  Color
                </label>
                <div className="flex gap-2 flex-wrap">
                  {COLORS.map((color) => (
                    <div
                      key={color}
                      onClick={() => setFormData({ ...formData, color })}
                      className={`w-10 h-10 rounded-full cursor-pointer ${color} transition-all hover:scale-110 ${
                        formData.color === color
                          ? "ring-4 ring-white shadow-lg"
                          : "ring-2 ring-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  {editingEvent ? "Update Event" : "Create Event"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingEvent(null);
                  }}
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition-all"
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