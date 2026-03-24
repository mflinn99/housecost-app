# Mattsnoop — Backup Notes

## Snapshot Created

**Date/Time**: 2026-03-21 23:37  
**Archive**: `mattsnoop_backup_2026-03-21_2337.zip`  
**Location**: `/Users/sourcingai/mattsnoop_backup_2026-03-21_2337.zip`  
**Size**: ~216 KB (compressed)

**Post–Overnight Run (2026-03-21)**: All 7 phases complete. Create a new backup from current `housecost/` before further changes.

## Contents

- Full source: app, components, features, lib, services, types
- Config: package.json, package-lock.json, tsconfig.json, next.config.ts, postcss, eslint, vitest
- Public assets
- Tests
- All documentation (BUILD_LOG, QA_LOG, HANDOVER, KNOWN_LIMITATIONS, PROVIDER_NOTES, ENGINE_NOTES, TEST_STATUS, etc.)

## Excluded

- `node_modules` (reinstall with `npm install`)
- `.next` (regenerate with `npm run build`)
- `.git` (version history not included)

## Restore

```bash
unzip mattsnoop_backup_2026-03-21_2337.zip
cd mattsnoop_backup_2026-03-21_2337
npm install
npm run dev
```
