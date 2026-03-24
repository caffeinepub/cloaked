import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Platform {
    name: string;
    removalGuideUrl: string;
    description: string;
    category: PlatformCategory;
}
export interface StoryboardImage {
    title: string;
    description: string;
    image: ExternalBlob;
}
export interface PrivacyScore {
    score: bigint;
    persona: string;
}
export interface NationalDebtConfig {
    ratePerSecondCents: bigint;
    referenceTimestamp: bigint;
    usTaxpayers: bigint;
    baselineDebtCents: bigint;
    usPopulation: bigint;
}
export interface DataBroker {
    name: string;
    description: string;
    optOutUrl: string;
    category: BrokerCategory;
}
export interface UserProfile {
    id: Principal;
    privacyScore: PrivacyScore;
    progress: ProgressStatus;
}
export enum BrokerCategory {
    backgroundCheck = "backgroundCheck",
    other = "other",
    marketing = "marketing",
    peopleSearch = "peopleSearch",
    publicRecords = "publicRecords",
    financial = "financial"
}
export enum PlatformCategory {
    media = "media",
    other = "other",
    dataAggregator = "dataAggregator",
    searchEngine = "searchEngine",
    eCommerce = "eCommerce",
    socialMedia = "socialMedia"
}
export enum ProgressStatus {
    notStarted = "notStarted",
    completed = "completed",
    inProgress = "inProgress"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addStoryboardImage(title: string, description: string, image: ExternalBlob): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteStoryboardImage(id: bigint): Promise<void>;
    getBaselineDebtCents(): Promise<bigint>;
    getBrokers(): Promise<Array<DataBroker>>;
    getBrokersWithStatus(): Promise<Array<[DataBroker, ProgressStatus]>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCurrentDebtTimestamp(): Promise<bigint>;
    getNationalDebtConfig(): Promise<NationalDebtConfig>;
    getPlatforms(): Promise<Array<Platform>>;
    getPlatformsWithStatus(): Promise<Array<[Platform, ProgressStatus]>>;
    getRatePerSecondCents(): Promise<bigint>;
    getStoryboardImage(id: bigint): Promise<StoryboardImage | null>;
    getStoryboardImages(): Promise<Array<StoryboardImage>>;
    getUSPopulation(): Promise<bigint>;
    getUSTaxpayers(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserProfiles(): Promise<Array<UserProfile>>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(user: UserProfile): Promise<void>;
    updateStoryboardImage(id: bigint, title: string, description: string, image: ExternalBlob): Promise<void>;
}
