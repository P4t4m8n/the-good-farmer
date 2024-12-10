"use client";
import Button from "@/components/General/Button";
import Input from "@/components/General/Input";
import { useUser } from "@/hooks/useUser";
import { signIn, signUp } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export default function AuthFormClient() {
  const [isLogin, setIsLogin] = useState(true);
  const [state, formAction, isPending] = useActionState(
    isLogin ? signIn : signUp,
    null
  );
  const router = useRouter();
  const { setUser } = useUser();
  useEffect(() => {
    if (state) {
      setUser(state);
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  const inputs = isLogin ? LOGIN_INPUTS : SIGN_UP_INPUTS;
  return (
    <div className="flex flex-col items-center p-4 gap-8 bg-white">
      <header className="">{isLogin ? "Login" : "Sign-Up"}</header>
      <form action={formAction}>
        {inputs.map((input) => (
          <Input key={input.name} inputProps={input} />
        ))}
        <div className="grid">
          <div className="grid grid-cols-2 gap-2">
            <Button
              style="tertiary"
              size="medium"
              type="reset"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              style="primary"
              size="medium"
              type="submit"
              disabled={isPending}
            >
              {isLogin ? "Login" : "Sign-Up"}
            </Button>
          </div>
          <Button
            style="secondary"
            size="medium"
            type="button"
            disabled={isPending}
            onClick={() => setIsLogin((prev) => !prev)}
          >
            <span className="underline">
              {isLogin ? "Change to Sign-Up" : "Change to Sign-In"}
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
}

const LOGIN_INPUTS: TInput[] = [
  {
    type: "email",
    placeholder: "Email",
    name: "email",
    required: true,
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", // Normal email format
    title: "Please enter a valid email address.",
  },
  {
    type: "password",
    placeholder: "Password",
    name: "password",

    autoComplete: "current-password",
    pattern: "^(?=.*[A-Z])(?=.*\\d).{6,}$", // At least 6 chars, 1 uppercase, 1 number
    required: true,
    title:
      "Password must be at least 6 characters long, contain an uppercase letter and a number.",
  },
];

const SIGN_UP_INPUTS: TInput[] = [
  ...LOGIN_INPUTS,
  {
    type: "text",
    placeholder: "First name",
    name: "firstName",

    required: true,
    title: "First name must contain at least 2 letters.",
    pattern: "^[a-zA-Z]{2,}$", // Only letters, at least 2 characters
  },
  {
    type: "text",
    placeholder: "Last name",
    name: "lastName",

    autoComplete: "family-name",
    required: true,
    title: "Last name must contain at least 2 letters.",
    pattern: "^[a-zA-Z]{2,}$", // Only letters, at least 2 characters
  },
];
