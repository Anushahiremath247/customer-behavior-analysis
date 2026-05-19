from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models import Customer, Purchase

def get_kpis(db: Session, filters: dict = None):
    filters = filters or {}
    
    query = db.query(
        func.sum(Purchase.purchase_amount).label('total_revenue'),
        func.count(Customer.customer_id).label('total_customers'),
        func.avg(Purchase.purchase_amount).label('avg_purchase'),
        func.avg(Customer.avg_rating).label('avg_rating'),
    ).join(Customer, Purchase.customer_id == Customer.customer_id)
    
    # Apply filters
    if filters.get('gender') and filters['gender'] != 'All':
        query = query.filter(Customer.gender == filters['gender'])
    
    if filters.get('subscription') and filters['subscription'] != 'All':
        query = query.filter(Customer.subscription_status == filters['subscription'])
    
    result = query.first()
    
    # Calculate additional metrics
    total_customers = db.query(Customer).count()
    repeat_buyers = db.query(Customer).filter(Customer.repeat_purchase == True).count()
    subscribers = db.query(Customer).filter(Customer.subscription_status == 'Yes').count()
    
    return {
        'totalRevenue': f"${result.total_revenue:,.2f}" if result.total_revenue else "$0.00",
        'totalCustomers': str(total_customers),
        'avgPurchase': f"${result.avg_purchase:,.2f}" if result.avg_purchase else "$0.00",
        'avgRating': f"{result.avg_rating:.2f}" if result.avg_rating else "0.00",
        'repeatBuyers': f"{(repeat_buyers / total_customers * 100):.2f}%" if total_customers > 0 else "0%",
        'subscribers': f"{(subscribers / total_customers * 100):.1f}%" if total_customers > 0 else "0%",
    }
