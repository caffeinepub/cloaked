export interface MonthData {
  month: string;
  shortMonth: string;
  season: string;
  inSeason: string[];
  plantNow: string[];
  weatherPests: string;
  maintenance: string[];
}

export const MONTHS: MonthData[] = [
  {
    month: "January",
    shortMonth: "Jan",
    season:
      "Cool & dry. Lows 45–55°F, highs 65–75°F. Occasional frost risk. Dry season begins.",
    inSeason: [
      "Citrus peak — navel oranges, tangerines, grapefruit, kumquats",
      "Strawberries beginning",
      "Loquats flowering",
      "Late avocados (some cold-hardy varieties like Lula) finishing up",
    ],
    plantNow: [
      "Broccoli, cabbage, cauliflower, kale, collards",
      "Lettuce, spinach, snap peas, carrots, beets, radishes, onions",
      "Start tomato seedlings indoors",
    ],
    weatherPests:
      "Aphids on cool-season crops. Whitefly on citrus. Protect tropicals if frost threatens.",
    maintenance: [
      "Prune roses and fruit trees",
      "Mulch to protect from frost",
      "Hold off fertilizing tropicals",
      "Protect banana trees if frost threatens",
    ],
  },
  {
    month: "February",
    shortMonth: "Feb",
    season: "Still cool but warming. Last frost risk. Dry season.",
    inSeason: [
      "Citrus still heavy",
      "Strawberries peak",
      "Loquats ripening late February",
      "Avocado trees flowering — fruit won’t be ready until late summer",
    ],
    plantNow: [
      "Tomatoes (transplant out after Feb 15)",
      "Peppers, eggplant, squash, cucumbers, beans",
      "Continue cool-season crops early in month",
    ],
    weatherPests:
      "Aphids, spider mites in dry conditions. Caterpillars on brassicas. Last frost possible.",
    maintenance: [
      "Start fertilizing fruit trees coming out of dormancy",
      "Prune dead wood",
      "Begin irrigating as rains diminish",
    ],
  },
  {
    month: "March",
    shortMonth: "Mar",
    season:
      "Warming fast — 70s to 80s°F. Humidity rising. Last reliable cool nights.",
    inSeason: [
      "Strawberries winding down",
      "Loquats ripe",
      "Early mulberries",
      "Blueberries beginning",
      "Avocados developing on tree — months from harvest",
    ],
    plantNow: [
      "Tomatoes, peppers, squash, cucumbers, beans, sweet corn",
      "Basil and herbs",
      "Last chance for cool-season crops",
      "Start Everglades tomato transplants — heat-tolerant heirloom that thrives all summer",
    ],
    weatherPests:
      "Aphids, caterpillars, stink bugs on tomatoes beginning. Dry season peak — water carefully.",
    maintenance: [
      "Fertilize all fruit trees (balanced 6-6-6 or 8-3-9 for citrus)",
      "Refresh mulch",
      "Set up irrigation for dry season",
      "Pull cool-season plants as they bolt",
    ],
  },
  {
    month: "April",
    shortMonth: "Apr",
    season: "Hot and dry — 80s to 90s°F. Dry season peak. Low humidity still.",
    inSeason: [
      "Mulberries peak (Morus rubra and cultivars)",
      "Blueberries peak",
      "Loquats finishing",
      "Everglades tomatoes beginning to produce",
    ],
    plantNow: [
      "Sweet potatoes, Malabar spinach, okra",
      "Southern peas (black-eyed peas), Seminole pumpkin, pigeon peas",
      "Calabaza squash",
      "Heat-tolerant herbs: lemongrass, Cuban oregano, rosemary, chives",
      "Everglades tomato transplants into garden — thrives in heat where regular tomatoes fail",
    ],
    weatherPests:
      "Spider mites intensify in heat and drought. Stink bugs. Whitefly. Deep irrigation critical.",
    maintenance: [
      "Deep irrigation critical — mulch heavily",
      "Shade cloth on sensitive plants",
      "Last fertilization before rainy season for most trees",
    ],
  },
  {
    month: "May",
    shortMonth: "May",
    season:
      "Hot and humid — 85–92°F. Rainy season approaching. First afternoon thunderstorms.",
    inSeason: [
      "Mulberries finishing",
      "Mango trees in full fruit set — sizing up (harvest still weeks away)",
      "Lychee ripening",
      "Jaboticaba may fruit",
      "Everglades tomatoes producing well into summer heat",
      "Seminole pumpkin vines establishing",
    ],
    plantNow: [
      "Okra, sweet potatoes, Southern peas, Seminole pumpkin, Malabar spinach",
      "Tropical herbs",
      "Cassava, moringa, pigeon peas",
      "Not the time for regular tomatoes or peppers",
    ],
    weatherPests:
      "Mango seed weevil. Lychee erinose mite. Aphids on new growth. Watch lychee for cracking after drought.",
    maintenance: [
      "Prepare for rainy season — check drainage",
      "Apply mango and avocado fertilizer",
      "Watch lychee carefully for splitting after drought",
    ],
  },
  {
    month: "June",
    shortMonth: "Jun",
    season:
      "Rainy season in full swing — 88–94°F. Hot, humid, daily thunderstorms. Hurricane season begins.",
    inSeason: [
      "Mangoes beginning to ripen — early varieties like Haden first",
      "Carambola (star fruit) first crop",
      "Passion fruit",
      "Everglades tomatoes — prolific through summer",
      "Seminole pumpkin vines sprawling, fruit setting",
      "Avocados still sizing up — most varieties weeks from ripe",
    ],
    plantNow: [
      "Okra, sweet potatoes, Southern peas, tropical basil, moringa, lemongrass",
      "Ginger and turmeric",
      "Avoid most vegetables — too hot and wet",
    ],
    weatherPests:
      "Scale insects, sooty mold on citrus. Grasshoppers. Mango thrips. Monitor for fungal issues.",
    maintenance: [
      "Monitor for fungal issues with all the rain",
      "Spray copper fungicide if needed",
      "Stake trees against storm winds",
      "Avoid pruning — promotes tender growth vulnerable to storms",
    ],
  },
  {
    month: "July",
    shortMonth: "Jul",
    season:
      "Peak summer heat and rain — 90–95°F. High humidity. Active hurricane season.",
    inSeason: [
      "Mangoes peak — Tommy Atkins, Kent, Keitt staggered through August",
      "Avocados — some early varieties (Choquette) beginning to ripen late July",
      "Carambola",
      "Passion fruit",
      "Surinam cherry",
      "Seminole pumpkin ripening — harvest when skin hardens and stem dries",
      "Everglades tomatoes still producing",
    ],
    plantNow: [
      "Okra, sweet potatoes, Southern peas, moringa",
      "Mostly a waiting month for vegetables",
    ],
    weatherPests:
      "Caterpillars, grasshoppers, scale. Root rot from overwatering and flooding. Storm watch essential.",
    maintenance: [
      "Storm prep — check stakes, secure pots, trim hazardous branches",
      "Fertilize tropicals lightly if still pushing growth",
      "Harvest mangoes before storms if close to ripe",
      "Cure Seminole pumpkins in a dry spot after harvest — they store for months",
    ],
  },
  {
    month: "August",
    shortMonth: "Aug",
    season: "Still hot and wet — 89–94°F. Slight daylight shortening begins.",
    inSeason: [
      "Late mangoes — Keitt finishing out the season",
      "Avocados entering peak season — Choquette, Hall, and others ripening",
      "Carambola continuing",
      "Guava",
      "Soursop sizing up",
      "Seminole pumpkin — additional harvest if vines re-set fruit",
    ],
    plantNow: [
      "Sweet potatoes, Southern peas, okra finishing season",
      "Start tomato and pepper seeds indoors for fall transplant",
      "Collards and kale can go in late August",
    ],
    weatherPests:
      "Grasshoppers, caterpillars, stink bugs building. Root rot risk if drainage is poor.",
    maintenance: [
      "Begin preparing garden beds for fall planting",
      "Add compost to empty beds",
      "Light pruning on trees that have finished fruiting",
      "Fertilize citrus lightly",
    ],
  },
  {
    month: "September",
    shortMonth: "Sep",
    season:
      "Still hot and wet but moderating. Rainy season tapering. Peak hurricane month.",
    inSeason: [
      "Avocados — prime harvest month for many varieties",
      "Carambola second crop",
      "Guava",
      "Soursop ripening",
      "Sugar apple (atemoya) ripening",
    ],
    plantNow: [
      "Tomatoes — transplant out mid to late September (Florida's second season)",
      "Peppers, eggplant, squash, cucumbers, beans",
      "Herbs: basil, cilantro, parsley",
    ],
    weatherPests:
      "Stink bugs on tomatoes intensifying. Caterpillars. Whitefly. Hurricane vigilance.",
    maintenance: [
      "Hurricane vigilance all month",
      "Begin serious fall planting preparation",
      "Clean up summer garden debris",
      "Renew mulch after summer rains",
    ],
  },
  {
    month: "October",
    shortMonth: "Oct",
    season:
      "Drying out. Cooler nights in the 60s. Warm pleasant days in the low 80s. Rainy season ending.",
    inSeason: [
      "Avocados — excellent fall harvest continues; late varieties like Monroe ripening",
      "Carambola prolific",
      "Sugar apple",
      "Guava",
      "Papaya",
      "Bananas — often heavy in fall",
    ],
    plantNow: [
      "Tomatoes, peppers, squash, cucumbers, beans",
      "Broccoli, cabbage, lettuce, kale, collards, carrots, beets",
      "Herbs — Florida's best growing month!",
    ],
    weatherPests:
      "Reducing — ideal growing conditions. Stink bugs. Aphids beginning on cool-season crops.",
    maintenance: [
      "Most active gardening month — fertilize everything",
      "Replant cover crops in empty beds",
      "Service irrigation for the dry season ahead",
    ],
  },
  {
    month: "November",
    shortMonth: "Nov",
    season:
      "Cooler and drying — nights 50s to 60s, days 70s to 80s. Ideal Florida weather.",
    inSeason: [
      "Citrus beginning — early tangerines, Hamlin oranges",
      "Late avocados (Lula, Monroe) — hanging on into early winter in good years",
      "Carambola still producing",
      "Papaya",
      "Bananas",
    ],
    plantNow: [
      "All cool-season crops: broccoli, cauliflower, cabbage, kale, collards",
      "Lettuce, spinach, carrots, beets, turnips, radishes, snap peas, onions, garlic",
      "Strawberry plants (plant by Thanksgiving)",
    ],
    weatherPests:
      "Aphids on brassicas. Caterpillars (loopers) on greens. Begin frost protection planning.",
    maintenance: [
      "Plant strawberries by Thanksgiving",
      "Mulch beds",
      "Begin frost protection planning for tropicals",
      "Light pruning",
    ],
  },
  {
    month: "December",
    shortMonth: "Dec",
    season:
      "Cool and dry — nights 45–55°F, days 65–75°F. Frost possible in cold years. Dry season.",
    inSeason: [
      "Citrus prime — navel oranges, tangerines, grapefruit, temples",
      "Strawberries growing",
      "Loquats budding and blooming",
      "Some late cold-hardy avocado varieties (Lula) may still be finishing",
    ],
    plantNow: [
      "Lettuce, kale, spinach, collards, carrots, beets, radishes, snap peas",
      "Watch frost forecasts before planting warm crops",
    ],
    weatherPests:
      "Aphids. Scale on citrus. Low pest pressure overall — the gift of cool season.",
    maintenance: [
      "Frost protection for tropicals — cover bananas, papayas, young citrus",
      "Hold fertilizer on tropicals",
      "Prune deciduous fruit trees while dormant",
    ],
  },
];

export const HOT_WEATHER_CROPS = [
  "Okra",
  "Sweet potatoes",
  "Southern peas / black-eyed peas",
  "Seminole pumpkin (heirloom — heat & drought tolerant, stores for months)",
  "Calabaza squash",
  "Everglades tomato (heirloom cherry — produces through summer heat)",
  "Malabar spinach",
  "Pigeon peas",
  "Moringa",
  "Cassava",
  "Lemongrass",
  "Ginger",
  "Turmeric",
  "Tropical basil",
  "Cuban oregano",
];

export const COLD_WEATHER_CROPS = [
  "Tomatoes (fall/spring seasons)",
  "Broccoli",
  "Cauliflower",
  "Cabbage",
  "Kale",
  "Collards",
  "Lettuce",
  "Spinach",
  "Carrots",
  "Beets",
  "Radishes",
  "Snap peas",
  "Onions",
  "Garlic",
  "Strawberries",
  "Cilantro",
  "Parsley",
];

export const YEAR_ROUND_CROPS = [
  "Herbs (rosemary, chives, Cuban oregano)",
  "Papaya",
  "Bananas",
  "Moringa",
  "Lemongrass",
  "Hot peppers (perennial in FL)",
  "Pigeon peas (perennial)",
  "Cassava",
  "Everglades tomato (spring start, produces through summer and fall)",
];
