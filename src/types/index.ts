export interface Customer {
  id: string;
  name: string;
  weeklyTotal: number;
  dailyOrders: DailyOrder[];
}

export interface DailyOrder {
  date: string;
  items: OrderItem[];
  total: number;
}

export interface OrderItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  items: MenuItem[];
}