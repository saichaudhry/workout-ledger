# Prompt log

Tool: OpenAI Codex desktop. Actual task prompts below are verbatim. The assignment was pasted in full in the conversation; it is reference material, not a fabricated student-written implementation prompt.

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
