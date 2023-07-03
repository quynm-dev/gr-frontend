import { Badge, Space, Card } from 'antd';
import { DollarOutlined } from '@ant-design/icons'

const Transaction = ({ transaction, wallet }) => {
  const isBuy = wallet.address === transaction.from_address
  const attributes = {
    ...(isBuy ? { text: 'Buy', color: 'green' } : { text: 'Sell', color: 'red' }),
  }

  return (
    < div onClick={() => window.open(transaction.scan_url, '_blank')} style={{ cursor: 'pointer' }}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }} className="transaction">
        <Badge.Ribbon {...attributes}>
          <Card size="small">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '30px',
                display: 'flex',
                // justifyContent: 'center',
                alignItems: 'center',
                marginRight: '10px'
              }}>
                <img
                  src={transaction.image}
                  alt={transaction.transaction_hash}
                  style={{ objectFit: 'cover', width: '100%' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '85%' }}>
                <div>{isBuy ? "+" : "-"}{transaction.value}</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ padding: '0 5px' }}>{transaction.price}</div>
                  <div><DollarOutlined /></div>
                </div>
              </div>
            </div>
          </Card>
        </Badge.Ribbon>
      </Space>
    </div >
  )
}

export default Transaction;