import { profileDeleteSocialLink } from "@/actions/profile/delete-social-link";
import { profileGetSocialLinks } from "@/actions/profile/get-social-links";
import { Button } from "@/components/ui/button";
import { getSocialPlatform } from "@/lib/social-links";
import { SocialLink } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit2, Link2, Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type LinkProps = {
  link: SocialLink;
  onEdit?: () => void;
  showActions?: boolean;
};

export default function Link({ link, showActions = false, onEdit }: LinkProps) {
  const queryClient = useQueryClient();

  const platform = React.useMemo(() => {
    if (!link.url) return null;
    return getSocialPlatform(link.url);
  }, [link.url]);

  const PlatformIcon = platform?.icon;

  const deleteMutation = useMutation({
    mutationFn: profileDeleteSocialLink,
  });

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
      },
      onError() {
        toast.error("Something went wrong 😔");
      },
    });
  };

  return (
    <div className="group flex flex-row items-center gap-4 text-sm">
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2">
          {PlatformIcon ? <PlatformIcon size={14} /> : <Link2 size={16} />}
          <span>{link.title}</span>
        </div>
        <a href={link.url} target="_blank" className="link">
          {link.url}
        </a>
      </div>
      {showActions && (
        <div className="flex flex-row items-center gap-2 opacity-0 group-hover:opacity-100">
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
