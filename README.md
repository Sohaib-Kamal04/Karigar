# 🛠️ Karigar - Freelance Home Services Platform

**Karigar** is a web-based platform designed to connect users with skilled freelance service providers (Karigars) for a variety of home services. From booking plumbers and electricians to browsing construction and repair materials, Karigar simplifies the process — all in one intuitive interface.

---

## 🌐 Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript  
- **Backend:** PHP  
- **Server Environment:** XAMPP (Apache & MySQL)

---

## 🚀 Key Features

- 🔐 **User Authentication**
  - Sign up and login with PHP backend validation.
  - Secure user redirection to personalized dashboard after login.

- 📋 **Dashboard**
  - Manage bookings, view materials, and update user profile information.

- 🧱 **Material Listings**
  - Browse a catalog of construction and home repair materials.

- 👷 **Freelancer Profiles**
  - View service providers with ratings and essential details.

- 📅 **Booking System**
  - Book freelance services directly through an integrated form.
  
---

## 🧭 User Flow

### 🏠 Landing Page (`index.html`)
- Navigate through **Services**, **Materials**, and **About**.
- Login and Sign Up via modal popup.

### 🔐 Login/Signup
- Backend validation using PHP.
- Successful login redirects to user dashboard.

### 👤 User Dashboard
- View/update profile details.
- Access service and material booking history.

### 🛒 Booking & Materials
- Book freelance home services.
- Browse building and repair materials easily.

---

## 📁 Project Structure

Karigar/
│
├── index.html               # Homepage
├── about.html               # About Karigar
├── services.html            # Available services
├── material.html            # Material listings
├── booking.php              # Booking form logic
│
├── dashboards/              # User-specific dashboards
│   ├── user-dashboard.php
│   ├── profile.php
│   ├── update-profile.php
│   ├── services-dashboard.php
│   └── material-dashboard.php
│
├── images/                  # Static images
└── style/                   # CSS styles



---

## 🛠️ How to Run Locally

1. **Clone or Download the Repository**
   ```bash
   git clone https://github.com/your-username/Karigar.git

2. Setup XAMPP

3. Install and launch XAMPP.

4. Place the project folder into the htdocs directory.

5. Example path: C:\xampp\htdocs\Karigar

6. Start Services

7. Open XAMPP Control Panel and start Apache and MySQL.

8. Access the Application

9. Open your browser and go to:
  http://localhost/Karigar/index.html

## ⚠️ Important Notes
- Ensure your PHP files are correctly configured with the right database credentials.

## 👨‍💻 Authors
Developed with 💻 and dedication by:

- Fatima Saeed

- Sohaib Kamal

- Abdul Waseh

## 📢 Contributions
Want to improve Karigar? Fork it, make your changes, and open a pull request!
We welcome community feedback and suggestions.

## 📄 License
This project is currently not licensed. For collaboration or distribution inquiries, please contact the authors directly.
