"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";
import { Send, Image as ImageIcon, MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ImageTemplate {
  id: string;
  title: string | null;
  deity: string;
  imageUrl: string;
  caption: string | null;
}

export default function CampaignsPage() {
  const [broadcastType, setBroadcastType] = useState<"text" | "template">("text");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<ImageTemplate[]>([]);
  const [selectedImageId, setSelectedImageId] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images`, {
          // The image endpoint might not strictly require auth based on current setup, but good practice
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await response.json();
        if (response.ok) {
          setImages(data.data || []);
        } else {
          toast.error("Failed to load templates");
        }
      } catch (error) {
        toast.error("Network error while loading templates");
      } finally {
        setIsLoadingImages(false);
      }
    };
    fetchImages();
  }, [token]);

  const handleBroadcast = async () => {
    if (broadcastType === "text" && !message.trim()) {
      toast.error("Please enter a message to broadcast.");
      return;
    }

    if (broadcastType === "template" && !selectedImageId) {
      toast.error("Please select a template to broadcast.");
      return;
    }

    setIsSending(true);

    const payload = broadcastType === "text" 
      ? { text: message } 
      : { imageId: selectedImageId };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/broadcast`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Broadcast sent! Success: ${data.data.successCount}, Failed: ${data.data.failCount}`);
        setMessage("");
        setSelectedImageId("");
      } else {
        toast.error(data.message || "Failed to send broadcast");
      }
    } catch (error) {
      toast.error("An error occurred while sending the broadcast.");
    } finally {
      setIsSending(false);
    }
  };

  const selectedImage = images.find(img => img.id === selectedImageId);

  return (
    <div className="flex flex-col gap-6 p-2 md:p-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
        <p className="text-muted-foreground">Broadcast messages or templates to all your users.</p>
      </div>

      <div className="flex gap-2 p-1 bg-muted rounded-lg w-fit">
        <button
          onClick={() => setBroadcastType("text")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            broadcastType === "text" ? "bg-background shadow-sm" : "hover:bg-muted/80 text-muted-foreground"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Custom Text
        </button>
        <button
          onClick={() => setBroadcastType("template")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            broadcastType === "template" ? "bg-background shadow-sm" : "hover:bg-muted/80 text-muted-foreground"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Image Template
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {broadcastType === "text" ? "Broadcast Text Message" : "Broadcast Image Template"}
          </CardTitle>
          <CardDescription>
            {broadcastType === "text" 
              ? "Send a custom message to all users in the database." 
              : "Select a pre-existing image and blessing from your database to send to all users."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          
          {broadcastType === "text" ? (
            <div className="grid gap-2">
              <Textarea
                placeholder="Type your message here..."
                className="min-h-[150px] resize-y"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="text-xs text-muted-foreground text-right">
                {message.length} characters
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Template</label>
                {isLoadingImages ? (
                  <div className="text-sm text-muted-foreground">Loading templates...</div>
                ) : (
                  <select
                    className="w-full p-2 rounded-md border bg-background text-sm"
                    value={selectedImageId}
                    onChange={(e) => setSelectedImageId(e.target.value)}
                  >
                    <option value="" disabled>-- Select an Image Template --</option>
                    {images.map((img) => (
                      <option key={img.id} value={img.id}>
                        {img.title || img.deity} - {img.caption ? img.caption.substring(0, 30) + '...' : 'No caption'}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              
              {selectedImage && (
                <div className="mt-4 border rounded-lg p-4 bg-muted/30">
                  <h3 className="font-medium text-sm mb-2">Preview</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img 
                      src={selectedImage.imageUrl} 
                      alt={selectedImage.deity} 
                      className="w-32 h-32 object-cover rounded-md border bg-muted"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">
                        {selectedImage.caption || "No caption provided"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleBroadcast} 
            disabled={
              isSending || 
              (broadcastType === "text" && !message.trim()) || 
              (broadcastType === "template" && !selectedImageId)
            }
            className="w-full sm:w-auto"
          >
            {isSending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send Broadcast
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
