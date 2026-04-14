import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  HiHome,
  HiShoppingBag,
  HiShoppingCart,
  HiClipboardList,
  HiCog,
  HiViewList,
} from 'react-icons/hi';

interface MenuItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  requireAuth?: boolean;
  roles?: string[];
}

interface SlideBarProps {
  menuItems?: MenuItem[];
}

const defaultMenuItems: MenuItem[] = [
  { title: 'Trang chủ', path: '/', icon: <HiHome className="w-6 h-6" /> },
  { title: 'Sản phẩm', path: '/products', icon: <HiShoppingBag className="w-6 h-6" /> },
  {
    title: 'Giỏ hàng',
    path: '/cart',
    icon: <HiShoppingCart className="w-6 h-6" />,
    requireAuth: true,
  },
  {
    title: 'Đơn hàng',
    path: '/orders',
    icon: <HiClipboardList className="w-6 h-6" />,
    requireAuth: true,
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

const SlideBar: React.FC<SlideBarProps> = ({ menuItems = defaultMenuItems }) => {
  const { isAuthenticated, user } = useSelector((state: typeof RootState) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const filteredMenuItems = menuItems.filter((item) => {
    if (item.requireAuth && !isAuthenticated) return false;
    if (item.roles && user && !item.roles.includes(user.role)) return false;
    return true;
  });

  const handleLinkClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg z-50 transition-all duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:shadow-none ${isCollapsed ? 'lg:w-20' : 'lg:w-64'} w-64`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && <h2 className="text-xl font-bold text-gray-800">TechStore</h2>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-md hover:bg-gray-100 lg:block hidden"
          >
            <svg
              className={`w-6 h-6 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-4">
          <ul className="space-y-2 px-4">
            {filteredMenuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-md transition-colors ${
                      isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                    } ${isCollapsed ? 'justify-center' : ''}`
                  }
                >
                  {item.icon}
                  {!isCollapsed && <span className="ml-3">{item.title}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SlideBar;
