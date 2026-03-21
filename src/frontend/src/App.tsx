import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import DashboardPage from "./pages/DashboardPage";
import DeleteFacebookPage from "./pages/DeleteFacebookPage";
import ImageLikenessPage from "./pages/ImageLikenessPage";
import LandingPage from "./pages/LandingPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfUsePage from "./pages/TermsOfUsePage";

export type Page =
  | "landing"
  | "dashboard"
  | "privacy"
  | "terms"
  | "delete-facebook"
  | "image-likeness";

export default function App() {
  const [page, setPage] = useState<Page>("landing");

  const navigate = (to: Page) => setPage(to);

  return (
    <div className="min-h-screen bg-background">
      {page === "landing" && <LandingPage onNavigate={navigate} />}
      {page === "dashboard" && <DashboardPage onNavigate={navigate} />}
      {page === "privacy" && <PrivacyPolicyPage onNavigate={navigate} />}
      {page === "terms" && <TermsOfUsePage onNavigate={navigate} />}
      {page === "delete-facebook" && (
        <DeleteFacebookPage onNavigate={navigate} />
      )}
      {page === "image-likeness" && <ImageLikenessPage onNavigate={navigate} />}
      <Toaster theme="dark" richColors />
    </div>
  );
}
