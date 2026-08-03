import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
 user: any;
 token: string | null;
 loading: boolean;
 login: (token: string, user: any) => void;
 logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
 user: null,
 token: null,
 loading: true,
 login: () => {},
 logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const [user, setUser] = useState<any>(null);
 const [token, setToken] = useState<string | null>(localStorage.getItem('admin_token'));
 const [loading, setLoading] = useState<boolean>(true);

 useEffect(() => {
 const savedToken = localStorage.getItem('admin_token');
 const savedUser = localStorage.getItem('admin_user');
 if (savedToken && savedUser) {
 setToken(savedToken);
 try {
 setUser(JSON.parse(savedUser));
 } catch {
 setUser({ email: 'admin@nilepixel.com' });
 }
 }
 setLoading(false);
 }, []);

 const login = (newToken: string, newUser: any) => {
 localStorage.setItem('admin_token', newToken);
 localStorage.setItem('admin_user', JSON.stringify(newUser));
 setToken(newToken);
 setUser(newUser);
 };

 const logout = () => {
 localStorage.removeItem('admin_token');
 localStorage.removeItem('admin_user');
 setToken(null);
 setUser(null);
 };

 return (
 <AuthContext.Provider value={{ user, token, loading, login, logout }}>
 {children}
 </AuthContext.Provider>
 );
};

export const useAuth = () => useContext(AuthContext);
