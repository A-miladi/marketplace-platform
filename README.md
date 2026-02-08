# Marketplace Platform - Frontend Application

A modern, full-featured classified advertising platform built with cutting-edge web technologies. This is a Progressive Web App (PWA) with multi-language support, real-time notifications, and a responsive design system.

## 📋 Project Overview

Marketplace Platform is a comprehensive classified advertising application that enables users to:

- **Create & Manage Advertisements**: Post, edit, and manage product/service listings
- **Browse Listings**: Search and filter advertisements across multiple categories
- **User Authentication**: Secure authentication with social login integrations (Google, Facebook)
- **Real-time Communication**: In-app notifications and messaging via Firebase
- **Geolocation Features**: Map-based discovery and location services
- **Multi-language Support**: Full internationalization (i18n) with English and German
- **Progressive Web App**: Offline-capable with service worker support
- **Responsive UI**: Mobile-first design with seamless cross-device experience

## 🛠 Technology Stack

### Core Framework
- **Next.js 15.1.4** - React meta-framework with App Router and SSR capabilities
- **React 19.0.0** - Modern UI library with hooks and concurrent rendering
- **TypeScript 5** - Static type safety and enhanced developer experience

### State Management & Forms
- **Zustand 5.0.3** - Lightweight state management for notifications, chat, user info, and filters
- **React Hook Form 7.54.2** - Efficient form state management
- **Immer 10.1.1** - Immutable state updates

### Styling & UI
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Tailwind Merge 2.6.0** - Intelligent class merging for dynamic styling
- **PostCSS 8** - CSS transformation pipeline

### Forms & Validation
- **Yup 1.6.1** - Schema validation for form data
- **React Hook Form Resolvers 3.10.0** - Yup integration with React Hook Form

### Data & API
- **Axios 1.7.9** - HTTP client for API interactions
- **Day.js 1.11.13** - Lightweight date manipulation library

### Features & Integrations
- **Firebase 11.9.0** - Cloud messaging (FCM) for push notifications
- **React Hot Toast 2.5.1** - Non-intrusive toast notifications
- **Next.js PWA 10.2.9** - Progressive Web App capabilities
- **Next Intl 3.26.3** - Internationalization (i18n) framework

### Maps & Location
- **Leaflet 1.9.4** - Open-source mapping library
- **React Leaflet 5.0.0** - React bindings for Leaflet
- **Google LibPhoneNumber 3.2.40** - International phone number validation
- **React International Phone 4.5.0** - Phone input component

### UI Components & Utilities
- **React DatePicker 8.1.0** - Customizable date picker component
- **React Slick 0.30.3** - Carousel/slider component
- **Slick Carousel 1.8.1** - Carousel library
- **React Loading Skeleton 3.5.0** - Skeleton loading states
- **CLSX 2.1.1** - Conditional className utility
- **JS Cookie 3.0.5** - Cookie management
- **Next.js Toploader 3.7.15** - Page loading progress indicator

### Developer Tools
- **ESLint 9** - Code quality and style enforcement
- **Prettier 3.4.2** - Code formatter
- **Prettier Plugin Tailwind CSS** - Tailwind class sorting
- **TypeScript ESLint** - TypeScript support in linting

## 📦 Internationalization (i18n)

### Architecture

The project uses **next-intl** for comprehensive i18n support with the following structure:

```
messages/
├── en.json          # English translations
└── de.json          # German translations
```

**Supported Locales:**
- `en` - English (default)
- `de` - Deutsch (German)

### Implementation Details

**Routing Configuration** ([src/i18n/routing.ts](src/i18n/routing.ts)):
```typescript
locales: ["en", "de"]
defaultLocale: "en"
```

**Request Config** ([src/i18n/request.ts](src/i18n/request.ts)):
- Dynamically loads locale-specific message files
- Validates and defaults to English if locale is invalid
- Integrates seamlessly with Next.js server-side rendering

**URL Structure:**
```
/en/dashboard
/en/advertisements
/de/dashboard
/de/advertisements
```

### Integration Points

- **Navigation**: Custom navigation hooks respecting locale context
- **Link Component**: Automatic locale prefix in URLs
- **Middleware**: Locale detection and redirection via [src/middleware.ts](src/middleware.ts)

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (compatible with Next.js 15)
- **npm** 11.1.0 or higher
- **Git** for version control

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd marketplace-platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the project root with required Firebase and API configurations:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=<your-firebase-key>
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-firebase-project>
   # Add other required environment variables
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:3001`

### Build & Deployment

**Production build:**
```bash
npm run build
npm start
```

**Linting:**
```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   └── [locale]/                 # Dynamic locale routing
│       ├── layout.tsx            # Root layout with locale context
│       ├── globals.css           # Global styles
│       ├── (auth)/               # Authentication routes
│       ├── (dashboard)/          # Dashboard authenticated routes
│       ├── (main)/               # Main public routes
│       └── [...rest]/            # Fallback routes
├── components/                   # Reusable React components
│   ├── AdvertisementCard/        # Advertisement listing card
│   ├── Form/                     # Form components (input, select, date, number)
│   ├── icons/                    # SVG icon library
│   ├── Modal/                    # Modal components
│   ├── Notification/             # Notification UI
│   ├── Pagination/               # Pagination controls
│   ├── PhotoUpload/              # Image upload component
│   ├── Rating/                   # Rating component
│   ├── SearchBar/                # Search functionality
│   ├── Skeletons/                # Loading skeleton UI
│   ├── Toast/                    # Toast notifications
│   └── ui/                       # Generic UI components
├── constants/                    # Application constants
│   ├── Cookies.ts               # Cookie configurations
│   ├── Currency.ts              # Currency definitions
│   ├── PageUrls.ts              # Route paths
│   ├── QueryKeys.ts             # React Query keys
│   ├── Roles.ts                 # User roles
│   ├── SideOptions.ts           # Sidebar menu options
│   ├── SortOptions.ts           # Sorting choices
│   ├── Status.ts                # Status definitions
│   └── api/                     # API endpoint constants
├── hooks/                        # Custom React hooks
│   ├── api/                     # API-related hooks
│   ├── common/                  # Shared utility hooks
│   ├── useFCM.ts                # Firebase Cloud Messaging hook
│   ├── usePagination.ts         # Pagination logic
│   ├── usePost.ts               # Post/form submission
│   └── useRecaptcha.ts          # reCAPTCHA integration
├── i18n/                         # Internationalization
│   ├── request.ts               # Server-side i18n config
│   └── routing.ts               # Locale routing setup
├── services/                     # API service layer
├── store/                        # Zustand stores
│   ├── notification.ts          # Notification state
│   ├── useChatStore.ts          # Chat/messaging state
│   ├── useFilters.ts            # Filter state
│   └── useUserInfo.ts           # User authentication state
├── types/                        # TypeScript type definitions
│   ├── advertisement.d.ts       # Advertisement types
│   ├── auth.d.ts                # Authentication types
│   ├── user.d.ts                # User model types
│   ├── Forms.ts                 # Form-related types
│   └── [other models]
└── utils/                        # Utility functions
    ├── addCommas.ts             # Number formatting
    ├── buildQueryString.ts      # URL query builder
    ├── dateFormatter.ts         # Date formatting utilities
    ├── location.ts              # Geolocation helpers
    ├── truncate.ts              # Text truncation
    └── [other utilities]
```

## 🎨 Key Features

### 1. **Form System**
Comprehensive form components built on `react-hook-form` with Yup validation:
- [Form/index.tsx](src/components/Form/index.tsx) - Base form wrapper
- [Form/RenderInput.tsx](src/components/Form/RenderInput.tsx) - Text inputs
- [Form/RenderSelect.tsx](src/components/Form/RenderSelect.tsx) - Select dropdowns
- [Form/RenderDate.tsx](src/components/Form/RenderDate.tsx) - Date pickers
- [Form/RenderNumber.tsx](src/components/Form/RenderNumber.tsx) - Number inputs

### 2. **Icon Library**
Extensive SVG icon collection in [src/components/icons/](src/components/icons/) for consistent UI across the platform.

### 3. **State Management**
Centralized state with Zustand stores:
- **User Info**: Authentication and profile data
- **Filters**: Advertisement filtering state
- **Chat**: Real-time messaging data
- **Notifications**: In-app notifications

### 4. **Real-time Notifications**
Firebase Cloud Messaging integration ([useFCM.ts](src/hooks/useFCM.ts)) for push notifications with service worker support.

### 5. **Progressive Web App**
- Service worker at [public/firebase-messaging-sw.js](public/firebase-messaging-sw.js)
- Offline-first capabilities
- App manifest at [public/manifest.json](public/manifest.json)

### 6. **Map Integration**
Leaflet-based location discovery and map visualizations in [src/components/Map/](src/components/Map/).

## 🔧 Development Guidelines

### Code Organization Best Practices

1. **Components**: Keep components focused and single-purpose. Use composition over inheritance.
2. **Hooks**: Extract reusable logic into custom hooks in the [hooks/](src/hooks/) directory.
3. **State**: Use Zustand for global state, React Hook Form for local form state.
4. **Types**: Define interfaces in [types/](src/types/) directory with semantic file naming.
5. **Utils**: Place reusable pure functions in [utils/](src/utils/).

### Adding New Features

1. Create corresponding type definitions in [src/types/](src/types/)
2. Implement components in [src/components/](src/components/)
3. Add custom hooks if needed in [src/hooks/](src/hooks/)
4. Create Zustand store if global state is required in [src/store/](src/store/)
5. Add translations for all locales in [messages/](messages/)

### Translations

Add strings to both `messages/en.json` and `messages/de.json`:
```json
{
  "pages": {
    "dashboard": {
      "title": "Dashboard",
      "subtitle": "Welcome back"
    }
  }
}
```

### Styling

- Use Tailwind CSS for styling
- Follow the utility-first approach
- Use `clsx` and `tailwind-merge` for conditional classes:
  ```tsx
  import { clsx } from 'clsx';
  
  className={clsx('p-4', isActive && 'bg-blue-500')}
  ```

## 🔐 Security & Performance

### Security Considerations

- **Authentication**: Secure token management via cookies
- **reCAPTCHA**: Form validation with [useRecaptcha.ts](src/hooks/useRecaptcha.ts)
- **Environment Variables**: Sensitive data in `.env.local`
- **Firebase Rules**: Implement proper Firebase security rules

### Performance Optimizations

- **Image Optimization**: Next.js Image component with AWS S3 CDN
- **Code Splitting**: Automatic with Next.js App Router
- **Service Worker Caching**: PWA caching strategies
- **Skeleton Loading**: Loading states with [React Loading Skeleton](src/components/Skeletons/)

## 📊 API Integration

API interactions are managed through:
- [axios](https://axios-http.com/) for HTTP requests
- [src/services/](src/services/) - Service layer for API calls
- Custom hooks in [src/hooks/api/](src/hooks/api/) for data fetching
- React Query pattern for caching and state

## 🎯 Deployment

### Environment Setup

Configure these variables for your deployment:
```env
NEXT_PUBLIC_API_BASE_URL=<api-url>
NEXT_PUBLIC_FIREBASE_CONFIG=<firebase-config>
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<recaptcha-key>
```

### Hosting Recommendations

- **Vercel**: Optimized for Next.js
- **AWS**: EC2 or ECS with proper CI/CD
- **Docker**: Containerized deployment available

## 📝 Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start dev server on port 3001 with Turbopack |
| `npm run build` | Production build optimization |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint for code quality |

## 🌍 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers with PWA support
- Service worker support required for offline functionality

## 📞 Support & Contribution

For issues, feature requests, or contributions, please follow the project's contribution guidelines.

---

**Version**: 0.1.0  
**Repository**: marketplace-platform  
**Last Updated**: February 2026  
**Maintained By**: Development Team
