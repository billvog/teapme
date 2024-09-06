"use client";

import TeapCard from "@/components/teap-card";
import { Teap } from "@prisma/client";

type TopTeapersProps = {
  teaps: Teap[];
};

export default async function TopTeapers({ teaps }: TopTeapersProps) {
  return (
    <div>
      {teaps.map((teap) => (
        <TeapCard key={teap.id} teap={teap} />
      ))}
    </div>
  );
}
