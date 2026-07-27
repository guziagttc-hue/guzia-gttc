export type Screen = "registration" | "login" | "dashboard" | "send-money" | "cash-out" | "merchant-pay" | "my-qr" | "agent-dashboard" | "transaction-history" | "profile" | "request-money" | "notifications" | "admin-request" | "admin-panel" | "helpline";

export interface UserData {
  email: string;
  name: string;
  district?: string;
  thana?: string;
  union?: string;
  password?: string;
  role: 'user' | 'agent';
  biometricEnabled?: boolean;
  address?: string;
  profilePictureUrl?: string;
  idCardUrl?: string;
}

export interface Notification {
  id: number;
  type: "security" | "offer" | "transaction";
  title: string;
  message: string;
  time: string;
}

export interface MoneyRequest {
  id: number;
  agentPhone: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  time: string;
}
