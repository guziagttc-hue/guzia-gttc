export type Screen = "registration" | "registration-name" | "registration-id" | "otp" | "pin-setup" | "success" | "login" | "forgot-pin" | "dashboard" | "send-money" | "cash-out" | "merchant-pay" | "my-qr" | "agent-dashboard" | "transaction-history" | "profile" | "request-money" | "notifications" | "admin-request" | "admin-panel";

export interface UserData {
  phone: string;
  email: string;
  name: string;
  district?: string;
  thana?: string;
  union?: string;
  pin: string;
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
