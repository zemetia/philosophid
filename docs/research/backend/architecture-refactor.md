# Backend Architecture Refactor Research

## Overview
This research explores the best architecture for the Philosophid backend, focusing on high scalability, maintainability, and clean separation of concerns. The current structure mixes business logic with database access and request handling. The goal is to move towards a **Layered Architecture** (Controller -> Service -> Repository).

## Standardized Layered Architecture

### 1. Repository Layer (`src/backend/repositories`)
The Repository layer is the *only* layer that interacts directly with Prisma. Its purpose is to encapsulate data access logic and provide a clean API for the service layer.

**Pattern**: Class-based with an exported instance.
**Responsibilities**:
-   Prisma queries and mutations.
-   Hiding complex data structures or includes from the service layer.
-   Ensuring database-level consistency.

### 2. Service Layer (`src/backend/services`)
The Service layer contains the core business rules. It orchestrates multiple repositories to fulfill a specific use case.

**Responsibilities**:
-   Business logic (e.g., calculating scores, verifying deadlines).
-   Input validation using Zod.
-   Error handling for domain-specific errors.
-   Calling external services (e.g., trigger emails, notifications).

### 3. Middleware Layer (`src/backend/middleware`)
The Middleware layer provides reusable guard functions for Next.js API Routes.

**Responsibilities**:
-   Authentication (Firebase UID verification).
-   Authorization (Role-based access control).
-   Rate limiting (future).
-   Global request logging.

### 4. Controller Layer (`src/app/api/.../route.ts`)
The API routes act as Controllers. They should be "thin".

**Responsibilities**:
-   Parsing request parameters (query, body).
-   Calling the appropriate Service methods.
-   Formatting the `NextResponse` (JSON structure, status codes).

## Proposed Folder Structure
```bash
src/
  backend/
    repositories/
      user.repository.ts
      paper.repository.ts
      competition.repository.ts
      badge.repository.ts
      reference.repository.ts (existing)
    services/
      user.service.ts
      paper.service.ts
      competition.service.ts
      badge.service.ts
      reference.service.ts (existing)
    middleware/
      auth.middleware.ts        # withAuth, withRole guards
      error.middleware.ts       # common error response formatter
      validation.middleware.ts  # shared schema validations
```

## Recommended Best Practices

### Consistency with Prisma
Since we use a modular Prisma schema (`prisma/schema/*.prisma`), our repositories should align with these modules.

### Error Handling
Implement a custom `ApiError` class that can be caught by the route handlers and translated into appropriate HTTP responses.

### Pattern Examples

#### Middleware Guard Pattern
```typescript
// src/backend/middleware/auth.middleware.ts
export async function withAuth(req: NextRequest, handler: Function) {
    const uid = req.headers.get("x-firebase-uid");
    const user = await userRepository.findByFirebaseUid(uid || "");
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return handler(user);
}
```

#### Service Dependency Pattern
```typescript
// src/backend/services/user.service.ts
export class UserService {
    private userRepo: UserRepository;
    private paperRepo: PaperRepository;
    // ...
}
```

## Security Considerations
-   **Authentication Verification**: Always verify the user in the database, even if the token exists (handled by middleware).
-   **Safe Repository Methods**: Repositories should only return what's necessary (e.g., exclude `hashedPassword` if it existed).
-   **Input Validation**: All Service inputs must be validated with Zod before being passed to Repositories.

## Database Integrity
-   Repositories will handle concurrent updates and complex Prisma transactions if needed, ensuring data remains consistent during complex operations like "Entering a Competition".
