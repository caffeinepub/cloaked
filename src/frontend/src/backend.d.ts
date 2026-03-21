import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PrivacyScore {
    score: bigint;
    persona: string;
}
export interface Platform {
    name: string;
    removalGuideUrl: string;
    description: string;
    category: PlatformCategory;
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
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getBrokers(): Promise<Array<DataBroker>>;
    getBrokersWithStatus(): Promise<Array<[DataBroker, ProgressStatus]>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPlatforms(): Promise<Array<Platform>>;
    getPlatformsWithStatus(): Promise<Array<[Platform, ProgressStatus]>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserProfiles(): Promise<Array<UserProfile>>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(user: UserProfile): Promise<void>;
}
