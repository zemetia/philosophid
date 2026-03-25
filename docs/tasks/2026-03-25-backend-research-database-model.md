# Task: Backend Research & Database Model Design

- **Date**: 2026-03-25
- **Status**: Completed
- **Source**: [docs/tasks/25-03-2026.md](file:///d:/Kerja/Philosophid/Website/docs/tasks/25-03-2026.md) - Task #4

## 🎯 Goal

Research and design a futuristic, scalable, and modular database architecture for the Philosophid platform. This includes optimizing the relationship between Users, Publications, and Competitions, while ensuring future-proof support for payments, scoring, and user badges.

## 📋 Implementation Checklist

- [x] **Phase 1: Deep Analysis & Research**
  - [x] Analyze current `schema.prisma` for bottlenecks in User-Publication-Competition relationships.
  - [x] Research Prisma's support for multi-file schemas (Modular Prisma) using the `prismaSchemaFolder` approach.
  - [x] Research best practices for "Submission" patterns vs "Independent Publication" patterns to ensure a publication can exist both ways.
  - [x] Research scalable Payment integration patterns (Gateway agnostic) for competition entry fees and prize payouts.
  - [x] Research Badge and Scoring system architectures (XP, Levels, Achievements) to support competition scores.
  - [x] Revisit User Profile data requirements (ensuring `username` uniqueness and removing redundant fields like `age`).

- [x] **Phase 2: Architectural Design**
  - [x] Design a modular schema structure (split into `user`, `publication`, `competition`, `financial`, `gamification`).
  - [x] Create a detailed Entity Relationship Diagram (ERD) using Mermaid.
  - [x] Define the lifecycle flow for "Independent Publication" vs "Competition Entry".
  - [x] Design the "Publication-Competition Score" mechanism (supporting multiple judging criteria or rounds).
  - [x] Finalize the "User Basic Information" schema (Bio, Institution, Birthday, Unique Username, etc.).

- [x] **Phase 3: Documentation & Reporting**
  - [x] Create `docs/research/backend-implementation-report.md`.
  - [x] Detail the modular prisma architecture and how it will be implemented in Task #5.
  - [x] Explain the scalability strategy for future features (Payments, Badges, Winners, etc.).
  - [x] Provide reasoning for every major design choice from a futuristic, great database model designer perspective.

## 🛠️ Technical Details

- Files affected: `docs/research/backend-implementation-report.md` (Created)
- Skills involved: `be-research`, `analyze-backend`, `planning-tasks`
- Key focus: Modularity, Scalability, Futuristic Aesthetics in Data Design.

## 📝 Notes & Discoveries

- Prisma 6.19.2 supports native `prismaSchemaFolder` (introduced in v5.15).
- `username` is critical for public profile routing (`/{username}`).
- `Submission` model serves as the ideal junction between content and competitive events.
- Decoupling `Transaction` from specific models (and using metadata/types) ensures scalability for future revenue streams.
