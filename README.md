# Workout Ledger

> Submission status: implementation, independent review fixes, and automated checks are complete. Physical iPhone testing and video are still required. This README does not claim those have happened.

## Student-written sections to complete
The assignment explicitly asks for these in your own words:
- What the app does and why you chose it (1–2 sentences).
- Describe each screen and what the user can do.
- One thing about mobile development that surprised you.

## Setup (AI-assisted technical documentation)
- Node.js 22.13+; developed with Node 24.15.0.
- Expo SDK **58** (`expo ~58.0.26`), selected by `create-expo-app@latest` without a template override.
- React Native 0.88.1, Expo Router 58, AsyncStorage for local persistence.
- Intended demo: physical iPhone with the App Store's free Expo Go. **Not yet verified on the phone.**

```sh
npm install
npx expo login
npx expo start
```
Sign into the same free Expo account in the CLI and Expo Go. Connect the phone and computer to the same Wi-Fi, then scan the terminal QR code using the iPhone Camera. If LAN access fails, run `npx expo start --tunnel`. No paid Apple developer subscription or App Store publication is required for this Expo Go workflow. If Expo Go reports an SDK mismatch, check its supported version before changing dependencies.

```sh
npm test
npx tsc --noEmit
npx expo export --platform ios
```

## Calculation and storage
Exercise volume = sets × reps × weight in pounds. All sets within an exercise share the entered reps and weight. Session volume sums the exercises. Comparison = `(current − previous) / previous × 100`, using the most recent earlier workout containing the same trimmed, case-insensitive exercise name. Missing or zero baselines show “No comparison yet.” This measures external workload, not physiological effort. Optional effort is the user's subjective 1–10 rating. Zero external weight is supported but produces zero external-load volume.

Workouts are stored locally under a versioned AsyncStorage key. Writes finish before navigation; failed saves retain the draft. Invalid/corrupt stored data blocks writes instead of silently replacing history. No account/backend/cloud sync is included. Clearing Expo Go's app data may erase workouts. Editing preserves the original workout date. Cancel/back discards unsaved edits. Exercise deletion is available in the draft; saved-workout deletion is outside scope.

## iPhone test and 1–2 minute video
1. Open History and tap Log workout.
2. Enter “Upper body,” Bench press, 3 sets, 10 reps, 100 lb. Confirm 3,000 lb; add effort and save.
3. Log another Bench press workout at 110 lb with the same sets/reps. Confirm +10% volume.
4. Tap the second workout, edit its weight, save, and show the updated calculation.
5. Completely close Expo Go, reopen the project, and show both saved entries.
6. Show validation for a blank exercise or invalid number, then cancel.

Record actual results and your iPhone model/iOS version here after testing. Upload the video with accessible view permissions. Add the repo link, your own short description and a real phone screenshot to the portfolio, then submit the course Google form. The form URL was not included in the supplied prompt.

## Authorship and project history
`SPEC.md` contains Sai's exact requirements plus AI-assisted acceptance criteria, committed before implementation. It is labeled honestly; the assignment asks for a student-written spec, so Sai must review that requirement before submission. `REVIEW.md` contains the independent agent's unedited review. `prompt_log.md` records actual prompts; no learning conversations or manual testing are invented.

## Review response
The original `REVIEW.md` remains unchanged. Finding 11 was fixed with the installed React Native instance type, an undefined empty-list component, and Node/TypeScript test configuration. Finding 12 was resolved by a clean dependency install and explicit ESLint configuration. For finding 8, the editor now uses the actual navigation header height instead of a hard-coded keyboard offset; iPhone keyboard and VoiceOver still need device testing. For finding 13, comparison lookup now finds the latest matching session in a single pass rather than sorting history repeatedly. Indexing remains unnecessary for this assignment's small local dataset.

Findings 7 and 10 remain accurately qualified: native persistence, storage-I/O failure injection, the phone video, and the student-written sections are not automatically verified. Browser reload persistence passed, but it is not a substitute for force-closing/reopening Expo Go.

## Preview and quick launch
`docs/browser-preview.jpg` is a **browser preview with test data**, not a phone screenshot for submission. Double-click `START_IPHONE.command` in Finder to sign into Expo if needed and start a QR-code server on port 8082. Use the same Expo account on the iPhone. The CLI's account/session credentials are never stored in this repo.

## Dependency note
The starter's npm audit reports three moderate findings in the Expo → fingerprint → minimatch dependency chain. npm's proposed force fix downgrades Expo to SDK 52, so it was not applied. These packages are upstream tooling; the app exposes no API/server processing user glob patterns. Keep Expo-compatible upgrades in mind before production use.

## Official setup references
- [Create Expo App](https://docs.expo.dev/more/create-expo/)
- [SDK 58 AsyncStorage — included in Expo Go](https://docs.expo.dev/versions/v58.0.0/sdk/async-storage/)
- [iPhone Expo Go setup](https://docs.expo.dev/get-started/set-up-your-environment/?device=physical&platform=ios)

## Verified in this build
- `npm test`: 9/9 passing domain tests.
- `npx tsc --noEmit`: passing.
- `npx expo lint`: passing.
- `npx expo-doctor`: 20/20 checks passing.
- iOS and web production bundle exports: successful.
- Browser: create, compare (+10%), edit (+20%), reload persistence, blank-title rejection, cancel, and post-fix editor rendering verified.
- Physical iPhone, VoiceOver and native keyboard: not yet tested.
