# Backend Research: Login, Papers, Competitions & Payments

## Overview
This research outlines the backend architecture required to support User Login (Firebase), Paper management (various types), Competition participation, and Payment processing with robust transaction logging.

## Recommended Tech Stack
- **Framework**: Next.js App Router (API Routes / Server Actions).
- **Database**: PostgreSQL (Relational integrity is crucial for payments and competitions).
- **ORM**: Prisma (Type consistency with TypeScript).
- **Auth**: Firebase Authentication (Client) + Firebase Admin SDK (Server).
- **Payment Gateway**: Midtrans or Xendit (Standard for Indonesia) or Stripe (Global). *Assumption: Midtrans/Xendit due to "Kerja" folder path implying ID context.*

## 1. Authentication Strategy (Firebase + Database)
We will use Firebase for the Identity Provider (Google OAuth) but maintain a synchronized `User` record in our PostgreSQL database to link data (papers, transactions).

**Flow:**
1. Frontend: User logs in via Google -> gets Firebase ID Token.
2. Frontend: Sends ID Token to Backend (via Header).
3. Backend: Verifies Token via `firebase-admin`.
4. Backend: Checks if `User` exists in DB with `firebaseUid`.
   - If no: Create new `User`.
   - If yes: Return User data.

## 2. Database Schema Design (Prisma)

```prisma
// This is a conceptual schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // Recommended
  url      = env("DATABASE_URL")
}

enum Role {
  USER
  ADMIN
  EDITOR
}

enum PaperType {
  ARTICLE
  SHORT_STORY
  LONG_ESSAY
}

enum PaperStatus {
  DRAFT
  PENDING_REVIEW     // User requested to publish
  PUBLISHED          // Publicly visible
  COMPETITION_ENTRY  // Submitted to competition
  ARCHIVED
}

model User {
  id            String    @id @default(uuid())
  firebaseUid   String    @unique
  email         String    @unique
  name          String?
  avatarUrl     String?
  role          Role      @default(USER)
  createdAt     DateTime  @default(now())
  
  papers        Paper[]
  transactions  Transaction[]
  competitions  CompetitionEntry[]
}


model Paper {
  id          String      @id @default(uuid())
  title       String
  content     Json        // Changed from String to Json to support BlockNote.js (Array of Blocks)
  excerpt     String?
  type        PaperType
  status      PaperStatus @default(DRAFT)
  authorId    String
  author      User        @relation(fields: [authorId], references: [id])
  
  competitionEntry CompetitionEntry?
  
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model Competition {
  id          String   @id @default(uuid())
  title       String
  description String
  fee         Decimal  // 0 if free
  startDate   DateTime
  endDate     DateTime
  
  entries     CompetitionEntry[]
}

model CompetitionEntry {
  id            String   @id @default(uuid())
  competitionId String
  userId        String
  paperId       String   @unique // One paper per entry?
  transactionId String?  @unique // Link to payment if fee > 0
  
  competition   Competition @relation(fields: [competitionId], references: [id])
  user          User        @relation(fields: [userId], references: [id])
  paper         Paper       @relation(fields: [paperId], references: [id])
  transaction   Transaction? @relation(fields: [transactionId], references: [id])
  
  submittedAt   DateTime @default(now())
}

enum TransactionStatus {
  PENDING
  SUCCESS
  FAILED
  REFUNDED
  EXPIRED
}

model Transaction {
  id                 String            @id @default(uuid())
  userId             String
  amount             Decimal
  status             TransactionStatus @default(PENDING)
  paymentGatewayRef  String?           // ID from Midtrans/Xendit/Stripe
  paymentMethod      String?
  paymentUrl         String?           // Redirect URL
  
  metadata           Json?             // Store "competitionId", "type", etc.
  logs               TransactionLog[]  // Audit trail
  
  user               User              @relation(fields: [userId], references: [id])
  competitionEntry   CompetitionEntry?
  
  createdAt          DateTime          @default(now())
  updatedAt          DateTime          @updatedAt
}

// CRITICAL: Immutable Log for every transaction state change
model TransactionLog {
  id            String   @id @default(uuid())
  transactionId String
  status        String   // e.g., "INITIATED", "WEBHOOK_RECEIVED", "SUCCESS"
  payload       Json?    // Full webhook payload or request data
  timestamp     DateTime @default(now())
  
  transaction   Transaction @relation(fields: [transactionId], references: [id])
}
```

## 3. Payment Gateway Strategy

**Core Principles:**
1.  **Atomic Transactions**: Create the `Transaction` record *before* calling the Payment Gateway.
2.  **Webhooks**: Do not rely on frontend redirection for success confirmation. Rely *only* on server-to-server webhooks from the gateway.
3.  **Idempotency**: Ensure webhooks can be processed multiple times without side effects (check `Transaction.status` before updating).
4.  **Audit Logs**: The `TransactionLog` table will store every raw webhook response. This is vital for debugging disputes.

**Flow:**
1. User clicks "Join Competition".
2. Server creates `Transaction` (Pending).
3. Server requests Payment Gateway (e.g. Snap Token).
4. Server returns Payment URL/Token to Frontend.
5. User pays.
6. Gateway sends Webhook to Server.
7. Server validates signature -> Updates `Transaction` status -> Updates `CompetitionEntry` status -> Inserts `TransactionLog`.

## 4. Paper Publishing Workflow
- **Independent Publish**:
    - User creates Paper (Status: DRAFT).
    - User clicks "Request Publish".
    - Status -> PENDING_REVIEW.
    - Admin approves -> PUBLISHED.
- **Competition Entry**:
    - User creates Paper.
    - User pays fee (if any).
    - Paper linked to `CompetitionEntry`.
    - Status -> COMPETITION_ENTRY.

## 5. Security & Validation
- **Auth**: Middleware to verify Firebase token on every protected route.
- **Data**: Zod validation for all inputs (Paper content, titles).
- **Payment**: Verify "Signature Key" from payment gateway to prevent spoofing.

## 6. Text Editor Strategy (BlockNote.js)
We will use **BlockNote.js** for the rich text editor. This significantly impacts data storage and media handling.

### Database Impact
- **Content Storage**: BlockNote stores data as a tree of blocks (JSON). Storing this as raw Markdown is **lossy**. We must use the `Json` (or `JsonB` in Postgres) data type for the `Paper.content` column.
- **Structure**:
  ```json
  [
    {
      "id": "some-uuid",
      "type": "paragraph",
      "props": {
        "textColor": "default",
        "backgroundColor": "default",
        "textAlignment": "left"
      },
      "content": [
        {
          "type": "text",
          "text": "Hello world",
          "styles": {}
        }
      ],
      "children": []
    }
  ]
  ```

### Media / File Handling
BlockNote requires a custom file upload handler for images/files dragged into the editor.
1. **Frontend**: When a user drops an image, `BlockNote` calls a provided `uploadFile` function.
2. **Backend**: We need a dedicated endpoint (e.g., `POST /api/upload`).
   - Receives: `FormData` (file).
   - Action: Upload to Object Storage (S3, Cloudinary, or local temp for dev).
   - Returns: Public URL of the uploaded file.
3. **Usage**: The editor then embeds this URL into the JSON block data.
