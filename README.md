# School Calendar Demo

A modern, interactive school timetable and homework management application built with React Native and Expo. This app works seamlessly across iOS, Android, and web platforms.

## ✨ Features

### 📅 Interactive Timetable
- **Weekly View**: Navigate through weeks with intuitive controls
- **Color-Coded Subjects**: Each subject has a unique color for easy identification
- **Current Day Highlighting**: Today's classes are clearly marked
- **Touch to Add Events**: Tap any class to quickly add homework or quiz reminders

### 📚 Homework Management
- **Event Tracking**: Add homework assignments and quizzes to specific classes
- **Smart Organization**: Events are automatically sorted by date and class time
- **Quick Actions**: Edit or delete events with simple gestures
- **Today Indicators**: See what's due today at a glance

### 🎨 Modern Design
- **Responsive Layout**: Optimized for mobile and desktop viewing
- **Smooth Scrolling**: Synchronized horizontal scrolling for seamless navigation
- **Clean Interface**: Minimalist design focused on usability
- **Cross-Platform**: Consistent experience across all devices

## 🚀 Live Demo

Visit the live web version: [School Calendar Demo](https://hilichiu.github.io/School-Calendar-Demo)

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **State Management**: Zustand
- **Date Handling**: date-fns
- **Navigation**: Expo Router with tabs
- **UI Components**: React Native with custom styling
- **Icons**: Lucide React Native
- **Deployment**: GitHub Pages (web), Expo (mobile)

## 📱 Platform Support

- ✅ **Web** - Responsive web application
- ✅ **iOS** - Native iOS app via Expo
- ✅ **Android** - Native Android app via Expo

## 🏃‍♂️ Running Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (for mobile development)

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/Hilichiu/School-Calendar-Demo
cd School-Calendar-Demo
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm run dev
```

4. **Access the application**:
   - **Web**: Open your browser and go to the URL shown in the terminal
   - **Mobile**: Use the Expo Go app to scan the QR code
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal

## 📦 Building for Production

### Web Build
```bash
npm run build:web
```

### Mobile Build
Use Expo's build service:
```bash
# Install Expo CLI globally if not already installed
npm install -g @expo/cli

# Build for iOS
expo build:ios

# Build for Android
expo build:android
```

## 🏫 Default Timetable

The app comes with a pre-configured weekly schedule:

| Time Slot | Monday | Tuesday | Wednesday | Thursday | Friday |
|-----------|--------|---------|-----------|----------|--------|
| 08:05-08:55 | Chinese | Science & Creative Thinking | Math | Chemistry | PE |
| 09:05-09:55 | Chinese | Science & Creative Thinking | Math | Biology | PE |
| 10:15-11:05 | Scientific Reading | English | Living Technology | Alternative Learning | Math |
| 11:15-12:05 | Scientific Reading | English | Living Technology | Alternative Learning | Math |
| 13:10-14:00 | English | Chemistry | English | History | Chinese |
| 14:10-15:00 | Club | Society | Society | Taiwanese | Elective Subjects |
| 15:10-16:00 | Club | Biology | Chinese | Chinese | Elective Subjects |
| 16:10-17:00 | - | Biology | - | - | - |

## 🎯 Usage

1. **View Timetable**: The main screen shows your weekly schedule
2. **Navigate Weeks**: Use the arrow buttons or "Today" button to navigate
3. **Add Events**: Tap any class cell to add homework or quiz reminders
4. **Manage Homework**: Switch to the "Homework" tab to view, edit, or delete events
5. **Edit Events**: Long press on homework items to edit them inline

## 🔧 Customization

The timetable structure can be easily modified in `store/timetableStore.ts`:

- **TIMETABLE**: Modify the weekly schedule
- **COLORS**: Customize subject colors
- **CLASS_TIMES**: Adjust class time slots

## 🚀 Deployment

This project automatically deploys to GitHub Pages when changes are pushed to the main branch. The GitHub Actions workflow handles building and deploying the web version.

### Manual Deployment Steps

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Set Source to "GitHub Actions"

2. **Push to main branch** - the workflow will automatically trigger

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ using React Native and Expo
