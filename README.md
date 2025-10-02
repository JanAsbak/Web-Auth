# Web-Auth
This is a simple web application that allows users to **register** and **login**. The project consists of a frontend and a backend using **Node.js**, **Express**, **MySQL**, and **bcrypt**.

---

## Requirements

- Node.js and npm installed
- MySQL installed

---

## Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd project-folder
```
2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Create the database**

- Open MySQL and run:
```sql
CREATE DATABASE AuthenticationDB;
USE AuthenticationDB;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```
4. **Start the server**
```bash
node server.js
```
- The server will run on http://localhost:3000.

**Usage**

- Open the frontend:

- Open frontend/index.html in your web browser.

- Register or Login:

- Fill in a username and password.

- Feedback through alerts

- Click Register to create a new account.

- Click Login to log in with an existing account.

