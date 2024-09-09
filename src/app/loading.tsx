import { Loader } from "lucide-react";
import React from "react";

export default function Login() {
  return (
    <main className="flex h-full w-full flex-1 flex-col items-center justify-center gap-10">
      <Loader size={32} className="animate-spin text-gray-400" />
    </main>
  );
}
