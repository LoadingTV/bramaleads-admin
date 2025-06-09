import type { Metadata } from "next";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "BramaLeads - Modern CRM for Growing Businesses",
  description: "Grow your business with our powerful CRM platform. Capture, nurture, and convert more leads with BramaLeads.",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <PublicHeader />
        <main >
          {children}
        </main>
        <PublicFooter />
      </div>
    </AuthProvider>
  );
}