import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Modal } from "./components/Modal";
import { Header } from "./components/Header";
import { ServiceGrid } from "./components/ServiceButtons";
import { RecentTransactions } from "./components/RecentTransactions";
import { BottomNav } from "./components/BottomNav";
import { AuthScreen } from "./components/AuthScreen";
import { Screen, UserData, Notification } from "./types.ts";
import { Check } from "lucide-react";
import { SendMoneyFlow } from "./components/SendMoneyFlow";
import { CashOutFlow } from "./components/CashOutFlow";
import { MerchantPayFlow } from "./components/MerchantPayFlow";
import { MyQR } from "./components/MyQR";
import { AgentDashboard } from "./components/AgentDashboard";
import { AdminRequest } from "./components/AdminRequest";
import { AdminPanel } from "./components/AdminPanel";
import { Helpline } from "./components/Helpline";
import { TransactionHistory } from "./components/TransactionHistory";
import { Profile } from "./components/Profile";
import { Notifications } from "./components/Notifications";
import { RequestMoneyFlow } from "./components/RequestMoneyFlow";
import { RegistrationDetails } from "./components/RegistrationDetails";
import { createUser, findUserByContact, updateUser } from "./lib/firebase";

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [pendingUserData, setPendingUserData] = useState<Partial<UserData>>({});
  const [modal, setModal] = useState<{ isOpen: boolean, title: string, message: string }>({ isOpen: false, title: '', message: '' });
  const [userData, setUserData] = useState<UserData>({
    email: "",
    name: "",
    role: "user",
    biometricEnabled: false
  });
  const [balance, setBalance] = useState(5015.50);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: "security", title: "নিরাপত্তা সতর্কতা", message: "আপনার একাউন্টে নতুন ডিভাইস থেকে লগইন করা হয়েছে।", time: "২ মিনিট আগে" },
    { id: 2, type: "offer", title: "বিশেষ অফার", message: "বিকাশে ক্যাশ-ইন করুন আর পান ২০% ক্যাশব্যাক!", time: "১ ঘণ্টা আগে" },
    { id: 3, type: "transaction", title: "লেনদেন আপডেট", message: "আপনার ৫,০০০ টাকা সফলভাবে সেন্ড মানি হয়েছে।", time: "৩ ঘণ্টা আগে" },
  ]);
  const [moneyRequests, setMoneyRequests] = useState<any[]>([]);

  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
    }
    const savedRequests = localStorage.getItem("moneyRequests");
    if (savedRequests) {
        setMoneyRequests(JSON.parse(savedRequests));
    }
    
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userContact = localStorage.getItem("userContact");
    if (isLoggedIn === "true" && userContact) {
      findUserByContact(userContact).then(user => {
            if (user) {
                setUserData({
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  district: user.district,
                  thana: user.thana,
                  union: user.union,
                  password: user.password_hash,
                  role: user.role,
                  biometricEnabled: user.biometric_enabled
                });
                setBalance(user.balance || 0); // Set balance from user object
                setScreen("dashboard");
            }
        });
    }
  }, []);

  const addTransaction = (transaction: any) => {
    const updated = [transaction, ...transactions];
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));
  };

  const addNotification = (title: string, message: string) => {
    const newNotif: Notification = {
        id: Date.now(),
        type: "offer",
        title,
        message,
        time: "এইমাত্র"
    };
    setNotifications([newNotif, ...notifications]);
  };

  const formatBalance = (bal: number) => `৳ ${bal.toLocaleString('bn-BD', { minimumFractionDigits: 2 })}`;

  const updateStep = (next: Screen) => setScreen(next);

  return (
    <div className="bg-slate-50 min-h-screen flex justify-center text-slate-800 font-sans">
      <Modal {...modal} onClose={() => setModal({ ...modal, isOpen: false })} />
      <div className="w-full max-w-lg bg-white min-h-screen relative flex flex-col shadow-sm overflow-hidden">
        <AnimatePresence mode="wait">
          {screen === "login" && (
            <AuthScreen 
              onLogin={async (email, password) => {
                const user = await findUserByContact(email);
                if (user && user.password_hash === password) {
                    setUserData({
                      id: user.id,
                      email: user.email,
                      name: user.name,
                      password: user.password_hash,
                      role: user.role,
                    });
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("userContact", user.email);
                    setModal({ isOpen: true, title: "সফল", message: "লগইন সফল হয়েছে!" });
                    updateStep(user.role === "agent" ? "agent-dashboard" : "dashboard");
                } else {
                    setModal({ isOpen: true, title: "ত্রুটি", message: "ভুল ইমেইল বা পাসওয়ার্ড!" });
                }
              }}
              onRegister={async (email, password, name) => {
                setPendingUserData({ email, password_hash: password, name, role: 'user' });
                setScreen('registration-details');
              }}
            />
          )}

          {screen === "registration-details" && (
            <RegistrationDetails 
              onComplete={async (idNumber, phoneNumber) => {
                try {
                    await createUser({ ...pendingUserData, idCard: idNumber, phone: phoneNumber } as any);
                    setModal({ isOpen: true, title: "সফল", message: "রেজিস্ট্রেশন সফল হয়েছে!" });
                    setScreen('login');
                } catch (e: any) {
                    setModal({ isOpen: true, title: "ত্রুটি", message: e.message });
                }
              }}
            />
          )}

          {screen === "dashboard" && (
            <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col">
              <Header 
                balance={formatBalance(balance)} 
                onQRClick={() => updateStep("my-qr")} 
                onNotificationClick={() => updateStep("notifications")}
                userData={userData}
              />
              <ServiceGrid 
                onSendMoney={() => updateStep("send-money")} 
                onCashOut={() => updateStep("cash-out")}
                onMerchantPay={() => updateStep("merchant-pay")}
                onRequestMoney={() => updateStep("request-money")}
              />
              <RecentTransactions onSeeAll={() => updateStep("transaction-history")} />
              <div className="h-24" />
              <BottomNav 
                onAgentClick={() => updateStep("agent-dashboard")} 
                onProfileClick={() => updateStep("profile")}
                onHistoryClick={() => updateStep("transaction-history")}
              />
            </motion.div>
          )}

          {screen === "agent-dashboard" && (
            <motion.div key="agent-dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col">
              <AgentDashboard 
                onBack={() => updateStep("dashboard")}
                onNavigate={(s) => updateStep(s)}
              />
              <div className="h-24" />
              <BottomNav 
                onAgentClick={() => updateStep("agent-dashboard")} 
                onProfileClick={() => updateStep("profile")}
                onHistoryClick={() => updateStep("transaction-history")}
              />
            </motion.div>
          )}

          {screen === "admin-request" && (
            <div key="admin-req" className="flex-1 flex flex-col">
              <AdminRequest onBack={() => updateStep("agent-dashboard")} onSendRequest={() => {}} />
            </div>
          )}

          {screen === "admin-panel" && (
            <div key="admin-panel" className="flex-1 flex flex-col">
              <AdminPanel onBack={() => updateStep("agent-dashboard")} onAddNotification={addNotification} moneyRequests={moneyRequests} />
            </div>
          )}

          {screen === "helpline" && (
            <div key="helpline" className="flex-1 flex flex-col">
              <Helpline onBack={() => updateStep("agent-dashboard")} />
            </div>
          )}

          {screen === "send-money" && (
            <SendMoneyFlow 
              balance={formatBalance(balance)} 
              addTransaction={addTransaction}
              userPin={userData.password}
              senderId={userData.id!}
              onCancel={() => updateStep("dashboard")}
              onComplete={(amount) => {
                setBalance(balance - amount);
                updateStep("dashboard");
              }}
            />
          )}

          {screen === "cash-out" && (
            <CashOutFlow 
              balance={formatBalance(balance)} 
              addTransaction={addTransaction}
              userPin={userData.password}
              onCancel={() => updateStep("dashboard")}
              onComplete={(amount) => {
                setBalance(balance - amount);
                updateStep("dashboard");
              }}
            />
          )}

          {screen === "merchant-pay" && (
            <MerchantPayFlow 
              balance={formatBalance(balance)} 
              addTransaction={addTransaction}
              userPin={userData.password}
              onCancel={() => updateStep("dashboard")}
              onComplete={(amount) => {
                setBalance(balance - amount);
                updateStep("dashboard");
              }}
            />
          )}

          {screen === "request-money" && (
            <RequestMoneyFlow 
              balance={formatBalance(balance)} 
              addTransaction={addTransaction}
              userPin={userData.password}
              onCancel={() => updateStep("dashboard")}
              onComplete={(amount) => {
                setBalance(balance - amount);
                updateStep("dashboard");
              }}
            />
          )}

          {screen === "notifications" && (
            <Notifications notifications={notifications} onBack={() => updateStep("dashboard")} />
          )}

          {screen === "my-qr" && (
            <MyQR 
              name={userData.name}
              identifier={userData.phone || userData.email}
              onBack={() => updateStep("dashboard")}
            />
          )}

          {screen === "transaction-history" && (
            <TransactionHistory transactions={transactions} onBack={() => updateStep("dashboard")} />
          )}

          {screen === "profile" && (
            <Profile 
              userData={userData}
              balance={formatBalance(balance)}
              onBack={() => updateStep("dashboard")}
              onLogout={() => {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userContact");
                setScreen("login");
              }}
              onUpdateUser={async (data) => {
                if (userData.id) {
                    await updateUser(userData.id, data);
                    setUserData({ ...userData, ...data });
                }
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

