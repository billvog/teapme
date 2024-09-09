"use client";

import ProfileDonations from "@/app/dashboard/settings/_components/profile-donations";
import ProfileGeneral from "@/app/dashboard/settings/_components/profile-general";
import { cn } from "@/lib/utils";
import { Profile, User } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
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

const getTabsGroups = (user: SettingsTabsProps["user"]): TabGroup[] => [
  {
    id: "profile",
    title: "Profile",
    tabs: [
      {
        id: "profile.general",
        title: "General",
        content: (
          <ProfileGeneral
            initialValues={{
              name: user.name!,
              bio: user.profile.bio!,
            }}
          />
        ),
      },
      {
        id: "profile.donations",
        title: "Donations",
        content: (
          <ProfileDonations
            initialValues={{
              thankYouMessage: "",
            }}
          />
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

type SettingsTabsProps = {
  user: User & {
    profile: Profile;
  };
};

export default function SettingsTabs({ user }: SettingsTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabGroups = React.useMemo(() => getTabsGroups(user), [user]);
  const flatTabs = React.useMemo(
    () => tabGroups.flatMap((group) => group.tabs),
    [tabGroups],
  );

  const [activeTabId, setActiveTabId] = React.useState<Tab["id"]>();

  const activeTab = React.useMemo(
    () =>
      activeTabId ? flatTabs.find((tab) => tab.id === activeTabId) : undefined,
    [activeTabId],
  );

  React.useEffect(() => {
    const tabId = searchParams.get("tab");
    if (tabId && flatTabs.some((tab) => tab.id === tabId)) {
      setActiveTabId(tabId);
    } else {
      setActiveTabId(flatTabs[0]?.id ?? "profile.general");
    }
  }, []);

  React.useEffect(() => {
    router.push(
      "/dashboard/settings" + activeTabId ? `?tab=${activeTabId}` : "",
    );
  }, [router, activeTabId]);

  return (
    <div className="flex h-full items-start space-x-10">
      <div className="flex h-full flex-col space-y-4 border-r-4">
        {tabGroups.map((group) => (
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
      <div className="flex-1">
        {activeTab ? activeTab.content : <span>Loading...</span>}
      </div>
    </div>
  );
}
