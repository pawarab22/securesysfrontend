# SecureSys Frontend 🛡️

A premium, secure note-taking workspace built with **React** and **Vite**. This application focuses on high-security standards, modern UX, and a professional-grade design system.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** (v18+)
- **npm** or **yarn**

### 2. Installation
```bash
# Clone the repository
git clone <repository-url>
cd securesysfrontend

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://your-backend-api-url
```

### 4. Development
```bash
# Start the dev server with HMR
npm run dev
```
The application will launch at `http://localhost:5173`.

---

## 🏗️ Architecture Overview

The system is designed with a **Separation of Concerns (SoC)** principle:

- **State Management**: Uses the **React Context API** (`AuthContext`, `ToastContext`) for global authentication and notification state.
- **Routing**: **React Router v6** with intelligent routing wrappers (`RequireAuth`, `PublicRoute`) for state-aware navigation.
- **API Layer**: Centralized **Axios** instance with interceptors for token attachment and standardized error handling.
- **Design System**: A custom **Premium Dark System** built with Vanilla CSS, leveraging CSS Variables for consistency and performance.
- **Icons**: **Lucide React** for lightweight, consistent iconography.

---

## 🔐 Security Considerations Implemented

Security is the core pillar of **SecureSys**. The following measures are implemented:

### 1. Route Guarding
- **`RequireAuth`**: Prevents unauthenticated access to the dashboard and workspace.
- **`PublicRoute`**: Redirects logged-in users away from authentication pages (`/login`, `/register`) to prevent session confusion.

### 2. Authentication Integrity
- **JWT Storage**: Securely persistence of authentication state via `localStorage`.
- **Cross-Tab Syncing**: An `AuthWatcher` listener ensures that logging out in one tab immediately logs out all other open tabs, preventing stale sessions.

### 3. Defensive API Interaction
- **Idempotency**: Implements **Idempotency Keys** (UUID v4) for note creation to prevent duplicate entries from network retries.
- **Rate Limit Awareness**: Frontend support for login attempt tracking and lock-out timers.

### 4. Client-Side Protection
- **XSS Prevention**: All user-generated content (Note content) is sanitized using **DOMPurify** before rendering with `dangerouslySetInnerHTML`.
- **CSRF Awareness**: Standard Axios configurations are used to ensure secure request headers.

---

## ✨ Features & UX

- **Premium UI**: Custom-built with glassmorphism, background animated blobs, and a refined color palette.
- **Optimized Performance**: Built on **Vite** for near-instant cold starts and hot module replacement.
- **Robust Feedback**: Integrated **SweetAlert2** for critical confirmations and a custom Toast system for non-blocking notifications.
- **Responsive Design**: Fully adaptive layout for desktop, tablet, and mobile screens.

---

## 📁 Directory Structure

```text
src/
├── api/          # Axios configuration and API endpoints
├── components/   # Reusable UI components (Navbar, NoteForm, NoteItem)
├── constants/    # App-wide constants and message strings
├── context/      # Global state providers (Auth, Toast)
├── hooks/        # Custom utility hooks (useAuth)
├── pages/        # Main route views (Dashboard, Login, Register)
└── assets/       # Global styles and static assets
```

---

## 🛠️ Build & Deployment

```bash
# Build for production (optimized build)
npm run build

# Preview the production build locally
npm run preview
```
