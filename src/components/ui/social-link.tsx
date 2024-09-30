import { profileClickSocialLink } from "@/actions/profile/click-social-link";
import { profileDeleteSocialLink } from "@/actions/profile/delete-social-link";
import { getUserProfile } from "@/actions/profile/get-profile";
import { profileGetSocialLinks } from "@/actions/profile/get-social-links";
import { useAuth } from "@/app/_contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { formatClickCount, getSocialPlatform } from "@/lib/social-links";
import { SocialLink } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit2, Link2, MousePointerClick, Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type LinkProps = {
  link: SocialLink;
  onEdit?: () => void;
  showActions?: boolean;
};

export default function Link({ link, showActions = false, onEdit }: LinkProps) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const platform = React.useMemo(() => {
    if (!link.url) return null;
    return getSocialPlatform(link.url);
  }, [link.url]);

  const PlatformIcon = platform?.icon;

  const formattedClickCount = React.useMemo(
    () => formatClickCount(link.clickCount),
    [link.clickCount],
  );

  const clickLinkMutation = useMutation({
    mutationFn: profileClickSocialLink,
  });

  const deleteMutation = useMutation({
    mutationFn: profileDeleteSocialLink,
  });

  const onLinkClick = () => {
    if (user?.profile?.id === link.profileId) return;

    // Silently update the click count
    clickLinkMutation.mutate(link.id, {
      onSuccess(data) {
        if (!data.ok) {
          return;
        }

        // Update cache
        queryClient.setQueryData<
          Awaited<ReturnType<typeof profileGetSocialLinks>>
        >(["profile", link.profileId, "social-links"], (old) =>
          old
            ? old.map((l) =>
                l.id === link.id ? { ...l, clickCount: l.clickCount + 1 } : l,
              )
            : old,
        );
      },
    });
  };

  const onDeleteClick = () => {
    deleteMutation.mutate(link.id, {
      onSuccess(data) {
        if (!data.ok) {
          toast.error("Something went wrong 😔");
          return;
        }

        toast.success("Link deleted successfully");

        // Update cache

        queryClient.setQueryData<
          Awaited<ReturnType<typeof profileGetSocialLinks>>
        >(["profile", link.profileId, "social-links"], (old) =>
          old ? old.filter((l) => l.id !== link.id) : old,
        );

        queryClient.setQueryData<Awaited<ReturnType<typeof getUserProfile>>>(
          ["user", user?.handle, "profile"],
          (old) =>
            old
              ? {
                  ...old,
                  profile: old.profile
                    ? {
                        ...old.profile,
                        socialLinks: old.profile.socialLinks.filter(
                          (l) => l.id !== link.id,
                        ),
                      }
                    : old.profile,
                }
              : old,
        );
      },
      onError() {
        toast.error("Something went wrong 😔");
      },
    });
  };

  return (
    <div className="group flex flex-row items-center gap-4 text-xs sm:text-sm">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center gap-2">
          {PlatformIcon ? <PlatformIcon size={14} /> : <Link2 size={16} />}
          <span>{link.title}</span>
          {showActions && (
            <div
              className="ml-1 flex items-center gap-1 rounded-xl bg-black px-2 py-[2.5px] text-white"
              title={`This link has been clicked ${formattedClickCount.long} times`}
            >
              <MousePointerClick size={12} />
              <span className="text-xs font-semibold">
                {formattedClickCount.short}
              </span>
            </div>
          )}
        </div>
        <span onClick={onLinkClick}>
          <a href={link.url} target="_blank" className="link">
            {link.url}
          </a>
        </span>
      </div>
      {showActions && (
        <div className="flex flex-row items-center gap-2">
          <Button size="icon" variant="outline" onClick={onEdit}>
            <Edit2 size={16} />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={onDeleteClick}
            loading={deleteMutation.isPending}
          >
            <Trash2 size={16} color="red" />
          </Button>
        </div>
      )}
    </div>
  );
}
