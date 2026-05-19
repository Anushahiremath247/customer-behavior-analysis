from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models import Customer, Purchase, Product

def get_revenue_by_gender(db: Session, filters: dict = None):
    filters = filters or {}
    
    query = db.query(
        Customer.gender,
        func.sum(Purchase.purchase_amount).label('revenue')
    ).join(Customer, Purchase.customer_id == Customer.customer_id)
    
    # Apply filters
    if filters.get('ageGroup') and filters['ageGroup'] != 'All':
        age_ranges = {
            'Young Adult': (18, 25),
            'Adult': (26, 40),
            'Middle-aged': (41, 55),
            'Senior': (56, 80)
        }
        if filters['ageGroup'] in age_ranges:
            min_age, max_age = age_ranges[filters['ageGroup']]
            query = query.filter(Customer.age.between(min_age, max_age))
    
    if filters.get('category') and filters['category'] != 'All':
        query = query.join(Product, Purchase.product_id == Product.product_id)
        query = query.filter(Product.category == filters['category'])
    
    result = query.group_by(Customer.gender).all()
    
    return [
        {'name': row.gender, 'revenue': float(row.revenue) if row.revenue else 0}
        for row in result
    ]

def get_revenue_by_age(db: Session, filters: dict = None):
    filters = filters or {}
    
    query = db.query(
        Customer.age,
        func.sum(Purchase.purchase_amount).label('revenue')
    ).join(Customer, Purchase.customer_id == Customer.customer_id)
    
    # Apply filters
    if filters.get('gender') and filters['gender'] != 'All':
        query = query.filter(Customer.gender == filters['gender'])
    
    if filters.get('category') and filters['category'] != 'All':
        query = query.join(Product, Purchase.product_id == Product.product_id)
        query = query.filter(Product.category == filters['category'])
    
    result = query.all()
    
    # Group by age ranges
    age_ranges = {
        'Young Adult': (18, 25),
        'Adult': (26, 40),
        'Middle-aged': (41, 55),
        'Senior': (56, 80)
    }
    
    age_group_revenue = {group: 0 for group in age_ranges}
    for row in result:
        for group, (min_age, max_age) in age_ranges.items():
            if min_age <= row.age <= max_age:
                age_group_revenue[group] += float(row.revenue) if row.revenue else 0
    
    return [
        {'ageGroup': group, 'revenue': revenue}
        for group, revenue in age_group_revenue.items()
    ]

def get_revenue_by_category(db: Session, filters: dict = None):
    filters = filters or {}
    
    query = db.query(
        Product.category,
        func.sum(Purchase.purchase_amount).label('revenue')
    ).join(Product, Purchase.product_id == Product.product_id)
    
    # Apply filters
    if filters.get('gender') and filters['gender'] != 'All':
        query = query.join(Customer, Purchase.customer_id == Customer.customer_id)
        query = query.filter(Customer.gender == filters['gender'])
    
    if filters.get('subscription') and filters['subscription'] != 'All':
        query = query.join(Customer, Purchase.customer_id == Customer.customer_id)
        query = query.filter(Customer.subscription_status == filters['subscription'])
    
    result = query.group_by(Product.category).all()
    
    return [
        {'category': row.category, 'revenue': float(row.revenue) if row.revenue else 0}
        for row in result
    ]

def get_subscription_analysis(db: Session, filters: dict = None):
    filters = filters or {}
    
    query = db.query(
        Customer.subscription_status,
        func.count(Purchase.purchase_id).label('count')
    ).join(Customer, Purchase.customer_id == Customer.customer_id)
    
    # Apply filters
    if filters.get('gender') and filters['gender'] != 'All':
        query = query.filter(Customer.gender == filters['gender'])
    
    result = query.group_by(Customer.subscription_status).all()
    
    total = sum(row.count for row in result)
    
    return [
        {'name': row.subscription_status, 'value': round((row.count / total * 100), 1) if total > 0 else 0}
        for row in result
    ]
