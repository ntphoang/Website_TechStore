export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  phone?: string;
  status: 'active' | 'locked';
  joinDate: string;
}