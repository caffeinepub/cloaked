import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Info, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Listing {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
  tag: string;
}

const LISTINGS: Listing[] = [
  {
    id: 1,
    name: "Mulberry Tree (Dwarf Everbearing)",
    description:
      "A compact mulberry perfect for containers or small yards. Produces sweet purple-black berries almost year-round in Florida. 3-gallon pot, approx 18–24 inches tall.",
    price: "$25",
    available: true,
    image: "/assets/generated/mulberry-tree.dim_400x400.jpg",
    tag: "Fruit Tree",
  },
  {
    id: 2,
    name: "Fresh Mangoes (Haden variety)",
    description:
      "Tree-ripened Haden mangoes from our grove. Sold by the pound. Seasonal June–July. Place an order to arrange pickup.",
    price: "$4/lb",
    available: true,
    image: "/assets/generated/fresh-mangoes.dim_400x400.jpg",
    tag: "Fresh Fruit",
  },
  {
    id: 3,
    name: "Moringa Tree Seedling",
    description:
      "Moringa oleifera, the 'miracle tree.' Fast-growing, drought tolerant, edible leaves packed with nutrients. 4-inch pot.",
    price: "$8",
    available: true,
    image: "/assets/generated/moringa-seedling.dim_400x400.jpg",
    tag: "Seedling",
  },
  {
    id: 4,
    name: "Lemongrass Clump",
    description:
      "Large division of mature lemongrass, ready to plant. Thrives in Florida heat. Great for cooking and mosquito deterrence.",
    price: "$6",
    available: true,
    image: "/assets/generated/lemongrass.dim_400x400.jpg",
    tag: "Herb",
  },
  {
    id: 5,
    name: "Soursop Tree (Grafted)",
    description:
      "Annona muricata, grafted for earlier fruiting. Tropical Florida tree with creamy, tangy white flesh. 3-gallon pot.",
    price: "$35",
    available: false,
    image: "",
    tag: "Fruit Tree",
  },
];

export default function ShopTab() {
  const [inquired, setInquired] = useState<number[]>([]);

  const handleInquire = (id: number, name: string) => {
    setInquired((prev) => [...prev, id]);
    toast.success(`Inquiry noted for "${name}". Contact us via the About tab.`);
  };

  return (
    <div className="space-y-5">
      <div className="card-texture rounded-xl p-4 flex items-start gap-3">
        <Info
          className="w-4 h-4 mt-0.5 flex-shrink-0"
          style={{ color: "oklch(0.68 0.128 68)" }}
        />
        <p className="text-sm font-sans text-muted-foreground">
          Contact via the <strong className="text-foreground">About</strong> tab
          to inquire about availability or pickup. All plants grown with care,
          not chemistry.
        </p>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        data-ocid="shop.list"
      >
        {LISTINGS.map((listing, idx) => (
          <Card
            key={listing.id}
            className="card-texture border-0 shadow-sm overflow-hidden flex flex-col"
            data-ocid={`shop.item.${idx + 1}`}
          >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
              {listing.image ? (
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.5 0.115 42) 0%, oklch(0.4 0.07 60) 100%)",
                  }}
                >
                  <span className="text-4xl">🌱</span>
                </div>
              )}
              <div className="absolute top-2 left-2 flex gap-1">
                <span
                  className="text-xs font-sans px-2 py-0.5 rounded-full"
                  style={{
                    background: "oklch(0.25 0.04 55 / 0.75)",
                    color: "oklch(0.95 0.028 88)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {listing.tag}
                </span>
              </div>
            </div>

            <CardContent className="pt-3 pb-2 flex-1">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-display text-base font-semibold text-foreground leading-tight">
                  {listing.name}
                </h3>
                <span
                  className="font-display text-lg font-bold flex-shrink-0"
                  style={{ color: "oklch(0.68 0.128 68)" }}
                >
                  {listing.price}
                </span>
              </div>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                {listing.description}
              </p>
            </CardContent>

            <CardFooter className="pt-0 pb-3 flex items-center justify-between">
              <span
                className={`text-xs font-sans px-2 py-1 rounded-full ${
                  listing.available ? "badge-available" : "badge-sold-out"
                }`}
              >
                {listing.available ? "Available" : "Sold Out"}
              </span>
              {listing.available && (
                <Button
                  size="sm"
                  variant="outline"
                  className="font-sans text-xs border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleInquire(listing.id, listing.name)}
                  disabled={inquired.includes(listing.id)}
                  data-ocid={`shop.secondary_button.${idx + 1}`}
                >
                  <ShoppingBasket className="w-3 h-3 mr-1" />
                  {inquired.includes(listing.id) ? "Noted!" : "Inquire"}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
