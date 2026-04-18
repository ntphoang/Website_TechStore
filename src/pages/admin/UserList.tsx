import { useState } from 'react';
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLockClosed,
} from 'react-icons/hi';
import type { User } from '../../types/user.type';
import Badge from '../../components/Badge';

// Dữ liệu mẫu tạm thời để test UI
const mockUsers: User[] = [
  {
    id: 1,
    name: 'Nguyễn Trần Phi Hoàng',
    email: 'admin@techstore.com',
    role: 'admin',
    phone: '0901234567',
    status: 'active',
    joinDate: '10/01/2026',
  },
  {
    id: 2,
    name: 'Trần Văn Hải',
    email: 'hai.tran@email.com',
    role: 'user',
    phone: '0912345678',
    status: 'active',
    joinDate: '15/02/2026',
  },
  {
    id: 3,
    name: 'Lê Đình Sỹ',
    email: 'sy.le@email.com',
    role: 'user',
    phone: '0987654321',
    status: 'active',
    joinDate: '20/03/2026',
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    email: 'pham.d@email.com',
    role: 'user',
    status: 'locked',
    joinDate: '01/04/2026',
  },
];

// Hàm tạo màu nền ngẫu nhiên cho Avatar Pastel dựa vào ký tự đầu của tên
const getAvatarColor = (name: string) => {
  const colors = [
    'bg-pastel-teal text-white',
    'bg-pastel-peach text-amber-900',
    'bg-pastel-mint text-emerald-900',
    'bg-pastel-yellow text-yellow-900',
    'bg-slate-200 text-slate-700',
  ];
  const charCode = name.charCodeAt(0);
  return colors[charCode % colors.length];
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>(mockUsers);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[32px] shadow-sm border border-slate-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-pastel-mint/30 rounded-2xl flex items-center justify-center text-emerald-700 font-black text-xl">
            {users.length}
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800">Quản lý Tài khoản</h1>
            <p className="text-slate-500 text-sm mt-0.5 font-medium">
              Danh sách thành viên và phân quyền hệ thống
            </p>
          </div>
        </div>
        {/* Nút thêm mới */}
        <div className="flex gap-2">
          <button className="px-6 py-3 bg-pastel-teal text-white font-bold rounded-xl shadow-lg shadow-pastel-teal/20 hover:bg-[#326e6e] transition-colors">
            + Thêm người dùng
          </button>
        </div>
      </div>

      {/* Bảng dữ liệu (Table) */}
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-widest">
                <th className="px-8 py-5 font-bold">Người dùng</th>
                <th className="px-8 py-5 font-bold">Liên hệ</th>
                <th className="px-8 py-5 font-bold">Ngày tham gia</th>
                <th className="px-8 py-5 font-bold">Vai trò & Trạng thái</th>
                <th className="px-8 py-5 font-bold text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50/80">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-pastel-ice/10 transition-colors group">
                  {/* Cột Người dùng (Avatar + Tên) */}
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${getAvatarColor(user.name)}`}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{user.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5 uppercase tracking-wider">
                          ID: #{user.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Cột Liên hệ */}
                  <td className="px-8 py-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                        <HiOutlineMail className="w-4 h-4 text-slate-400" />
                        {user.email}
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <HiOutlinePhone className="w-3.5 h-3.5 text-slate-400" />
                          {user.phone}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Cột Ngày tham gia */}
                  <td className="px-8 py-4 text-sm font-medium text-slate-500">{user.joinDate}</td>

                  {/* Cột Vai trò & Trạng thái */}
                  <td className="px-8 py-4 space-y-2">
                    <div>
                      {user.role === 'admin' ? (
                        <Badge variant="teal">Quản trị viên</Badge>
                      ) : (
                        <Badge variant="ice">Khách hàng</Badge>
                      )}
                    </div>
                    {user.status === 'locked' && (
                      <div className="flex items-center gap-1 text-[10px] font-bold text-red-500 uppercase tracking-widest mt-1">
                        <HiOutlineLockClosed className="w-3 h-3" />
                        Đã khóa
                      </div>
                    )}
                  </td>

                  {/* Cột Hành động */}
                  <td className="px-8 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="p-2 bg-slate-50 text-slate-500 hover:bg-pastel-yellow hover:text-yellow-800 rounded-xl transition-colors"
                        title="Chỉnh sửa"
                      >
                        <HiOutlinePencil className="w-5 h-5" />
                      </button>
                      {user.role !== 'admin' && (
                        <button
                          className="p-2 bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors"
                          title="Khóa/Xóa tài khoản"
                        >
                          <HiOutlineTrash className="w-5 h-5" />
                        </button>
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
