# swapWallet Landing Page - Setup & Deployment Guide

This guide explains how to run the swapWallet landing page locally, deploy it to Vercel, and push the code to GitHub.

## Prerequisites

1.  **Node.js**: Ensure you have Node.js installed.
2.  **VSCode**: Visual Studio Code is recommended for editing.
3.  **MongoDB Atlas Account**: You need a free MongoDB database.
4.  **Gmail Account**: For sending OTPs (you need an App Password).

## Step 1: Local Setup

1.  **Open the Project**: Open the `dolla` folder in VSCode.
2.  **Install Dependencies**:
    Open the terminal in VSCode (`Ctrl + ~`) and run:
    ```bash
    npm install
    ```
3.  **Environment Variables**:
    Create a file named `.env.local` in the root directory (same level as `package.json`).
    Add the following lines:
    ```env
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/swapwallet?retryWrites=true&w=majority
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-gmail-app-password
    ```
    *Replace the values with your actual MongoDB connection string and Gmail credentials.*

4.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 2: Push to GitHub

1.  **Create a Repository**: Go to [GitHub](https://github.com) and create a new repository named `swap-wallet`.
2.  **Push Code**:
    In your VSCode terminal, run:
    ```bash
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/swap-wallet.git
    git push -u origin main
    ```
    *Replace `YOUR_USERNAME` with your GitHub username.*

## Step 3: Deploy to Vercel

1.  **Go to Vercel**: Log in to [Vercel](https://vercel.com).
2.  **Add New Project**: Click "Add New..." -> "Project".
3.  **Import from GitHub**: Find your `swap-wallet` repository and click "Import".
4.  **Configure Environment Variables**:
    - Expand the "Environment Variables" section.
    - Add the same variables from your `.env.local` file (`MONGODB_URI`, `EMAIL_USER`, `EMAIL_PASS`).
5.  **Deploy**: Click "Deploy".
6.  **Done**: Vercel will build your site and give you a live URL (e.g., `swap-wallet.vercel.app`).

## Step 4: Production Checks

-   **Registration Limit**: The app is set to close registration after 5000 users.
-   **IP Limit**: Users are limited to 2 registrations per IP address.
-   **OTP**: Users must verify their email to register.

## Troubleshooting

-   **Email not sending?**: Make sure you are using an **App Password** for Gmail, not your regular password. Go to Google Account -> Security -> 2-Step Verification -> App Passwords.
-   **Database error?**:
    -   **Check IP Whitelist**: This is the most common error.
        1.  Log in to [MongoDB Atlas](https://cloud.mongodb.com).
        2.  Go to "Network Access" in the left sidebar (under Security).
        3.  Click "Add IP Address".
        4.  Click "Allow Access from Anywhere" (for testing) OR "Add Current IP Address".
        5.  Click "Confirm".
        6.  Wait 1-2 minutes for changes to propagate.
    -   **Check Credentials**: Ensure your username and password in `.env.local` are correct. The password should not contain special characters like `@` or `:` unless encoded.
