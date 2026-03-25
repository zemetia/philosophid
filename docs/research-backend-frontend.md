# Authentication Architecture Research (Next.js App Router)

## Introduction
The goal is to implement a robust, secure, and resilient authentication state mechanism uniting the frontend and backend using regular Next.js 14+ best practices.

## 1. JWT Storage implementation (Cookies)
**Best Practice**: Storing JWT in an `HttpOnly`, `Secure`, `SameSite=Lax` Cookie.
*Why?*: It completely prevents XSS (Cross Site Scripting) attacks because client-side JavaScript (`document.cookie` or `localStorage`) cannot access the token. The browser securely and automatically attaches this cookie to every backend API request and page navigation.
*Implementation*: Our `/api/auth/sync` endpoint already creates the `philosophid_session` HTTP-Only cookie seamlessly. 

## 2. Server-Side Route Protection logic (Middleware)
**Best Practice**: Using Next.js `middleware.ts` to intercept requests at the edge.
*Why?*: It prevents the user from even downloading the HTML/JS for a page they shouldn't see.
*Implementation*: 
- Read `request.cookies.get('philosophid_session')`.
- If the token **exists** and the user visits `/login` or `/register`, they are immediately redirected to `/dashboard` (or home).
- If the token **does not exist** and they visit a protected route like `/dashboard`, they are redirected to `/login`.

## 3. Retrieving User Information (The `/api/auth/me` Endpoint)
**Best Practice**: Creating an isolated endpoint strictly for fetching user context.
*Why?*: Client Components (like the Navbar) can't securely read `HttpOnly` cookies directly. An API proxy is required.
*Implementation*: 
- Endpoint: `/api/auth/me` receives the automated cookie.
- It verifies the custom JWT securely using our `getAuthUser()` utilities.
- Upon success, it returns the user object containing `picture`, `name`, `email`, etc. 
- If verification fails or the token doesn't exist, it returns `{ user: null }` and wipes the invalid cookie.

## 4. Hydrating the Frontend Navbar
**Best Practice**: Leveraging a `useEffect` inside a Client Component (or SWR/React Query for caching) to query `/api/auth/me` on mount.
*Implementation*:
- The `Navbar.tsx` mounts and fetches `/api/auth/me`.
- If a valid `user` object is returned, we update a local `user` state and render their avatar (profile's photo).
- If `user` is null, we render the "Login" or "Sign up" buttons.
