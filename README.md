# Workout Ledger

> Submission status: implementation and automated checks are being completed. Physical iPhone testing and video are still required. This README does not claim those have happened.

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
`SPEC.md` contains Sai's exact requirements plus AI-assisted acceptance criteria, committed before implementation. It is labeled honestly; the assignment asks for a student-written spec, so Sai must review that requirement before submission. `REVIEW.md` will contain the independent agent's unedited review. `prompt_log.md` records actual prompts; no learning conversations or manual testing are invented.
