"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ProtectedClientPage() {
  const { data: sesssion } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin?callbackUrl=/protected/client");
    },
  });

  if (sesssion) {
    return (
      <div>
        <h1>You are logged in!</h1>
        <button onClick={() => signOut()}>Sing out</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Your are not logged in!</h1>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}
