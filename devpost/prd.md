---
doc: prd
status: approved
---

# Pakka: Product Requirements

One line: Pakka helps students and young renters in India keep on-device evidence for a rental room and prepare a move-out pack.
Source: `scope.md > Who It's For`, `The Unique Kernel`.

## The Core Journey

1. If the renter enabled a passphrase, Pakka first shows the unlock screen. Otherwise, it opens the main page.
2. The main page shows “Pakka,” a plain sentence that proof stays on this device, a short entry form, and the timeline.
3. The renter adds a landlord statement, room photo, or payment proof. The date defaults to today. They enter one short line, may add a note and an optional image or screenshot, and add notice days only when the landlord mentioned a notice period.
4. For a landlord statement, the renter can tap Send as written confirmation to open WhatsApp with a polite message already filled in. A Copy text button is always beside it. The renter reviews and sends the message in WhatsApp, or pastes the copied text elsewhere.
5. The saved entry appears on the timeline. A photo or payment proof displays its fingerprint.
6. In the Notice section, the renter may select a planned move-out date. Pakka shows the longest logged notice period and, if a date is selected, subtracts that period to show the last day to give notice.
7. The renter builds the move-out pack, reviews it on the page, and prints it or saves it as a PDF using the browser's print control. The separate Export button saves a JSON backup.

## Screens and Layout

- **Unlock screen:** shown first when passphrase protection is enabled; offers unlock and Delete everything.
- **Main page:** single column, with the Pakka name and on-device privacy sentence, entry form, timeline, Notice section, Build my pack and Export controls, and links to Privacy Policy and Terms of Service. No card rows or box grid.
- **Move-out pack:** a readable page with the letter and complete timeline, suitable for browser printing or saving as PDF.
- **Privacy Policy and Terms of Service:** simple pages describing Pakka's stated storage, privacy, and product boundaries.

## Look and Feel

Manila paper background, navy ink, and one stamp-red accent. Square-ish 2px corners; serif headings and plain sans-serif body text. Use no emoji, icons, shadows, gradients, pure white, hover animation, neon, or rainbow colors. Do not use Inter, Geist, or Space Grotesk. Use a one-column layout, no card rows or grid of boxes. Date stamps should look like flat rubber stamps. Text should use short, plain sentences. Use skeleton loaders while data loads.

## Features and Behavior

### Evidence Entry and Timeline

- Entry types: “landlord told me,” “room photo,” and “payment proof.”
- Each entry has a date (default today), one short line describing what was said or shown, an optional note for who said it or other detail, and an optional photo or screenshot. Notice days are available only for a landlord statement when a notice period was mentioned.
- Saved entries appear on the dated timeline. A photo or payment proof shows its fingerprint.
- **Acceptance criteria:** A renter can add each type; the saved entry shows its date, type, short line, optional note, attachment when present, and fingerprint for photo/payment evidence.

### WhatsApp Confirmation

- For a landlord statement, prepare this message: “Hi. Confirming what you told me on [date]: [statement] ([note, if any]). Please reply to confirm. Thank you.” Omit the brackets and note when no note was entered.
- Provide Send as written confirmation, which opens WhatsApp with the text already filled in, and an always-visible Copy text button beside it. The renter reviews and sends in WhatsApp or pastes the copied text into any messaging app or SMS. Pakka does not send anything itself.
- **Acceptance criteria:** The prepared text includes the entry date and statement, includes the note in brackets only when present, and is available through both buttons. Tapping Send opens WhatsApp; tapping Copy copies the text.

### Notice

- The renter can enter a planned move-out date in the Notice section.
- Show the longest notice period logged. When a planned move-out date exists, subtract the longest period and show the last day to give notice. Never guess a move-out date.
- If no notice period is logged, say so and prompt the renter to add one. If no move-out date is selected, show the longest period only.
- **Acceptance criteria:** With a logged notice period and selected move-out date, the displayed deadline is that date minus the longest logged period; the two missing-input states show the specified messages.

### Move-Out Pack

- Build my pack opens a page containing the letter and full timeline. Include the planned move-out date if selected, and the fingerprint under each photo and payment proof. Do not include the photos themselves.
- End with this plain line: “A fingerprint shows a file has not changed since it was added and is not legal proof.”
- The renter prints the page or saves it as PDF using the browser's print control.
- With no entries, Build my pack still works and the letter says “no entries yet.”
- **Acceptance criteria:** The pack visibly contains the specified letter, timeline, optional move-out date, fingerprints, and disclaimer; no photo files appear in the pack; an empty record still produces the empty letter.

### Privacy, Passphrase, and Export

- Keep records on the device. Pakka makes no network requests and uses no analytics.
- A Lock with passphrase button in the footer opens a simple passphrase box. Pakka warns that the passphrase cannot be recovered and suggests Export first. After the renter confirms, encrypt all entries on the device. The next time the page opens, show the unlock screen first. There is no account; never store the passphrase.
- Pakka cannot recover a forgotten passphrase. On unlock, Delete everything opens a confirmation: “Every entry on this device will be deleted and this cannot be undone.” OK deletes; Cancel stops. Nothing is deleted before OK. Afterwards, reload to the empty timeline.
- When setting a passphrase, warn that it cannot be recovered and suggest Export first. The JSON Export includes all entries, is not encrypted, and tells the renter to keep it somewhere safe.
- **Acceptance criteria:** Export produces a JSON backup of all entries and warns it is unencrypted; canceling deletion preserves records; confirming deletion clears them and returns to the empty timeline.

### Policy, Terms, and Loading

- Provide Privacy Policy and Terms of Service pages consistent with Pakka's on-device, no-network behavior and its stated limits (no legal advice or lawyer matching).
- Show skeleton loaders briefly while the timeline loads, then show entries or the empty state.

## States and Boundaries

- **First use / empty timeline:** after skeleton loaders, show: “Nothing logged yet. Start with one thing your landlord told you.” No image or sample data.
- **Locked:** show unlock screen before the main page when passphrase protection is enabled.
- **Enable passphrase:** the footer button shows the warning and passphrase box; confirming encrypts existing entries and locks the app on the next opening.
- **Forgotten passphrase:** no recovery; renter can choose Delete everything and confirm the irreversible wipe.
- **No notice period:** say no period is logged and ask renter to add one.
- **No planned move-out date:** show the longest logged notice period only.
- **No entries in pack:** generate a letter that says “no entries yet.”
- **Persistence and privacy:** entries remain on the device between visits; Pakka makes no network requests and runs no analytics.

## Product Decisions

- WhatsApp confirmation is the distinctive part because it turns a spoken term into a written record; renter reviews and sends it.
- All evidence stays on-device; no accounts, servers, or sync. Optional passphrase encryption cannot be recovered; renter enables it with the footer button.
- The renter chooses a move-out date; Pakka never guesses it and calculates from the longest logged notice period.
- The move-out pack is a page for browser print/PDF; photos are excluded, but their fingerprints are shown. The JSON backup is separate and unencrypted.
- Visual direction and copy are as stated in `Look and Feel`.

## What We're Building

One on-device renter evidence app with entry form, dated timeline, WhatsApp confirmation handoff, notice deadline, printable move-out pack, JSON export, optional passphrase protection, delete flow, privacy and terms pages, and skeleton loading states.

## Deferred From the POC

None specified beyond the explicit cuts below.

## Possible Later Enhancements

Not established.

## Non-Goals

- Accounts, servers, and sync: evidence stays on the device.
- Legal advice and lawyer matching: Pakka organizes evidence but does not interpret laws or connect renters to lawyers.
- Sending WhatsApp messages itself: the renter reviews and sends the confirmation in WhatsApp.

## Open Questions

None.
