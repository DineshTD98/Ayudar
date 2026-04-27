import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addnewEvent, addevent } from "../redux/slices/eventslice";
import useApi from "../customehooks/useapi";

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
        const response = await request({
          url: `/event/updateevent/${editingEvent._id}`,
          method: "PUT",
          data: formData,
        });
        const updatedEvents = events.map((evt) =>
          evt._id === editingEvent._id ? response.eventdetails : evt
        );
        dispatch(addevent(updatedEvents));
      } else {
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
      description: event.description || "",
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
          (event.description || "").toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .sort((a, b) => {
      if (a.time && b.time) return a.time.localeCompare(b.time);
      return 0;
    });

  return (
    <div className="min-h-screen text-slate-200 overflow-x-hidden pt-28 sm:pt-32 px-4 sm:px-6 pb-8">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* LEFT SIDE - Calendar */}
          <div className="flex-1 space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
            {/* Header & Stats */}
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl lg:rounded-[32px] p-5 sm:p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-10">
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl rotate-3">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white -rotate-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {selectedDate.toLocaleString("default", { month: "long", year: "numeric" })}
                    </h2>
                    <p className="text-slate-400 font-medium text-sm">Keep track of your moments</p>
                  </div>
                </div>

                <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/10 w-full sm:w-auto justify-center">
                  <button onClick={goToPreviousMonth} className="p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button onClick={goToToday} className="px-5 py-2.5 bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all flex-1 sm:flex-none">
                    Today
                  </button>
                  <button onClick={goToNextMonth} className="p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>

              {/* Add Button */}
              <button
                onClick={() => {
                  setShowForm(true);
                  setEditingEvent(null);
                  setFormData({ title: "", description: "", date: selectedDateString, time: "", color: COLORS[0], category: "Personal" });
                }}
                className="w-full group bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <div className="bg-white/20 p-1 rounded-lg group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                </div>
                Create New Event
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl lg:rounded-[32px] p-4 sm:p-8 shadow-2xl overflow-hidden">
              <div className="grid grid-cols-7 gap-1 sm:gap-3">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                  <div key={idx} className="text-center font-bold text-slate-500 text-[10px] sm:text-xs uppercase tracking-widest pb-2 sm:pb-4">
                    <span className="hidden sm:inline">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][idx]}</span>
                    <span className="sm:hidden">{day}</span>
                  </div>
                ))}

                {Array(firstDay).fill("").map((_, i) => <div key={`empty-${i}`} />)}

                {Array(daysInMonth).fill("").map((_, i) => {
                  const day = i + 1;
                  const date = new Date(year, month, day);
                  const dateString = formatLocalDate(date);
                  const isSelected = date.toDateString() === selectedDate.toDateString();
                  const isToday = date.toDateString() === new Date().toDateString();
                  const dayEvents = events.filter((e) => e.date === dateString);

                  return (
                    <div
                      key={day}
                      onClick={() => setSelectedDate(date)}
                      className={`group cursor-pointer aspect-square rounded-xl sm:rounded-2xl relative flex flex-col items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-2xl scale-105 sm:scale-110 z-10"
                          : isToday
                          ? "bg-white/10 text-white border-2 border-indigo-500/50"
                          : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span className={`text-sm sm:text-lg font-bold ${isSelected ? "text-white" : "text-slate-200"}`}>{day}</span>
                      <div className="flex gap-0.5 sm:gap-1 mt-0.5 sm:mt-1.5 flex-wrap justify-center px-1">
                        {dayEvents.slice(0, 3).map((event, idx) => (
                          <div key={idx} className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${event.color} shadow-sm shadow-black/20`} />
                        ))}
                      </div>
                      {dayEvents.length > 3 && (
                        <div className="absolute bottom-0.5 right-1 sm:bottom-1 sm:right-2 text-[6px] sm:text-[8px] font-black opacity-40">+{dayEvents.length - 3}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - List & Form */}
          <div className="w-full lg:w-[450px] space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
            {/* Search & List */}
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl lg:rounded-[32px] p-5 sm:p-8 shadow-2xl flex flex-col h-fit">
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg font-bold text-white mb-4">
                  {selectedDate.toLocaleDateString("default", { weekday: "long", month: "short", day: "numeric" })}
                </h3>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-5 sm:px-6 py-3 sm:py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                  />
                  <svg className="w-5 h-5 absolute right-4 sm:right-5 top-3.5 sm:top-4.5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 max-h-[400px] lg:max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                {filteredEvents.length === 0 ? (
                  <div className="text-center py-10 sm:py-12 bg-white/5 rounded-2xl border border-dashed border-white/10">
                    <p className="text-slate-500 font-medium">No events for this day 🌿</p>
                    <p className="text-slate-600 text-xs mt-2">Tap "Create New Event" to add one</p>
                  </div>
                ) : (
                  filteredEvents.map((event) => (
                    <div key={event._id} className="group relative bg-white/5 border border-white/5 rounded-2xl p-4 sm:p-5 hover:bg-white/10 transition-all border-l-4" style={{ borderLeftColor: event.color?.replace('bg-', '').replace('-500', '') }}>
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                            <span className="text-xl sm:text-2xl">{CATEGORIES.find((c) => c.name === event.category)?.icon || "📌"}</span>
                            <h4 className="font-bold text-base sm:text-lg text-white leading-tight truncate">{event.title}</h4>
                          </div>
                          {event.description && (
                            <p className="text-xs sm:text-sm text-slate-400 mb-2 sm:mb-3 line-clamp-2">{event.description}</p>
                          )}
                          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                            {event.time && <span className="text-[10px] sm:text-xs text-slate-500 flex items-center gap-1.5 font-medium"><svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{event.time}</span>}
                            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">{event.category}</span>
                          </div>
                        </div>
                        <div className="flex gap-1 sm:gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
                          <button onClick={() => handleEditEvent(event)} className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-all"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                          <button onClick={() => handleDeleteEvent(event._id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Form Modal Overlay */}
            {showForm && (
              <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md">
                <div className="bg-[#1e293b] border border-white/10 shadow-3xl p-6 sm:p-10 rounded-t-[32px] sm:rounded-[40px] w-full max-w-[500px] max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300">
                  <div className="flex justify-between items-center mb-6 sm:mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{editingEvent ? "Update Event" : "Add Event"}</h2>
                    <button onClick={() => { setShowForm(false); setEditingEvent(null); }} className="w-10 h-10 flex items-center justify-center bg-white/5 text-slate-400 hover:text-white rounded-full transition-all">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>

                  <form onSubmit={handleAddEvent} className="space-y-5 sm:space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Title</label>
                      <input type="text" placeholder="Birthday Party..." className="w-full px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Description <span className="text-slate-600">(optional)</span></label>
                      <textarea placeholder="Add a note..." rows={2} className="w-full px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Date</label>
                        <input type="date" className="w-full px-4 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Time</label>
                        <input type="time" className="w-full px-4 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
                      <div className="grid grid-cols-3 gap-2">
                        {CATEGORIES.map((cat) => (
                          <button key={cat.name} type="button" onClick={() => setFormData({ ...formData, category: cat.name })} className={`flex flex-col items-center gap-1 sm:gap-1.5 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition-all ${formData.category === cat.name ? "bg-indigo-500/20 border-indigo-500 text-white" : "bg-white/5 border-white/5 text-slate-500 hover:border-white/20"}`}>
                            <span className="text-lg sm:text-xl">{cat.icon}</span>
                            <span className="text-[9px] sm:text-[10px] font-bold uppercase">{cat.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Color Theme</label>
                      <div className="flex gap-2 justify-between p-3 bg-white/5 rounded-2xl border border-white/10">
                        {COLORS.map((color) => (
                          <button key={color} type="button" onClick={() => setFormData({ ...formData, color })} className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${color} transition-all ${formData.color === color ? "ring-2 ring-white ring-offset-2 sm:ring-offset-4 ring-offset-[#1e293b] scale-110" : "hover:scale-105"}`} />
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 sm:gap-4 pt-4 sm:pt-6">
                      <button type="submit" className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold shadow-xl shadow-indigo-500/20 transition-all active:scale-95">
                        {editingEvent ? "Save Changes" : "Create Event"}
                      </button>
                      <button type="button" onClick={() => { setShowForm(false); setEditingEvent(null); }} className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 text-white rounded-2xl font-bold hover:bg-white/10 transition-all">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;