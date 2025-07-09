# boltproject
# boltproject
# NoPhone Game 🎯

A gamified social platform built with React Native and Expo Router that encourages real-world activities and connections without phone dependency.

## Features

- **Quest System**: Discover and join location-based challenges
- **Social Groups**: Connect with others through quest-specific chat rooms
- **Achievement System**: Track progress and earn rewards
- **Interactive Map**: Find nearby quests and players using Jawg Maps
- **Results & Leaderboards**: See how you stack up against other players

## Tech Stack

- **Framework**: React Native with Expo SDK 53
- **Navigation**: Expo Router with tab-based navigation
- **Maps**: Jawg Maps integration via WebView
- **Icons**: Lucide React Native
- **Styling**: React Native StyleSheet

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd nophonegame
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open the app:
   - Press `w` to open in web browser
   - Use Expo Go app on your phone to scan the QR code
   - Press `i` for iOS simulator or `a` for Android emulator

## Project Structure

```
app/
├── _layout.tsx                 # Root layout
├── (tabs)/                     # Tab navigation group
│   ├── _layout.tsx            # Tab bar configuration
│   ├── index.tsx              # Home/Quests screen
│   ├── messages/              # Messages section
│   │   ├── index.tsx          # Messages list
│   │   └── chat/[id].tsx      # Individual chat screen
│   ├── results.tsx            # Results & leaderboards
│   └── profile.tsx            # User profile
components/                     # Reusable components
├── ChallengeCard.tsx
├── FeedPost.tsx
├── JawgMapView.tsx
├── MessageItem.tsx
└── ResultCard.tsx
```

## Key Components

### JawgMapView
Interactive map component using Jawg Maps API to display:
- Quest locations
- Active players
- Hotspots
- Real-time navigation

### Chat System
Real-time messaging for quest groups with:
- Group chat functionality
- Media sharing capabilities
- Quest-specific channels

### Achievement System
Gamified progress tracking with:
- XP rewards
- Level progression
- Trophy collection
- Streak tracking

## Environment Setup

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_JAWG_ACCESS_TOKEN=your_jawg_token_here
```

## Building for Production

### Web
```bash
npm run build:web
```

### Mobile
```bash
expo build:android
expo build:ios
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Expo team for the amazing development platform
- Jawg Maps for location services
- Lucide for beautiful icons
- Pexels for stock photography