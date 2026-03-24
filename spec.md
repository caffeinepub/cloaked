# Free Soil Gardens

## Current State
Existing workspace has scaffolded backend (with authorization and blob-storage mixins) and a frontend with shadcn/ui components. The current files are from a prior project -- this is a full replacement build.

## Requested Changes (Diff)

### Add
- Brand identity: Free Soil Gardens -- earthy, subtropical Florida, independent grower aesthetic. Visual vibe: worn textures, deep greens, clay earth tones, sun-bleached warmth. Part medieval agrarian spirit, part barefoot Florida wildness.
- **Gardening Calendar** (primary free tool): Month-by-month guide for eastern central Florida (zone 9b/10a). Each month covers: fruiting trees in season, vegetables and herbs to plant/harvest, and maintenance/care tips for trees and garden plants.
- **Photo Gallery**: Showcases garden photos from Free Soil Gardens. Static images with earthy layout.
- **Shop / Listings**: Content-managed listings for sale items (e.g., small mulberry tree, fresh mango fruit). Each listing has: title, description, price, photo, availability status. Admin can add/edit/remove listings via authenticated backend.
- **About / Brand section**: Subtle brand story -- small boutique grower, love of subtropical growing, community focus. Not a corporate pitch.
- **ICP Donation section**: Same wallet address as other projects (`416c602ad9431e5c54158097c181a8268c72de7704f8276d6d13e7e4f4207150`), copy-to-clipboard, brief explanation.

### Modify
- Replace all existing frontend pages/components with new Free Soil Gardens UI.
- Replace backend with listings management (create, update, delete listings with title, description, price, photo blob, availability).

### Remove
- All existing app logic (Burrow Watch, Cloaked, Debt Clock components).

## Implementation Plan
1. Select `authorization` and `blob-storage` components for listings content management.
2. Generate Motoko backend for listings CRUD (title, description, price, imageUrl, available, category).
3. Build frontend with tabs: Calendar | Shop | Gallery | About.
4. Calendar tab: month selector, content cards per month with fruiting trees, planting/harvesting, and maintenance sections for FL zone 9b/10a.
5. Shop tab: public listing grid; admin login via Internet Identity to add/edit/remove listings with photo upload via blob-storage.
6. Gallery tab: curated photo grid with earthy aesthetic.
7. About/Donate tab: brand story + ICP donation widget.
