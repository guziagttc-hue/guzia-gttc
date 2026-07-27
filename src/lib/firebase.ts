import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, update, child, runTransaction } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDFafiWmm9B_IZfejnLsAqM5WSKnFx-_QE",
  authDomain: "studio-1919933473-43294.firebaseapp.com",
  databaseURL: "https://studio-1919933473-43294-default-rtdb.firebaseio.com",
  projectId: "studio-1919933473-43294",
  storageBucket: "studio-1919933473-43294.firebasestorage.app",
  messagingSenderId: "19444598819",
  appId: "1:19444598819:web:bc507f1c04e0ff7cb60996"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export const createUser = async (userData: any) => {
    const dbRef = ref(db);
    const usersSnapshot = await get(child(dbRef, 'users'));
    const users = usersSnapshot.val() || [];
    
    if (users.find((u: any) => u.email === userData.email.trim().toLowerCase())) {
        throw new Error("এই ইমেইলে ইতিমধ্যে একটি একাউন্ট আছে!");
    }
    const newUser = {
        ...userData,
        id: Date.now().toString(),
        email: userData.email.trim().toLowerCase(),
        balance: 1000, // Initial balance
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    await set(ref(db, 'users'), users);
    return newUser;
};

export const findUserByContact = async (contact: string) => {
    const dbRef = ref(db);
    const usersSnapshot = await get(child(dbRef, 'users'));
    const users = usersSnapshot.val() || [];
    return users.find((u: any) => u.email === contact.trim().toLowerCase()) || null;
};

export const transferMoney = async (senderId: string, receiverId: string, amount: number) => {
    const dbRef = ref(db);
    const usersRef = ref(db, 'users');
    
    // Using transaction to ensure atomic updates
    return await runTransaction(usersRef, (users) => {
        if (!users) return null;

        const sender = users.find((u: any) => u.id === senderId);
        const receiver = users.find((u: any) => u.id === receiverId);

        if (!sender || !receiver) {
            throw new Error("ইউজার খুঁজে পাওয়া যায়নি!");
        }
        
        if ((sender.balance || 0) < amount) {
            throw new Error("পর্যাপ্ত ব্যালেন্স নেই!");
        }

        sender.balance = (sender.balance || 0) - amount;
        receiver.balance = (receiver.balance || 0) + amount;

        return users;
    });
};

