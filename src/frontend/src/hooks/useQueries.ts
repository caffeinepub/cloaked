import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export enum ProgressStatus {
  notStarted = "notStarted",
  inProgress = "inProgress",
  completed = "completed",
}

export enum BrokerCategory {
  backgroundCheck = "backgroundCheck",
  marketing = "marketing",
  peopleSearch = "peopleSearch",
  publicRecords = "publicRecords",
  financial = "financial",
  other = "other",
}

export enum PlatformCategory {
  socialMedia = "socialMedia",
  searchEngine = "searchEngine",
  eCommerce = "eCommerce",
  dataAggregator = "dataAggregator",
  media = "media",
  other = "other",
}

export interface DataBroker {
  name: string;
  description: string;
  optOutUrl: string;
  category: string;
}

export interface Platform {
  name: string;
  description: string;
  removalGuideUrl: string;
  category: string;
}

export type BrokerWithStatus = { broker: DataBroker; status: ProgressStatus };
export type PlatformWithStatus = { platform: Platform; status: ProgressStatus };

const STATUS_KEY = "unplugged_status";

type StatusStore = {
  brokers: Record<string, ProgressStatus>;
  platforms: Record<string, ProgressStatus>;
};

function loadStatusStore(): StatusStore {
  try {
    const raw = localStorage.getItem(STATUS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { brokers: {}, platforms: {} };
}

function saveStatusStore(store: StatusStore) {
  localStorage.setItem(STATUS_KEY, JSON.stringify(store));
}

export function useBrokersWithStatus() {
  return useQuery<BrokerWithStatus[]>({
    queryKey: ["brokersWithStatus"],
    queryFn: async () => {
      const store = loadStatusStore();
      return STATIC_BROKERS.map((broker) => ({
        broker,
        status: store.brokers[broker.name] ?? ProgressStatus.notStarted,
      }));
    },
  });
}

export function usePlatformsWithStatus() {
  return useQuery<PlatformWithStatus[]>({
    queryKey: ["platformsWithStatus"],
    queryFn: async () => {
      const store = loadStatusStore();
      return STATIC_PLATFORMS.map((platform) => ({
        platform,
        status: store.platforms[platform.name] ?? ProgressStatus.notStarted,
      }));
    },
  });
}

export function useUpdateBrokerStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      status,
    }: { name: string; status: ProgressStatus }) => {
      const store = loadStatusStore();
      store.brokers[name] = status;
      saveStatusStore(store);
      return { name, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brokersWithStatus"] });
    },
  });
}

export function useUpdatePlatformStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      status,
    }: { name: string; status: ProgressStatus }) => {
      const store = loadStatusStore();
      store.platforms[name] = status;
      saveStatusStore(store);
      return { name, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platformsWithStatus"] });
    },
  });
}

// Static data
const STATIC_BROKERS: DataBroker[] = [
  {
    name: "Spokeo",
    description:
      "Aggregates personal data including addresses, phone numbers, relatives, and social profiles from hundreds of sources.",
    optOutUrl: "https://www.spokeo.com/optout",
    category: "peopleSearch" as any,
  },
  {
    name: "WhitePages",
    description:
      "One of the largest people-search databases in the US, compiling public records and contact information.",
    optOutUrl: "https://www.whitepages.com/suppression_requests",
    category: "peopleSearch" as any,
  },
  {
    name: "BeenVerified",
    description:
      "Background check service that compiles criminal records, addresses, social accounts, and personal history.",
    optOutUrl: "https://www.beenverified.com/faq/opt-out/",
    category: "backgroundCheck" as any,
  },
  {
    name: "Intelius",
    description:
      "Sells background reports and people-search results sourced from public records and data brokers.",
    optOutUrl: "https://www.intelius.com/opt-out",
    category: "backgroundCheck" as any,
  },
  {
    name: "PeopleFinder",
    description:
      "Provides access to billions of public records including property, criminal, and contact information.",
    optOutUrl: "https://www.peoplefinders.com/manage",
    category: "publicRecords" as any,
  },
  {
    name: "Acxiom",
    description:
      "One of the world's largest data brokers, supplying marketing data about billions of consumers globally.",
    optOutUrl: "https://www.acxiom.com/optout",
    category: "marketing" as any,
  },
  {
    name: "LexisNexis",
    description:
      "Compiles extensive personal data from court records, financial transactions, and public records for background checks.",
    optOutUrl: "https://optout.lexisnexis.com",
    category: "publicRecords" as any,
  },
  {
    name: "Epsilon",
    description:
      "Marketing data giant that tracks purchasing behavior and personal information for ad targeting.",
    optOutUrl:
      "https://www.epsilon.com/us/privacy-policy/epsilon-main-privacy-policy",
    category: "marketing" as any,
  },
  {
    name: "Equifax",
    description:
      "Major credit reporting bureau holding financial records, credit history, and personal identifiers.",
    optOutUrl: "https://www.equifax.com/personal/privacy/",
    category: "financial" as any,
  },
  {
    name: "TruthFinder",
    description:
      "Background check site that publishes personal reports pulled from public and private databases.",
    optOutUrl: "https://www.truthfinder.com/opt-out/",
    category: "backgroundCheck" as any,
  },
];

const STATIC_PLATFORMS: Platform[] = [
  {
    name: "Facebook",
    description:
      "Download and delete your data, deactivate or permanently delete your account. Access via Settings > Your Facebook Information.",
    removalGuideUrl: "https://www.facebook.com/help/delete_account",
    category: "socialMedia" as any,
  },
  {
    name: "Instagram",
    description:
      "Request account deletion and download your data archive. Allow 30 days for permanent deletion.",
    removalGuideUrl: "https://help.instagram.com/contact/privacy/",
    category: "socialMedia" as any,
  },
  {
    name: "Twitter / X",
    description:
      "Deactivate your account (data deleted after 30 days). Download your archive first via Settings > Your Account.",
    removalGuideUrl: "https://twitter.com/settings/deactivate",
    category: "socialMedia" as any,
  },
  {
    name: "LinkedIn",
    description:
      "Close your account via Settings & Privacy > Account preferences > Account management. Export data first.",
    removalGuideUrl: "https://www.linkedin.com/help/linkedin/answer/63",
    category: "socialMedia" as any,
  },
  {
    name: "Google",
    description:
      "Delete your Google Account or specific service data. Use the Data & Privacy page to review what Google has.",
    removalGuideUrl: "https://myaccount.google.com/delete-services-or-account",
    category: "searchEngine" as any,
  },
  {
    name: "TikTok",
    description:
      "Delete your account via Profile > Settings > Manage Account. Data deleted within 30 days.",
    removalGuideUrl:
      "https://support.tiktok.com/en/account-and-privacy/deleting-an-account",
    category: "socialMedia" as any,
  },
  {
    name: "Amazon",
    description:
      "Request account closure via Help, delete Alexa voice history, and opt out of personalized ads.",
    removalGuideUrl: "https://www.amazon.com/privacy/data-deletion",
    category: "eCommerce" as any,
  },
  {
    name: "Reddit",
    description:
      "Delete or deactivate your account. Note: posts may remain even after account deletion.",
    removalGuideUrl: "https://www.reddit.com/settings/delete-account",
    category: "socialMedia" as any,
  },
  {
    name: "Snapchat",
    description:
      "Delete your account via Snapchat website. Account data fully removed after 30 days.",
    removalGuideUrl: "https://accounts.snapchat.com/accounts/delete_account",
    category: "socialMedia" as any,
  },
  {
    name: "Pinterest",
    description:
      "Delete your account and all associated boards, pins, and personal data permanently.",
    removalGuideUrl:
      "https://help.pinterest.com/en/article/deactivate-or-close-your-account",
    category: "socialMedia" as any,
  },
];
