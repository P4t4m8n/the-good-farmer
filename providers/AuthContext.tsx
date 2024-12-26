/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
  FC,
} from "react";

import { useRouter } from "next/navigation";
import { authClientService } from "@/lib/services/client/auth.client.service";

interface Props {
  children: React.ReactNode;
}
interface AuthProvider {
  user: IUser | null;
  login: (formData: FormData) => Promise<void>;
  signUp: (formData: FormData) => Promise<void>;
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
  const router = useRouter();

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

  const login = async (formData: FormData) => {
    console.log("formData:", formData)
    try {
      //   const user = await authClientService.login(formData);
      //   if (!user) {
      //     throw new Error("No user returned from login");
      //   }
      //   userRef.current = user;
      //   setUser(user);

      redirectClient();
    } catch (error) {
      console.error("Error logging in:", error);
      setUser(null);
    }
  };

  const signUp = async (formData: FormData) => {
    console.log("formData:", formData)
    try {
      //   const user = await authClientService.signUp(formData);
      //   if (!user) {
      //     throw new Error("No user returned from sign-up");
      //   }
      //   userRef.current = user;
      //   setUser(user);
      redirectClient();
    } catch (error) {
      console.error("Error signing up:", error);
      setUser(null);
    }
  };

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

  const redirectClient = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <authContext.Provider
      value={{ user, login, signUp, logout, getCurrentUserNoRender, setUser }}
    >
      {children}
    </authContext.Provider>
  );
};
