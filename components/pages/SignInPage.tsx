"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickSignIn = useCallback(async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
    }

    signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  }, [email, password]);

  return (
    <div>
      <p className="text-2xl font-bold text-center">Sign In</p>

      <div className="mt-8 space-y-4">
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button className="w-full" onClick={handleClickSignIn}>
          Sign In
        </Button>
        <Button asChild className="w-full">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
        <Button asChild className="w-full">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}

export default SignInPage;
