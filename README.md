# React Native Project

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

---

## ✅ Assignment Overview

### 🎯 Requirements (Initial Task)

1. **Main Screen Layout**

   - Display a vertical list of **8–9 cards** with dummy data (title and short description).
   - Display a horizontal list of **7–8 demo cards** (e.g., trending or recent items).
   - On tapping any vertical card, a **BottomSheet** opens with a detailed description of that card.

2. **BottomSheet Behavior**
   - Height should **match the height of its content** dynamically.
   - If content is **less than screen height**, open only up to the content height.
   - If content is **more than screen height**, open to a default height (e.g., **70–80%**), and:
     - Be **draggable** to expand or collapse.

---

### ✅ Additional Features Accomplished

- [x] **Vertical** list of cards (dummy data)
- [x] **Horizontal** list of trending/demo cards
- [x] **BottomSheet** with dynamic height based on content
- [x] BottomSheet **drag support** to resize
- [x] Custom **icons** added
- [x] **Animated BootSplash** implemented
- [x] **Shimmer effect** for loading placeholders

### 🧩 Demo – Dynamic Bottom Sheet in Action

![Dynamic Bottom Sheet](dynamicSheet.gif)

---

## 🚀 Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till the **"Creating a new application"** step before proceeding.

### Step 1: Start the Metro Server

From the root of your React Native project, run:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```
