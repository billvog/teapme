"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Tab = {
  id: string;
  title: string;
  href: string;
};

type TabGroup = {
  id: string;
  title: string;
  tabs: Tab[];
};

const TabGroups: TabGroup[] = [
  {
    id: "profile",
    title: "Profile",
    tabs: [
      {
        id: "profile.general",
        title: "General",
        href: "",
      },
      {
        id: "profile.donations",
        title: "Donations",
        href: "/donations",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    tabs: [
      {
        id: "payments.stripe",
        title: "Stripe",
        href: "/payments",
      },
    ],
  },
];

const FlatTabs = TabGroups.flatMap((group) => group.tabs);

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = React.useMemo(
    () => FlatTabs.find((tab) => pathname === `/dashboard/settings${tab.href}`),
    [pathname],
  );

  const onTabClick = (id: string) => {
    const tab = FlatTabs.find((tab) => tab.id === id);
    if (tab) {
      router.push(`/dashboard/settings${tab.href}`);
    }
  };

  return (
    <div className="flex h-full items-start gap-10 px-8 xl:px-0">
      <div className="hidden h-full flex-col space-y-4 border-r-4 xl:flex">
        {TabGroups.map((group) => (
          <div key={group.id} className="mr-10 space-y-4">
            <div
              className="cursor-pointer text-2xl font-bold"
              onClick={() => {
                if (group.tabs[0]) onTabClick(group.tabs[0].id);
              }}
            >
              {group.title}
            </div>
            <div className="space-y-2">
              {group.tabs.map((tab) => (
                <div key={tab.id} className="relative">
                  <div
                    className={cn(
                      "cursor-pointer text-base",
                      activeTab?.id === tab.id &&
                        "text-lime-600 after:absolute after:-right-11 after:bottom-0 after:top-0 after:w-1 after:bg-lime-600",
                    )}
                    onClick={() => onTabClick(tab.id)}
                  >
                    {tab.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
