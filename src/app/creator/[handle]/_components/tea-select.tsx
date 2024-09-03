"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";

export default function TeaSelect() {
  const options = [1, 2, 3];
  const unitPrice = 3;

  const [selected, setSelected] = React.useState<number | null>(null);

  const teapEmoji = React.useMemo(() => {
    if (!selected || selected === 0) {
      return null;
    }

    if (selected < 2) {
      return "☕️";
    } else if (selected < 3) {
      return "🍵";
    } else if (selected < 4) {
      return "🫖";
    } else if (selected < 5) {
      return "🫣";
    } else if (selected < 100) {
      return "🫨";
    } else {
      return "⭐️";
    }
  }, [selected]);

  return (
    <div className="flex flex-col space-y-4">
      <span className="text-xl font-bold">
        Get them a cup of tea.. <br />
        Teap 'em! <span className="ml-1">☕️</span>
      </span>
      <div className="flex space-x-2">
        {options.map((option) => (
          <div
            key={option}
            className={cn(
              "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-4",
              selected === option ? "border-blue-500" : "border-gray-300",
            )}
            onClick={() => setSelected(option)}
          >
            <span className="text-xl font-bold">{option}</span>
          </div>
        ))}
        <Input
          type="number"
          placeholder="Pick a number"
          className="border-gray h-12 flex-1 rounded-xl border-2"
          value={selected ?? ""}
          onChange={(e) => {
            const targetValue = e.target.value;
            if (targetValue.length === 0) {
              setSelected(null);
              return;
            }

            const value = parseInt(targetValue, 10);
            if (value >= 0 && value <= 100) {
              setSelected(value);
            }
          }}
        />
      </div>
      <div>
        {!selected ? (
          <span className="text-base">Select a number of cups to Teap!</span>
        ) : (
          <Button size="xl" className="text-lg font-extrabold">
            <span className="mr-2">{teapEmoji}</span>
            <span>Teap ${selected * unitPrice}</span>
          </Button>
        )}
      </div>
    </div>
  );
}
