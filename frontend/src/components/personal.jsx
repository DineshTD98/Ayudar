export default function Personal() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>

      <input className="border p-2 w-full mb-3" placeholder="Full Name" />
      <input className="border p-2 w-full mb-3" placeholder="Phone" />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Save
      </button>
    </div>
  );
}