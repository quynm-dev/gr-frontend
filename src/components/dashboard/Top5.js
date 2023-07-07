import { Card, Divider } from 'antd';

const Top5 = ({ data, title, icon }) => {
  const roundFloat = (floatNumber) => {
    let roundedNumber = floatNumber.toFixed(10);

    if (roundedNumber.length > 10) {
      roundedNumber = roundedNumber.substring(0, 10);
    }

    return roundedNumber
  }
  const Title = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ padding: '0 5px 0 0' }}>{icon}</div>
        <div style={{ padding: '0 0 0 5px' }}>{title}</div>
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
        <div style={{ width: '60%' }}>Name</div>
        <div style={{ width: '30%' }}>Price</div>
      </div>
      <Divider />
      {
        data?.map((token, index) => {
          return (
            <>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '10%' }}>{index + 1}</div>
                <div style={{ width: '60%', display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '0 5px 0 0' }}>
                    <img src={token.image} alt={token.name} style={{ width: '30px' }} />
                  </div>
                  <div>{token.name}</div>
                </div>
                <div style={{ width: '30%' }}>{roundFloat(token.price)}</div>
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