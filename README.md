# **PrimeScope News - Client-Side** 📰🚀

![PrimeScope News Banner](https://github.com/SK-Jabed/PrimeScope-News-Client/blob/8f762c0c8032396a2521db9a1e2f0e2c1a0d6f6f/src/assets/Screenshot%202025-02-07%20153003.png)

## 📌 **Project Overview**  
**PrimeScope News** is a modern, feature-rich, and interactive news platform designed to provide **real-time access to the latest news, trending stories, and premium content**. The client-side of **PrimeScope News** is built with **React, Tailwind CSS, and Firebase**, ensuring an **engaging, responsive, and secure** user experience.  

This platform **empowers users** by offering seamless **news browsing, article filtering, premium subscriptions, and an admin dashboard** for content management.  

---

## 🌍 **Live Demo & Deployment**  

🔗 **Live Site:** [PrimeScope News](https://b10-assignment-12.web.app/)  
🔗 **Client Hosted on:** [Netlify](https://b10-assignment-12.web.app/)  
🔗 **Server Hosted on:** [Vercel](https://b10-assignment-12-server.vercel.app/)  

---

## 🎯 **Project Purpose & Goals**  
The **PrimeScope News** client-side application aims to:  
✅ **Deliver engaging news content** in an intuitive and accessible format.  
✅ **Provide seamless access to premium content** for subscribed users.  
✅ **Empower admins** with tools for content moderation and analytics.  
✅ **Ensure a smooth user experience** with **fast-loading** pages and a **mobile-first** design.  
✅ **Support a modern and scalable news ecosystem** with API-first architecture.  

---

## 🔑 **Admin Credentials**  
📧 **Username:** `ironman@gmail.com`  
🔑 **Password:** `123456Aa@`  

---

## ✨ **Key Features**  

### 📰 **News & Content Features**  
✔ **Trending Articles** – Displays most viewed news dynamically.  
✔ **Premium Subscription** – Access exclusive news content.  
✔ **Advanced Search & Filters** – Find articles by category, date, and popularity.  
✔ **Live News Updates** – Real-time content updates powered by Firebase.  

### 🎨 **User Experience & UI Features**  
✔ **Fully Responsive Design** – Optimized for mobile, tablet, and desktop.  
✔ **Dark Mode Support** – Toggle between light and dark mode for better accessibility.  
✔ **Engaging Animations** – Smooth UI powered by `Framer Motion` and `GSAP`.  
✔ **Pagination & Infinite Scroll** – Efficient content browsing experience.  

### 🔐 **Security & Authentication Features**  
✔ **Secure Authentication** – Firebase authentication (Email, Google login).  
✔ **Role-Based Access Control** – Admin panel with restricted access.  
✔ **JWT Protected Routes** – Secure API interactions with user authentication.  

### 🛠 **Admin Dashboard Features**  
✔ **User Management** – View, ban, or promote users.  
✔ **Article Management** – Add, update, or remove news articles.  
✔ **Data Analytics** – View charts and metrics using `react-google-charts`.  

---

## 🛠 **Technologies Used**  

| **Category**         | **Technologies**  |
|----------------------|------------------|
| **Frontend**        | React, Tailwind CSS, DaisyUI |
| **State Management**| React Context API |
| **Authentication**  | Firebase Authentication |
| **Routing**         | React Router |
| **UI Animations**   | Framer Motion, GSAP |
| **Notifications**   | React Toastify, SweetAlert2 |
| **Data Visualization** | React Google Charts |
| **Backend**         | Node.js, Express.js |
| **Database**        | MongoDB |
| **Hosting**         | Netlify (Client), Vercel (Server) |

---

## 📦 **Dependencies**  

### 🔹 **Main Dependencies**
- `react` – Core UI library.  
- `axios` – Handle API requests.  
- `firebase` – User authentication and real-time data updates.  
- `react-router-dom` – Routing and navigation.  
- `framer-motion` – Smooth animations and transitions.  
- `gsap` – Advanced UI animations.  
- `react-google-charts` – Graphs & analytics for admin panel.  
- `react-hot-toast` – Beautiful toast notifications.  
- `sweetalert2` – Modern pop-up alerts.  
- `swiper` – Interactive news carousels.  

### 🔹 **Dev Dependencies**
- `vite` – Fast development server.  
- `tailwindcss` – Utility-first CSS framework.  
- `eslint` – Code quality and linting.  

---

## 📡 **API Endpoints Reference**  

| Method | Endpoint             | Description                      |
|--------|----------------------|----------------------------------|
| **Auth Routes** |||
| POST   | `/auth/register`     | Register a new user              |
| POST   | `/auth/login`        | Authenticate user & generate token |
| GET    | `/auth/profile`      | Retrieve authenticated user profile |
| **News Routes** |||
| GET    | `/news`              | Fetch all news articles          |
| POST   | `/news`              | Create a new article (Admin)     |
| GET    | `/news/:id`          | Get details of a specific article |
| PUT    | `/news/:id`          | Update an existing news article (Admin) |
| DELETE | `/news/:id`          | Remove a news article (Admin) |
| **Subscription Routes** |||
| POST   | `/subscribe`         | Subscribe to premium content    |
| GET    | `/subscriptions`     | Fetch subscription details      |

---

## 📐 Design Philosophy
- Minimalistic yet modern.
- Mobile-first responsive design.
- Accessibility-focused with user-friendly interactions.

---

## 🔧 **Installation & Setup**  

### **1️⃣ Prerequisites**  
Ensure you have the following installed:  
✔ **Node.js** (LTS version) - [Download Here](https://nodejs.org/)  
✔ **Git** - [Download Here](https://git-scm.com/)  

---

### **2️⃣ Clone the Repository**  
```bash
git clone https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-SK-Jabed.git
cd b10a12-client-side-SK-Jabed
```

---

### **3️⃣ Install Dependencies**  
```bash
npm install
```

---

### **4️⃣ Configure Firebase & Environment Variables**  
Create a `.env` file in the root directory and add:  

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

### **5️⃣ Start the Development Server**  
```bash
npm run dev
```
The application should now be running at `http://localhost:5173/`.  

---

## 🚀 **Future Enhancements**  
🔹 **AI-Powered Content Recommendations** – Personalized news feeds.  
🔹 **Live News Updates** – Integrate live API sources for breaking news.  
🔹 **Blockchain for Secure Transactions** – Transparent premium subscriptions.  
🔹 **User Notifications** – Alerts for new content & breaking news.  
🔹 **Multi-Language Support** – Expanding accessibility.  

---

## 🤝 **Contributing**  
🔹 **Fork the repository.**  
🔹 **Create a new branch:** `git checkout -b feature-branch`  
🔹 **Commit your changes:** `git commit -m "Added a new feature"`  
🔹 **Push to your forked repo:** `git push origin feature-branch`  
🔹 **Submit a pull request for review.**  

---

## 📜 **License**  
This project is licensed under the **MIT License**.  

---

## 🎯 **Final Thoughts**  
**PrimeScope News** is built to **redefine digital news consumption** with a **modern, engaging, and feature-rich platform**. 🚀  

💡 **If you like this project, don't forget to ⭐ star the repository!**  
