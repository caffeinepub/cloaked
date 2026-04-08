import Text "mo:core/Text";
import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Storage "mo:caffeineai-object-storage/Storage";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";



actor {
  // Privacy Score Personas
  type PrivacyScore = {
    score : Nat;
    persona : Text;
  };

  type BrokerCategory = {
    #peopleSearch;
    #marketing;
    #backgroundCheck;
    #publicRecords;
    #financial;
    #other;
  };

  type PlatformCategory = {
    #socialMedia;
    #searchEngine;
    #eCommerce;
    #dataAggregator;
    #media;
    #other;
  };

  // Broker & Platform Types
  type DataBroker = {
    name : Text;
    description : Text;
    optOutUrl : Text;
    category : BrokerCategory;
  };

  type Platform = {
    name : Text;
    description : Text;
    removalGuideUrl : Text;
    category : PlatformCategory;
  };

  // User Progress
  type ProgressStatus = {
    #notStarted;
    #inProgress;
    #completed;
  };

  type UserProfile = {
    id : Principal;
    progress : ProgressStatus;
    privacyScore : PrivacyScore;
  };

  module UserProfile {
    public func compare(profile1 : UserProfile, profile2 : UserProfile) : Order.Order {
      Principal.compare(profile1.id, profile2.id);
    };
  };

  // National Debt Configuration
  type NationalDebtConfig = {
    baselineDebtCents : Nat;
    referenceTimestamp : Nat;
    ratePerSecondCents : Nat;
    usPopulation : Nat;
    usTaxpayers : Nat;
  };

  // U.S. Debt Clock Data
  let defaultNationalDebtConfig = {
    baselineDebtCents = 365_500_000_000_000_0; // $36.55 trillion
    referenceTimestamp = 1_742_860_800; // March 25 2026 00:00:00 UTC
    ratePerSecondCents = 7_927_400; // $79,274/second
    usPopulation = 335_000_000;
    usTaxpayers = 150_000_000;
  };

  // Initialize the user system state
  let accessControlState = AccessControl.initState();

  include MixinAuthorization(accessControlState);
  include MixinObjectStorage();

  // Persistent Storage
  let brokers = List.fromArray<DataBroker>([
    {
      name = "Spokeo";
      description = "People search & data aggregation";
      optOutUrl = "https://www.spokeo.com/opt_out/new";
      category = #peopleSearch;
    },
    {
      name = "BeenVerified";
      description = "Public records search service";
      optOutUrl = "https://www.beenverified.com/app/optout/search";
      category = #backgroundCheck;
    },
    {
      name = "Intelius";
      description = "Background checks & people search";
      optOutUrl = "https://www.intelius.com/opt-out";
      category = #backgroundCheck;
    },
    {
      name = "WhitePages";
      description = "Directory & data broker";
      optOutUrl = "https://www.whitepages.com/suppression_requests";
      category = #peopleSearch;
    },
    {
      name = "Acxiom";
      description = "Marketing data broker";
      optOutUrl = "https://isapps.acxiom.com/optout/optout.aspx";
      category = #marketing;
    },
    {
      name = "LexisNexis";
      description = "Risk management data broker";
      optOutUrl = "https://risk.lexisnexis.com/consumer-and-data-access-policies/consumer-opt-out-process";
      category = #backgroundCheck;
    },
    {
      name = "PeopleFinders";
      description = "People search & background checks";
      optOutUrl = "https://www.peoplefinders.com/manage";
      category = #peopleSearch;
    },
    {
      name = "MyLife";
      description = "Background checks & reputation scores";
      optOutUrl = "https://www.mylife.com/ccpa";
      category = #backgroundCheck;
    },
    {
      name = "US Search";
      description = "Background checks & people search";
      optOutUrl = "https://privacyaffairs.com/us-search-remove-personal-data";
      category = #peopleSearch;
    },
    {
      name = "PeopleSmart";
      description = "Contact information & background checks";
      optOutUrl = "https://privacyaffairs.com/peoplesmart-opt-out-remove-personal-data";
      category = #peopleSearch;
    },
    {
      name = "Radaris";
      description = "People search & public records";
      optOutUrl = "https://www.radaris.com/control/privacy";
      category = #peopleSearch;
    },
    {
      name = "FastPeopleSearch";
      description = "People search & background checks";
      optOutUrl = "https://fastpeoplesearch.com/removal";
      category = #peopleSearch;
    },
    {
      name = "IDTrue";
      description = "Background checks & people search";
      optOutUrl = "https://www.idtrue.com/help/optout";
      category = #backgroundCheck;
    },
    {
      name = "CheckPeople";
      description = "People search & background checks";
      optOutUrl = "https://www.checkpeople.com/opt-out";
      category = #backgroundCheck;
    },
    {
      name = "TruthFinder";
      description = "Background checks & people search";
      optOutUrl = "https://www.truthfinder.com/opt-out";
      category = #backgroundCheck;
    },
    {
      name = "Instant Checkmate";
      description = "Background checks & people search";
      optOutUrl = "https://www.instantcheckmate.com/opt-out";
      category = #backgroundCheck;
    },
    {
      name = "PeopleLooker";
      description = "People search & background checks";
      optOutUrl = "https://www.peoplelooker.com/opt-out";
      category = #backgroundCheck;
    },
    {
      name = "ZabaSearch";
      description = "People search & public records";
      optOutUrl = "https://www.zabasearch.com/removal";
      category = #peopleSearch;
    },
    {
      name = "PeekYou";
      description = "People search & background checks";
      optOutUrl = "https://www.peekyou.com/about/privacy-policy/opt-out";
      category = #peopleSearch;
    },
    {
      name = "Pipl";
      description = "People search engine";
      optOutUrl = "https://pipl.com/remove-yourself";
      category = #peopleSearch;
    },
  ]);

  let platforms = List.fromArray<Platform>([
    {
      name = "Facebook";
      description = "Social media platform";
      removalGuideUrl = "https://www.facebook.com/help/224562897555674";
      category = #socialMedia;
    },
    {
      name = "Google";
      description = "Search engine, email, cloud";
      removalGuideUrl = "https://www.google.com/maps/timeline?pb";
      category = #searchEngine;
    },
    {
      name = "Instagram";
      description = "Photo/video sharing platform";
      removalGuideUrl = "https://www.instagram.com/accounts/remove/request/permanent";
      category = #socialMedia;
    },
    {
      name = "Twitter";
      description = "Social media platform";
      removalGuideUrl = "https://help.twitter.com/en/managing-your-account/how-to-deactivate-twitter-account";
      category = #socialMedia;
    },
    {
      name = "LinkedIn";
      description = "Professional networking platform";
      removalGuideUrl = "https://www.linkedin.com/help/linkedin/answer/936";
      category = #socialMedia;
    },
    {
      name = "Amazon";
      description = "Shopping & cloud services";
      removalGuideUrl = "https://www.amazon.com/gp/help/customer/display.html?nodeId=GFHBZE6BUXXTBPMY";
      category = #eCommerce;
    },
    {
      name = "Apple";
      description = "Tech ecosystem";
      removalGuideUrl = "https://support.apple.com/en-us/HT208504";
      category = #dataAggregator;
    },
    {
      name = "Microsoft";
      description = "Cloud & software";
      removalGuideUrl = "https://privacy.microsoft.com/en-us/my-account";
      category = #searchEngine;
    },
    {
      name = "Reddit";
      description = "Social discussion platform";
      removalGuideUrl = "https://www.reddit.com/prefs/delete_account";
      category = #media;
    },
    {
      name = "Pinterest";
      description = "Social media & discovery";
      removalGuideUrl = "https://help.pinterest.com/en/article/close-your-account";
      category = #socialMedia;
    },
  ]);

  let nationalDebtConfig : NationalDebtConfig = defaultNationalDebtConfig;
  let userProgress = Map.empty<Principal, UserProfile>();

  // Public Functions
  public shared ({ caller }) func saveCallerUserProfile(user : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProgress.add(caller, user);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProgress.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProgress.get(user);
  };

  public query ({ caller }) func getPlatformsWithStatus() : async [(Platform, ProgressStatus)] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access their progress");
    };
    let progress = userProgress.get(caller);
    let platformArray = platforms.toArray();
    platformArray.map(
      func(p) {
        (
          p,
          switch (progress) {
            case (null) { #notStarted };
            case (?profile) { profile.progress };
          },
        );
      }
    );
  };

  public query ({ caller }) func getBrokersWithStatus() : async [(DataBroker, ProgressStatus)] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access their progress");
    };
    let progress = userProgress.get(caller);
    let brokerArray = brokers.toArray();
    brokerArray.map(
      func(b) {
        (
          b,
          switch (progress) {
            case (null) { #notStarted };
            case (?profile) { profile.progress };
          },
        );
      }
    );
  };

  public query ({ caller }) func getBrokers() : async [DataBroker] {
    brokers.toArray();
  };

  public query ({ caller }) func getPlatforms() : async [Platform] {
    platforms.toArray();
  };

  public query ({ caller }) func getUserProfiles() : async [UserProfile] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all user profiles");
    };
    userProgress.values().toArray().sort();
  };

  // National Debt Functions
  public query ({ caller }) func getNationalDebtConfig() : async NationalDebtConfig {
    nationalDebtConfig;
  };

  public query ({ caller }) func getCurrentDebtTimestamp() : async Nat {
    nationalDebtConfig.referenceTimestamp;
  };

  public query ({ caller }) func getBaselineDebtCents() : async Nat {
    nationalDebtConfig.baselineDebtCents;
  };

  public query ({ caller }) func getRatePerSecondCents() : async Nat {
    nationalDebtConfig.ratePerSecondCents;
  };

  public query ({ caller }) func getUSPopulation() : async Nat {
    nationalDebtConfig.usPopulation;
  };

  public query ({ caller }) func getUSTaxpayers() : async Nat {
    nationalDebtConfig.usTaxpayers;
  };

  // Storyboard Image Management
  type StoryboardImage = {
    title : Text;
    description : Text;
    image : Storage.ExternalBlob;
  };

  let storyboardImages = Map.empty<Nat, StoryboardImage>();
  var nextImageId : Nat = 0;

  public shared ({ caller }) func addStoryboardImage(title : Text, description : Text, image : Storage.ExternalBlob) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add storyboard images");
    };
    let id = nextImageId;
    let newImage : StoryboardImage = {
      title;
      description;
      image;
    };
    storyboardImages.add(id, newImage);
    nextImageId += 1;
    id;
  };

  public query ({ caller }) func getStoryboardImages() : async [StoryboardImage] {
    storyboardImages.values().toArray();
  };

  public query ({ caller }) func getStoryboardImage(id : Nat) : async ?StoryboardImage {
    storyboardImages.get(id);
  };

  public shared ({ caller }) func updateStoryboardImage(id : Nat, title : Text, description : Text, image : Storage.ExternalBlob) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update storyboard images");
    };
    switch (storyboardImages.get(id)) {
      case (null) { Runtime.trap("Storyboard image not found") };
      case (?existingImage) {
        let updatedImage : StoryboardImage = {
          title;
          description;
          image;
        };
        storyboardImages.add(id, updatedImage);
      };
    };
  };

  public shared ({ caller }) func deleteStoryboardImage(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete storyboard images");
    };
    if (not storyboardImages.containsKey(id)) {
      Runtime.trap("Storyboard image not found");
    };
    storyboardImages.remove(id);
  };
};
