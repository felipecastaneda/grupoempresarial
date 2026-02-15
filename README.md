# AppIntel Hub: The Modern Company Intranet

Welcome to AppIntel Hub, a comprehensive intranet portal designed to streamline internal communications and operations for Application Intelligence. This project is built with a modern tech stack and leverages the power of Generative AI to provide intelligent features.

## ✨ Features

- **Employee Portal**: A central dashboard for every employee with role-based access control.
- **Authentication**: Secure login for employees using Firebase Authentication (email/password).
- **Company Directory**: Easily find and connect with colleagues across departments.
- **Announcements**: Stay up-to-date with the latest company news.
- **Document Management**: Securely upload, store, and manage personal and company documents.
- **Policies & Procedures**: Access company policies and electronically acknowledge them. Includes a dashboard for HR and Admins to track acknowledgements.
- **AI-Powered Assistant ("Ask Me")**: An intelligent chatbot that can answer questions about company policies, find internal pages, and provide information on company projects.
- **AI Performance Summaries**: Generate concise performance summaries for departments using Genkit.
- **Onboarding Workflow**: A step-by-step guide for HR and Administrators to manage the new hire process.
- **And more**: Including pages for an Activities Calendar, Payroll, Legal, Health & Safety, and a message from the Office of the CEO.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **UI**: [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Authentication, Firestore)
- **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit) (integrated with Google's Gemini models)

## 🔧 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [npm](https://www.npmjs.com/) or an equivalent package manager

### 1. Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### 2. Environment Variables

The project uses Firebase for backend services and Genkit for AI features. The Firebase configuration is pre-filled for this demo project, but the Genkit AI features require a Google AI API key.

1.  **Get a Gemini API Key**: Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to create an API key.

2.  **Configure the Key**: The project is configured to look for a `GEMINI_API_KEY` environment variable. Create a `.env` file in the root of the project and add your key:

    ```.env
    GEMINI_API_KEY="your_gemini_api_key_here"
    ```
    If the environment variable is not found, the application will use a hard-coded fallback key from `src/lib/constants.ts` for demonstration purposes. Using an environment variable is the recommended approach.

### 3. Running the Application

This project has two main parts that need to be running for full functionality: the Next.js web application and the Genkit AI service.

#### Run the Web Application:

This command starts the Next.js development server.

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).

#### Run the Genkit Inspector (for AI development):

This command starts the Genkit service and opens the Inspector UI, which allows you to test and monitor your AI flows.

```bash
npm run genkit:watch
```

The Genkit Inspector will be available at [http://localhost:4000](http://localhost:4000).

## 📂 Project Structure

A brief overview of the key directories:
```
.
├── src
│   ├── ai/                # Genkit flows and AI logic
│   ├── app/               # Next.js pages, layouts, and routes
│   ├── components/        # Reusable UI components
│   ├── contexts/          # React context providers (e.g., Auth)
│   ├── firebase/          # Firebase configuration and custom hooks
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Shared utilities, data, types, constants
│   └── public/            # Static assets (images, fonts)
├── functions/             # Firebase Functions (including Genkit deployment)
├── dataconnect/           # Firebase Data Connect schema and configuration
├── package.json           # Project dependencies and scripts
└── tailwind.config.ts     # Tailwind CSS configuration
```

## 🔐 Authentication

Authentication is handled by Firebase Authentication using email and password. A set of mock employee users are defined in `src/lib/data.ts` which you can use to log in.

- **Admin Email**: `admin@applicationintelligence.ai`
- **HR Email**: `fiona.g@appintel.com`
- **Department Head Email**: `charlie.b@appintel.com`
- **Employee Email**: `diana.m@appintel.com`

**Password (for all mock users)**: `password`

You can use other email addresses from the `employees` array in `src/lib/data.ts` to log in and test different roles and permissions.
