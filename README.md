# **Ankahe Lafz – AI-Powered Poetry Generator (Backend)**

This is the **backend** of **Ankahe Lafz**, an AI-powered poetry and shayari generator that crafts beautiful verses in **Hindi, English, and Hinglish**. The backend is built using **Node.js, Express.js, and MongoDB**, providing secure user authentication and content management.

🌐 **Frontend Repository:** [ankahe-lafz-ai](https://github.com/DheerajRay-01/ankahe-lafz-ai)
🌐 **Deployed Backend:** [ankahe-lafz-backend](https://ankahe-lafz-backend.onrender.com)

## 📌 **Features**

- 🔐 **User Authentication** – Secure login and authorization system.
- 📂 **User Data Storage** – Saves generated poetry for users.
- 🛠 **RESTful API** – Provides structured API endpoints for seamless frontend integration.
- 🚀 **Optimized Performance** – Built with Express.js and MongoDB for fast and efficient processing.

## 🛠 **Tech Stack**

- **Backend Framework:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Hosting:** Render
- **Version Control:** Git & GitHub

## 🚀 **Getting Started**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/DheerajRay-01/ankahe-lafz-backend.git
cd ankahe-lafz-backend
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a `.env` file in the root directory and add the following:

```env
PORT=your_port
CORS_ORIGIN=your_frontend_url
DB_URL=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
```

### **4️⃣ Run the Server**

```sh
npm start
```

The backend will be running on http://localhost:your_port/api/v1

📌 **API Endpoints**

### **User Authentication**

| Method | Endpoint | Description | Request Body |
| ------ | ----------------------- | -------------------------- | ---------------- |
| POST   | `/api/v1/user/register` | Register a new user | `{ "fullname": "string", "username": "string", "email": "string", "password": "string" }` |
| POST   | `/api/v1/user/login` | Authenticate user | `{ "email": "string", "password": "string" }` |
| GET    | `/api/v1/user/user-now` | Get current logged-in user | `N/A` |
| POST   | `/api/v1/user/logout` | Logout user | `N/A` |

### **Content Management**

| Method | Endpoint | Description | Request Body |
| ------ | ------------------------- | ---------------------------- | ---------------- |
| POST   | `/api/v1/content/upload` | Upload user-generated poetry | `{ "content": "string", "language": "string" }` |
| GET    | `/api/v1/content/get-all` | Get all poetry posts | `N/A` |

💡 *Ankahe Lafz – Let your emotions flow in words.* 📝✨

