
export const users = JSON.parse(localStorage.getItem('demoUsers') || '[]');

export const saveUsers = (updatedUsers: any[]) => {
    localStorage.setItem('demoUsers', JSON.stringify(updatedUsers));
};

export const createUser = async (userData: any) => {
    const existingUsers = JSON.parse(localStorage.getItem('demoUsers') || '[]');
    if (existingUsers.find((u: any) => u.email === userData.email.trim().toLowerCase())) {
        throw new Error("এই ইমেইলে ইতিমধ্যে একটি একাউন্ট আছে!");
    }
    const newUser = {
        ...userData,
        id: Date.now().toString(),
        email: userData.email.trim().toLowerCase(),
        balance: 1000, // Demo balance
        createdAt: new Date().toISOString()
    };
    existingUsers.push(newUser);
    saveUsers(existingUsers);
    return newUser;
};

export const findUserByContact = async (contact: string) => {
    const users = JSON.parse(localStorage.getItem('demoUsers') || '[]');
    return users.find((u: any) => u.email === contact.trim().toLowerCase()) || null;
};

export const updateUserPassword = async (email: string, newPassword: string) => {
    const users = JSON.parse(localStorage.getItem('demoUsers') || '[]');
    const userIndex = users.findIndex((u: any) => u.email === email.trim().toLowerCase());
    if (userIndex !== -1) {
        users[userIndex].password_hash = newPassword;
        saveUsers(users);
    } else {
        throw "ইউজার খুঁজে পাওয়া যায়নি!";
    }
};

export const transferMoney = async (senderId: string, receiverId: string, amount: number) => {
    const users = JSON.parse(localStorage.getItem('demoUsers') || '[]');
    const sender = users.find((u: any) => u.id === senderId);
    const receiver = users.find((u: any) => u.id === receiverId);

    if (!sender || !receiver) {
        throw "ইউজার খুঁজে পাওয়া যায়নি!";
    }
    
    if ((sender.balance || 0) < amount) {
        throw "পর্যাপ্ত ব্যালেন্স নেই!";
    }

    sender.balance = (sender.balance || 0) - amount;
    receiver.balance = (receiver.balance || 0) + amount;
    saveUsers(users);
};
