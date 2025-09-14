"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/apiManager";

function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");

  const handleClickSignUp = useCallback(async () => {
    if (!email || !password || !passwordConfirm || !name) {
      alert("모든 필드를 입력해주세요.");
    }

    try {
      const response = await signUp(email, password, name);

      if (response.ok) {
        router.replace("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  }, [email, password, passwordConfirm, name, router]);

  return (
    <div>
      <p className="text-2xl font-bold text-center">Sign Up</p>

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
        <Input
          type="password"
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <Input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button className="w-full" onClick={handleClickSignUp}>
          Sign Up
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button asChild variant="link" className="w-full">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}

export default SignUpPage;
