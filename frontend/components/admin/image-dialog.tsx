"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Image, CreateImageDTO, UpdateImageDTO } from "@/types/image";
import { imageService } from "@/services/image.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ImageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  image?: Image | null; // If null, we are creating
}

export function ImageDialog({ isOpen, onClose, onSaved, image }: ImageDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    deity: string;
    imageUrl: string;
    caption: string;
    active: boolean;
  }>({
    title: "",
    deity: "",
    imageUrl: "",
    caption: "",
    active: true,
  });

  useEffect(() => {
    if (image) {
      setFormData({
        title: image.title || "",
        deity: image.deity || "",
        imageUrl: image.imageUrl || "",
        caption: image.caption || "",
        active: image.active ?? true,
      });
    } else {
      setFormData({
        title: "",
        deity: "",
        imageUrl: "",
        caption: "",
        active: true,
      });
    }
  }, [image, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, active: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (image) {
        // Update
        const payload: UpdateImageDTO = {
          title: formData.title,
          deity: formData.deity,
          imageUrl: formData.imageUrl,
          caption: formData.caption,
          active: formData.active,
        };
        await imageService.updateImage(image.id, payload);
        toast.success("Image updated successfully");
      } else {
        // Create
        const payload: CreateImageDTO = {
          title: formData.title,
          deity: formData.deity,
          imageUrl: formData.imageUrl,
          caption: formData.caption,
          active: formData.active,
        };
        await imageService.createImage(payload);
        toast.success("Image created successfully");
      }
      onSaved();
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to save image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{image ? "Edit Image" : "Add New Image"}</DialogTitle>
          <DialogDescription>
            {image ? "Update the details of the image below." : "Add a new image for automated delivery rotation."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title (Optional)</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Ganesha Morning Blessing"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deity">Deity <span className="text-destructive">*</span></Label>
            <Input
              id="deity"
              name="deity"
              value={formData.deity}
              onChange={handleChange}
              placeholder="e.g. Lord Shiva"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL <span className="text-destructive">*</span></Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="caption">Caption (Optional)</Label>
            <Textarea
              id="caption"
              name="caption"
              value={formData.caption}
              onChange={handleChange}
              placeholder="Message to accompany the image..."
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="active">Active in rotation</Label>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {image ? "Save Changes" : "Create Image"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
