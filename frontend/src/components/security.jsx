export default function Security() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Security</h3>

      <button className="block w-full text-left p-3 border rounded mb-3">
        Change Password
      </button>

      <button className="block w-full text-left p-3 border border-red-300 text-red-600 rounded">
        Delete Account
      </button>
    </div>
  );
}