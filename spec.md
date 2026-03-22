# Burrow Watch

## Current State
New project. No existing application files.

## Requested Changes (Diff)

### Add
- Public-facing burrow registry: browsable list of documented gopher tortoise burrows in the Space Coast, FL region
- Each burrow record includes: burrow ID, GPS coordinates (lat/lng), location description, status (Active, Potentially Active, Abandoned), threat level (Low, Moderate, High), nearby land use (NASA/KSC, SpaceX, Patrick SFB, Private Development, Other), date documented, last verified date, notes, photo upload
- KPI dashboard stats: Total Burrows, Active, Under Threat, Verified This Month
- Admin-only data entry form to add and edit burrow records
- Photo documentation via blob-storage
- Role-based access: public can browse; admin can add/edit records
- Status and threat level badges with color coding
- Filter/search by status, threat level, land use type
- Featured field observations section (recent records with photos)
- Education/awareness section: what gopher tortoises are, why they are a keystone species, how many species depend on their burrows, the threat posed by Space Coast development, how to report a sighting, and what protections exist under Florida law

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend: burrow record data model with all fields; CRUD operations; admin authorization; query/filter endpoints
2. Frontend: dashboard with KPI stats, burrow registry table with filters, featured observations cards, admin data entry form, photo upload via blob-storage
3. Education tab: keystone species explainer, burrow ecosystem facts, development threat context, reporting guidance, legal protections
4. Authorization: admin role for data entry; public read access for registry
5. Blob-storage: photo uploads attached to burrow records
