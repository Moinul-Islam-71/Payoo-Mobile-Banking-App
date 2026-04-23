📌 Project Overview
Payoo is a front-end mobile banking web application built with vanilla HTML, Tailwind CSS, and JavaScript. It simulates core banking features like adding money, cashout, money transfer, bill payment, and bonus coupons — all running entirely in the browser with localStorage for persistent transaction history.

⚠️ This is a demo/learning project. No real transactions are processed.


✨ Features
FeatureDescription🏦 Add MoneyDeposit money from a bank account into your Payoo wallet💸 CashoutWithdraw money via agent number🔁 Transfer MoneySend money to another Payoo user🎁 Get BonusRedeem coupon codes for bonus balance🧾 Pay BillPay utility bills (WASA, DPDC, BPDB, DESCO, etc.)📋 Transaction HistoryView all past transactions with date & time (saved in localStorage)🔔 Toast NotificationsReal-time success & error feedback

🛠️ Tech Stack

HTML5 — Structure & layout
Tailwind CSS — Utility-first styling with DaisyUI components
Vanilla JavaScript — All logic, DOM manipulation, and local storage
localStorage — Persistent transaction history across sessions


📸 Screenshots

🚧 Screenshots will be added soon.

<!-- Add your screenshots here -->
<!-- ![Home Page](./assets/screenshots/home.png) -->
<!-- ![Transaction History](./assets/screenshots/transactions.png) -->

🗂️ Project Structure
Payoo-Mobile-Banking-App/
│
├── assets/
│   ├── logo/
│   │   └── logo_payoo_bird_logo.png
│   └── cards/
│       ├── add_money.svg
│       ├── send.svg
│       ├── transfer_money.svg
│       ├── financial.svg
│       ├── paybill.svg
│       ├── transactions.svg
│       └── wallet_icon.svg
│
├── dist/
│   └── output.css              # Tailwind compiled CSS
│
├── script/
│   └── home.js                 # Main app logic
│
├── home.html                   # Main dashboard
├── index.html                  # Login page
└── README.md

🚀 How to Run

Clone the repository

bashgit clone https://github.com/your-username/Payoo-Mobile-Banking-App.git
cd Payoo-Mobile-Banking-App

Install Tailwind CSS (if not already compiled)

bashnpm install
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch

Open in browser

Just open index.html in any browser — no server needed!

Login credentials (demo)

Mobile : 01879895127
PIN    : 1234

🔮 Future Plans

 Multi-user support with real authentication
 Backend integration (Node.js / Firebase)
 Mobile responsive improvements
 Dark mode
 Transaction filters & search
 Export transaction history as PDF

