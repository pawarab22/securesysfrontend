# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Frontend Implementation and Setup Guide

### Overview
This frontend application is built with React and Vite, providing a note-taking interface with user authentication. It includes features for creating, viewing, and managing notes, along with login and registration functionality.

### Project Structure
- `src/components/`: Reusable UI components (Navbar, NoteForm, NoteItem)
- `src/pages/`: Main application pages (Dashboard, Login, Register)
- `src/context/`: React context for authentication (AuthContext)
- `src/hooks/`: Custom hooks (useAuth)
- `src/api/`: API configuration (axios setup)
- `public/`: Static assets

### Setup Instructions
1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (default Vite port).

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

### Features
- **Authentication**: Login and register pages with context-based state management
- **Dashboard**: View and manage personal notes
- **Note Management**: Create new notes using the NoteForm component, display notes with NoteItem
- **Responsive UI**: Built with React components and CSS for a clean interface

### API Integration
The app uses Axios for API calls, configured in `src/api/axios.js`. Ensure the backend API is running and update the base URL if necessary.

### Development Notes
- Hot Module Replacement (HMR) is enabled for fast development
- ESLint is configured for code quality
- The app uses modern React features and hooks for state management
