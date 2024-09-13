import TeapCard from "@/components/ui/teap-card";
import { Teap } from "@prisma/client";

type TopTeapersProps = {
  teaps: Teap[];
};

export default function TopTeapers({ teaps }: TopTeapersProps) {
  return (
    <div className="flex w-full flex-col divide-y-2 divide-gray-100 border-t-2 border-gray-100">
      {teaps.map((teap) => (
        <TeapCard key={teap.id} teap={teap} />
      ))}
    </div>
  );
}
