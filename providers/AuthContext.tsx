"use client";

import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
  FC,
} from "react";

import { authClientService } from "@/lib/services/client/auth.client.service";
import { IUser } from "@/types/user";

interface Props {
  children: React.ReactNode;
}
interface AuthProvider {
  user: IUser | null;
  logout: () => Promise<void>;
  getCurrentUserNoRender: () => IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const authContext = createContext<AuthProvider | undefined>(undefined);

export const AuthProvider: FC<Props> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<IUser | null>(null);

  //Access the state value without causing a re-render
  const userRef = useRef<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authClientService.getSession();
        setUser(user);
        userRef.current = user;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await authClientService.logout();
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setUser(null);
      userRef.current = null;
    }
  };

  const getCurrentUserNoRender = () => userRef.current;

  return (
    <authContext.Provider
      value={{ user, logout, getCurrentUserNoRender, setUser }}
    >
      {children}
    </authContext.Provider>
  );
};
