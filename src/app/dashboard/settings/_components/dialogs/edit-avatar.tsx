import { ContextUser } from "@/app/_contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadButton } from "@/components/uploadthing";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function EditAvatarDialog() {
  const queryClient = useQueryClient();

  const [open, setOpen] = React.useState(false);

  const updateCache = (image: string) => {
    queryClient.setQueryData<ContextUser>(["user", "me"], (old) =>
      old ? { ...old, image } : old,
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100">
          <Pencil color="white" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Avatar ✍️</DialogTitle>
          <DialogDescription>
            Upload a new avatar to change your profile picture.
          </DialogDescription>
        </DialogHeader>
        <UploadButton
          content={{ button: "Upload Avatar" }}
          endpoint="userProfileAvatar"
          onClientUploadComplete={(response) => {
            const image = response[0];
            if (!image) {
              return;
            }

            setOpen(false);

            toast.success("Avatar updated!");
            updateCache(image.url);
          }}
          onUploadError={(error: Error) => {
            toast.error("Something went wrong 😔");
            console.error(error);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
