"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Trash2 } from "lucide-react";
import { updateProfileSchema } from "@/schemas/profile.schema";
import { profileService } from "@/services/profile.service";
import { useAuthStore } from "@/store/auth.store";
import { z } from "zod";

type ProfileFormData = z.infer<typeof updateProfileSchema>;

export default function ProfilePage() {
  const { user, setUser, logout } = useAuthStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || "",
      phone: (user as any)?.phone || "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsUpdating(true);
      const updatedUser = await profileService.updateProfile(data);
      setUser(updatedUser);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you absolutely sure? This action cannot be undone and will permanently delete your account and all associated data.")) {
      return;
    }

    try {
      setIsDeleting(true);
      await profileService.deleteProfile();
      toast.success("Your account has been permanently deleted.");
      logout(); // This will clear the store and redirect to login
    } catch (error: any) {
      toast.error(error.message || "Failed to delete account");
      setIsDeleting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account details and preferences.</p>
      </div>

      <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
        
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              value={user.email} 
              disabled 
              className="bg-muted/50 cursor-not-allowed" 
            />
            <p className="text-xs text-muted-foreground">Email addresses cannot be changed.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              className="bg-muted/50" 
              {...register("name")}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number (WhatsApp)</Label>
            <Input 
              id="phone" 
              type="tel"
              className="bg-muted/50" 
              {...register("phone")}
            />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
          </div>

          <Button disabled={isUpdating || !isDirty} type="submit" className="rounded-xl">
            {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </form>
      </div>

      <div className="border border-destructive/20 bg-destructive/5 rounded-3xl p-8 mt-8">
        <h2 className="text-xl font-semibold text-destructive mb-2">Danger Zone</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Permanently delete your account and all of your content. This action is not reversible, so please continue with caution.
        </p>
        <Button 
          variant="destructive" 
          onClick={handleDeleteAccount}
          disabled={isDeleting}
          className="rounded-xl"
        >
          {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
          Delete Account
        </Button>
      </div>
    </div>
  );
}
