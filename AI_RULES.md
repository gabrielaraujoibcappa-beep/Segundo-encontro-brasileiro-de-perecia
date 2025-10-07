# AI Rules for ibc – Gerador de Ingressos

This document outlines the technical stack and guidelines for developing the "ibc – Gerador de Ingressos" application.

## Tech Stack Overview

*   **Frontend Framework:** React with TypeScript for building interactive user interfaces.
*   **Styling:** Tailwind CSS for utility-first styling, ensuring a consistent and responsive design.
*   **UI Components:** Utilize `shadcn/ui` components for pre-built, accessible, and customizable UI elements.
*   **Icons:** `lucide-react` for a comprehensive set of SVG icons.
*   **Build Tool:** Vite for a fast development experience and optimized production builds.
*   **Image Generation:** HTML Canvas API for dynamic image manipulation and ticket generation.
*   **Font:** Poppins, imported via Google Fonts, for consistent typography.
*   **State Management:** React's built-in `useState` and `useCallback` hooks for local component state.
*   **Routing:** React Router for managing navigation and different views within the application (to be implemented if the app grows beyond a single-page flow).

## Library Usage Guidelines

*   **React & TypeScript:** All new components and logic should be written using React and TypeScript, adhering to best practices for functional components and hooks.
*   **Styling with Tailwind CSS:** Always use Tailwind CSS classes for styling. Avoid inline styles or separate CSS files unless absolutely necessary for very specific, complex cases not covered by Tailwind.
*   **UI Components:**
    *   For common UI elements (buttons, inputs, dialogs, etc.), prioritize using components from `shadcn/ui`.
    *   If a `shadcn/ui` component doesn't fit the exact need, create a new custom component following the existing project's styling conventions. Do not modify `shadcn/ui` source files directly.
*   **Icons:** For any new icons, import and use components from the `lucide-react` library. The existing custom SVG icons in `components/icons.tsx` can remain, but new additions should use `lucide-react`.
*   **Routing:** If the application requires multiple distinct pages or views, implement routing using `react-router-dom`. All routes should be defined within `src/App.tsx`.
*   **Image Processing:** Continue to use the HTML Canvas API for any server-side image generation or manipulation tasks, as demonstrated in `services/ticketService.ts`.
*   **Dependencies:** Before adding new third-party libraries, check if existing libraries (like `shadcn/ui` or `lucide-react`) can fulfill the requirement. If a new dependency is needed, ensure it's well-maintained and widely used.