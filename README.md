# Challenge Frontend - Task Manager

A professional task management application built with Next.js 14, TypeScript, and TailwindCSS.

## 🚀 Features

- **Authentication**: Secure login and registration with JWT
- **Task Management**: Create, read, update, and delete tasks
- **Tag System**: Organize tasks with custom tags
- **Profile Management**: Update profile and change password
- **Dashboard**: Overview of tasks and statistics
- **Dark Mode**: Professional dark mode design
- **Responsive**: Mobile-friendly interface
- **Type-Safe**: 100% TypeScript with no `any` types
- **Accessibility**: ARIA labels and keyboard navigation
- **Toast Notifications**: Real-time feedback for user actions

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + Custom CSS
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **State Management**: React Context + Custom Hooks

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd challenge-frontend
```

2. Install dependencies

```bash
npm install
```

3. Create environment file

```bash
cp .env.example .env.local
```

4. Update the API URL in `.env.local`

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

5. Run the development server

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
challenge-frontend/
├── app/                      # Next.js app directory
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Dashboard pages
│   │   ├── page.tsx         # Dashboard home
│   │   ├── tasks/           # Tasks management
│   │   ├── tags/            # Tags management
│   │   └── profile/         # Profile management
│   ├── layout.tsx           # Root layout
│   ├── providers.tsx        # Context providers
│   └── globals.css          # Global styles
├── src/
│   ├── components/          # Reusable components
│   │   ├── ui/             # UI primitives
│   │   ├── auth/           # Auth components
│   │   ├── tasks/          # Task components
│   │   ├── tags/           # Tag components
│   │   ├── profile/        # Profile components
│   │   └── layout/         # Layout components
│   ├── context/            # React contexts
│   │   ├── auth-context.tsx
│   │   └── toast-context.tsx
│   ├── hooks/              # Custom hooks
│   │   ├── use-auth.ts
│   │   ├── use-tasks.ts
│   │   ├── use-tags.ts
│   │   └── use-toast.ts
│   ├── lib/                # Utilities
│   │   ├── api/           # API functions
│   │   ├── constants.ts
│   │   ├── utils.ts
│   │   └── validations.ts
│   └── types/              # TypeScript types
│       ├── user.ts
│       ├── task.ts
│       ├── tag.ts
│       └── error.ts
└── public/                 # Static assets
```

## 🎨 Design System

### Colors

- **Primary**: Professional Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Orange (#F59E0B)
- **Destructive**: Red (#EF4444)
- **Accent**: Purple (#8B5CF6)

### Typography

- **Font**: Inter (Google Fonts)
- **Headings**: Bold, various sizes
- **Body**: Regular weight, 14-16px

### Components

All components follow shadcn/ui patterns with custom styling:

- Buttons with multiple variants
- Form inputs with validation
- Cards and containers
- Modals and dialogs
- Dropdown menus
- Badges and tags
- Toast notifications
- Loading skeletons

## 🔐 Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🧪 Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📝 API Integration

The app connects to a NestJS backend API. Ensure the backend is running on the URL specified in `.env.local`.

### API Endpoints Used

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/users/me` - Get current user
- `PATCH /api/users/me` - Update profile
- `PATCH /api/users/me/password` - Change password
- `DELETE /api/users/me` - Delete account
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tags` - Get all tags
- `POST /api/tags` - Create tag
- `PATCH /api/tags/:id` - Update tag
- `DELETE /api/tags/:id` - Delete tag

## 🎯 Key Features

### Authentication

- JWT-based authentication
- Token stored in localStorage + cookie (for middleware)
- Auto-refresh user data
- Protected routes with middleware

### Task Management

- CRUD operations for tasks
- Task completion toggle
- Tag associations
- Search and filter
- Empty states

### Tag Management

- CRUD operations for tags
- Task count per tag
- Search functionality
- View tasks by tag

### Profile Management

- Update name, email, birth date
- Change password with validation
- Delete account with confirmation
- Type-to-confirm safety

### UX Enhancements

- Toast notifications
- Loading skeletons
- Smooth animations
- Error handling
- Success feedback
- Responsive design
- Accessibility features

## 🚧 Development Notes

- **No `any` types**: 100% type-safe TypeScript
- **Error handling**: Centralized with `getErrorMessage()` utility
- **Form validation**: Zod schemas for all forms
- **API client**: Axios with interceptors
- **State management**: Context + custom hooks
- **Styling**: TailwindCSS + custom dark theme

## 📄 License

MIT

## 👥 Author

Your Name

```

This README provides comprehensive documentation for the frontend application!
```
