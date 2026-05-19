from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Optional
import pandas as pd
from io import StringIO

from app.database import get_db, engine, init_db, SessionLocal
from app.config import get_settings
from app.models import Customer, Product, Purchase
from app.services import kpi_service, chart_service, heatmap_service, insights_service

settings = get_settings()

app = FastAPI(title="Analytics API", version="1.0.0")

@app.on_event("startup")
def on_startup():
    init_db()
    with SessionLocal() as db:
        if db.query(Customer).count() == 0:
            seed_initial_data(db)

# CORS middleware
allowed_origins = []
if settings.FRONTEND_URL:
    allowed_origins.append(settings.FRONTEND_URL)
allowed_origins.append("http://localhost:5173")

# Allow local development hosts on both localhost and 127.0.0.1
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins or ["*"],
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def seed_initial_data(db: Session):
    import random
    from datetime import datetime, timedelta

    if db.query(Customer).count() > 0:
        return

    genders = ['Female', 'Male']
    subscription_statuses = ['Yes', 'No']
    membership_statuses = ['Bronze', 'Silver', 'Gold', 'Platinum']
    categories = ['Clothing', 'Accessories', 'Footwear', 'Outerwear']
    products_by_category = {
        'Clothing': ['T-Shirt', 'Jeans', 'Dress', 'Sweater'],
        'Accessories': ['Watch', 'Bag', 'Scarf', 'Hat'],
        'Footwear': ['Sneakers', 'Boots', 'Sandals', 'Loafers'],
        'Outerwear': ['Coat', 'Parka', 'Jacket', 'Vest'],
    }
    shipping_types = ['Express', 'Standard', 'Same Day']
    locations = ['New York', 'Los Angeles', 'Chicago', 'Houston']
    seasons = ['Spring', 'Summer', 'Fall', 'Winter']
    payment_methods = ['Credit Card', 'Debit Card', 'PayPal', 'Apple Pay']

    customers = [
        Customer(
            age=random.randint(18, 80),
            gender=random.choice(genders),
            membership_status=random.choice(membership_statuses),
            total_purchases=random.randint(1, 35),
            total_spent=round(random.uniform(50, 5000), 2),
            avg_rating=round(random.uniform(2.5, 5.0), 2),
            repeat_purchase=random.choice([True, False]),
            subscription_status=random.choice(subscription_statuses),
        )
        for _ in range(40)
    ]
    db.add_all(customers)
    db.commit()

    products = []
    for category, items in products_by_category.items():
        for item in items:
            products.append(
                Product(
                    category=category,
                    item_purchased=item,
                    price=round(random.uniform(20, 320), 2),
                    rating=round(random.uniform(2.5, 5.0), 2),
                    review_count=random.randint(10, 450),
                )
            )
    db.add_all(products)
    db.commit()

    customer_ids = [row[0] for row in db.query(Customer.customer_id).all()]
    product_ids = [row[0] for row in db.query(Product.product_id).all()]

    purchases = []
    for _ in range(150):
        purchases.append(
            Purchase(
                customer_id=random.choice(customer_ids),
                product_id=random.choice(product_ids),
                purchase_amount=round(random.uniform(20, 420), 2),
                purchase_date=datetime.now() - timedelta(days=random.randint(0, 365)),
                discount_applied=random.choice([True, False]),
                shipping_type=random.choice(shipping_types),
                location=random.choice(locations),
                season=random.choice(seasons),
                payment_method=random.choice(payment_methods),
            )
        )

    db.add_all(purchases)
    db.commit()

@app.get("/")
def read_root():
    return {"message": "Analytics API is running"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

@app.get("/api/kpis")
def get_kpis(
    gender: Optional[str] = None,
    ageGroup: Optional[str] = None,
    category: Optional[str] = None,
    subscription: Optional[str] = None,
    db: Session = Depends(get_db)
):
    try:
        filters = {}
        if gender: filters['gender'] = gender
        if ageGroup: filters['ageGroup'] = ageGroup
        if category: filters['category'] = category
        if subscription: filters['subscription'] = subscription
        
        return kpi_service.get_kpis(db, filters)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/revenue-by-gender")
def get_revenue_by_gender(
    gender: Optional[str] = None,
    ageGroup: Optional[str] = None,
    category: Optional[str] = None,
    subscription: Optional[str] = None,
    db: Session = Depends(get_db)
):
    try:
        filters = {}
        if gender: filters['gender'] = gender
        if ageGroup: filters['ageGroup'] = ageGroup
        if category: filters['category'] = category
        if subscription: filters['subscription'] = subscription
        
        return chart_service.get_revenue_by_gender(db, filters)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/revenue-by-age")
def get_revenue_by_age(
    gender: Optional[str] = None,
    ageGroup: Optional[str] = None,
    category: Optional[str] = None,
    subscription: Optional[str] = None,
    db: Session = Depends(get_db)
):
    try:
        filters = {}
        if gender: filters['gender'] = gender
        if ageGroup: filters['ageGroup'] = ageGroup
        if category: filters['category'] = category
        if subscription: filters['subscription'] = subscription
        
        return chart_service.get_revenue_by_age(db, filters)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/revenue-by-category")
def get_revenue_by_category(
    gender: Optional[str] = None,
    ageGroup: Optional[str] = None,
    category: Optional[str] = None,
    subscription: Optional[str] = None,
    db: Session = Depends(get_db)
):
    try:
        filters = {}
        if gender: filters['gender'] = gender
        if ageGroup: filters['ageGroup'] = ageGroup
        if category: filters['category'] = category
        if subscription: filters['subscription'] = subscription
        
        return chart_service.get_revenue_by_category(db, filters)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/subscription-analysis")
def get_subscription_analysis(
    gender: Optional[str] = None,
    ageGroup: Optional[str] = None,
    category: Optional[str] = None,
    subscription: Optional[str] = None,
    db: Session = Depends(get_db)
):
    try:
        filters = {}
        if gender: filters['gender'] = gender
        if ageGroup: filters['ageGroup'] = ageGroup
        if category: filters['category'] = category
        if subscription: filters['subscription'] = subscription
        
        return chart_service.get_subscription_analysis(db, filters)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/heatmap-age-category")
def get_age_category_heatmap(
    gender: Optional[str] = None,
    ageGroup: Optional[str] = None,
    category: Optional[str] = None,
    subscription: Optional[str] = None,
    db: Session = Depends(get_db)
):
    try:
        filters = {}
        if gender: filters['gender'] = gender
        if ageGroup: filters['ageGroup'] = ageGroup
        if category: filters['category'] = category
        if subscription: filters['subscription'] = subscription
        
        return heatmap_service.get_age_category_heatmap(db, filters)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/heatmap-gender-category")
def get_gender_category_heatmap(
    gender: Optional[str] = None,
    ageGroup: Optional[str] = None,
    category: Optional[str] = None,
    subscription: Optional[str] = None,
    db: Session = Depends(get_db)
):
    try:
        filters = {}
        if gender: filters['gender'] = gender
        if ageGroup: filters['ageGroup'] = ageGroup
        if category: filters['category'] = category
        if subscription: filters['subscription'] = subscription
        
        return heatmap_service.get_gender_category_heatmap(db, filters)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/discount-analysis")
def get_discount_behavior_heatmap(
    gender: Optional[str] = None,
    ageGroup: Optional[str] = None,
    category: Optional[str] = None,
    subscription: Optional[str] = None,
    db: Session = Depends(get_db)
):
    try:
        filters = {}
        if gender: filters['gender'] = gender
        if ageGroup: filters['ageGroup'] = ageGroup
        if category: filters['category'] = category
        if subscription: filters['subscription'] = subscription
        
        return heatmap_service.get_discount_behavior_heatmap(db, filters)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/business-insights")
def get_business_insights(
    gender: Optional[str] = None,
    ageGroup: Optional[str] = None,
    category: Optional[str] = None,
    subscription: Optional[str] = None,
    db: Session = Depends(get_db)
):
    try:
        filters = {}
        if gender: filters['gender'] = gender
        if ageGroup: filters['ageGroup'] = ageGroup
        if category: filters['category'] = category
        if subscription: filters['subscription'] = subscription
        
        return insights_service.get_business_insights(db, filters)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/export-csv")
def export_csv(
    gender: Optional[str] = None,
    ageGroup: Optional[str] = None,
    category: Optional[str] = None,
    subscription: Optional[str] = None,
    db: Session = Depends(get_db)
):
    try:
        from fastapi.responses import Response
        
        query = """
        SELECT 
            c.customer_id,
            c.age,
            c.gender,
            c.membership_status,
            c.total_purchases,
            c.total_spent,
            c.avg_rating,
            c.repeat_purchase,
            c.subscription_status,
            p.category,
            p.item_purchased,
            p.price as product_price,
            p.rating as product_rating,
            pur.purchase_amount,
            pur.purchase_date,
            pur.discount_applied,
            pur.shipping_type,
            pur.location,
            pur.season,
            pur.payment_method
        FROM customers c
        JOIN purchases pur ON c.customer_id = pur.customer_id
        JOIN products p ON pur.product_id = p.product_id
        WHERE 1=1
        """
        
        params = {}
        if gender and gender != 'All':
            query += " AND c.gender = :gender"
            params['gender'] = gender
        if ageGroup and ageGroup != 'All':
            age_ranges = {
                'Young Adult': (18, 25),
                'Adult': (26, 40),
                'Middle-aged': (41, 55),
                'Senior': (56, 80)
            }
            if ageGroup in age_ranges:
                min_age, max_age = age_ranges[ageGroup]
                query += " AND c.age BETWEEN :min_age AND :max_age"
                params['min_age'] = min_age
                params['max_age'] = max_age
        if category and category != 'All':
            query += " AND p.category = :category"
            params['category'] = category
        if subscription and subscription != 'All':
            query += " AND c.subscription_status = :subscription"
            params['subscription'] = subscription
        
        result = db.execute(query, params)
        data = result.fetchall()
        columns = result.keys()
        
        df = pd.DataFrame(data, columns=columns)
        csv_buffer = StringIO()
        df.to_csv(csv_buffer, index=False)
        csv_buffer.seek(0)
        
        return Response(
            content=csv_buffer.getvalue(),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=analytics_export.csv"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
