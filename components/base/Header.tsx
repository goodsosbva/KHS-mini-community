"use client";

import Link from "next/link";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  session: Session | null;
}

function Header(props: HeaderProps) {
  const { session } = props;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">MC</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            KHS Mini Community
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {session?.user ? (
            <>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  안녕하세요, {session.user.name}님
                </span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => signOut()}
                className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
              >
                로그아웃
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
            >
              <Link href="/sign-in">로그인</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
