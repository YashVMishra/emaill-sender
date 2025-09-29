# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/1aa675b0-6d8a-44d8-b0b6-cb5d4e933b39

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/1aa675b0-6d8a-44d8-b0b6-cb5d4e933b39) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/1aa675b0-6d8a-44d8-b0b6-cb5d4e933b39) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)




Code Structure Overview
1. Types (src/types/email.ts)

Email: Interface for email records with id, recipient, subject, body, attachment name, sent date, and status
EmailFormData: Interface for form input data (to, subject, body, optional attachment file)
2. Email Form (src/components/EmailForm.tsx)

Uses React hooks (useState) to manage form state and submission status
Form validation ensures all required fields (to, subject, body) are filled
File upload handling for attachments with accepted file types (.pdf, .doc, .txt, images)
Success/error notifications using Sonner toast
Clears form after successful submission
Uses shadcn/ui components (Card, Input, Textarea, Button) with Lucide icons
3. Email History (src/components/EmailHistory.tsx)

Displays list of previously sent emails in a scrollable area
Color-coded status badges (green for sent, yellow for pending, red for failed)
Shows email details: subject, recipient, body preview, timestamp, and attachment name
Uses date-fns for date formatting
Responsive design with hover effects
4. Main Page (src/pages/Index.tsx)

Combines EmailForm and EmailHistory components
Manages email state array with mock data for demonstration
Handles form submission by adding new emails to the history
Simulates API delay (1 second) for realistic UX
Responsive grid layout that stacks on mobile, side-by-side on larger screens
The app demonstrates a complete email interface with form submission, validation, file uploads, and history tracking - ready to connect to a backend API.




Project Folder Structure
📁 src/ - Source Code Root
Contains all application source code
Standard React convention for separating source from build/config files

📁 src/components/ - Reusable Components
Houses all React components that can be reused across pages
EmailForm.tsx & EmailHistory.tsx - Feature-specific components
src/components/ui/ - Design System Components
Contains shadcn/ui components (Button, Input, Card, etc.)
Provides consistent, themed UI elements across the app
Follows atomic design principles


📁 src/pages/ - Route Components
Contains page-level components that correspond to routes
Index.tsx - Main landing page component
NotFound.tsx - 404 error page
Separates routing logic from reusable components


📁 src/types/ - TypeScript Definitions
Centralized type definitions and interfaces
email.ts - Email-related type definitions
Ensures type safety and code documentation
Makes types reusable across components


📁 src/hooks/ - Custom React Hooks
Custom hooks for reusable stateful logic
use-mobile.tsx, use-toast.ts - Utility hooks
Promotes code reuse and separation of concerns


📁 src/lib/ - Utility Functions
Pure utility functions and configurations
utils.ts - Common helper functions (like cn for className merging)
Non-React specific code that can be easily tested


📁 public/ - Static Assets
Static files served directly by the web server
robots.txt, favicon.ico - SEO and branding assets
Files accessible via public URLs


📄 Root Config Files
tailwind.config.ts - Tailwind CSS configuration
vite.config.ts - Vite build tool configuration
tsconfig.json - TypeScript compiler settings
package.json - Dependencies and scripts
This structure follows separation of concerns, makes code easily maintainable, and follows React best practices for scalable applications.