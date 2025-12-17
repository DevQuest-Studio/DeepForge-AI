export default function Sidebar({ user }: any) {
  return (
    <div className="w-64 bg-gray-900 p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">DeepForge AI</h2>
      <p className="mb-4">{user?.displayName}</p>
      <button className="mb-2 px-2 py-1 bg-blue-600 rounded">New Vehicle</button>
      <button className="mb-2 px-2 py-1 bg-blue-600 rounded">New Microcontroller</button>
      <button className="mb-2 px-2 py-1 bg-blue-600 rounded">New Lua Touchscreen</button>
      <button className="mt-auto px-2 py-1 bg-red-600 rounded" onClick={() => auth.signOut()}>
        Sign out
      </button>
    </div>
  );
}
