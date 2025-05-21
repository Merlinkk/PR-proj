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