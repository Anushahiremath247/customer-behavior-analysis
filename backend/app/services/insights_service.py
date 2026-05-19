from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models import Customer, Purchase, Product

def get_business_insights(db: Session, filters: dict = None):
    filters = filters or {}
    
    insights = []
    
    # Top spending gender
    gender_revenue = db.query(
        Customer.gender,
        func.sum(Purchase.purchase_amount).label('revenue')
    ).join(Customer, Purchase.customer_id == Customer.customer_id)\
     .group_by(Customer.gender)\
     .all()
    
    top_gender = max(gender_revenue, key=lambda x: x.revenue or 0)
    insights.append({
        'title': 'Top Spending Gender',
        'description': f"{top_gender.gender} customers generate the highest revenue (${top_gender.revenue:,.0f}).",
        'icon': 'TrendingUp',
        'color': 'primary'
    })
    
    # High performing product
    top_product = db.query(
        Product.item_purchased,
        Product.rating,
        func.count(Purchase.purchase_id).label('purchase_count')
    ).join(Purchase, Purchase.product_id == Product.product_id)\
     .group_by(Product.product_id)\
     .order_by(func.count(Purchase.purchase_id).desc())\
     .first()
    
    if top_product:
        insights.append({
            'title': 'High Performing Product',
            'description': f"{top_product.item_purchased} leads with strong rating ({top_product.rating}) and demand.",
            'icon': 'Award',
            'color': 'accent'
        })
    
    # Most profitable segment (repeat buyers)
    repeat_buyer_revenue = db.query(
        func.sum(Purchase.purchase_amount).label('revenue')
    ).join(Customer, Purchase.customer_id == Customer.customer_id)\
     .filter(Customer.repeat_purchase == True)\
     .first()
    
    insights.append({
        'title': 'Most Profitable Segment',
        'description': f"Loyal customers contribute the highest segment revenue (${repeat_buyer_revenue.revenue:,.0f}).",
        'icon': 'DollarSign',
        'color': 'cyan'
    })
    
    # Discount effectiveness
    discount_avg = db.query(
        func.avg(Purchase.purchase_amount).label('avg_amount')
    ).filter(Purchase.discount_applied == True)\
     .first()
    
    no_discount_avg = db.query(
        func.avg(Purchase.purchase_amount).label('avg_amount')
    ).filter(Purchase.discount_applied == False)\
     .first()
    
    insights.append({
        'title': 'Discount Effectiveness',
        'description': f"Discounted purchases reduce average spend (${discount_avg.avg_amount:.2f} vs ${no_discount_avg.avg_amount:.2f}).",
        'icon': 'Target',
        'color': 'primary'
    })
    
    # Retention and subscription trend
    total_customers = db.query(Customer).count()
    repeat_buyers = db.query(Customer).filter(Customer.repeat_purchase == True).count()
    subscribers = db.query(Customer).filter(Customer.subscription_status == 'Yes').count()
    subscriber_repeat_buyers = db.query(Customer).filter(
        Customer.subscription_status == 'Yes',
        Customer.repeat_purchase == True
    ).count()
    
    overall_repeat = (repeat_buyers / total_customers * 100) if total_customers > 0 else 0
    subscriber_repeat = (subscriber_repeat_buyers / subscribers * 100) if subscribers > 0 else 0
    
    insights.append({
        'title': 'Retention and Subscription Trend',
        'description': f"Overall repeat buyers: {overall_repeat:.1f}%. Among subscribers: {subscriber_repeat:.1f}%.",
        'icon': 'Users',
        'color': 'green'
    })
    
    return insights
