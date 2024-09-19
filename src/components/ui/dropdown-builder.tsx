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
import { IconType } from "react-icons/lib";

export type DropdownOption =
  | {
      type?: "item";
      icon?: string | IconType;
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
                  {option.icon && (
                    <span className="mr-3">
                      {typeof option.icon === "string" ? (
                        <span>{option.icon}</span>
                      ) : (
                        <option.icon size={16} />
                      )}
                    </span>
                  )}
                  <span>{option.label}</span>
                </DropdownMenuItem>
              ),
            )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
