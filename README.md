# 💸 Expense Tracker

A simple and elegant expense tracking web application built with **Next.js 14** (App Router), using **localStorage** for data persistence and featuring a flexible budget management system.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

- **📊 Real-time Budget Tracking**: Monitor your monthly expenses at a glance
- **💰 Flexible Daily Budget**: Dynamic daily spending recommendations based on remaining budget
- **📈 Average Daily Spending**: Visual display of your average daily spending for the month
- **🎯 Three Categories**: Food, Entertainment, and Leisure
- **💾 Local Storage**: All data stored locally in your browser (no backend required)
- **📱 Responsive Design**: Beautiful gradient UI that works on all devices
- **⚡ Fast & Lightweight**: Built with modern web technologies

## 🎯 Budget System

- **Monthly Budget**: €280
- **Daily Goal**: ~€10/day (flexible)
- **Smart Calculations**: The app automatically adjusts your daily recommendation based on:
  - Remaining budget
  - Days left in the month
  - Your actual spending patterns

### Example
- If you spend €5 today instead of €10 → You can spend €15 tomorrow
- If you overspend → The daily recommendation adjusts automatically

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
expense-tracker/
├── lib/
│   └── storage.ts          # localStorage functions and calculations
├── src/
│   └── app/
│       ├── add/
│       │   └── page.tsx    # Add expense page
│       ├── page.tsx        # Home page (dashboard)
│       └── layout.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Technologies Used

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)** - Client-side data persistence
- **CSS-in-JS** - Inline styles with gradients

## 📱 Pages

### Home Page (`/`)
- Monthly spending overview
- Remaining budget display
- Daily spending recommendation
- Average daily spending
- Expense history with delete functionality

### Add Expense Page (`/add`)
- Simple form to add new expenses
- Amount input
- Category selection (Food, Entertainment, Leisure)
- Optional note field

## 🎨 Design Features

- **Purple Gradient Background**: Modern and elegant
- **White Cards**: Clean and readable content areas
- **Gradient Buttons**: Eye-catching call-to-actions
- **Color-coded Stats**: Green for positive, red for overspending
- **Shadow Effects**: Depth and visual hierarchy
- **Emoji Icons**: Fun and intuitive category representation

## 🔒 Privacy

All data is stored **locally in your browser** using localStorage. Nothing is sent to any server. Your financial information stays completely private.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

Your Name - [@HafidIdrissi](https://twitter.com/HafidIdrissi)

Project Link: [https://github.com/HafidIdrissi/expense-tracker](https://github.com/HafidIdrissi/expense-tracker)

## 🙏 Acknowledgments

- Built with Next.js 14 App Router
- Inspired by the need for simple, privacy-focused expense tracking
- Icons from emoji standard

---

Made with ❤️ and ☕