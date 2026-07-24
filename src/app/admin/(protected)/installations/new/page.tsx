import InstallationForm from "../InstallationForm";

export const metadata = { title: "Schedule Installation" };

export default function NewInstallationPage() {
  return <InstallationForm mode="create" />;
}
