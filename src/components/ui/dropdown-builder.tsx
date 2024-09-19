import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import React from "react";

export type DropdownOption =
  | {
      type?: "item";
      label: string;
      href?: string;
      onClick?: () => void;
    }
  | { type: "seperator" };

export type DropdownOptionGroup = {
  label: string;
  options: DropdownOption[];
};

type DropdownBuilderProps = {
  options: DropdownOptionGroup[];
  children: React.ReactNode;
};

export default function DropdownBuilder({
  options,
  children,
}: DropdownBuilderProps) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((group, index) => (
          <React.Fragment key={index}>
            <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {group.options.map((option, index) =>
              option.type === "seperator" ? (
                <DropdownMenuSeparator key={index} />
              ) : (
                <DropdownMenuItem
                  key={index}
                  onClick={() => {
                    if (option.href) {
                      router.push(option.href);
                    } else if (option.onClick) {
                      option.onClick();
                    }
                  }}
                >
                  {option.label}
                </DropdownMenuItem>
              ),
            )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
