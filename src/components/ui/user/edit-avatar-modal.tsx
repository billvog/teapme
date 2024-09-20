import { getUserProfile } from "@/actions/profile/get-profile";
import { ContextUser, useAuth } from "@/app/_contexts/AuthContext";
import UploadImageModal from "@/components/ui/upload-image-modal";
import { UserAvatar } from "@/components/ui/user/avatar";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function EditAvatarModal() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  if (!user) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-full">
      <UploadImageModal
        title="Change Avatar ✍️"
        desciption="Upload a new image to change your profile picture."
        endpoint="userProfileAvatar"
        buttonContent={{ button: "Upload Avatar" }}
        onSuccess={(image) => {
          toast.success("Avatar updated!");

          // Update cache

          queryClient.setQueryData<ContextUser>(["user", "me"], (old) =>
            old ? { ...old, image } : old,
          );

          queryClient.setQueryData<Awaited<ReturnType<typeof getUserProfile>>>(
            ["user", user.handle, "profile"],
            (old) => (old ? { ...old, image } : old),
          );
        }}
      >
        <UserAvatar user={user} size="lg" />
      </UploadImageModal>
    </div>
  );
}
