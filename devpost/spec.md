---
doc: spec
status: approved
---

# Pakka: Technical Spec

## How This Works, In Plain Language

Pakka is a small set of local web files. Double-click `index.html` to open it in a browser. JavaScript saves entries and photos in that browser's IndexedDB on the same device. Web Crypto locks records with a key made from the renter's passphrase and makes SHA-256 fingerprints for attachments. The page uses no framework, build step, external assets, or backend. A strict Content Security Policy blocks outside loads and connections; the renter's explicit Send tap is the one handoff to WhatsApp.

## The Core Journey Through the System

`index.html` loads local JavaScript and CSS → the form saves an entry and attachment to IndexedDB → Web Crypto fingerprints the attachment → the timeline reads records back from IndexedDB → the notice section calculates from the renter's dates → the pack view prepares print output or a JSON export. A renter may tap Send to open WhatsApp with prepared text; Pakka itself sends nothing.

PRD ref: `prd.md > The Core Journey`.

## Stack

- **HTML, CSS, JavaScript:** learner choice; no framework or build step, so the app opens by double-clicking `index.html`.
- **IndexedDB:** browser storage for entries and attachment files. [MDN guide](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB).
- **Web Crypto:** PBKDF2 derives a key from the passphrase; AES-GCM encrypts records and attachments; SHA-256 fingerprints each attached file. [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API), [SHA-256 digest](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest), [AES-GCM encryption](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt).
- **Content Security Policy:** allow only local scripts/styles, local and `blob:` images, and no connections; block other external loads. Keep scripts and styles in separate local files. [CSP `default-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/default-src).
- **WhatsApp handoff:** only the explicit button opens a prefilled `https://wa.me/?text=...` link. No keys, account, or service API. [WhatsApp Click to Chat](https://faq.whatsapp.com/5913398998672934).

## Where It Runs and How Someone Tries It

Open `index.html` in a desktop browser by double-clicking it; no install, command, API key, or hosting is needed. After copying the reference files, first verify that entries survive a page reload from `file://`. If they do not, use a plain local server for testing and document its use in `README.md`. Pakka's local features work offline; the renter's Send tap hands off to WhatsApp and may need connectivity. The layout also fits a phone screen. Record the demo on the computer. Submission still needs a short demo video and public GitHub repository; deployment is not planned.

## Look and Feel

Use the PRD palette, type, flat 2px corners, one-column layout, short plain copy, and skeleton loaders. Use system serif headings and plain sans-serif body fonts; load no remote fonts or icons. The printable pack keeps the same paper-and-ink look.

## Components

### Main Page: Entry, Timeline, and Notice

Render the entry form, brief skeleton loading state, and timeline; use `app.js` for all app behavior, including IndexedDB and Web Crypto; calculate the notice deadline from the longest logged period and renter-selected move-out date.
PRD refs: `prd.md > Evidence Entry and Timeline`, `Notice`, `States and Boundaries`.

### Local Records and Security

Store entries and attachments in IndexedDB. When passphrase protection is enabled, encrypt records and attachments with AES-GCM using a PBKDF2-derived key; keep the passphrase only in memory. Hash each attachment with SHA-256. Export JSON is unencrypted and includes attachments; deletion clears the database and encryption metadata.
PRD ref: `prd.md > Privacy, Passphrase, and Export`.

### Confirmation and Pack

Create the confirmation text, always show Copy text, and open WhatsApp only after Send is tapped. Build the pack view from stored records; print with the browser and export a separate JSON backup.
PRD refs: `prd.md > WhatsApp Confirmation`, `Move-Out Pack`, `Privacy, Passphrase, and Export`.

### Policy and Terms

Show the privacy and terms text in `privacy.html` and `terms.html`; include no remote content.
PRD ref: `prd.md > Policy, Terms, and Loading`.

## Data Model

- **Entry:** ID, type, date, short line, optional note, optional notice days, optional attachment, and its SHA-256 fingerprint. Attachments are stored as file data in IndexedDB.
- **App settings:** optional planned move-out date and passphrase-enabled flag. Store only the encryption salt and encrypted records, never the passphrase.
- **Persistence:** data stays in this browser's local profile. Closing and reopening the same file in the same browser should restore it. Browser data clearing or private browsing can remove it; JSON export is the backup.
- **Encryption:** unencrypted records remain local by default. Enabling passphrase protection encrypts existing and future records and attachments. Unlock derives the key again; a forgotten passphrase cannot recover data.

## File Structure

```text
project/
├── index.html       # Main app and local Content Security Policy
├── style.css        # Visual style and print layout
├── app.js           # All app behavior: storage, security, timeline, notice, and pack
├── privacy.html     # Local privacy policy page
├── terms.html       # Local terms page
├── README.md        # Launch, reload-persistence result, and demo instructions
└── LICENSE          # MIT license
```

## External Services and Dependencies

No runtime service, API key, account, hosting, or outside connection. The only external handoff is the renter-tapped WhatsApp link documented above.

## Important Failure Modes

- **`file://` storage differs by browser:** first build step must confirm IndexedDB saves across close/reopen in the demo browser; show a clear storage error and stop before accepting evidence if it fails. [MDN on file origins](https://developer.mozilla.org/en-US/docs/Glossary/Origin).
- **Wrong or forgotten passphrase:** show a plain unlock error; offer the approved irreversible delete flow, never recovery.
- **Browser storage full or unavailable:** show a plain save error and direct the renter to export or free space; do not claim the entry was saved.

## What Was Simplified and Why

- A local browser file instead of an installed app or hosted site: it matches double-click launch and avoids accounts, servers, and deployment.
- Browser-native APIs instead of storage or crypto libraries: fewer dependencies; browser storage and security behavior must be checked in the build.

## Decisions and Open Issues

- Learner choices: plain HTML/CSS/JavaScript; double-click launch; IndexedDB; PBKDF2-derived AES-GCM encryption; SHA-256 fingerprints; CSP blocks all outside loads and connections except the renter-tapped WhatsApp handoff.
- Learner choice: preserve the reference file layout and keep all JavaScript in `app.js`; include an MIT `LICENSE`.
- Tradeoff: data is tied to one browser profile and does not sync to the renter's phone; export is the portable backup.
- Build rule: after copying the reference files, test whether entries survive reload from `file://`. If not, use a plain local server for testing and note it in the README. File URLs can have browser-specific origins; [MDN origin guidance](https://developer.mozilla.org/en-US/docs/Glossary/Origin).
