"use client";

import { createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  authToken: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ 
  children, 
  authToken 
}: { 
  children: ReactNode;
  authToken: string;
}) {
  return (
    <AuthContext.Provider value={{ authToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 