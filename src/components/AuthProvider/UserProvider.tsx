"use client";
import { useState, createContext, useContext, useEffect } from "react";

type UserContextType = {
  email: string | undefined;
  role: string | undefined;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserContextType | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user || "{}"));
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ email: user?.email, role: user?.role }}>
      {loading ? <div>...loading</div> : children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};
