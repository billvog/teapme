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

type UploadImageModalProps = {
  children: React.ReactNode;
  title: string;
  desciption: string;
  editIconSize?: number;
  editText?: string;
  endpoint: React.ComponentProps<typeof UploadButton>["endpoint"];
  buttonContent?: React.ComponentProps<typeof UploadButton>["content"];
  onSuccess?: (image: string) => void;
};

export default function UploadImageModal({
  title,
  desciption,
  editIconSize = 24,
  editText,
  endpoint,
  buttonContent,
  onSuccess,
  children,
}: UploadImageModalProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="group relative">
      {children}
      <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="flex cursor-pointer flex-row items-center gap-2 px-3 py-1">
              <Pencil color="white" size={editIconSize} />
              {editText && (
                <span className="text-base text-white">{editText}</span>
              )}
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{desciption}</DialogDescription>
            </DialogHeader>
            <UploadButton
              endpoint={endpoint}
              content={buttonContent}
              onClientUploadComplete={(response) => {
                setOpen(false);

                const image = response[0];
                if (!image) {
                  return;
                }

                onSuccess?.(image.url);
              }}
              onUploadError={(error: Error) => {
                toast.error("Something went wrong 😔");
                console.error(error);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
