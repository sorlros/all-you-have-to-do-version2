# All You Have To Do

A modern, responsive web application designed to help you seamlessly manage your daily schedules and to-do lists. Built with Next.js and Firebase, it features intuitive task categorization, real-time updates, and push notifications to keep you on track.

Read this in other languages: [한국어(Korean)](README.ko.md)

## 🌟 Key Features

- **To-Do Management**: Organize your tasks by categories such as Kitchen, Workout, Goals, Expenses, and Others.
- **User Authentication**: Secure your data with Google Login or use Anonymous Login for quick access (anonymous data expires in a week).
- **Push Notifications**: Receive timely alerts for your tasks using Firebase Cloud Messaging (FCM).
- **Timer Modal**: Built-in timer functionality.
- **PWA Ready**: Installable as a Progressive Web App onto your device for a native-like experience.
- **Responsive UI**: Carefully crafted user interface that looks great on both desktop and mobile devices.

## 🚀 Tech Stack

### Core
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Library**: [React 18](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

### Styling & UI
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/), [Lucide React](https://lucide.dev/)
- **Toast & Alerts**: [Sonner](https://sonner.emilkowal.ski/), [SweetAlert2](https://sweetalert2.github.io/)

### State Management & Utilities
- **State Management**: [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **Utilities**: `clsx`, `tailwind-merge`

### Backend & Database & Auth
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: MongoDB (via Prisma / Mongoose)
- **Authentication & Backend Services**: [Firebase](https://firebase.google.com/) (Auth, Cloud Messaging, Edge Config)

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sorlros/all-you-have-to-do-version2.git
   cd all-you-have-to-do-version2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and configure your Firebase and Database credentials.
   ```env
   DATABASE_URL="your-mongodb-connection-string"
   NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
   # Add other Firebase config variables...
   ```

4. **Initialize Prisma:**
   ```bash
   npx prisma generate
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

- `/src/app`: Next.js App Router root, containing main pages, layout, and routing logic.
  - `/(main)`: Main dashboard and user pages.
- `/src/components`: Reusable UI components (buttons, modals, spinners).
- `/src/libs`: Utility functions, Firebase configuration, etc.
- `/src/actions`: Server actions and database operations.
- `/prisma`: Prisma schema and database configuration.
