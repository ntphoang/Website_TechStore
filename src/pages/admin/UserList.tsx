import { useUsers } from '../../hooks/useUser';
import Badge from '../../components/Badge';
import LoadingSpinner from '../../components/LoadingSpinner';
import { HiOutlineLockClosed, HiOutlineLockOpen, HiOutlineUserCircle } from 'react-icons/hi';

import type { User } from '../../types';

export default function UserList() {
  const { users, isLoading, updateStatus, isUpdating } = useUsers();

  if (isLoading) return <div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* HEADER BẢNG ĐIỀU KHIỂN */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-[32px] shadow-sm border border-slate-50">
        <div className="w-12 h-12 bg-pastel-teal/20 rounded-2xl flex items-center justify-center text-pastel-teal font-black text-xl">
          {users.length}
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-800">Quản lý Tài khoản</h1>
          <p className="text-slate-500 text-sm font-medium">Kiểm soát người dùng hệ thống</p>
        </div>
      </div>

      {/* BẢNG DỮ LIỆU */}
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-widest font-bold">
                <th className="px-8 py-5">Tài khoản</th>
                <th className="px-8 py-5">Phân quyền</th>
                <th className="px-8 py-5">Ngày tham gia</th>
                <th className="px-8 py-5">Trạng thái</th>
                <th className="px-8 py-5 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50/80">
              {users.map((user: User) => (
                <tr key={user.id} className="hover:bg-pastel-ice/10 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <HiOutlineUserCircle className="w-10 h-10 text-slate-300" />
                      <div>
                        <p className="font-bold text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className={`text-xs font-black uppercase tracking-wider ${user.role === 'admin' ? 'text-purple-500' : 'text-slate-500'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-slate-600 font-medium">
                    {user.joinDate || 'Chưa cập nhật'}
                  </td>
                  <td className="px-8 py-4">
                    {user.status === 'banned' ? (
                      <Badge variant="peach">Bị khóa</Badge>
                    ) : (
                      <Badge variant="mint">Hoạt động</Badge>
                    )}
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* Không cho phép Admin tự khóa chính mình hoặc khóa Admin khác */}
                      {user.role !== 'admin' && (
                        user.status === 'active' ? (
                          <button 
                            disabled={isUpdating}
                            onClick={() => updateStatus({ id: user.id, status: 'banned' })}
                            className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                            title="Khóa tài khoản"
                          >
                            <HiOutlineLockClosed className="w-5 h-5" />
                          </button>
                        ) : (
                          <button 
                            disabled={isUpdating}
                            onClick={() => updateStatus({ id: user.id, status: 'active' })}
                            className="p-2 bg-emerald-50 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-xl transition-all"
                            title="Mở khóa tài khoản"
                          >
                            <HiOutlineLockOpen className="w-5 h-5" />
                          </button>
                        )
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}