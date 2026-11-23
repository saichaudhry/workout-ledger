# Prompt log

Tools: OpenAI Codex desktop (spec, build, independent review, fixes); Claude Code (submission prep). Actual task prompts below are verbatim. The assignment was pasted in full in the conversation; it is reference material, not a fabricated student-written implementation prompt.

## Initial request
```text
i need you to build this iwth me, i ahve done previosu projects for 15113 on my github you should access those and use them as a refrence or buidl new from scratch, 
```

## Choices supplied through clarification
```text
A workout logger
```
```text
iphone
```

## Requirements
```text
do i actually need to test on expo go or are we chilling, 1.let's create an equation we can compare on effort of workout based on compairiosn of amount of weights, euqations, 2. screen tracks workouts ad gives calcuaotlion, clean ui, 3. yes for editing , 4. novig colors blue and balck, 5. figure this out 
```

## Implementation authorization
```text
great now buidl it fully out, let's trarget a build with minimal need from me fand we can just "check if mobile works" 
```

## Process notes
Codex read previous GitHub project READMEs, checked Node, committed an AI-assisted spec, and generated an Expo SDK 58 starter. The app uses useState for editable drafts, context for shared workouts, Expo Router for screens, and AsyncStorage for persistence. These notes are not student learning prompts. No independent student questions about React Native concepts have been asked yet; add actual future questions verbatim.

## Independent reviewer prompt (Codex-to-agent, verbatim)
```text
Review /Users/saichaudhry/workout-ledger React Native/Expo project against SPEC.md. User supplied HW10 assignment explicitly requests a fresh second-agent review. Read AGENTS.md. For each acceptance criterion verify code; check bugs, missing error handling, code quality, React Native practices. Run useful read-only checks. Format numbered findings [PASS], [FAIL], [WARN] with file names and line numbers. Do not fix any code. Write your unedited review to REVIEW.md at repository root. Be honest about phone testing not performed. You have no build conversation. Report findings when complete.
```

## Review follow-up (Codex-to-agent, verbatim)
```text
Thanks. Parent was running first expo lint bootstrap concurrently, which may explain install clash. Please avoid further dependency installs; finish review against raw source, preserve discovered failures in REVIEW.md. I will fix after review.
```

## Actual interventions and validation
Codex repaired the type errors identified by the reviewer, restored dependencies with npm ci after simultaneous lint bootstrap attempts collided, used the installed SDK's Expo Router navigation export for header height, formatted source for readability, and changed comparison lookup to a single pass. Browser testing entered two example workouts, verified +10%, edited to +20%, reloaded and confirmed saved data, and exercised blank-title validation and cancellation. These are browser checks, not a physical-phone demo. No student manual intervention or learning prompt is claimed.

## Submission prep (Codex, verbatim)
```text
get everythihng ready to submit 
```

## Handoff to Claude Code (verbatim)
Sai pasted the Codex conversation above into Claude Code with:
```text
can you take it from here, and let me know what to finsih
```
Claude Code fetched the HW10 brief and course late policy and mapped every REVIEW.md finding to the README. It also restructured the README so Sai's own-words sections are empty slots, added the form link and device line, and checked that a fresh clone installs, typechecks, and passes tests. It did not write any student-only prose.

## README student sections (verbatim, Sai to Claude Code)
```text
for 2. i enjoy workin out and want to be able to measurecaluclate how much effort i put into my workouts, i want tot eventually connect this to a workout band /fitness band, this measures the first steps of efort on every workout i do. next, i measured chest press and bench press and tested how much weight it would calculate, phone devolepment was supriseinlhy easier than i expected, last answer, iphoen 16, 27.2.1 ios, and result worked fill these in
```
Claude Code pasted these words into the README sections and fixed only spelling and capitalization. It did not add or reword any content.

## README screen descriptions (verbatim, Sai to Claude Code)
```text
i can tap on hkstory pof all workouts and edit/delete the workouts in the past, for log i can type in / log anything that i hafve done and the reps, sets, as well as efort i have worked out
```
Claude Code pointed out that the app can't delete a saved workout. Sai chose to drop "/delete". Otherwise only spelling was fixed.
