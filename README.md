# Consumer Shopping Behavior Analytics Dashboard

A production-ready full-stack analytics dashboard for analyzing customer shopping trends with beautiful visualizations, interactive filters, and real-time insights.

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Recharts** - Chart library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL** - Relational database
- **Pandas** - Data manipulation
- **Uvicorn** - ASGI server

### Deployment
- **Frontend** - Vercel
- **Backend** - Render
- **Database** - Neon PostgreSQL

## 📋 Features

- **Responsive Dashboard** - Beautiful dark-themed UI with glassmorphism design
- **KPI Cards** - Real-time key performance indicators
- **Interactive Filters** - Filter by gender, age, category, subscription, shipping, and discount
- **Revenue Analytics** - Bar charts, line charts, and donut charts
- **Heatmaps** - Age vs Category, Gender vs Category, Discount vs Behavior
- **Business Insights** - AI-powered insights and recommendations
- **Auto Refresh** - Toggle automatic data refresh
- **CSV Export** - Export filtered data to CSV
- **Mobile Responsive** - Fully responsive design for all devices
- **Error Handling** - Comprehensive error boundaries and fallback UI

## 📁 Project Structure

```
data-analysis/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── charts/          # Chart components
│   │   │   ├── dashboard/       # Dashboard-specific components
│   │   │   ├── heatmaps/        # Heatmap components
│   │   │   ├── insights/        # Insight cards
│   │   │   ├── layout/          # Layout components (Sidebar, Header)
│   │   │   └── common/          # Reusable components (Card, Skeleton)
│   │   ├── pages/               # Page components (Dashboard, Insights)
│   │   ├── services/            # API service layer
│   │   ├── hooks/               # Custom React hooks
│   │   ├── utils/               # Utility functions
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application
│   │   ├── config.py            # Configuration settings
│   │   ├── database.py          # Database connection
│   │   ├── models.py            # SQLAlchemy models
│   │   └── services/            # Business logic services
│   │       ├── kpi_service.py
│   │       ├── chart_service.py
│   │       ├── heatmap_service.py
│   │       └── insights_service.py
│   ├── database/
│   │   ├── schema.sql           # Database schema
│   │   └── seed_data.py         # Seed data script
│   ├── requirements.txt
│   └── .env.example
└── README.md
```

## 🛠️ Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- PostgreSQL 14+

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Create database schema
psql -U your_user -d your_database -f database/schema.sql

# Seed database
python database/seed_data.py

# Run the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will run on `http://localhost:8000`

### Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE analytics_db;
```

2. Update the `DATABASE_URL` in `backend/.env`:
```
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/analytics_db
```

3. Run the schema and seed data:
```bash
cd backend
psql -U your_user -d analytics_db -f database/schema.sql
python database/seed_data.py
```

## 🎨 UI Design

### Color Palette
- **Background**: `#061226` - Deep navy blue
- **Card**: `#0B1B33` - Lighter navy
- **Border**: `#1E3A5F` - Soft blue border
- **Primary Blue**: `#3B82F6` - Bright blue
- **Accent Purple**: `#8B5CF6` - Purple accent
- **Cyan**: `#06B6D4` - Cyan highlight
- **Text Primary**: `#F8FAFC` - White text
- **Text Secondary**: `#94A3B8` - Muted text

### Design Features
- Glassmorphism cards with backdrop blur
- Smooth Framer Motion animations
- Hover effects and transitions
- Responsive grid layouts
- Professional spacing and typography

## 📊 API Endpoints

### KPIs
- `GET /api/kpis` - Get key performance indicators

### Charts
- `GET /api/revenue-by-gender` - Revenue by gender
- `GET /api/revenue-by-age` - Revenue by age group
- `GET /api/revenue-by-category` - Revenue by category
- `GET /api/subscription-analysis` - Subscription analysis

### Heatmaps
- `GET /api/heatmap-age-category` - Age vs Category heatmap
- `GET /api/heatmap-gender-category` - Gender vs Category heatmap
- `GET /api/discount-analysis` - Discount behavior heatmap

### Insights
- `GET /api/business-insights` - Business insights

### Export
- `GET /api/export-csv` - Export data as CSV

All endpoints support query parameters for filtering:
- `gender` - Filter by gender (Female, Male)
- `ageGroup` - Filter by age group (Young Adult, Adult, Middle-aged, Senior)
- `category` - Filter by category (Clothing, Accessories, Footwear, Outerwear)
- `subscription` - Filter by subscription status (Yes, No)
- `shipping` - Filter by shipping type
- `discount` - Filter by discount applied

## 🚀 Deployment

### Frontend (Vercel)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd frontend
vercel
```

3. Set environment variable:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `FRONTEND_URL` - Your Vercel frontend URL
4. Deploy

### Database (Neon)

1. Create a new project on Neon
2. Get the connection string
3. Update your backend `.env` with the Neon connection string
4. Run the schema and seed data

## 📝 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/analytics_db
FRONTEND_URL=http://localhost:5173
```

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

### Backend
```bash
cd backend
pytest
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built as a portfolio project demonstrating full-stack development skills with modern technologies and best practices.

## 🙏 Acknowledgments

- Based on the customer trends data analysis project
- Inspired by modern SaaS analytics platforms like Stripe, Tableau, and PowerBI
