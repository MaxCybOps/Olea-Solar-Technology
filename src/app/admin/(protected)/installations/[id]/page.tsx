import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import InstallationForm from "../InstallationForm";
import type { InstallationRow } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function EditInstallationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await supabaseAdmin.from("installations").select("*").eq("id", id).single();
  if (error || !data) notFound();
  return <InstallationForm mode="edit" installation={data as InstallationRow} />;
}
