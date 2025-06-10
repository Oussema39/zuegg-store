# Store & Zuegg Price Explorer

A small interactive dashboard built with **React**, **Ant Design**, **Leaflet**, and **ECharts**, allowing users to explore stores and Zuegg product pricing.

---

## 🗂️ Project Overview

This project visualizes store locations and product pricing data from two CSV files, with a focus on clean UX and responsive design.

### Features

✅ **Dashboard shell**: Ant Design layout with simple navigation  
✅ **Interactive map**: Leaflet map plotting store markers  
✅ **Tooltips**: Show address, city, province, insegna, and gruppo details  
✅ **Bar charts**: ECharts-based store counts by insegna and gruppo  
✅ **Optional**: Product search and price layer for advanced exploration

---

## 📊 Tech Stack

| Purpose           | Library                                                                          |
| ----------------- | -------------------------------------------------------------------------------- |
| **App Framework** | [React](https://reactjs.org)                                                     |
| **UI / Design**   | [Ant Design](https://ant.design)                                                 |
| **Map**           | [React-Leaflet](https://react-leaflet.js.org) / [Leaflet](https://leafletjs.com) |
| **Charts**        | [ECharts for React](https://github.com/hustcc/echarts-for-react)                 |
| **Data**          | CSV files: `stores_visible.csv` & `products.csv`                                 |

---

## 📝 Tasks

### ✅ Core tasks

- **A. Dashboard shell**  
  Ant Design’s Layout components to create a clean and responsive page layout.

- **B. Map with store markers**

  - Plot stores from `stores_visible.csv`.
  - Tooltips display store details (street, city, province, insegna, gruppo).
  - (Optional) Click on marker to open an Ant Design Modal for full store details.

- **C. Store-count charts**
  - Two ECharts bar charts:  
    1️⃣ Stores per `insegna`  
    2️⃣ Stores per `gruppo`

### ⭐ Optional (bonus) task

- **D. Product search & price layer**
  - Ant Design AutoComplete for searching product names.
  - Filter map to show only stores that sell the product.
  - Compute min/max base price.
  - Colour markers from green → red gradient based on price.
  - Tooltip displays `base_price` and, if present, `promo_price`.

---

## 🚀 Live Demo

## 👉 [Check it out live here](https://zuegg-store.vercel.app)

## 🛠️ Setup & Run Locally

1️⃣ Clone the repository:

```bash
git clone https://github.com/Oussema39/zuegg-store.git
```

2️⃣ Install dependencies:

```bash
npm install
```

3️⃣ Start the development server:

```bash
npm run dev
```

The app will be running on [http://localhost:3000](http://localhost:3000).

---

## ⚙️ Project Structure

```
src/
├── assets/            # Static assets (e.g., logos, icons)
├── components/        # Reusable UI components
├── context/           # Context providers for state management
├── hooks/             # Custom React hooks
├── pages/             # Main pages (Dashboard, Login)
├── services/          # API and data fetching logic
├── types/             # TypeScript type definitions
├── utils/             # Utility functions (e.g., currency formatting)
└── App.tsx            # Main app entry point
```

---

## 🌈 Key Features & Best Practices

- **State management**: React Context for global state.
- **Responsiveness**: Tailwind CSS and Ant Design’s grid system.
- **Accessibility**: Clear tooltips and colour-blind-friendly gradient (for task D).
- **Performance**: Heavy calculations are memoized.

---

## 👥 Author

**[Oussema Heni](https://github.com/Oussema39)**
Feel free to reach out or submit issues/PRs!

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

**Happy exploring! 🌍🛒**

```

```
