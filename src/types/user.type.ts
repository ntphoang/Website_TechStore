export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  phone?: string;
  address?: string;
  status?: 'active' | 'banned';
  joinDate?: string;
}