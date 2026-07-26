import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { ServiceGrid } from "./components/ServiceButtons";
import { RecentTransactions } from "./components/RecentTransactions";
import { BottomNav } from "./components/BottomNav";
import { Step1, Step2, AgentIdStep } from "./components/RegistrationSteps";
import { LoginScreen } from "./components/LoginScreen";
import { Keypad, PinDisplay } from "./components/AuthCommon";
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
import { ForgotPassword } from "./components/ForgotPassword";
import { apiCall } from "./lib/api";

export default function App() {
  const [screen, setScreen] = useState<Screen>("registration");
  const [userData, setUserData] = useState<UserData>({
    phone: "",
    email: "",
    name: "",
    district: "",
    thana: "",
    union: "",
    pin: "",
    role: "user",
    biometricEnabled: false
  });
  const [tempPin, setTempPin] = useState("");
  const [otp, setOtp] = useState("");
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
    const userPhone = localStorage.getItem("userPhone");
    if (userPhone) {
      // Fetch user data
      apiCall('users', 'select', null, { column: 'phone', value: userPhone })
        .then(users => {
            if (users && users.length > 0) {
                setUserData(users[0]);
                if (isLoggedIn === "true") {
                  setScreen("dashboard");
                } else {
                  setScreen("login");
                }
            }
        });
    }
  }, []);

  const addTransaction = (transaction: any) => {
    const updated = [transaction, ...transactions];
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));
  };

  const addMoneyRequest = (request: any) => {
    const updated = [request, ...moneyRequests];
    setMoneyRequests(updated);
    localStorage.setItem("moneyRequests", JSON.stringify(updated));
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

  const renderRegistrationHeader = () => (
    <div className="p-6 pt-12 bg-white">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 bg-amber-500/10 border border-amber-400/30 rounded-lg flex justify-center items-center text-amber-500">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h1 className="text-[#0b2240] text-xs font-bold leading-none tracking-wider">Shondho MFS</h1>
        </div>
        <span className="text-amber-500 text-[10px] font-bold tracking-widest uppercase">
          {screen === "pin-setup" ? "পিন সেটআপ" : "রেজিস্ট্রেশন"}
        </span>
      </div>

      <div className="flex justify-start gap-1.5 mb-8">
        <span className={`h-1.5 rounded-full transition-all duration-300 ${screen === "registration" ? "w-8 bg-amber-500" : "w-4 bg-[#0b2240]"}`}></span>
        <span className={`h-1.5 rounded-full transition-all duration-300 ${screen === "registration-name" ? "w-8 bg-amber-500" : (screen === "registration" ? "w-4 bg-slate-200" : "w-4 bg-[#0b2240]")}`}></span>
        <span className={`h-1.5 rounded-full transition-all duration-300 ${screen === "pin-setup" ? "w-8 bg-amber-500" : (screen === "registration" || screen === "registration-name" ? "w-4 bg-slate-200" : "w-4 bg-[#0b2240]")}`}></span>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen flex justify-center text-slate-800 font-sans">
      <div className="w-full max-w-lg bg-white min-h-screen relative flex flex-col shadow-sm overflow-hidden">
        <AnimatePresence mode="wait">
          {screen === "registration" && (
            <div key="reg" className="flex-1 flex flex-col">
              {renderRegistrationHeader()}
              <Step1 
                onNext={(data) => {
                  setUserData({ ...userData, ...data });
                  updateStep("registration-name");
                }} 
                onBackToLogin={() => updateStep("login")}
                onGoToStart={() => updateStep("registration")}
              />
            </div>
          )}

          {screen === "registration-name" && (
            <div key="reg-name" className="flex-1 flex flex-col">
              {renderRegistrationHeader()}
              <Step2 
                onNext={(data) => { 
                    setUserData({ ...userData, ...data }); 
                    if (userData.role === 'agent') updateStep("registration-id");
                    else updateStep("pin-setup");
                }} 
                onPrev={() => updateStep("registration")} 
                onBackToLogin={() => updateStep("login")}
                onGoToStart={() => updateStep("registration")}
              />
            </div>
          )}

          {screen === "registration-id" && (
            <div key="reg-id" className="flex-1 flex flex-col">
              {renderRegistrationHeader()}
              <AgentIdStep 
                onNext={(data) => { 
                    setUserData({ ...userData, ...data }); 
                    updateStep("pin-setup"); 
                }} 
                onPrev={() => updateStep("registration-name")} 
                onBackToLogin={() => updateStep("login")}
                onGoToStart={() => updateStep("registration")}
              />
            </div>
          )}

          {screen === "pin-setup" && (
            <div key="pin" className="flex-1 flex flex-col">
              {renderRegistrationHeader()}
              <div className="flex-1 flex flex-col justify-between p-6">
                <div className="flex flex-col items-center text-center">
                  <h2 className="text-xl font-bold text-slate-800 mb-1">নতুন পিন সেট করুন</h2>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">পরবর্তীতে অ্যাপে ঢোকার জন্য ৪ ডিজিটের একটি পিন কোড সেট করুন। পিনটি গোপন রাখুন।</p>
                  <PinDisplay length={4} value={tempPin} masked />
                  <button 
                    onClick={async () => {
                      try {
                        const userToInsert = {
                          phone: userData.phone,
                          name: userData.name,
                          email: userData.email,
                          district: userData.district,
                          thana: userData.thana,
                          union: userData.union,
                          pin_hash: tempPin,
                          role: userData.role,
                          biometric_enabled: userData.biometricEnabled
                        };
                        await apiCall('users', 'insert', userToInsert);
                        localStorage.setItem("userPhone", userData.phone);
                        localStorage.setItem("userPin", tempPin);
                        setUserData({ ...userData, pin: tempPin });
                        updateStep("success");
                      } catch (error: any) {
                        console.error("Registration error:", error);
                        alert(`রেজিস্ট্রেশন ব্যর্থ হয়েছে: ${error.message || 'অজানা ত্রুটি'}`);
                      }
                    }}
                    className="w-full bg-[#0b2240] hover:bg-[#122e54] text-amber-400 font-bold py-4 rounded-2xl shadow-lg"
                  >
                    পিন নিশ্চিত করুন
                  </button>
                </div>
                <Keypad 
                  onKeyPress={(k) => tempPin.length < 4 && setTempPin(tempPin + k)}
                  onDelete={() => setTempPin(tempPin.slice(0, -1))}
                />
              </div>
            </div>
          )}

          {screen === "success" && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-5"
            >
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex justify-center items-center shadow-md border border-emerald-100">
                <Check size={40} className="text-emerald-500" strokeWidth={3} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">রেজিস্ট্রেশন সফল!</h2>
              <p className="text-xs text-slate-500 px-6 leading-relaxed">আপনার Shondho MFS একাউন্ট তৈরি ও পিন সেটআপ সফল হয়েছে। এবার পিন দিয়ে অ্যাপে প্রবেশ করুন।</p>
              <button 
                onClick={() => updateStep("login")}
                className="w-full bg-[#0b2240] hover:bg-[#122e54] text-amber-400 font-bold py-4 rounded-2xl shadow-lg"
              >
                লগইন স্ক্রিনে যান
              </button>
            </motion.div>
          )}

          {screen === "login" && (
            <LoginScreen 
              userName={userData.name} 
              userRole={userData.role}
              biometricEnabled={userData.biometricEnabled}
              correctPin={userData.pin}
              onLogin={() => {
                localStorage.setItem("isLoggedIn", "true");
                updateStep(userData.role === "agent" ? "agent-dashboard" : "dashboard");
              }}
              onForgotPassword={() => updateStep("forgot-pin")}
            />
          )}

          {screen === "forgot-pin" && (
             <ForgotPassword 
              onBack={() => updateStep("login")} 
              onGoToStart={() => updateStep("registration")}
              onUpdatePin={async (info, newPin) => {
                const users = await apiCall('users', 'select');
                const user = users.find((u: any) => u.phone === info || u.email === info);
                if (user) {
                  await apiCall('users', 'update', { pin_hash: newPin }, { column: 'phone', value: user.phone });
                  setUserData({ ...userData, pin: newPin });
                  alert("পিন সফলভাবে রিসেট হয়েছে!");
                  updateStep("login");
                } else {
                  alert("ইউজার পাওয়া যায়নি!");
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
              <AdminRequest onBack={() => updateStep("agent-dashboard")} onSendRequest={addMoneyRequest} />
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
              userPin={userData.pin}
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
              userPin={userData.pin}
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
              userPin={userData.pin}
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
              userPin={userData.pin}
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
              onBack={() => updateStep("dashboard")}
              onLogout={() => {
                localStorage.removeItem("isLoggedIn");
                setScreen("login");
              }}
              onUpdateUser={(data) => setUserData({ ...userData, ...data })}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

