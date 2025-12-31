export default function Preferences() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Preferences</h3>

      <select className="border p-2 rounded w-full">
        <option>Sort documents by latest</option>
        <option>Sort by category</option>
      </select>
    </div>
  );
}