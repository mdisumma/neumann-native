# 🔧 Neumann Native - Equipment Inspection App

A React Native mobile application built with Expo for conducting equipment inspections. This app pro### Development Features

- **Hot Reload** - Instant code changes
- **TypeScript** - Full type safety with comprehensive interfaces
- **ESLint** - Code quality and consistency
- **Modular Architecture** - Easy to maintain and extend
- **Component Documentation** - Extensive code comments
- **Asset Management** - Proper relative path handling for images
- **Error Handling** - Graceful fallbacks and user-friendly alerts streamlined interface for performing visual inspections, electrical safety tests, and functional tests on various equipment types.

## � Project Overview

The Neumann Native app is designed for technicians and inspectors to:

- Conduct systematic equipment inspections
- Record visual inspection results
- Perform electrical safety measurements
- Execute functional tests
- Capture photos during inspections
- Generate inspection reports

## 🏗️ Architecture

This project uses a **modular component-based architecture** for maximum maintainability and scalability:

### Navigation

- **React Navigation v7** - Stack navigation instead of Expo Router
- Custom navigation types for type safety
- Centralized navigation structure

### State Management

- **React Context API** - Global inspection data management
- Local component state for UI interactions
- Immutable state updates for data integrity

### Component Structure

```
src/
├── components/
│   └── inspection/           # Modular inspection components
│       ├── DeviceInfo.tsx   # Device information form
│       ├── ElectricalSafety.tsx # Electrical measurements
│       ├── FunctionalTest.tsx   # Functional test questions
│       ├── InspectionHeader.tsx # Inspection metadata
│       ├── QuestionCard.tsx     # Reusable question component
│       ├── VisualInspection.tsx # Visual inspection questions
│       ├── YesNoButton.tsx      # Reusable yes/no button
│       └── index.ts             # Component exports
├── screens/                  # Application screens
├── context/                  # React Context providers
└── types/                    # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (macOS) or Android Emulator

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd neumann-native
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Run on specific platforms**

   ```bash
   # iOS Simulator
   npm run ios

   # Android Emulator
   npm run android

   # Web browser
   npm run web
   ```

## 📂 Project Structure

```
neumann-native/
├── App.tsx                    # Main app component with navigation
├── src/                       # Source code directory
│   ├── screens/              # Screen components
│   │   ├── CameraScreen.tsx  # Photo capture and AI analysis
│   │   ├── InspectionScreen.tsx # Main inspection form
│   │   ├── HomeScreen.tsx    # Home/login screen
│   │   ├── ResultScreen.tsx  # Inspection results
│   │   └── ...
│   ├── components/           # Reusable UI components
│   │   └── inspection/       # Inspection-specific components
│   │       ├── DeviceInfo.tsx
│   │       ├── VisualInspection.tsx
│   │       ├── ElectricalSafety.tsx
│   │       ├── FunctionalTest.tsx
│   │       └── ...
│   ├── context/             # React Context providers
│   │   ├── ImageContext.tsx # Image capture and AI analysis state
│   │   └── InspectionContext.tsx # Global inspection state
│   └── types/               # TypeScript type definitions
│       └── navigation.ts    # Navigation types
├── assets/                  # Images and static files
├── api/                     # API integration (if applicable)
└── ...config files
```

## 🛠️ Key Technologies

- **React Native 0.81.4** - Mobile app framework
- **Expo SDK 54** - Development platform and toolchain
- **React Navigation 7** - Stack navigation for screen management
- **TypeScript** - Type safety and better developer experience
- **React Context API** - Dual context architecture (Image + Inspection)
- **Expo Image Picker** - Camera integration and image capture
- **React Native UUID** - Unique identifier generation for images
- **AI Integration** - Image analysis and device recognition API
- **React Native SVG** - SVG image support and display

## 📋 Features

### ✅ Current Features

- **Equipment Inspection Form** - Comprehensive inspection workflow
- **AI-Powered Analysis** - Image analysis with automatic device recognition
- **Photo Capture** - Camera integration with UUID-based image identification
- **Visual Inspection** - Interactive Yes/No questions with answer persistence
- **Electrical Safety Tests** - Measurement input fields with validation
- **Functional Testing** - Equipment functionality verification
- **Device Information** - Auto-populated equipment details from AI analysis
- **State Management** - Separate contexts for images and inspection data
- **Real-time Debugging** - Console logging for development and testing

### 🔄 Development Features

- **Hot Reload** - Instant code changes
- **TypeScript** - Full type safety
- **ESLint** - Code quality and consistency
- **Modular Architecture** - Easy to maintain and extend
- **Component Documentation** - Extensive code comments

## 🧪 Development Workflow

### Code Quality

```bash
# Run linting
npm run lint

# Type checking (automatic with TypeScript)
npx tsc --noEmit
```

### Project Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run in web browser
npm run lint       # Run ESLint
```

### Environment Setup

- Environment variables can be configured in `.env` file
- Development vs production configurations supported

## 📚 Component Documentation

### InspectionScreen

Main orchestrator component that combines all inspection modules:

- Manages global inspection state
- Coordinates between different inspection sections
- Handles navigation to results screen

### Inspection Components

Modular components in `src/components/inspection/`:

- **InspectionHeader** - Displays inspection metadata and captured images
- **DeviceInfo** - Equipment information form
- **VisualInspection** - Visual inspection questions with Yes/No buttons
- **ElectricalSafety** - Electrical measurement inputs
- **FunctionalTest** - Functional test questions
- **QuestionCard** - Reusable question component
- **YesNoButton** - Standardized yes/no input with selection states

### Context Management

Global state management in `src/context/`:

- **ImageContext** - Manages captured images and AI analysis results
- **InspectionContext** - Handles inspection data and user responses

## 🐛 Debugging

### Development Tools

- **Expo DevTools** - Built-in debugging interface
- **React Native Debugger** - Advanced debugging
- **Console Logging** - Enhanced with emoji indicators
- **TypeScript Errors** - Real-time type checking

### Common Issues

1. **Metro bundler issues** - Clear cache with `npx expo start -c`
2. **iOS simulator** - Reset simulator if needed
3. **Android emulator** - Ensure emulator is running before starting

## 🤝 Contributing

### Code Standards

- Use **TypeScript** for all new components
- Follow **modular architecture** principles
- Add **comprehensive comments** for junior developers
- Maintain **component separation** of concerns
- Use **descriptive naming** conventions

### Pull Request Process

1. Create feature branch from `main`
2. Implement changes with proper documentation
3. Test on both iOS and Android
4. Submit PR with detailed description

## 🚀 Deployment

### Build Commands

```bash
# Create production build
npx expo build:android
npx expo build:ios

# Publish to Expo
npx expo publish
```

### Release Process

1. Update version in `package.json`
2. Test thoroughly on all platforms
3. Create production builds
4. Deploy to app stores or internal distribution

## 📖 Resources

### Documentation

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
- [React Native Docs](https://reactnative.dev/)

### Team Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Context API Guide](https://react.dev/reference/react/useContext)
- [Component Architecture Best Practices](https://react.dev/learn/thinking-in-react)

---

## 👥 Team Notes

This project has been designed with **junior developer accessibility** in mind:

- Extensive code documentation with clear explanations
- Modular architecture for easy understanding
- TypeScript for better IDE support and error catching
- Consistent patterns across all components
- Enhanced debugging with descriptive logging

The codebase prioritizes **maintainability** and **readability** over brevity, making it an excellent learning resource while remaining production-ready.
