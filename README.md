# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
For an **Expo production build**, the commands depend on whether you are using the **managed workflow** with **Expo Go / EAS Build**. Here’s the clean breakdown:

---

## **1. Using EAS Build (recommended for production)**

### **Install EAS CLI (if not installed)**

```bash
npm install -g eas-cli
```

### **Login to Expo**

```bash
eas login
```

### **Configure EAS (if not done)**

```bash
eas build:configure
```

This will create an `eas.json` file for build profiles.

---

### **2. Build for Android**

```bash
eas build --platform android --profile production
```

* `--platform android` → Android APK / AAB
* `--profile production` → uses the production configuration from `eas.json`
* By default, it will produce an **AAB** for Play Store. If you want APK:

```bash
eas build --platform android --profile production --type apk
```

---

### **3. Build for iOS**

```bash
eas build --platform ios --profile production
```

* Requires **Apple Developer account**
* Produces an **.ipa** ready for App Store submission

---

### **4. Optional: Local Build (classic `expo build`)**

> This is **deprecated**, but still works for some managed projects:

```bash
expo build:android
expo build:ios
```

* You’ll be prompted for type (`apk` or `aab` for Android, `simulator` or `archive` for iOS).
* **EAS Build** is faster, more flexible, and required for production apps with custom dev clients.

---

### **5. Tips for Production**

* Make sure your `app.json` or `app.config.js` has correct:

  * `version`
  * `orientation`
  * `icon`
  * `bundleIdentifier` (iOS)
  * `package` (Android)
* Run `expo optimize` to compress images before building.
* Test locally with:

```bash
eas build --platform android --profile development
```

or

```bash
expo start --no-dev --minify
```

---

If you want, I can give you a **ready-to-use EAS production build command with options for both Android and iOS** tailored for your `wisp` app so you can literally run one command and generate builds.
