import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4">Sidebar Admin</aside>

      <div className="flex-1">
        <header className="p-4 bg-gray-800 text-white">Topbar Admin</header>

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
