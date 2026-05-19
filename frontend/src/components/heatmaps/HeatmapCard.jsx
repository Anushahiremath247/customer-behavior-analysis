export default function HeatmapCard({ title, data, labels }) {
  if (!data || !data.length) return null

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(11, 27, 51, 0.8) 0%, rgba(6, 18, 38, 0.9) 100%)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(30, 58, 95, 0.5)',
      borderRadius: '1rem',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
      padding: '1.5rem'
    }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#F8FAFC', marginBottom: '1rem' }}>{title}</h3>
      <div style={{ overflowX: 'auto', minWidth: 0 }}>
        <table style={{ width: '100%', minWidth: '320px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '0.5rem', textAlign: 'left', color: '#94A3B8', fontSize: '0.875rem' }}></th>
              {labels.columns.map((col) => (
                <th key={col} style={{ padding: '0.5rem', textAlign: 'center', color: '#94A3B8', fontSize: '0.875rem', fontWeight: '500' }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td style={{ padding: '0.5rem', color: '#94A3B8', fontSize: '0.875rem', fontWeight: '500' }}>{labels.rows[rowIndex]}</td>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    style={{
                      padding: '0.5rem',
                      textAlign: 'center',
                      fontSize: '0.75rem',
                      backgroundColor: `rgba(59, 130, 246, ${Math.min(cell.value / 100, 1)})`,
                      color: cell.value > 50 ? '#F8FAFC' : '#94A3B8'
                    }}
                  >
                    <div style={{ fontWeight: '600' }}>{cell.percentage}%</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{cell.count}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
