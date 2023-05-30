import { Badge, Space, Card } from 'antd';

const Transaction = ({ transaction, wallet }) => {
  const isBuy = wallet.address === transaction.from
  const attributes = {
    ...(isBuy ? { text: 'Buy', color: 'green' } : { text: 'Sell', color: 'red' }),
  }

  return (
    < div onClick={() => window.open(transaction.scanURL, '_blank')} style={{ cursor: 'pointer' }}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Badge.Ribbon {...attributes}>
          <Card size="small">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '10px'
              }}>
                <img
                  src={transaction.src}
                  alt={transaction.alt}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div>{isBuy ? "+" : "-"}{transaction.value}</div>
            </div>
          </Card>
        </Badge.Ribbon>
      </Space>
    </div >
  )
}

export default Transaction;