# Workout Ledger — specification before implementation

Authorship: requirements supplied by Sai in conversation; organized and expanded into testable criteria by Codex with Sai's approval. This is AI-assisted, not represented as independently student-written.

## User requirements (verbatim)
"1.let's create an equation we can compare on effort of workout based on compairiosn of amount of weights, euqations, 2. screen tracks workouts ad gives calcuaotlion, clean ui, 3. yes for editing , 4. novig colors blue and balck, 5. figure this out"

## Design
An offline iPhone workout logger in React Native and Expo Router. History and Log/Edit screens. Black background, blue accents, readable typography. Each workout has a title, date, multiple named exercises, sets/reps/weight in pounds, optional effort 1–10, and notes. Sets in each exercise share reps and weight. Volume = sum(sets × reps × weight). It is workload, not a physiological effort score. Compare each exercise with its most recent earlier workout, case-insensitively. No comparison for zero or absent baseline. No backend, payments, or credentials.

## Acceptance criteria
1. History starts with an informative empty state and a Log workout button.
2. Log screen accepts a title, exercise name, positive integer sets and reps, nonnegative weight, optional effort 1–10 and notes. Multiple exercises may be added and removed; at least one is required.
3. Saving valid input returns to History and shows the newest workout first. Blank required fields, duplicate exercise names, nonfinite/invalid numbers, and out-of-range effort block saving with a readable error.
4. Three sets of ten reps at 100 lb produce 3,000 lb volume. Totals update as inputs change.
5. An exercise with 3,300 volume versus its preceding 3,000 displays +10%; comparisons never mix different exercises and display No comparison yet for missing/zero baselines.
6. Tapping a workout opens Edit. Saving updates the existing workout without duplicating it; its original timestamp remains intact and dependent comparisons recalculate.
7. Workouts survive process closure/reopening using local AsyncStorage. Initial load and save failures show useful errors; failed writes preserve the draft and prior data. Corrupt saved data is not silently overwritten.
8. Both screens have consistent blue/black styling, safe-area padding, readable labels, accessible buttons, scrolling and keyboard accommodation.
9. Cancel/back does not save changes. A save cannot be double-submitted.
10. README records exact SDK and honest testing status. Independent REVIEW.md is preserved verbatim, and actual prompts are logged without invented learning prompts.

## Verification
Automated arithmetic/validation/comparison checks; TypeScript and lint; iOS bundle generation; browser interaction checks where possible. Final physical iPhone Expo Go check remains manual, including force-close/reopen persistence. A browser check does not fulfill the required mobile demo.
