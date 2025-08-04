<div align="center">
  <img src="https://i.imgur.com/1isMEWh.png" alt="ChomChom Logo">
</div>

<h3 align="center">
  A simple pet management application for tracking feeding, medications, and veterinary care
</h3>

<h4 align="center">
Technologies used:
</h4>

<p align="center">
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React">
    <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" alt="Python">
    <img src="https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white" alt="Flask">
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="NodeJS">
    <img src="https://img.shields.io/badge/supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
</p>

<h6 align="center">
  Like what you see? Give me a ⭐ to support my work!  
</h6>

## 📋 Table of Contents

1.  ⚙️ [Tech Stack](#tech-stack)
2.  ✨ [Features](#features)
3.  🚀 [Live Application](#live-application)
4.  🛠️ [Deploy Locally](#deploy)

## <a name="tech-stack">⚙️ Tech Stack </a>

👉 **React**: Modern frontend framework with TypeScript for type safety and better development experience

👉 **TypeScript**: Enhanced JavaScript with static typing for better code quality and developer experience

👉 **Flask**: Lightweight Python web framework for building the REST API backend

👉 **Supabase**: Modern database solution for scalable data storage and management

👉 **Node.js**: JavaScript runtime for package management and development tools

## <a name="features">✨ Features</a>

1️⃣ **Pet Management**: Create detailed pet profiles with photos, breed information, and birth dates

2️⃣ **Feeding Schedule**: Track feeding times, food types, and quantities with detailed history

3️⃣ **Medication Tracking**: Manage medication schedules with dosages and administration times

4️⃣ **Veterinary Care**: Schedule appointments and track vaccination records

5️⃣ **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices

6️⃣ **Real-time Updates**: Instant feedback for all actions with smooth user interactions

7️⃣ **Image Upload**: Upload and manage pet photos with size restrictions and preview

8️⃣ **Intuitive Interface**: Clean, pet-themed UI with warm colors and rounded design

9️⃣ **Empty State Guidance**: Helpful messages and guidance when no data is present

1️⃣0️⃣ **Modern Architecture**: Clean code structure with reusable components and scalable design

## <a name="live-application">🚀 Live Application</a>

**Visit the deployed application:** [https://chomchom.vercel.app/](https://chomchom.vercel.app/)

The application is fully deployed and ready to use!

## <a name="deploy">🛠️ Deploy locally</a>

Prerequisites:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Python](https://www.python.org/) (for backend development)

```
# Clone the repository
git clone <repository-url>
cd chomchom

# Frontend Setup
cd frontend
npm install
npm start

# Backend Setup (Optional for local development)
cd ../backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

## Project Structure

```
chomchom/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets and HTML template
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── features/        # Feature-specific hooks and types
│   │   ├── config/          # Configuration files
│   │   └── styles/          # CSS stylesheets
│   └── package.json
├── backend/                  # Flask backend API
│   ├── app/
│   │   ├── routes/          # API route handlers
│   │   ├── models/          # Data models
│   │   └── services/        # Business logic
│   └── requirements.txt
└── README.md
```

## API Endpoints

The backend provides RESTful APIs for:

- **Pets**: CRUD operations for pet management
- **Feeding**: Track feeding schedules and history
- **Medications**: Manage medication schedules
- **Vet**: Handle appointments and vaccinations
- **Upload**: File upload functionality

## Design Philosophy

ChomChom features a warm, pet-friendly design with:

- **Rounded corners** and soft edges
- **Warm color palette** (yellows, pinks, blues)
- **Responsive layout** that works on all devices
- **Intuitive navigation** with clear visual hierarchy
- **Helpful empty states** to guide new users

## Contributing

This project is actively maintained. Feel free to:

- Report bugs or issues
- Suggest new features
- Submit pull requests

## License

This project is developed by Ishmam Anwar.

---
