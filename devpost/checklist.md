---
doc: checklist
status: approved
---

# Build Checklist

Build mode: learn (brief explanations)

## Slices

- [ ] **1. Copy the reference app and make the five requested refinements**
  Becomes usable: The copied Pakka app has the requested copy, warning, pack, and save-error behavior; records persist after reload from `file://`, or a local-server fallback is documented.
  Why now: Preserve the supplied app first, then make only the named changes and verify local persistence.
  PRD ref: `prd.md > WhatsApp Confirmation`, `Privacy, Passphrase, and Export`, `Move-Out Pack`, `Evidence Entry and Timeline`.
  Spec ref: `spec.md > File Structure`, `Where It Runs and How Someone Tries It`, `Important Failure Modes`.
  Build: Copy the seven requested files byte-for-byte from `reference/` to the root. Do not copy `INTERVIEW-ANSWERS.md` or `cover.png`. Then make only the five requested edits in the copied app and README only if a local-server fallback is needed.
  Verify (mechanical): Before edits, compare each copied file's SHA-256 hash with its source. Then confirm only requested changes in the diff; open `index.html` via `file://`, add an entry, reload, and confirm it remains. If persistence fails, run a plain local server for testing and note that in `README.md`.
  Learner check: Open `index.html`, add a landlord entry, try Copy text, Export and Lock with passphrase warnings, then build a pack and check its date and fingerprint line.
  Commit: `Copy Pakka prototype and apply requested refinements`

## Hands-on Checkpoints

- [ ] Early usable behavior explored and final kick-the-tires review completed in one session after slice 1.
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: [pending]
Route and stops: [pending]
Edit outcome: [pending]
Reflection: [pending]
Activity mode: [pending]

## Revisions
