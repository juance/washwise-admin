export type Role = 'admin' | 'cashier' | 'operator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type PaymentMethod = 'cash' | 'debit' | 'mercadopago' | 'cuenta_dni';

export interface LaundryService {
  id: string;
  name: string;
  price: number;
  quantity?: number;
}

export interface Ticket {
  id: string;
  ticketNumber?: string;
  basketTicketNumber?: string;
  clientName: string;
  phoneNumber: string;
  services: {
    id?: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  paymentMethod: PaymentMethod;
  totalPrice: number;
  status: 'pending' | 'processing' | 'ready' | 'delivered';
  createdAt: string;
  updatedAt: string;
  deliveredDate?: string;
  isPaid?: boolean;
  valetQuantity?: number;
}

export interface Metrics {
  daily: {
    income: number;
    expenses: number;
  };
  weekly: {
    income: number;
    expenses: number;
  };
  monthly: {
    income: number;
    expenses: number;
  };
}

export type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  threshold: number;
  unit: string;
  lastUpdated: string;
};

export interface ClientVisit {
  id: string;
  phoneNumber: string;
  clientName: string;
  visitCount: number;
  lastVisit: string;
  valetsCount?: number;
  freeValets?: number;
  visitFrequency?: string;
  loyaltyPoints?: number;
}

export type LaundryOption = 'separateByColor' | 'delicateDry' | 'stainRemoval' | 'bleach' | 'noFragrance' | 'noDry';

export interface LaundryOptions {
  separateByColor: boolean;
  delicateDry: boolean;
  stainRemoval: boolean;
  bleach: boolean;
  noFragrance: boolean;
  noDry: boolean;
}

export interface DryCleaningItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  ticketId: string;
}

export interface Customer {
  id: string;
  name: string;
  phoneNumber: string;
  createdAt: string;
  lastVisit?: string;
  loyaltyPoints: number;
  valetsCount: number;
  freeValets: number;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  createdAt: string;
}

export interface DailyMetrics {
  totalSales: number;
  valetCount: number;
  paymentMethods: {
    cash: number;
    debit: number;
    mercadopago: number;
    cuentaDni: number;
  };
  dryCleaningItems: Record<string, number>;
}

export interface WeeklyMetrics {
  salesByDay: Record<string, number>;
  valetsByDay: Record<string, number>;
  paymentMethods: {
    cash: number;
    debit: number;
    mercadopago: number;
    cuentaDni: number;
  };
  dryCleaningItems: Record<string, number>;
}

export interface MonthlyMetrics {
  salesByWeek: Record<string, number>;
  valetsByWeek: Record<string, number>;
  paymentMethods: {
    cash: number;
    debit: number;
    mercadopago: number;
    cuentaDni: number;
  };
  dryCleaningItems: Record<string, number>;
}

export interface LoyaltyReward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  isAvailable: boolean;
}

export interface CustomerFeedback {
  id: string;
  customerId: string;
  customerName: string;
  comment: string;
  rating: number;
  createdAt: string;
}
