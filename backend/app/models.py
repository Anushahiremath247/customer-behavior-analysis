from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.database import Base

class Customer(Base):
    __tablename__ = "customers"
    
    customer_id = Column(Integer, primary_key=True, index=True)
    age = Column(Integer)
    gender = Column(String(20))
    membership_status = Column(String(20))
    total_purchases = Column(Integer, default=0)
    total_spent = Column(Float, default=0.00)
    avg_rating = Column(Float, default=0.00)
    repeat_purchase = Column(Boolean, default=False)
    subscription_status = Column(String(20), default='No')
    created_at = Column(DateTime, default=func.now())
    
    purchases = relationship("Purchase", back_populates="customer")

class Product(Base):
    __tablename__ = "products"
    
    product_id = Column(Integer, primary_key=True, index=True)
    category = Column(String(50))
    item_purchased = Column(String(100))
    price = Column(Float)
    rating = Column(Float, default=0.00)
    review_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=func.now())
    
    purchases = relationship("Purchase", back_populates="product")

class Purchase(Base):
    __tablename__ = "purchases"
    
    purchase_id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.customer_id"))
    product_id = Column(Integer, ForeignKey("products.product_id"))
    purchase_amount = Column(Float)
    purchase_date = Column(DateTime, default=func.now())
    discount_applied = Column(Boolean, default=False)
    shipping_type = Column(String(50))
    location = Column(String(100))
    season = Column(String(20))
    payment_method = Column(String(50))
    created_at = Column(DateTime, default=func.now())
    
    customer = relationship("Customer", back_populates="purchases")
    product = relationship("Product", back_populates="purchases")
