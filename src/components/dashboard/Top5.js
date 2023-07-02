import { Card, Divider } from 'antd';
import { FireOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'

const Top5 = ({ data }) => {
  const Title = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ padding: '0 5px 0 0' }}><FireOutlined style={{ color: 'red' }} /></div>
        <div style={{ padding: '0 0 0 5px' }}>Trending</div>
      </div>
    )
  }

  return (
    <Card
      title={<Title />}
      bordered={false}
      style={{
        width: 500,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '10%' }}>#</div>
        <div style={{ width: '40%' }}>Name</div>
        <div style={{ width: '40%' }}>Price</div>
        <div style={{ width: '10%' }}>24h</div>
      </div>
      <Divider />
      {
        data.map((token, index) => {
          return (
            <>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '5%' }}>{index + 1}</div>
                <div style={{ width: '40%', display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '0 5px 0 0' }}>
                    <img src={token.image} alt={token.name} style={{ width: '30px' }} />
                  </div>
                  <div>{token.name}</div>
                </div>
                <div style={{ width: '40%' }}>{token.current_price}</div>
                <div style={{ width: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ padding: '0 5px 0 0' }}>
                    {token.price_change_24h > 0 ? <CaretUpOutlined style={{ color: 'green' }} /> : <CaretDownOutlined style={{ color: 'red' }} />}
                  </div>
                  <div>
                    {token.price_change_24h.toFixed(5)}
                  </div>
                </div>
              </div>
              <Divider />
            </>
          )
        })
      }
    </Card>
  )
}

export default Top5;