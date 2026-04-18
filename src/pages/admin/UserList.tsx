import { useState } from 'react';
import { HiOutlinePencil, HiOutlineTrash, HiOutlineMail, HiOutlinePhone, HiOutlineLockClosed } from 'react-icons/hi';
import Badge from '../../components/Badge';

import type { User } from '../../types';

const mockUsers: User[] = [
  { id: 1, name: 'Nguyễn Trần Phi Hoàng', email: 'admin@techstore.com', role: 'admin', phone: '0901234567', status: 'active', joinDate: '10/01/2026' },
  { id: 2, name: 'Trần Văn Hải', email: 'hai.tran@email.com', role: 'user', phone: '0912345678', status: 'active', joinDate: '15/02/2026' },
  { id: 4, name: 'Phạm Thị D', email: 'pham.d@email.com', role: 'user', status: 'locked', joinDate: '01/04/2026' },
];

export default function UserList() {
  const [users] = useState<User[]>(mockUsers);

  const getAvatarColor = (name: string) => {
    const colors = ['bg-pastel-teal text-white', 'bg-pastel-peach text-amber-900', 'bg-pastel-mint text-emerald-900'];
    return colors[name.charCodeAt(0) % colors.length];
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[32px] shadow-sm border border-slate-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-pastel-mint/30 rounded-2xl flex items-center justify-center text-emerald-700 font-black text-xl">
            {users.length}
          </div>
          <h1 className="text-2xl font-black text-slate-800">Quản lý Tài khoản</h1>
        </div>
        <button className="px-6 py-3 bg-pastel-teal text-white font-bold rounded-xl shadow-lg hover:bg-[#326e6e] transition-colors">
          + Thêm người dùng
        </button>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-slate-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-widest">
                <th className="px-8 py-5 font-bold">Người dùng</th>
                <th className="px-8 py-5 font-bold">Liên hệ</th>
                <th className="px-8 py-5 font-bold">Vai trò & Trạng thái</th>
                <th className="px-8 py-5 font-bold text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50/80">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-pastel-ice/10 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${getAvatarColor(user.name)}`}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{user.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium">ID: #{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-sm font-medium text-slate-600">
                    <div className="flex items-center gap-2"><HiOutlineMail className="text-slate-400" /> {user.email}</div>
                    {user.phone && <div className="flex items-center gap-2 mt-1 text-xs"><HiOutlinePhone className="text-slate-400" /> {user.phone}</div>}
                  </td>
                  <td className="px-8 py-4 space-y-2">
                    <Badge variant={user.role === 'admin' ? 'teal' : 'ice'}>{user.role === 'admin' ? 'Quản trị' : 'Khách hàng'}</Badge>
                    {user.status === 'locked' && <div className="flex items-center gap-1 text-[10px] font-bold text-red-500"><HiOutlineLockClosed /> KHÓA</div>}
                  </td>
                  <td className="px-8 py-4 flex justify-center gap-2">
                    <button className="p-2 bg-slate-50 text-slate-500 hover:bg-pastel-yellow hover:text-yellow-800 rounded-xl transition-colors"><HiOutlinePencil /></button>
                    {user.role !== 'admin' && <button className="p-2 bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors"><HiOutlineTrash /></button>}
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