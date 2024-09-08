"use client";

import { cn } from "@/lib/utils";
import React from "react";

type Tab = {
  id: string;
  title: string;
  content: React.ReactNode;
};

type TabGroup = {
  id: string;
  title: string;
  tabs: Tab[];
};

const TabsGroups: TabGroup[] = [
  {
    id: "profile",
    title: "Profile",
    tabs: [
      {
        id: "profile.general",
        title: "General",
        content: (
          <div>
            <h1>Profile</h1>
          </div>
        ),
      },
      {
        id: "profile.donations",
        title: "Donations",
        content: (
          <div>
            <h1>Donations</h1>
          </div>
        ),
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
        content: (
          <div>
            <h1>Stripe</h1>
          </div>
        ),
      },
    ],
  },
];

const FlatTabs = TabsGroups.flatMap((group) => group.tabs);

export default function ProfileTabs() {
  const [activeTabId, setActiveTabId] =
    React.useState<Tab["id"]>("profile.general");

  const activeTab = React.useMemo(
    () => FlatTabs.find((tab) => tab.id === activeTabId),
    [activeTabId],
  );

  return (
    <div className="flex h-full items-start space-x-10">
      <div className="flex flex-col space-y-4 border-r-4">
        {TabsGroups.map((group) => (
          <div key={group.id} className="mr-10 space-y-4">
            <div className="text-2xl font-bold">{group.title}</div>
            <div className="space-y-2">
              {group.tabs.map((tab) => (
                <div key={tab.id} className="relative">
                  <div
                    className={cn(
                      "cursor-pointer text-base",
                      activeTabId === tab.id &&
                        "text-lime-600 after:absolute after:-right-11 after:bottom-0 after:top-0 after:w-1 after:bg-lime-600",
                    )}
                    onClick={() => {
                      setActiveTabId(tab.id);
                    }}
                  >
                    {tab.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>{activeTab?.content}</div>
    </div>
  );
}
