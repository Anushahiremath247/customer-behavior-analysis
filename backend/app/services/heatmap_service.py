from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models import Customer, Purchase, Product

def get_age_category_heatmap(db: Session, filters: dict = None):
    filters = filters or {}
    
    query = db.query(
        Customer.age,
        Product.category,
        func.count(Purchase.purchase_id).label('count'),
        func.sum(Purchase.purchase_amount).label('total')
    ).join(Customer, Purchase.customer_id == Customer.customer_id)\
     .join(Product, Purchase.product_id == Product.product_id)
    
    # Apply filters
    if filters.get('gender') and filters['gender'] != 'All':
        query = query.filter(Customer.gender == filters['gender'])
    
    result = query.group_by(Customer.age, Product.category).all()
    
    # Group by age ranges
    age_ranges = {
        'Young Adult': (18, 25),
        'Adult': (26, 40),
        'Middle-aged': (41, 55),
        'Senior': (56, 80)
    }
    
    categories = ['Accessories', 'Clothing', 'Footwear', 'Outerwear']
    
    heatmap_data = []
    for age_group, (min_age, max_age) in age_ranges.items():
        row_data = []
        for category in categories:
            count = sum(
                row.count for row in result
                if min_age <= row.age <= max_age and row.category == category
            )
            total = sum(
                row.total for row in result
                if min_age <= row.age <= max_age and row.category == category
            )
            percentage = (total / 233081 * 100) if total else 0
            row_data.append({
                'percentage': round(percentage, 2),
                'count': count,
                'value': total
            })
        heatmap_data.append(row_data)
    
    return heatmap_data

def get_gender_category_heatmap(db: Session, filters: dict = None):
    filters = filters or {}
    
    query = db.query(
        Customer.gender,
        Product.category,
        func.count(Purchase.purchase_id).label('count'),
        func.sum(Purchase.purchase_amount).label('total')
    ).join(Customer, Purchase.customer_id == Customer.customer_id)\
     .join(Product, Purchase.product_id == Product.product_id)
    
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
    
    result = query.group_by(Customer.gender, Product.category).all()
    
    genders = ['Female', 'Male']
    categories = ['Accessories', 'Clothing', 'Footwear', 'Outerwear']
    
    heatmap_data = []
    for gender in genders:
        row_data = []
        for category in categories:
            count = sum(
                row.count for row in result
                if row.gender == gender and row.category == category
            )
            total = sum(
                row.total for row in result
                if row.gender == gender and row.category == category
            )
            percentage = (total / 233081 * 100) if total else 0
            row_data.append({
                'percentage': round(percentage, 2),
                'count': count,
                'value': total
            })
        heatmap_data.append(row_data)
    
    return heatmap_data

def get_discount_behavior_heatmap(db: Session, filters: dict = None):
    filters = filters or {}
    
    query = db.query(
        Purchase.discount_applied,
        Customer.subscription_status,
        func.count(Purchase.purchase_id).label('count'),
        func.avg(Purchase.purchase_amount).label('avg_amount')
    ).join(Customer, Purchase.customer_id == Customer.customer_id)
    
    # Apply filters
    if filters.get('gender') and filters['gender'] != 'All':
        query = query.filter(Customer.gender == filters['gender'])
    
    result = query.group_by(Purchase.discount_applied, Customer.subscription_status).all()
    
    discount_options = [False, True]
    subscription_options = ['No', 'Yes']
    
    heatmap_data = []
    for discount in discount_options:
        row_data = []
        for subscription in subscription_options:
            count = sum(
                row.count for row in result
                if row.discount_applied == discount and row.subscription_status == subscription
            )
            avg_amount = sum(
                row.avg_amount * row.count for row in result
                if row.discount_applied == discount and row.subscription_status == subscription
            )
            avg_amount = avg_amount / count if count > 0 else 0
            row_data.append({
                'percentage': round(avg_amount, 2),
                'count': count,
                'value': avg_amount
            })
        heatmap_data.append(row_data)
    
    return heatmap_data
