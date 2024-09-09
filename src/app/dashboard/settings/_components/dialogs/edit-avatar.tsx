import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadButton } from "@/components/uploadthing";
import { Pencil } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function EditAvatarDialog() {
  const [open, setOpen] = React.useState(false);

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
          onClientUploadComplete={() => {
            toast.success("Avatar updated!");
            setOpen(false);
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
