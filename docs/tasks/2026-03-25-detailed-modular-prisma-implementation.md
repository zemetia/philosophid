# Detailed Implementation Plan: Modular Prisma & Futuristic Schema

- **Date**: 2026-03-25
- **Status**: Completed
- **Ref**: [2026-03-25-backend-architecture-research.md](file:///d:/Kerja/Philosophid/Website/docs/research/2026-03-25-backend-architecture-research.md)
- **Goal**: Transition to `prismaSchemaFolder` and implement highly specialized entities for User, Publication, Competition, and Payments.

---

## 📋 Phase 1: Modular Infrastructure Setup

- [x] **Step 1.1: Enable Modular Feature**
- [x] **Step 1.2: Directory Migration**

---

## 📋 Phase 2: User-Centric Entity Implementation (`user.prisma`)

- [x] **Step 2.1: Identity & Profile Enhancements**
- [x] **Step 2.2: Reputation & Analytics**
- [x] **Step 2.3: Badge Ecosystem Integration**

---

## 📋 Phase 3: Publication & Content Workflow (`publication.prisma`)

- [x] **Step 3.1: Paper Entity Polish**
- [x] **Step 3.2: Versioning & Draft Support**
- [x] **Step 3.3: States & Visibility**

---

## 📋 Phase 4: Competition & Scoring Ecosystem (`competition.prisma`)

- [x] **Step 4.1: Competition Model Expansion**
- [x] **Step 4.2: Judge scoring System**

---

## 📋 Phase 5: Financial & Transaction Logic (`payment.prisma`)

- [x] **Step 5.1: Transaction Categorization**
- [x] **Step 5.2: Wallet Prototype (Optional/Future)**

---

## 📋 Phase 6: Sync & Migration

- [x] **Step 6.1: Verification**
- [x] **Step 6.2: Data Cleanliness**
- [x] **Step 6.3: Finalize Migration**

---

## 🛠️ Relationship Map (Verification Check)

- `User` ↔ `Paper` (1:N)
- `User` ↔ `Badge` (N:M via `UserBadge`)
- `Competition` ↔ `PaperType` (N:1)
- `Competition` ↔ `Badge` (Reward link)
- `CompetitionEntry` ↔ `Score` (1:N)
- `CompetitionEntry` ↔ `Transaction` (1:1)
