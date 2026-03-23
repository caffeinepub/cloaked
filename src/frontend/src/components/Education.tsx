import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  Heart,
  Home,
  Phone,
  Scale,
  Trees,
  Turtle,
} from "lucide-react";
import { motion } from "motion/react";

const sections = [
  {
    icon: <Turtle className="w-7 h-7" />,
    title: "What is a Gopher Tortoise?",
    color: "text-[oklch(0.44_0.070_155)]",
    bgColor: "bg-[oklch(0.90_0.040_155)]",
    content: [
      {
        subtitle: "Gopherus polyphemus",
        body: "The gopher tortoise is one of North America's oldest reptile species, having evolved over 60 million years. Adults grow 9–15 inches long and can live over 60 years. They are the only tortoise species native to the eastern United States.",
      },
      {
        subtitle: "Protected Under Florida Law",
        body: "Listed as Threatened by the Florida Fish and Wildlife Conservation Commission (FWC), gopher tortoises receive legal protection under Florida Statute 379.2291. It is illegal to harm, harass, pursue, hunt, shoot, wound, kill, trap, capture, or collect a gopher tortoise or its eggs without a permit.",
      },
      {
        subtitle: "Keystone Species",
        body: "The gopher tortoise is considered a keystone species because its burrows create habitat for over 350 other species. Without the tortoise, entire communities of animals would lose critical shelter. Their decline signals broader ecosystem collapse in Florida's scrub habitats.",
      },
    ],
  },
  {
    icon: <Home className="w-7 h-7" />,
    title: "The Burrow Ecosystem",
    color: "text-[oklch(0.40_0.10_65)]",
    bgColor: "bg-[oklch(0.93_0.06_65)]",
    content: [
      {
        subtitle: "A Community Underground",
        body: "Gopher tortoise burrows can be up to 40 feet long and 10 feet deep — maintaining a stable temperature and humidity year-round. These conditions make them life-saving refuges during Florida's wildfires, droughts, and freezes.",
      },
      {
        subtitle: "350+ Commensal Species",
        body: "Among the species that rely on burrows: the Eastern indigo snake (also federally protected), Florida mouse, gopher frog, Florida pine snake, burrowing owl, various invertebrates including the rare gopher tortoise burrow beetle, and dozens of other reptiles, amphibians, and small mammals.",
      },
      {
        subtitle: "Burrow Structure and Signs",
        body: "Active burrows show a characteristic apron of freshly excavated sand at the entrance. The opening is wider than it is tall — roughly the shape and size of the tortoise. A depression without a fresh apron may indicate a potentially active or abandoned burrow. Never fill or disturb a burrow entrance.",
      },
    ],
  },
  {
    icon: <Trees className="w-7 h-7" />,
    title: "Why the Space Coast Matters",
    color: "text-[oklch(0.44_0.040_155)]",
    bgColor: "bg-[oklch(0.92_0.020_155)]",
    content: [
      {
        subtitle: "Critical Scrub Habitat",
        body: "Brevard County's Space Coast contains some of Florida's largest remaining tracts of xeric scrub — the preferred habitat of the gopher tortoise. These ancient sand ridge ecosystems host extraordinary biodiversity, including multiple federally listed species.",
      },
      {
        subtitle: "The Land Holders",
        body: "Large portions of Space Coast scrub are controlled by federal and private entities: NASA Kennedy Space Center (KSC) and Launch Control Complex, SpaceX's expanding Starbase operations, Patrick Space Force Base, and an accelerating wave of private warehouse and residential development, particularly in Brevard County's central corridor. In the Melbourne corridor to the south, major defense contractors — Harris/L3T, Northrop Grumman, and Collins Aerospace — control large campus perimeters with adjacent scrub. Melbourne Orlando International Airport's expansion zone also borders documented tortoise habitat. These entities control vast tracts of undeveloped land where community documentation is the primary accountability mechanism.",
      },
      {
        subtitle: "Ongoing Development Pressure",
        body: "The Space Coast is experiencing the fastest population and industrial growth in Florida. Rocket launch infrastructure expansion, new SpaceX facilities, transportation corridors, and residential sprawl are fragmenting scrub habitat at an unprecedented rate. Ground-disturbing activity on or adjacent to these parcels frequently threatens documented burrow sites.",
      },
    ],
  },
  {
    icon: <Scale className="w-7 h-7" />,
    title: "Legal Protections",
    color: "text-[oklch(0.30_0.055_155)]",
    bgColor: "bg-[oklch(0.90_0.030_155)]",
    content: [
      {
        subtitle: "State-Listed Threatened Species",
        body: "In Florida, gopher tortoises are protected under Rule 68A-27.005, F.A.C. The species is also a candidate for federal listing under the Endangered Species Act in portions of its range.",
      },
      {
        subtitle: "Relocation Requirements",
        body: "Before any ground-disturbing development activity on lands with gopher tortoise burrows, the developer must obtain a FWC permit. All tortoises must be relocated to a recipient site under FWC oversight. Developers pay a mitigation fee of $1,800–$2,300 per tortoise to fund recipient site protection.",
      },
      {
        subtitle: "Penalties",
        body: "Unlawful take of a gopher tortoise is a second-degree misdemeanor under Florida law. Deliberate destruction of burrows without authorization can result in fines of up to $5,000 per violation and potential felony charges if combined with other wildlife violations. FWC actively investigates tortoise take during development activities.",
      },
    ],
  },
  {
    icon: <Phone className="w-7 h-7" />,
    title: "How to Report a Sighting",
    color: "text-[oklch(0.40_0.17_30)]",
    bgColor: "bg-[oklch(0.94_0.04_30)]",
    content: [
      {
        subtitle: "FWC Wildlife Alert Hotline",
        body: "If you observe an illegally harmed tortoise, a burrow being destroyed, or development activities occurring without apparent relocation: call the FWC Wildlife Alert Hotline at 1-888-404-FWCC (3922). Reports are confidential and can be made anonymously.",
      },
      {
        subtitle: "Documenting a Burrow Safely",
        body: "Do not approach or disturb a tortoise. Photograph the burrow entrance from a respectful distance. Record GPS coordinates using your phone. Note the size of the apron, any tortoise activity, and surrounding land use. Submit your documentation here in Burrow Watch using the 'Add New Burrow' form.",
      },
      {
        subtitle: "What NOT to Do",
        body: "Do not attempt to capture, move, or feed a gopher tortoise. Do not handle eggs. Do not block or fill a burrow entrance. Do not disturb surrounding vegetation. Leave the site exactly as you found it — your documentation is the most valuable action you can take.",
      },
    ],
  },
  {
    icon: <Heart className="w-7 h-7" />,
    title: "How You Can Help",
    color: "text-[oklch(0.44_0.070_155)]",
    bgColor: "bg-[oklch(0.90_0.040_155)]",
    content: [
      {
        subtitle: "Document and Report",
        body: "Use Burrow Watch to record new burrow sightings and update the status of known sites. Community documentation is the foundation of effective advocacy. Accurate location data and photographic evidence are essential when engaging with developers or FWC.",
      },
      {
        subtitle: "Support Habitat Conservation",
        body: "Organizations working to protect Space Coast scrub habitat include Florida Scrub Jay Research, the Florida Wildlife Corridor, Brevard Zoo's Wild Florida program, and the Florida Fish and Wildlife Foundation. Habitat donations and volunteer monitoring hours make a direct difference.",
      },
      {
        subtitle: "Avoid Disturbing Burrows",
        body: "When outdoors in scrub habitat, stay on established trails. Keep dogs leashed. If you find a gopher tortoise in the road, you may carefully move it in the direction it was traveling — but do not relocate it to a new area. Respect the animal and its home.",
      },
    ],
  },
];

export function Education() {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-lg bg-[oklch(var(--primary))] p-5 text-[oklch(var(--primary-foreground))]">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 shrink-0 opacity-80" />
          <div>
            <p className="font-bold text-sm">Community Awareness Resource</p>
            <p className="text-xs opacity-80 mt-0.5">
              The gopher tortoise population on the Space Coast faces
              accelerating habitat loss due to industrial and residential
              development. Documentation and awareness are our most powerful
              tools.
            </p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="shadow-card border-border h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-lg ${section.bgColor} ${section.color}`}
                  >
                    {section.icon}
                  </div>
                  <CardTitle className={`text-base font-bold ${section.color}`}>
                    {section.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.content.map((item) => (
                  <div key={item.subtitle}>
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      {item.subtitle}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
