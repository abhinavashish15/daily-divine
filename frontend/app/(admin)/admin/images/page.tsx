"use client";

import { useState, useEffect, useCallback } from "react";
import { imageService } from "@/services/image.service";
import { Image } from "@/types/image";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { ImageDialog } from "@/components/admin/image-dialog";

export default function ImagesPage() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<Image | null>(null);

  const fetchImages = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await imageService.getImages();
      setImages(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch images");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }
    
    try {
      await imageService.deleteImage(id);
      toast.success("Image deleted successfully");
      fetchImages();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete image");
    }
  };

  const handleEdit = (image: Image) => {
    setEditingImage(image);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingImage(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Image Gallery</h1>
          <p className="text-muted-foreground">Manage the images used in the daily rotations.</p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Image
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : images.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-card border rounded-3xl text-center">
          <div className="bg-primary/10 p-4 rounded-full mb-4">
            <ImageIcon className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No images found</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            Get started by adding your first image to the rotation.
          </p>
          <Button onClick={handleAdd} variant="outline">
            Add Image
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((img) => (
            <div key={img.id} className="group relative bg-card border rounded-3xl overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <div className="aspect-square bg-muted relative overflow-hidden">
                {/* We use standard img here since these might be external URLs that aren't configured in Next.js Image config */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={img.imageUrl} 
                  alt={img.title || img.deity} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/400?text=Invalid+Image";
                  }}
                />
                {!img.active && (
                  <div className="absolute top-3 left-3 bg-destructive/90 text-destructive-foreground px-2 py-1 rounded-md text-xs font-semibold backdrop-blur-sm">
                    Inactive
                  </div>
                )}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-sm" onClick={() => handleEdit(img)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full shadow-sm" onClick={() => handleDelete(img.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-base line-clamp-1" title={img.title || img.deity}>
                    {img.title || img.deity}
                  </h3>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full whitespace-nowrap">
                    {img.deity}
                  </span>
                </div>
                {img.caption && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                    {img.caption}
                  </p>
                )}
                <div className="text-xs text-muted-foreground/80 flex justify-between items-center mt-auto pt-4 border-t border-border/50">
                  <span>Used: {img.timesUsed}x</span>
                  <span>{img.lastSent ? new Date(img.lastSent).toLocaleDateString() : 'Never sent'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ImageDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSaved={fetchImages}
        image={editingImage}
      />
    </div>
  );
}
