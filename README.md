# Character Counter - State & Events
**Author:** Zac White

## Overview
An interactive character counter application built with React and TypeScript.
Demonstrates state management, event handling, and real-time component communication.

## Tech Stack
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Vite 8](https://vitejs.dev/) — Build tool and dev server
- [Vitest](https://vitest.dev/) — Unit testing framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) — Component testing utilities

## Components

### TextInput
Controlled textarea component. Accepts user input and reports every keystroke to the parent via the `onTextChange` callback.

**Example:**
```tsx
<TextInput
  onTextChange={(text) => console.log(text)}
  placeholder="Start typing..."
/>
```

### StatsDisplay
Pure display component. Receives a stats object and renders character count, word count, and optional reading time.

**Example:**
```tsx
<StatsDisplay
  stats={{ characterCount: 100, wordCount: 20, readingTime: 0.1 }}
  showReadingTime={true}
/>
```

### CharacterCounter
Parent container component. Owns all state, calculates statistics on every keystroke, and composes TextInput and StatsDisplay together.

**Example:**
```tsx
<CharacterCounter
  minWords={25}
  maxWords={100}
/>
```

## Getting Started
```bash
npm install
npm run dev
```

## Testing
```bash
# To run all tests at once
npm test -- --run

# Run tests in watch mode
npm test
```

**Test coverage:**
- `TextInput` - 2 tests
- `StatsDisplay` - 3 tests
- `CharacterCounter` - 5 tests
- **Total: 10 tests passing**

## References

### React
- [useState Hook](https://react.dev/reference/react/useState)
- [Responding to Events](https://react.dev/learn/responding-to-events)
- [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [Thinking in React](https://react.dev/learn/thinking-in-react)

### TypeScript
- [TypeScript Handbook - Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [TypeScript Handbook - Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/)

### Testing
- [Vitest Getting Started](https://vitest.dev/guide/)
- [React Testing Library - Queries](https://testing-library.com/docs/queries/about)
- [Testing Library - user-event](https://testing-library.com/docs/user-event/intro)

## AI Collaboration
[Claude.ai](https://claude.ai) assisted in this project by providing unit testing guidance, explaining testing concepts (Vitest, React Testing Library, mock functions), and test implementation walkthroughs.

## Reflections

**How did you handle state updates when the text changed?**
State updates were managed in the `CharacterCounter` parent component using the `useState` hook with a `textStats` typed object holding character count, word count, and reading time. When the user types, the `TextInput` child component fires its `onChange` event and calls the `onTextChange` callback, passing the current textarea value up to `CharacterCounter`. From there, `handleTextChange` calls `calculateStats` with the new text and updated state with `setStats`. This triggers a re-render, passing the updates stats down to `StatsDisplay` as props, completing the data flow cycle.

**What considerations did you make when calculating reading time?**
The reading time calculation uses the industry standard of 200 words per minute. Empty input required special handling - without checking for an empty string first, splitting whitespace on an empty input would produce incorrect word counts. The `text.trim() === ''` check returns zero for all stats when the textarea is empty. The `formatReadingTime` helper function converts decimal minutes into a readable `minutes:seconds` format using `Math.floor` for whole minutes and `padStart(2, '0')` to ensure seconds always display as two digits. 

**How did you ensure the UI remained responsive during rapid text input?**
React's rendering cycle handled responsiveness automatically - every call to `setStats` schedules a re-render with the updated statistics, and React batches and optimizes these updates internally. The textarea manages its own input state natively while only reporting changes upward. This avoided potential input lag that can occur with fully controlled inputs during rapid typing. 

**What challenges did you face when implementing the statistics calculations?**
Several challenges came up during implementation. A `verbatimModuleSyntax` TypeScript configuration required all type imports to use `import type` syntax rather than a regular imports  - something not immediately obvious from the error message. A variable naming inconsistency between `newState` and `newStats` inside `handleTextChange` caused a runtime error that required detailed, and careful inspection of the Problems tab in VS Code to identify. The missing `React` import for `React.FC` produced a cascading error that initially appeared to be coming from `App.tsx` rather than `CharacterCounter.tsx`. During testing, `getByText('0')` failed because both character count and word count displayed zero initially - switching to `getAllByText` with a length assertion resolved this. Each of these challenges reinforced the value of TypeScript's compile-time checking and reading error messages carefully before making any changes. 