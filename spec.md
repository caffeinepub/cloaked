# Burrow Watch

## Current State
Burrow Watch is a gopher tortoise burrow tracker for the Space Coast / Brevard County region. Land use categories: NASA-KSC, SpaceX, Patrick SFB, Private Development, Other. 10 seed burrows. Field mode toggle enables add/edit. No public submission, no Melbourne/aerospace coverage, no donation feature.

## Requested Changes (Diff)

### Add
- New LandUse categories: Melbourne Airport Area, Harris/L3T, Northrop Grumman, Collins Aerospace
- 5 new seed burrows near Melbourne aerospace/defense corridor
- Public "Report a Burrow" tab — anyone can submit a sighting without field mode (location, coordinates, land use, threat, notes, photo); submissions appear in registry with Reported status
- "Support This Project" ICP donation section in About tab (address: 416c602ad9431e5c54158097c181a8268c72de7704f8276d6d13e7e4f4207150) with copy button
- Mission note in About explaining purpose: document burrows near large corporation development land to ensure responsible development

### Modify
- BurrowModal and BurrowRegistry selects to include new land use categories
- Header subtitle to include Melbourne region
- Education section to briefly reference Melbourne aerospace corridor

### Remove
- Nothing

## Implementation Plan
1. Update burrows.ts: add LandUse types + Melbourne seed records
2. Update BurrowModal.tsx: new land use options
3. Update BurrowRegistry.tsx: new land use filter options
4. Add ReportBurrow.tsx: public submission form
5. Update App.tsx: add Report tab, update subtitle
6. Update About.tsx: donation section + mission note
7. Update Education.tsx: Melbourne aerospace corridor mention
