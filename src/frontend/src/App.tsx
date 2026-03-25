import AboutTab from "@/components/AboutTab";
import CalendarTab from "@/components/CalendarTab";
import GalleryTab from "@/components/GalleryTab";
import ShopTab from "@/components/ShopTab";
import VisitorCounter from "@/components/VisitorCounter";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Heart, Leaf, ShoppingBasket } from "lucide-react";
import { useState } from "react";

// Legacy type kept for backward compatibility with old page files
export type Page = string;

export default function App() {
  const [activeTab, setActiveTab] = useState("calendar");

  return (
    <div className="min-h-screen paper-bg flex flex-col">
      <Toaster />

      {/* Header */}
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
              <Leaf className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-primary-foreground">
                Space Coast Garden Guide
              </h1>
              <p className="text-primary-foreground/70 text-sm font-sans">
                East Central Florida · Zone 9b/10a · Brevard County
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Seurat hero image */}
      <div className="relative overflow-hidden" style={{ maxHeight: "220px" }}>
        <img
          src="/assets/generated/hero-garden-seurat.dim_1200x400.jpg"
          alt="Pointillist garden scene"
          className="w-full object-cover object-center"
          style={{ maxHeight: "220px" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/60" />
      </div>

      {/* Tabs */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList
            className="w-full mb-6 bg-card border border-border rounded-lg grid grid-cols-4 h-auto p-1"
            data-ocid="nav.tab"
          >
            <TabsTrigger
              value="calendar"
              className="flex flex-col sm:flex-row items-center gap-1 py-2 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded"
              data-ocid="calendar.tab"
            >
              <Leaf className="w-4 h-4" />
              <span>Calendar</span>
            </TabsTrigger>
            <TabsTrigger
              value="shop"
              className="flex flex-col sm:flex-row items-center gap-1 py-2 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded"
              data-ocid="shop.tab"
            >
              <ShoppingBasket className="w-4 h-4" />
              <span>Shop</span>
            </TabsTrigger>
            <TabsTrigger
              value="gallery"
              className="flex flex-col sm:flex-row items-center gap-1 py-2 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded"
              data-ocid="gallery.tab"
            >
              <Camera className="w-4 h-4" />
              <span>Gallery</span>
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="flex flex-col sm:flex-row items-center gap-1 py-2 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded"
              data-ocid="about.tab"
            >
              <Heart className="w-4 h-4" />
              <span>About</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="fade-in-up">
            <CalendarTab />
          </TabsContent>
          <TabsContent value="shop" className="fade-in-up">
            <ShopTab />
          </TabsContent>
          <TabsContent value="gallery" className="fade-in-up">
            <GalleryTab />
          </TabsContent>
          <TabsContent value="about" className="fade-in-up">
            <AboutTab />
          </TabsContent>
        </Tabs>
      </main>

      {/* Visitor Counter */}
      <VisitorCounter />

      {/* Footer */}
      <footer className="border-t border-border bg-card py-4 mt-auto">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground font-sans">
          © {new Date().getFullYear()}. Built with{" "}
          <span className="text-destructive">♥</span> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
