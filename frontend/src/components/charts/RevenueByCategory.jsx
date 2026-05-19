import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function RevenueByCategory({ data }) {
  const chartData = Array.isArray(data) && data.length ? data : [
    { category: 'Clothing', revenue: 89234 },
    { category: 'Accessories', revenue: 52156 },
    { category: 'Footwear', revenue: 48921 },
    { category: 'Outerwear', revenue: 42770 },
  ]

  const colors = ['#3B82F6', '#F97316', '#22C55E', '#8B5CF6']

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(11, 27, 51, 0.8) 0%, rgba(6, 18, 38, 0.9) 100%)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(30, 58, 95, 0.5)',
      borderRadius: '1rem',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
      padding: '1.5rem'
    }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#F8FAFC', marginBottom: '1.5rem' }}>Revenue by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
          <XAxis 
            dataKey="category" 
            stroke="#94A3B8"
            tick={{ fill: '#94A3B8' }}
          />
          <YAxis 
            stroke="#94A3B8"
            tick={{ fill: '#94A3B8' }}
            label={{ value: 'Purchase Amount', angle: -90, position: 'insideLeft', fill: '#94A3B8' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0B1B33', 
              border: '1px solid #1E3A5F',
              borderRadius: '8px',
              color: '#F8FAFC'
            }}
          />
          <Legend />
          <Bar dataKey="revenue" fill="#3B82F6" name="Purchase Amount" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
