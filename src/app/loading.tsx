import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-10">
      <Loader2 size={32} className="animate-spin text-gray-400" />
    </div>
  );
}
