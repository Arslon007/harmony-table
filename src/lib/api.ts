// Backend API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: unknown
): Promise<T> {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data && (method === 'POST' || method === 'PUT')) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// API Service
export const api = {
  // Dashboard
  getStats: () => apiRequest<DashboardStats>('/Dashboard/stats'),
  getSalesChart: (period: string = 'today') => apiRequest<SalesChartData[]>(`/Dashboard/sales-chart?period=${period}`),
  getPopularItems: (limit: number = 10) => apiRequest<PopularItem[]>(`/Dashboard/popular-items?limit=${limit}`),
  getRecentOrders: (limit: number = 10) => apiRequest<RecentOrder[]>(`/Dashboard/recent-orders?limit=${limit}`),
  getTablesOverview: () => apiRequest<TableOverview[]>('/Dashboard/tables-overview'),

  // Categories
  getCategories: () => apiRequest<Category[]>('/Category'),
  getCategoryById: (id: number) => apiRequest<Category>(`/Category/${id}`),
  createCategory: (data: CreateCategoryDTO) => apiRequest<Category>('/Category', 'POST', data),
  updateCategory: (id: number, data: UpdateCategoryDTO) => apiRequest<Category>(`/Category/${id}`, 'PUT', data),
  deleteCategory: (id: number) => apiRequest<void>(`/Category/${id}`, 'DELETE'),

  // Products
  getProducts: () => apiRequest<Product[]>('/Product'),
  getProductById: (id: number) => apiRequest<Product>(`/Product/${id}`),
  getProductsByCategory: (categoryId: number) => apiRequest<Product[]>(`/Product/by-category/${categoryId}`),
  createProduct: async (data: CreateProductDTO): Promise<Product> => {
    const formData = new FormData();
    formData.append('Name', data.name);
    formData.append('BasePrice', String(data.basePrice));
    formData.append('CategoryId', String(data.categoryId));
    if (data.description) formData.append('Description', data.description);
    // imageUrl is not used - backend expects IFormFile for ImageUrl

    const response = await fetch(`${API_BASE_URL}/Product`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Xatolik yuz berdi' }));
      throw new Error(errorData.message || `Xatolik: ${response.status}`);
    }
    return response.json();
  },
  updateProduct: async (id: number, data: UpdateProductDTO): Promise<Product> => {
    const formData = new FormData();
    if (data.name) formData.append('Name', data.name);
    if (data.basePrice !== undefined) formData.append('BasePrice', String(data.basePrice));
    if (data.categoryId !== undefined) formData.append('CategoryId', String(data.categoryId));
    if (data.description) formData.append('Description', data.description);
    if (data.imageUrl) formData.append('ImageUrl', data.imageUrl);

    const response = await fetch(`${API_BASE_URL}/Product/${id}`, {
      method: 'PUT',
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Xatolik yuz berdi' }));
      throw new Error(errorData.message || `Xatolik: ${response.status}`);
    }
    return response.json();
  },
  deleteProduct: (id: number) => apiRequest<void>(`/Product?id=${id}`, 'DELETE'),

  // Orders
  getOrders: () => apiRequest<Order[]>('/Order'),
  createOrder: (data: CreateOrderDTO) => apiRequest<Order>('/Order', 'POST', data),
  updateOrder: (id: number, data: UpdateOrderDTO) => apiRequest<Order>(`/Order/${id}`, 'PUT', data),
  deleteOrder: (id: number) => apiRequest<void>(`/Order/${id}`, 'DELETE'),

  // Tables
  getTables: () => apiRequest<Table[]>('/Table/Get%20All'),
  getTableById: (id: number) => apiRequest<Table>(`/Table/Get%20by%20Id?id=${id}`),
  createTable: (data: CreateTableDTO) => apiRequest<Table>('/Table/Create', 'POST', data),
  deleteTable: (id: number) => apiRequest<void>(`/Table/Delete?id=${id}`, 'DELETE'),

  // Reservations
  getReservations: (date?: string) => apiRequest<Reservation[]>(`/Reservation${date ? `?date=${date}` : ''}`),
  getReservationById: (id: number) => apiRequest<Reservation>(`/Reservation/${id}`),
  createReservation: (data: CreateReservationDTO) => apiRequest<Reservation>('/Reservation', 'POST', data),
  updateReservation: (id: number, data: UpdateReservationDTO) => apiRequest<Reservation>(`/Reservation/${id}`, 'PUT', data),
  deleteReservation: (id: number) => apiRequest<void>(`/Reservation/${id}`, 'DELETE'),
  confirmReservation: (id: number) => apiRequest<void>(`/Reservation/${id}/confirm`, 'POST'),

  // Users
  login: (data: LoginDTO) => apiRequest<AuthResponse>('/User/Login', 'POST', data),
  register: (data: RegisterDTO) => apiRequest<AuthResponse>('/User/Register', 'POST', data),
  getCurrentUser: () => apiRequest<User>('/User/me'),
};

// Dashboard Types
export interface DashboardStats {
  dailySales: number;
  totalOrders: number;
  activeOrders: number;
  currentGuests: number;
  occupiedTables: number;
  totalTables: number;
  salesTrend: number;
}

export interface SalesChartData {
  time: string;
  sales: number;
}

export interface PopularItem {
  id: number;
  name: string;
  category: string;
  orders: number;
  revenue: string;
  trend: number;
}

export interface RecentOrder {
  id: string;
  table: number;
  items: number;
  total: string;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  time: string;
  waiter: string;
}

export interface TableOverview {
  id: number;
  number: number;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'billing';
  section: string;
}

// Entity Types
export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  basePrice: number;
  categoryId: number;
  imageUrl?: string;
  available: boolean;
}

export interface Order {
  id: number;
  tableId: number;
  userId: number;
  orderStatus: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  notes?: string;
  waiterName?: string;
  orderDetails: OrderDetail[];
}

export interface OrderDetail {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
}

export interface Table {
  id: number;
  tableNumber: number;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'billing';
  section: string;
}

export interface Reservation {
  id: number;
  customerName: string;
  customerPhone?: string;
  reservationTime: string;
  guestCount: number;
  notes?: string;
  isConfirmed: boolean;
  tableId: number;
  tableNumber: number;
  createdAt: string;
}

export interface User {
  id: number;
  userName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// DTOs
export interface CreateCategoryDTO {
  name: string;
  description?: string;
}

export interface UpdateCategoryDTO {
  name?: string;
  description?: string;
}

export interface CreateProductDTO {
  name: string;
  description?: string;
  basePrice: number;
  categoryId: number;
  imageUrl?: string;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  basePrice?: number;
  categoryId?: number;
  imageUrl?: string;
}

export interface CreateOrderDTO {
  tableId: number;
  items: { productId: number; quantity: number }[];
}

export interface UpdateOrderDTO {
  status?: string;
  notes?: string;
}

export interface CreateTableDTO {
  tableNumber: number;
  capacity: number;
  section?: string;
}

export interface CreateReservationDTO {
  customerName: string;
  customerPhone?: string;
  reservationTime: string;
  guestCount: number;
  notes?: string;
  tableId: number;
}

export interface UpdateReservationDTO {
  customerName?: string;
  customerPhone?: string;
  reservationTime?: string;
  guestCount?: number;
  notes?: string;
  isConfirmed?: boolean;
  tableId?: number;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
}

export default api;
