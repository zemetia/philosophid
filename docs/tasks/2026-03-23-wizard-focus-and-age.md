# Task: Fix Wizard Input Focus and Remove Age Field

- **Date**: 2026-03-23
- **Status**: Not Started
- **Source**: docs/tasks/23-03-2026.md (Tasks 1 & 2)

## 🎯 Goal

Resolve the input focus loss issue in the registration wizard where typing a single character causes the input to lose focus. Additionally, remove the redundant "age" field from the registration flow, as the birthday field is already present. This ensures a seamless, frustration-free, and streamlined user experience.

## 📋 Implementation Checklist

- [x] **Phase 1: Research & Discovery**
  - [x] Step 1.1: Locate the main registration wizard component (e.g., `src/app/register/page.tsx` or related wizard components).
  - [x] Step 1.2: Identify all references to the "age" field in the UI, local state (`useState`), custom hooks, and validation schemas (e.g., Zod or Yup).
  - [x] Step 1.3: Analyze the component structure to determine the root cause of the focus loss (e.g., components defined inside other components, improper use of `key` props, or state updates causing full parent re-renders).

- [x] **Phase 2: Preparation & Context Isolation**
  - [x] Step 2.1: Isolate the affected wizard steps for targeted testing without going through the entire flow every time, if possible.
  - [x] Step 2.2: Ensure the development server is running and the issue is fully reproducible locally before making any changes.

- [x] **Phase 3: Core Implementation - Removing the 'Age' Field**
  - [x] Step 3.1: Remove the "age" input component from the registration wizard UI.
  - [x] Step 3.2: Remove "age" from any state management interfaces, default values, and payload objects sent to the backend.
  - [x] Step 3.3: Update validation schemas to ensure "age" is no longer required or validated.

- [x] **Phase 4: Core Implementation - Fixing Input Focus Loss**
  - [x] Step 4.1: Refactor the component structure to prevent the input components from being unmounted and remounted. If inner components are defined inside the render function of a parent component, move them outside.
  - [x] Step 4.2: Optimize state management for form inputs (e.g., utilize `react-hook-form` properly, or use `memo` if necessary) to avoid unnecessary re-renders of the entire wizard container on every keystroke.
  - [x] Step 4.3: Ensure `key` props on inputs or their parent containers remain stable across renders.

- [x] **Phase 5: Testing & Verification**
  - [x] Step 5.1: Type continuously into various text inputs in the wizard and verify that focus is strictly maintained.
  - [x] Step 5.2: Verify that the "age" field is completely absent from all steps of the wizard.
  - [x] Step 5.3: Attempt to submit the form locally to ensure data logic holds up without the "age" field.

- [x] **Phase 6: Final Polish & Cleanup**
  - [x] Step 6.1: Clean up any unused imports, variables, or types left over from the "age" field removal.
  - [x] Step 6.2: Ensure the wizard UI remains premium and visually intact after the refactoring.
  - [x] Step 6.3: Mark this checklist as completed and update the lesson logs if any critical React anti-pattern was fixed.

## 🛠️ Technical Details

- Files affected: Frontend wizard components (e.g., `src/app/register/page.tsx`, `components/RegisterWizard/...`).
- Dependencies: React (useState, rules of hooks), Form validation libraries.

## 📝 Notes & Discoveries

[Add learnings here as you go]
