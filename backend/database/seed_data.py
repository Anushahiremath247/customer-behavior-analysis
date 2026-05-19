import random
from datetime import datetime, timedelta
from sqlalchemy import create_engine, text
import os

DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://user:password@localhost:5432/analytics_db')

def seed_database():
    engine = create_engine(DATABASE_URL)
    
    with engine.connect() as conn:
        # Clear existing data
        conn.execute(text("TRUNCATE TABLE purchases, products, customers RESTART IDENTITY CASCADE"))
        conn.commit()
        
        # Insert customers
        genders = ['Female', 'Male']
        subscription_statuses = ['Yes', 'No']
        membership_statuses = ['Bronze', 'Silver', 'Gold', 'Platinum']
        
        customers = []
        for i in range(3900):
            customer = {
                'age': random.randint(18, 80),
                'gender': random.choice(genders),
                'membership_status': random.choice(membership_statuses),
                'total_purchases': random.randint(1, 50),
                'total_spent': round(random.uniform(50, 5000), 2),
                'avg_rating': round(random.uniform(2.5, 5.0), 2),
                'repeat_purchase': random.choice([True, False]),
                'subscription_status': random.choice(subscription_statuses),
            }
            customers.append(customer)
        
        # Insert customers
        for customer in customers:
            conn.execute(text("""
                INSERT INTO customers (age, gender, membership_status, total_purchases, total_spent, avg_rating, repeat_purchase, subscription_status)
                VALUES (:age, :gender, :membership_status, :total_purchases, :total_spent, :avg_rating, :repeat_purchase, :subscription_status)
            """), customer)
        
        conn.commit()
        
        # Insert products
        categories = ['Clothing', 'Accessories', 'Footwear', 'Outerwear']
        items = {
            'Clothing': ['T-Shirt', 'Jeans', 'Dress', 'Sweater', 'Blouse', 'Pants', 'Skirt', 'Jacket'],
            'Accessories': ['Watch', 'Bag', 'Scarf', 'Belt', 'Gloves', 'Hat', 'Sunglasses', 'Wallet'],
            'Footwear': ['Sneakers', 'Boots', 'Sandals', 'Heels', 'Loafers', 'Flats', 'Running Shoes'],
            'Outerwear': ['Coat', 'Blazer', 'Vest', 'Parka', 'Windbreaker', 'Cardigan']
        }
        
        products = []
        for category in categories:
            for item in items[category]:
                product = {
                    'category': category,
                    'item_purchased': item,
                    'price': round(random.uniform(20, 300), 2),
                    'rating': round(random.uniform(2.5, 5.0), 2),
                    'review_count': random.randint(10, 500),
                }
                products.append(product)
        
        for product in products:
            conn.execute(text("""
                INSERT INTO products (category, item_purchased, price, rating, review_count)
                VALUES (:category, :item_purchased, :price, :rating, :review_count)
            """), product)
        
        conn.commit()
        
        # Insert purchases
        shipping_types = ['Express', 'Standard', 'Same Day']
        locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego']
        seasons = ['Spring', 'Summer', 'Fall', 'Winter']
        payment_methods = ['Credit Card', 'Debit Card', 'PayPal', 'Apple Pay', 'Google Pay']
        
        # Get customer and product IDs
        customer_ids = conn.execute(text("SELECT customer_id FROM customers")).fetchall()
        product_ids = conn.execute(text("SELECT product_id FROM products")).fetchall()
        
        customer_ids = [row[0] for row in customer_ids]
        product_ids = [row[0] for row in product_ids]
        
        purchases = []
        for _ in range(15000):
            purchase = {
                'customer_id': random.choice(customer_ids),
                'product_id': random.choice(product_ids),
                'purchase_amount': round(random.uniform(20, 500), 2),
                'purchase_date': datetime.now() - timedelta(days=random.randint(0, 365)),
                'discount_applied': random.choice([True, False]),
                'shipping_type': random.choice(shipping_types),
                'location': random.choice(locations),
                'season': random.choice(seasons),
                'payment_method': random.choice(payment_methods),
            }
            purchases.append(purchase)
        
        for purchase in purchases:
            conn.execute(text("""
                INSERT INTO purchases (customer_id, product_id, purchase_amount, purchase_date, discount_applied, shipping_type, location, season, payment_method)
                VALUES (:customer_id, :product_id, :purchase_amount, :purchase_date, :discount_applied, :shipping_type, :location, :season, :payment_method)
            """), purchase)
        
        conn.commit()
        
        print("Database seeded successfully!")

if __name__ == "__main__":
    seed_database()
