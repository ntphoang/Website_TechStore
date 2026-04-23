import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { HiHome, HiShoppingBag, HiClipboardList, HiCog, HiViewList } from 'react-icons/hi';

interface MenuItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  requireAuth?: boolean;
  roles?: string[];
}

interface SlideBarProps {
  menuItems?: MenuItem[];
  isOpen?: boolean;
  onClose?: () => void;
}

const defaultMenuItems: MenuItem[] = [
  { title: 'Trang chủ', path: '/', icon: <HiHome className="w-6 h-6" /> },
  { title: 'Sản phẩm', path: '/products', icon: <HiShoppingBag className="w-6 h-6" /> },
  {
    title: 'QL Đơn hàng',
    path: '/admin/orders',
    icon: <HiClipboardList className="w-6 h-6" />,
    requireAuth: true,
    roles: ['admin'],
  },
  {
    title: 'Quản trị',
    path: '/admin/dashboard',
    icon: <HiCog className="w-6 h-6" />,
    roles: ['admin'],
  },
  {
    title: 'QL Sản phẩm',
    path: '/admin/products',
    icon: <HiViewList className="w-6 h-6" />,
    roles: ['admin'],
  },
];

export default function SlideBar({ menuItems = defaultMenuItems, isOpen, onClose }: SlideBarProps) {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredMenuItems = menuItems.filter((item) => {
    if (item.requireAuth && !isAuthenticated) return false;
    if (item.roles && user && !item.roles.includes(user.role)) return false;
    return true;
  });

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-screen bg-white border-r border-slate-100 shadow-xl lg:shadow-none z-50 transition-all duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static ${isCollapsed ? 'lg:w-20' : 'lg:w-64'} w-64`}
      >
        <div className="flex justify-end p-4 lg:block hidden">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-xl text-slate-400 hover:bg-pastel-ice hover:text-pastel-teal transition-colors"
          >
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2 px-4">
          <ul className="space-y-2">
            {filteredMenuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-pastel-ice text-pastel-teal font-extrabold shadow-sm'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-pastel-teal font-semibold'
                    } ${isCollapsed ? 'justify-center' : ''}`
                  }
                  title={isCollapsed ? item.title : ''}
                >
                  <span className="transition-transform duration-200 group-hover:scale-110">
                    {item.icon}
                  </span>
                  {!isCollapsed && <span className="ml-3 tracking-wide">{item.title}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
