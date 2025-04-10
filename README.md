# 🍸 Pourfect

**Pourfect** is a beautifully crafted, cross-platform mobile app built with **Expo React Native** for discovering, exploring, and learning about cocktails. Whether you're a mixology enthusiast or a casual sipper, Pourfect helps you dive into a curated world of drinks — with offline support, fun interactions, and a personalized experience.

## 📸 Screenshots

<div align="center">

<table>
  <tr>
    <td align="center">
      <img src="./assets/images/screenshots/1.png" alt="Home Screen" width="200"/>
    </td>
    <td align="center">
      <img src="./assets/images/screenshots/2.png" alt="Cocktail Detail" width="200"/>
    </td>
    <td align="center">
      <img src="./assets/images/screenshots/3.png" alt="Alcohol List" width="200"/>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="./assets/images/screenshots/4.png" alt="Favorites Screen" width="200"/>
    </td>
    <td align="center">
      <img src="./assets/images/screenshots/5.png" alt="Tip of the Day" width="200"/>
    </td>
  </tr>
</table>

</div>


---

## 🚀 Features

- 🧭 **Explore Cocktails** – Browse from a collection of handcrafted cocktails with ingredients, glass types, and instructions.
- 💾 **Offline Mode** – Cache cocktail and alcohol data locally using **MMKV** for seamless access even without internet.
- 🌟 **Favorites** – Save your go-to cocktails using persistent local storage powered by **Zustand + MMKV**.
- 📳 **Shake to Discover** – Shake your phone to discover a random cocktail using **expo-sensors**.
- 💡 **Daily Tip Toast** – Receive a fun tip or fact every day when you open the app.
- 🧪 **Personalized Themes** – Coming soon via **nativewind** for customizable looks and feel.

---

## 🛠️ Built With

- **React Native + Expo Router**
- **Zustand** for state management
- **react-native-mmkv** for ultra-fast local storage
- **Supabase** – PostgreSQL + Realtime backend with SQL RPCs
- **expo-sensors** for motion detection
- **TypeScript** throughout
- **Tailwind/NW (nativewind)** for styling (in progress)

---

## 🧱 Database Schema

Built on a **normalized schema** using PostgreSQL in Supabase, including:

- `cocktails` 🍹
- `alcohols` 🥃
- `ingredients` 🌿
- `cocktail_ingredients`
- `cocktail_alcohols`

Includes custom **RPC functions** like `get_random_cocktail()` for optimized backend querying.

---

## 📦 Installation

```bash
git clone https://github.com/dixitpriyanshu/pourfect.git
cd pourfect
bun install
npx expo start
```

There is a pourfect_mock.sql for tables creation and entering the mock data, make sure you replace the images link to your images.

You can store images in Supabase storage bucket or your prefered storage option.

Make sure to:

1. Add your Supabase project keys in .env

2. Run Supabase migrations (or use the SQL insert seed provided)

3. Enable device permissions if testing on physical phone


📲 APK Download
You can try the app instantly by downloading the latest APK below:

🔗 Download Pourfect.apk

(Built using EAS Build + Expo Dev Client)

🧑‍💻 Contributing
This is a personal/portfolio project, but open to suggestions and ideas. Feel free to fork or submit issues!






🧠 Lessons Learned

- Implemented complex state handling and offline-first UX with Zustand + MMKV

- Leveraged custom RPCs and relational queries in Supabase for performant backend

- Developed fun interactive features (like shake-to-discover) to improve user engagement

- Learned to handle network resilience, caching, and async data fetching gracefully

📮 Contact
Feel free to reach out if you're interested in the project or want to collaborate!

- Developer: Priyanshu Dixit

- Email: <pransdixit29@gmail.com>

- LinkedIn: <https://www.linkedin.com/in/priyanshudixit/>

-----------

Made with ☕, 💻, and a splash of 🍸
