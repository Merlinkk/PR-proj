"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/admin", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/admin");
};


export const createProjectAction = async (formData: FormData) => {
  // Create Supabase client
  const supabase = await createClient();

  // Get current user session
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return encodedRedirect("error", "/protected", "You must be logged in to create a project");
  }

  try {
    // Extract form data
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File;

    const resultEntries = Array.from(formData.entries())
      .filter(([key]) => key.startsWith('results['))
      .map(([_, value]) => value as string)
      .filter(value => value.trim() !== '');

    if (!title || !category || !description) {
      return encodedRedirect("error", "/protected/projects/new", "Please fill all required fields");
    }

    // Upload image and get public URL
    let imageUrl: string | null = null;

    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const storagePath = `project-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("nest-s2")
        .upload(storagePath, imageFile, {
          contentType: imageFile.type,
          upsert: false,
        });

      if (uploadError) {
        return encodedRedirect("error", "/protected/projects/new", `Error uploading image: ${uploadError.message}`);
      }

      const { data: publicUrlData } = supabase.storage
        .from("nest-s2")
        .getPublicUrl(storagePath);

      imageUrl = publicUrlData.publicUrl;
    }

    // Insert project data into database
    const { data: project, error: insertError } = await supabase
      .from("projects")
      .insert({
        title,
        category,
        description,
        image: imageUrl,
        results: resultEntries,
      })
      .select()
      .single();

    if (insertError) {
      // Clean up uploaded file if DB insert fails
      if (imageUrl) {
        const fileToRemove = imageUrl.split("/").slice(-2).join("/"); // Extract storage path from URL
        await supabase.storage.from("nest-s2").remove([fileToRemove]);
      }
      return encodedRedirect("error", "/protected/projects/new", `Error creating project: ${insertError.message}`);
    }

    // Revalidate the page and redirect
    revalidatePath("/protected");

  } catch (error) {
    console.error("Unhandled error:", error);
    return encodedRedirect("error", "/protected/projects/new", `Unexpected error: ${error instanceof Error ? error.message : "Unknown error"}`);
  }

  return redirect("/protected");
};

export const deleteProject = async ( projectId : number) => {
  const supabase = await createClient();

  // Ensure projectId is valid
  if (!projectId || typeof projectId !== "number") {
    return encodedRedirect("error", "/protected", "Invalid project ID");
  }

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) {
    console.error("Delete error:", error.message);
    return encodedRedirect("error", "/protected", `Error deleting project: ${error.message}`);
  }

  // Revalidate path to reflect deletion
  revalidatePath("/protected");

  return redirect("/protected");
};

export const createContactAction = async (formData: FormData) => {
  // Create Supabase client
  const supabase = await createClient();

  try {
    // Extract form data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;
    const message = formData.get("message") as string;

    // Validate required fields
    if (!name || !email || !message) {
      return encodedRedirect("error", "/contact", "Please fill all required fields");
       return; 
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      // return encodedRedirect("error", "/contact", "Please enter a valid email address");
      return;       
    }

    // Insert contact data into database
    const { data: contact, error: insertError } = await supabase
      .from("connects")
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        company: company?.trim() || null,
        message: message.trim(),
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      // return encodedRedirect("error", "/contact", `Error saving your message: ${insertError.message}`);
      return; 
    }

    // Send confirmation email to user
    try {
      const userEmailResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'user_confirmation',
          to: email,
          userName: name,
        }),
      });

      if (!userEmailResponse.ok) {
        console.error("Failed to send user confirmation email");
      }
    } catch (emailError) {
      console.error("Error sending user confirmation email:", emailError);
      // Don't fail the entire operation if email fails
    }

    // Send notification email to admins
    try {
      const adminEmailResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'admin_notification',
          contactData: {
            name: name.trim(),
            email: email.trim(),
            company: company?.trim() || 'Not specified',
            message: message.trim(),
            submittedAt: new Date().toLocaleString(),
          },
        }),
      });

      if (!adminEmailResponse.ok) {
        console.error("Failed to send admin notification email");
      }
    } catch (emailError) {
      console.error("Error sending admin notification email:", emailError);
      // Don't fail the entire operation if email fails
    }

    // Revalidate the page
    // revalidatePath("/contact");
    return; 

  } catch (error) {
    console.error("Unhandled error:", error);
    // return encodedRedirect("error", "/contact", `Unexpected error: ${error instanceof Error ? error.message : "Unknown error"}`);
    return; 
  }
  // return encodedRedirect("success", "/contact", "Thank you for your message! We'll get back to you soon.");
  return; 
};
