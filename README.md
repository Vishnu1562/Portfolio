# Vishnu V - Enterprise Full Stack Developer Portfolio

Modern, high-performance developer portfolio built with **Angular 22** and **Tailwind CSS**, designed in the **Sleek Enterprise Dark / Linear** aesthetic.

![Tech Stack](https://img.shields.io/badge/Angular-22-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-729B1B?style=for-the-badge&logo=vitest&logoColor=white)

---

## 🚀 Key Features

* **Sleek Enterprise Dark Theme**: Deep slate palette (`#030712`), radiant neon glow accents (cyan & indigo), and backdrop-blurred glassmorphic cards.
* **Hero Section**: Live availability pulse badge, EY GDS credentials, enterprise headline, and primary call-to-actions.
* **Enterprise Career Timeline**: Highlights enterprise-scale software engineering at EY GDS, key deliverables, and tech stack tags.
* **Interactive Skills Matrix**: Real-time filtering across **Frontend** (Angular, TypeScript, NgRx, SCSS), **Backend** (ASP.NET Core, NestJS, Node.js), **Mobile** (Flutter, Dart), and **Cloud & Tools** (PostgreSQL, Azure DevOps, Git, Postman).
* **Featured Implementations**: Direct deep-links to public GitHub repositories:
  * `StudentAdminPortal.API` (ASP.NET Core, Clean Architecture, EF Core)
  * `Flutter World Time App` (Cross-platform Dart & asynchronous APIs)
  * `NestJS Enterprise API Architecture` (TypeScript IoC & Microservices)
* **Resume Download Modal**: Interactive modal providing instant access to download the summary profile document and connection request links.
* **Reactive Contact Form**: Built with Angular Reactive Forms, validating full name, email format, subject, and message length with direct UI feedback.

---

## 🛠️ Development & Commands

### Prerequisites
* **Node.js**: v20+ (v24.21.0 recommended)
* **npm**: v10+

### Install Dependencies
```bash
npm install --legacy-peer-deps
```

### Run Locally (Dev Server)
```bash
npm start
# Navigate to http://localhost:4200/
```

### Run Automated Tests (Vitest)
```bash
npm test -- --watch=false
```

### Build for Production
```bash
npm run build
# Artifacts generated in dist/portfolio
```

---

## 📜 Behavioral Contract
Detailed test scenarios, user journey contracts, and validation rules are documented in [`automation-tests.md`](./automation-tests.md).
