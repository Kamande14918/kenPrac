//Simulate a tiny backend using localStorage for persistence.
//Provides helpers to register/login users and store a `currentUser` session.

function getUsers(){
    try{
        return JSON.parse(localStorage.getItem('users')) || [];

    } catch{
        return [];
    }


}
 function registerUser(name, email, password){
    try{
    const users = getUsers();
    const existing = users.find( u => u.email === email);
    if(existing){
        throw new Error('User already exists');
    }
    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password,
        cart: []
    }
    users.push(newUser);
    localStorage.setItem('users',JSON.stringify(users));
    //return  a public user shape
    return {id: newUser.id, name: newUser.name, email: newUser.email};
} catch (error){
    throw new Error('Registration failed',error);
}
}

function loginUser(email, password){
    const users = getUsers();
    const user = users.find( u => u.email === email && u.password === password);
    if(!user) throw new Error ('Invalid credentials');
    return {id: user.id, name: user.name, email: user.email};
}

 function setCurrentUser(user){
    try{
        localStorage.setItem('currentUser', JSON.stringify(user))
    } catch{
        //ignore
    }
}

 function getCurrentUser(){
    try{
        return JSON.parse(localStorage.getItem('currentUser')) || null;
    } catch{
        return null;
    }
}

 function logoutUser(){
    try {
        localStorage.removeItem('currentUser');
    } catch{
        //ignore
    }
}

// Per-user cart helpers
function getUserCart(userId){
   if(!userId) return [];
   const users = getUsers();
   const user = users.find(u => u.id === userId);
   return user ? (user.cart || []) : [];
}

function setUserCart(userId, cart){
   if(!userId) return;
   const users = getUsers();
   const idx = users.findIndex(u => u.id === userId);
   if(idx === -1) return;
   users[idx] = {...users[idx], cart};
   try{
       localStorage.setItem('users', JSON.stringify(users));
   } catch{
       // ignore
   }
}

export {getUsers, registerUser, loginUser, setCurrentUser, getCurrentUser, logoutUser, getUserCart, setUserCart};
