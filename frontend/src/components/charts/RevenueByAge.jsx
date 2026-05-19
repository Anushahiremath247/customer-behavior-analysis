import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function RevenueByAge({ data }) {
  const chartData = Array.isArray(data) && data.length ? data : [
    { ageGroup: 'Young Adult', revenue: 58500 },
    { ageGroup: 'Adult', revenue: 61200 },
    { ageGroup: 'Middle-aged', revenue: 59800 },
    { ageGroup: 'Senior', revenue: 53581 },
  ]

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(11, 27, 51, 0.8) 0%, rgba(6, 18, 38, 0.9) 100%)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(30, 58, 95, 0.5)',
      borderRadius: '1rem',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
      padding: '1.5rem'
    }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#F8FAFC', marginBottom: '1.5rem' }}>Revenue by Age Group</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
          <XAxis 
            dataKey="ageGroup" 
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
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#8B5CF6" 
            strokeWidth={3}
            name="Purchase Amount"
            dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
