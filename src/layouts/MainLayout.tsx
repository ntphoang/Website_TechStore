import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div>
      <header className="p-4 bg-gray-800 text-white">Header</header>
      <main className="p-4">
        <Outlet />
      </main>
      <footer className="p-4 bg-gray-200 text-center">Footer</footer>
    </div>
  );
}
