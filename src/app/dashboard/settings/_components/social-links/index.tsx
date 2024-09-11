"use client";

import { profileGetSocialLinks } from "@/actions/profile/get-social-links";
import CreateSocialLinkForm from "@/app/dashboard/settings/_components/social-links/form";
import Link from "@/app/dashboard/settings/_components/social-links/link";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

import { CirclePlus } from "lucide-react";
import React from "react";

export default function SocialLinks({
  userProfileId,
}: {
  userProfileId: string;
}) {
  const [showNewForm, setShowNewForm] = React.useState(false);

  const { data: socialLinksData } = useQuery({
    queryKey: ["profile", userProfileId, "social-links"],
    queryFn: () => profileGetSocialLinks(userProfileId),
  });

  const onAddLinkClick = () => {
    setShowNewForm(true);
  };

  const onClose = () => {
    setShowNewForm(false);
  };

  return (
    <div className="flex flex-col space-y-8">
      {socialLinksData?.length === 0 ? (
        <p className="text-sm text-gray-500">
          You haven't added any links yet ⛓️‍💥
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {socialLinksData?.map((link) => <Link key={link.id} link={link} />)}
        </div>
      )}

      {showNewForm && <CreateSocialLinkForm onClose={onClose} />}

      <Button
        size="default"
        variant="secondary"
        className="self-start"
        onClick={onAddLinkClick}
      >
        <CirclePlus size={16} />
        <span>Add link</span>
      </Button>
    </div>
  );
}
