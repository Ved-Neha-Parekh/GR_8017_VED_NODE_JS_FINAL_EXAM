# 📝 Task Management App

A minimalist, multi-user **Task Management Application** built using **Node.js, Express, MongoDB, and EJS**.  
This project focuses on secure authentication, role-based access control, and efficient database modeling — designed to go beyond simple CRUD and implement real-world backend logic.

---

## 🚀 Live Demo

🔗 **View the Live Application**  
_(https://gr-8017-ved-node-js-final-exam.onrender.com/user/login)_

---

## 📚 Project Overview

This project was created as part of a **Full Stack Web Development curriculum** to gain hands-on experience in building scalable backend systems.

It implements:

- ✔ JWT Authentication via Cookies
- ✔ Role-Based Access Control (Admin & User)
- ✔ Multi-user Task Isolation
- ✔ Mongoose Relationships & Population
- ✔ EJS-Powered Dynamic Frontend

---

## ⭐ Key Features

### 🔐 Secure Authentication

- User Registration & Login
- Password hashing using **bcrypt**
- Session handling using **JWT**

### 🍪 Cookie-Based Sessions

- Managed using `cookie-parser`
- More secure than LocalStorage

### 🛡 Role-Based Access Control (RBAC)

#### 👤 Standard Users

- View & manage **only their own tasks**

#### 🛠 Admins

- Full access to **all user tasks**

## 🔑 Admin Login Credentials

> These credentials are provided for testing & demo purposes.

```
Email: admin@mail.com
Password: 123
```

### 👥 Multi-User Data Isolation

- Each user sees only their own tasks
- Prevents unauthorized access

### 🎨 Dynamic EJS Views

- Reusable layouts & partials
- Role-aware navigation bar
- Minimalist UI styling

### 🔗 MongoDB Relationships

- Tasks linked to Users & Categories
- Implemented using `mongoose.populate()`

---

## 🛠 Tech Stack

| Category       | Technology    |
| -------------- | ------------- |
| Runtime        | Node.js       |
| Framework      | Express.js    |
| Database       | MongoDB       |
| ODM            | Mongoose      |
| View Engine    | EJS           |
| Authentication | JWT + Bcrypt  |
| Cookies        | Cookie-Parser |
| Styling        | CSS           |

---

## 🧠 Key Learnings

### 📅 Date Handling in Forms

Formatting MongoDB date for HTML inputs:

```js
const formattedDate = task.dueDate.toISOString().split("T")[0];
```

### 🔐 Middleware Chaining

Used layered middleware to protect routes:

1. Verify Token
2. Attach User
3. Check Role

### 🍪 Cookie-Based State Management

- JWT stored securely in cookies
- Token parsed server-side on every request

### 🔗 Mongoose Populate

Replaces IDs with referenced user data:

```js
Task.find().populate("user");
```

---

## 💻 How to Run Locally

### 1️⃣ Clone the Repository

```bash
git clone <https://github.com/Ved-Neha-Parekh/GR_8017_VED_NODE_JS_FINAL_EXAM.git>
cd GR_8017_VED_NODE_JS_FINAL_EXAM
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Start the Server

```bash
npm start
```

### 5️⃣ Open in Browser

```
http://localhost:3000/user
```

---

## 👤 Author

Developed by **[Ved]**  
As part of the **Full Stack Web Development Curriculum**

---

## 🧾 Assigned By

This project was **assigned by the Full Stack Web Development Faculty [Dhaval Leelawala](https://github.com/dhavalrw6)** as part of the backend development learning module.

---

## 🛡 License

This project is for educational purposes.
