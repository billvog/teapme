import { getUserProfile } from "@/actions/profile/get-profile";
import { ContextUser, useAuth } from "@/app/_contexts/AuthContext";
import UploadImageModal from "@/components/ui/upload-image-modal";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { toast } from "sonner";

export default function EditBannerModal() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  if (!user) {
    return null;
  }

  return (
    <UploadImageModal
      title="Change Banner ✍️"
      desciption="Upload a new image to change your profile banner."
      editText="Edit Banner"
      endpoint="userProfileBanner"
      buttonContent={{ button: "Upload Banner" }}
      onSuccess={(image) => {
        toast.success("Banner updated!");

        // Update cache

        queryClient.setQueryData<ContextUser>(["user", "me"], (old) =>
          old
            ? {
                ...old,
                profile: old.profile
                  ? {
                      ...old.profile,
                      banner: image,
                    }
                  : null,
              }
            : old,
        );

        queryClient.setQueryData<Awaited<ReturnType<typeof getUserProfile>>>(
          ["user", user.handle, "profile"],
          (old) =>
            old
              ? {
                  ...old,
                  profile: old.profile
                    ? {
                        ...old.profile,
                        banner: image,
                      }
                    : null,
                }
              : old,
        );
      }}
    >
      <Image
        alt="banner"
        src={user.profile?.banner ?? ""}
        width={0}
        height={0}
        sizes="100vw"
        className="h-[200px] w-full object-cover"
      />
    </UploadImageModal>
  );
}
