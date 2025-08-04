# ChomChom - Pet Management App

![ChomChom Logo](https://i.imgur.com/1isMEWh.png)

A comprehensive pet management application built with React frontend and Flask backend, designed to help pet owners track their furry friends' care routines.

## Live Application

**Visit the deployed application:** [https://chomchom.vercel.app/](https://chomchom.vercel.app/)

The application is fully deployed and ready to use!

## Features

### Pet Management

- **Add & Edit Pets**: Create detailed pet profiles with photos and information
- **Pet Photos**: Upload and manage pet images
- **Pet Details**: Store breed, age, weight, and other important information

### Feeding Schedule

- **Meal Tracking**: Record feeding times, food types, and quantities
- **Schedule Management**: Organize feeding routines for multiple pets
- **History View**: Review past feeding entries with detailed logs

### Medication Tracking

- **Medication Schedules**: Set up medication routines with dosages
- **Time Management**: Track when medications need to be administered
- **Dosage Records**: Maintain detailed medication history

### Veterinary Care

- **Appointment Calendar**: Schedule and manage vet appointments
- **Vaccination Records**: Track vaccination history and due dates
- **Vet Information**: Store veterinarian contact details

### User Experience

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Intuitive Interface**: Clean, pet-themed UI with warm colors
- **Real-time Updates**: Instant feedback for all actions
- **Empty State Messages**: Helpful guidance when no data is present

## Tech Stack

### Frontend

- **React 18** with TypeScript
- **React Router** for navigation
- **Axios** for API communication
- **Custom CSS** with responsive design
- **React Calendar** for appointment scheduling

### Backend

- **Flask** (Python) REST API
- **Flask-CORS** for cross-origin requests
- **Supabase** for data storage
- **Render** for backend hosting

### Deployment

- **Vercel** for frontend hosting
- **Render** for backend hosting
- **Supabase** for database management

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Local Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd chomchom
   ```

2. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   npm start
   ```

   The frontend will be available at `http://localhost:3000`

3. **Backend Setup** (Optional for local development)
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python run.py
   ```

### Environment Configuration

The application is configured to work with the deployed backend by default. For local development, you may need to update the API URL in `frontend/src/config/api.ts`.

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

## Deployment

### Frontend (Vercel)

- Automatically deployed from the main branch
- Environment variables configured for production
- Custom domain: [https://chomchom.vercel.app/](https://chomchom.vercel.app/)

### Backend (Render)

- Flask API deployed on Render
- Database hosted on Supabase
- CORS configured for both production and development

## Contributing

This project is actively maintained. Feel free to:

- Report bugs or issues
- Suggest new features
- Submit pull requests

## License

This project is developed by Ishmam Anwar.

---

**Built with love for pet owners everywhere**
