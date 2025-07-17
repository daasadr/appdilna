# Architectural Decision Records (ADRs) - AppDílna

## Overview

This document contains the architectural decision records documenting the key technical choices made during the development of this platform.

AppDílna is a commercial no-code/low-code platform for generating Progressive Web Applications (PWAs).

These ADRs document the key architectural decisions that shape the AppDílna platform. Each decision was made considering:

- **Developer Experience:** Tools that enable fast, reliable development
- **User Experience:** Intuitive interfaces for non-technical users
- **Scalability:** Architecture that can grow with the platform
- **Security:** Robust authentication and authorization
- **Performance:** Fast, responsive interfaces and generated applications
- **Maintainability:** Clean, well-documented code that's easy to extend

---

Main Decisions:

### Decision

We chose the following technology stack:

- **Frontend & API:** Next.js 14 with TypeScript
- **Backend/CMS:** Directus as headless CMS
- **Authentication:** NextAuth.js v4
- **Styling:** Tailwind CSS
- **Database:** Managed by Directus
- **Deployment:** Node.js environment

### Rationale

- **Next.js:** Provides full-stack capabilities, excellent developer experience, built-in API routes, SSR/SSG capabilities
- **Directus:** Offers robust headless CMS with built-in user management, cache management and well optimised API generation
- **NextAuth.js:** Industry-standard authentication solution with multiple provider support
- **Tailwind CSS:** Utility-first CSS framework enabling rapid UI development and consistent design
- **TypeScript:** Type safety reduces bugs and improves developer experience

### Consequences

- **Positive:** Fast development, type safety, excellent ecosystem, scalable architecture
- **Negative:** Vendor lock-in to Directus
- **Neutral:** Directus has favourable pricing and had open-source fork

---

### Authentification

Implement NextAuth.js with dual authentication providers:

1. **Credentials Provider:** Email/password authentication via Directus API
2. **Google OAuth Provider:** Social login with automatic user creation in Directus
3. **JWT Strategy:** For session management with access/refresh token handling

Authentication flow:

1. NextAuth.js handles authentication
2. Credentials verified against Directus /auth/login
3. JWT tokens stored in session with auto-refresh
4. User ownership verified for all app operations

### Rationale

- **NextAuth.js:** Handles complex authentication flows, security best practices
- **Directus Integration:** Centralizes user management, leverages existing user/role system
- **JWT with Refresh:** Secure, stateless sessions with automatic token renewal
- **Multiple Providers:** Reduces friction for user registration/login

### Consequences

- **Positive:** Secure authentication, good UX, centralized user management
- **Negative:** Complex token refresh logic, requires careful error handling
- **Risk:** Token management complexity could lead to session issues

---

Drag-and-Drop Builder Architecture

### Context

The core feature is a visual drag-and-drop builder allowing users to create PWAs without coding knowledge.

### Decision

Implement a component-based builder using:

- **@dnd-kit/core** for drag-and-drop functionality
- **Component Library** with categorized, reusable components
- **Canvas** for visual editing with live preview
- **Property Panel** for component customization
- **Responsive Preview** with device-specific views

### Rationale

- **@dnd-kit:** Modern, accessible drag-and-drop with great TypeScript support
- **Component-Based:** Modular, reusable, easy to extend
- **Click-to-Add:** Better UX than traditional drag-and-drop for component selection
- **Live Preview:** Immediate visual feedback improves user experience

### Consequences

- **Positive:** Intuitive user interface, extensible component system, good performance
- **Negative:** Complex state management, requires careful component isolation
- **Future:** Need to add undo/redo functionality, nested components

---

---

## ADR-011: Performance Optimization Strategy

**Date:** 2024-12-19  
**Status:** Accepted  
**Deciders:** Development Team

### Context

The builder interface and generated PWAs must perform well across various devices and network conditions.

### Decision

Implement **multi-faceted performance optimization**:

1. **Next.js Optimizations:**
   - Image optimization with `next/image`
   - Code splitting with dynamic imports
   - Static generation where possible

2. **Bundle Optimization:**
   - Tree shaking for unused code
   - Component lazy loading
   - Minimal dependency footprint

3. **Runtime Performance:**
   - React.memo for expensive components
   - Debounced user inputs
   - Efficient re-render patterns

4. **Generated PWA Performance:**
   - Optimized build output
   - Service worker for caching
   - Progressive loading

### Rationale

- **User Experience:** Fast interfaces improve user satisfaction
- **SEO Benefits:** Performance affects search rankings
- **Resource Efficiency:** Lower server costs, better scalability
- **Mobile Support:** Essential for PWA success

### Consequences

- **Positive:** Better user experience, lower operational costs, improved SEO
- **Negative:** Additional development complexity, need for performance monitoring
- **Future:** Need performance budgets, automated testing, advanced caching strategies

---

Key Principles

- Use functional, declarative programming. Avoid classes.
- Write concise, well structured codewith accurate TypeScript definitions.
- Prefer iteration and modularization over duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Use lowercase with dashes for directories (e.g., components/auth-wizard).
- Favor named exports for components.

Key Conventions

1. Rely on Next.js App Router for state changes and routing.
2. Prioritize Web Vitals (LCP, CLS, FID).
3. Minimize 'use client' usage:
   - Prefer server components and Next.js SSR features.
   - Use 'use client' only for Web API access in small components or where its advisable for offline first approach.
   - Avoid using 'use client' for data fetching or state management.
4. Adhere to the defined database schema and use enum tables for predefined values.

TypeScript

- always use types for props of function definition
- always use types for return type of a function declaration

JavaScript/TypeScript

- Use "function" keyword for pure functions. Omit semicolons.
- Use TypeScript for all code. Prefer interfaces over types.
- File structure: Exported component, subcomponents, helpers, content, types.
- Use concise, one-line syntax for simple conditional statements (e.g., if (condition) doSomething()).

Documentation

- Provide clear and concise comments for complex logic.
- Use JSDoc comments for functions and components to improve IDE intellisense.
- Keep the README.md files up-to-date with setup instructions and overview of the main aspects of the project.

Styling

- Accessibility friendly first
- use Tailwind CSS, following the Utility First approach.
- Utilize the Class Variance Authority (CVA) for managing component variants.
- Localize properties and inherence focus, so children can be configured from root parent.
- Shadcn like components
- responsive mobile-first approach

Data Fetching and State Management

- Use React Server Components for data fetching when possible.
- Refer to Next.js documentation for Data Fetching, Rendering, and Routing best practices and to the

Forms

- use React Query for offline first experience
- use Nextjs Server Actions when offline first approach is not neccessary

Component Structure

- in /src/components/ folder
- Break down components into smaller parts with minimal props.
- Use composition to build complex components.
- if multiple files belongs to single component, it should be in its folder encapsulating the files
- use /src/components/ui/ for shadcn/ui components you add via the CLI will live.
- use /src/components/layout/ for global layout components like your navbar, sidebar, and footer.
- use /src/components/forms/ for complex forms and to create reusable form components here.
- use /lib/hooks/ a directory for custom React hooks which are shared among multiple components

Error Handling and Validation

- Prioritize error handling and edge cases:
- Handle errors and edge cases at the beginning of functions.
- Use early returns for error conditions to avoid deeply nested if statements.
- Place the happy path last in the function for improved readability.
- Avoid unnecessary else statements; use if-return pattern instead.
- Use guard clauses to handle preconditions and invalid states early.
- Implement proper error logging and user-friendly error messages.

React/Next.js

- Use functional components and TypeScript interfaces.
- Use declarative JSX.
- use React ecosystem standard camel case
- Use function, not const, for components.
- Use Shadcn UI, Radix, and Tailwind CSS for components and styling.
- Implement responsive design with Tailwind CSS.
- Use mobile-first approach for responsive design.
- Place static content and interfaces at file end.
- Use content variables for static content outside render functions.
- Minimize 'use client', 'useEffect', and 'setState'. Favor React Server Components (RSC).
- Use Zod for form validation.
- Wrap client components in Suspense with fallback.
- Use dynamic loading for non-critical components.
- Optimize images: WebP format, size data, lazy loading.
- Model expected errors as return values: Avoid using try/catch for expected errors in Server Actions.
- Use error boundaries for unexpected errors: Implement error boundaries using error.tsx and global-error.tsx files.
- Use useActionState with react-hook-form for form validation.
- Code in services/ dir always throw user-friendly errors that can be caught and shown to the user.
- Use next-safe-action for all server actions.
- Implement type-safe server actions with proper validation.
- Handle errors gracefully and return appropriate responses.
  Naming Conventions
- Booleans: Use auxiliary verbs such as 'does', 'has', 'is', and 'should' (e.g., isDisabled, hasError).
- Filenames: Use lowercase with dash separators (e.g., auth-wizard.tsx).
- File extensions: Use .config.ts, .test.ts, .context.tsx, .type.ts, .hook.ts as appropriate.

Accessibility

- Ensure interfaces are keyboard navigable.
- Implement proper ARIA labels and roles for components.
- Ensure color contrast ratios meet WCAG standards for readability.
- Keep in mind special needs and preferences such as reduced animations mode.
- Use semantic HTML tags.
