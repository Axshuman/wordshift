# WordShift

WordShift is a fun and challenging word transformation game built with React Native and Expo. The goal is to transform a start word into a target word by changing one letter at a time, forming valid English words along the way.

---

## Features

- Input a start word and a target word of the same length.
- Enter intermediate words that differ by exactly one letter from the previous word.
- Validation of inputs to ensure valid words and single-letter changes.
- Track and display the chain of words entered.
- When the target word is reached, the game shows a congratulatory message and the number of steps taken.
- Option to start a new game after finishing.

---

## Demo

![Screenshot of WordShift game screen](path_to_your_screenshot_here.png)  
*(Replace with your actual screenshot URL or relative path)*

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) installed globally (`npm install -g expo-cli`)
- A physical iOS or Android device with [Expo Go](https://expo.dev/client) app installed, or use an emulator/simulator on your computer

---

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Axshuman/wordshift.git
2. Navigate to the project directory:
   ```bash
   cd wordshift
3. Install dependencies:
   ```bash
   npm install
 If you encounter dependency conflicts, try:
   ```bash
   npm install --legacy-peer-deps 

### Running the App
To start the Expo development server, run:
```bash
npx expo start
This will open a browser window with Expo Dev Tools and display a QR code.

### Running on iOS or Android
On a physical device:

Install the Expo Go app from the App Store (iOS) or Google Play (Android).
Scan the QR code from the Expo Dev Tools page or terminal.
The app will open in Expo Go on your device.
On an emulator or simulator:

For iOS Simulator (macOS only):
Press i in the Expo Dev Tools terminal.
For Android Emulator:
Ensure Android Studio is installed and an emulator is running.
Press a in the Expo Dev Tools terminal.
How to Play

Enter the start word and the target word of the same length on the home screen.
Start entering valid English words that differ by exactly one letter from the last word in the chain.
Continue until you reach the target word.
Once you reach the target word, a success screen will show your steps and let you play again.
Tech Stack

React Native (via Expo)
TypeScript
React Navigation
Author

Anshuman Sengar
GitHub Profile : https://github.com/Axshuman