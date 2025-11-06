// Simulates a tiny backend using localStorage for persistence.
// Provides helpers to register/login users and store a `currentUser` session.

export function getUsers() {
    try {
        return JSON.parse(localStorage.getItem('users')) || [];
    } catch {
        return [];
    }
}

export async function registerUser(name, email, password) {
    const users = getUsers();
    const existing = users.find(u => u.email === email);
    if (existing) {
        throw new Error('User already exists');
    }
    const newUser = { id: Date.now().toString(), name, email, password, cart: [] };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    // return public user shape
    return { id: newUser.id, name: newUser.name, email: newUser.email };
}

export async function loginUser(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    return { id: user.id, name: user.name, email: user.email };
}

export function setCurrentUser(user) {
    try {
        localStorage.setItem('currentUser', JSON.stringify(user));
    } catch {
        // ignore
    }
}

export function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('currentUser')) || null;
    } catch {
        return null;
    }
}

export function logoutUser() {
    try {
        localStorage.removeItem('currentUser');
    } catch {
        // ignore
    }
}

export default { getUsers, registerUser, loginUser, setCurrentUser, getCurrentUser, logoutUser };
