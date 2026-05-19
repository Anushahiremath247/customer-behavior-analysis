import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

export default function SubscriptionAnalysis({ data }) {
  const chartData = Array.isArray(data) && data.length ? data : [
    { name: 'No', value: 73.1 },
    { name: 'Yes', value: 26.9 },
  ]

  const COLORS = ['#3B82F6', '#F97316']

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(11, 27, 51, 0.8) 0%, rgba(6, 18, 38, 0.9) 100%)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(30, 58, 95, 0.5)',
      borderRadius: '1rem',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
      padding: '1.5rem'
    }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#F8FAFC', marginBottom: '1.5rem' }}>Revenue by Subscription Status</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {Array.isArray(chartData) && chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0B1B33', 
              border: '1px solid #1E3A5F',
              borderRadius: '8px',
              color: '#F8FAFC'
            }}
            formatter={(value) => `${value}%`}
          />
          <Legend 
            wrapperStyle={{ color: '#94A3B8' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
