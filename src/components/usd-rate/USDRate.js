import { useState, useEffect } from 'react';
import { Card, Button, Input, Spin, Drawer, notification, Empty, Tag } from 'antd'
import SideMenu from '../side-menu/SideMenu';
import Select from '../select/Select';
import axios from 'axios';
import { LoadingOutlined, SwapOutlined, DollarOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const USDRate = () => {
  const [loading, setLoading] = useState(false)
  const [tokens, setTokens] = useState([])
  const [filterToken, setFilterToken] = useState(null)
  const [open, setOpen] = useState(false);
  const [switching, setSwitching] = useState(false)
  const [sideDrawerData, setSideDrawerData] = useState({})
  const [hasError, setHasError] = useState(false)
  const [tokenValue, setTokenValue] = useState("")
  const [usdValue, setUSDValue] = useState("")
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleFilterToken = (value) => {
    setFilterToken(value)
  }
  const handleTokenValueChange = (e) => {
    if (e.target.value === "") {
      setTokenValue("")
      setUSDValue("")
      return
    }
    setTokenValue(e.target.value)
    setUSDValue(parseFloat(e.target.value) * sideDrawerData.current_price + "")
  }
  const handleUSDValueChange = (e) => {
    if (e.target.value === "") {
      setUSDValue("")
      setTokenValue("")
      return
    }
    setUSDValue(e.target.value)
    setTokenValue(parseFloat(e.target.value) / sideDrawerData.current_price + "")
  }

  const Title = () => {
    return (
      <Button onClick={showDrawer} disabled={filterToken == null || hasError}>Token Info</Button>
    )
  }

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (data) => {
    if (Object.keys(data).length === 0) {
      api['error']({
        message: 'Failure',
        description:
          'We cannot found the data for this token.',
      });
      return
    }
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      await axios.get("http://0.0.0.0:8096/tokens/usd-rate").then((resp) => {
        setTokens(resp.data.body)
      }).catch((err) => {
        console.log(err)
      })
      setLoading(false)
    }

    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=" + filterToken + "&vs_currencies=usd").then((resp) => {
        setHasError(false)
        openNotification(resp.data)
      }).catch((err) => {
        setHasError(true)
        console.log(err)
        return
      })

      let data = {}
      await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" + filterToken +
        "&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en").then((resp) => {
          data = resp.data[0]
          setHasError(false)
          openNotification(resp.data)
        }).catch((err) => {
          setHasError(true)
          console.log(err)
          return
        })

      await axios.get("https://api.coingecko.com/api/v3/coins/" + filterToken).then((resp) => {
        setHasError(false)
        openNotification(resp.data)
        setSideDrawerData({ ...data, ...resp.data })
      }).catch((err) => {
        setHasError(true)
        console.log(err)
        return
      })

      setLoading(false)
    }

    if (filterToken != null) {
      getData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterToken])

  return (
    < div style={{ backgroundColor: 'rgb(240, 242, 245)', height: '100vh' }}>
      {
        loading ? <div style={{
          position: 'absolute', width: '100%', height: '100vh', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 100
        }}>
          <div>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
          </div>
        </div> : ""
      }
      {contextHolder}
      <div style={{ left: '20px', top: '20px', zIndex: '2', position: 'absolute' }}>
        <SideMenu />
      </div>
      <div style={{ textAlign: 'center', padding: '20px 0' }}>USD Rate</div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card title={<Title />} bordered={false} style={{ width: 700, position: 'relative', top: '100px' }}>
          <div style={{ position: 'relative' }}>
            {
              switching ?
                <>
                  <div style={{ position: 'relative', margin: '10px 0px' }}>
                    <Input style={{ padding: '30px', fontSize: '50px' }} suffix={<DollarOutlined style={{ fontSize: '20px' }} />} value={usdValue} onChange={handleUSDValueChange} />
                  </div>
                </>
                :
                <></>
            }
            <div style={{ position: 'relative', margin: '10px 0px' }}>
              <Input style={{ padding: '30px', fontSize: '50px' }} value={tokenValue} onChange={handleTokenValueChange} />
              <div style={{ position: 'absolute', right: '15px', top: '15px' }}>
                <Select data={tokens} type="Token" width={150} maxSymbolLength={5} value={filterToken} renderField={'symbol'} onChange={handleFilterToken} />
              </div>
            </div>
            {
              !switching ?
                <>
                  <div style={{ position: 'relative', margin: '10px 0px' }}>
                    <Input style={{ padding: '30px', fontSize: '50px' }} suffix={<DollarOutlined style={{ fontSize: '40px' }} />} value={usdValue} onChange={handleUSDValueChange} />
                  </div>
                </>
                :
                <></>
            }
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '10' }}>
              <Button type="primary" icon={<SwapOutlined />} size={30} onClick={() => setSwitching(!switching)} />
            </div>
          </div>
        </Card>
      </div >
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        getContainer={false}
      >
        {
          sideDrawerData.length === 0 ?
            <div>
              <Empty />
            </div> :
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
                <h3>Image:</h3>
                <div><img src={sideDrawerData.image?.thumb} alt={sideDrawerData.image?.thumb} style={{ width: '50px' }} /></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
                <h3>Name:</h3>
                <div>{sideDrawerData.name}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
                <h3>Symbol:</h3>
                <div>{sideDrawerData.symbol}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
                <h3>Price change 24h:</h3>
                <div style={{ display: 'flex' }}>
                  <div style={{ padding: '0 0 0 5px' }}>{sideDrawerData.price_change_percentage_24h > 0 ?
                    <ArrowUpOutlined size={20} style={{ color: 'green' }} /> :
                    <ArrowDownOutlined size={20} style={{ color: 'red' }} />}</div>
                  <div style={{ padding: '0 0 0 5px' }}>{sideDrawerData.price_change_percentage_24h} %</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
                <h3>Low price 24h: </h3>
                <div>
                  <Tag bordered={false} color="error">
                    {sideDrawerData.low_24h}
                  </Tag>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
                <h3>Current price: </h3>
                <div>
                  <Tag bordered={false} color="warning">
                    {sideDrawerData.current_price}
                  </Tag>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
                <h3>High price 24h: </h3>
                <div>
                  <Tag bordered={false} color="success">
                    {sideDrawerData.high_24h}
                  </Tag>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
                <h3>Homepage URL:</h3>
                <div>
                  <a href={sideDrawerData.links?.homepage[0]} target='_blank' rel="noreferrer">Link</a>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
                <h3>Repo URL:</h3>
                <div>
                  <a href={sideDrawerData.links?.repos_url.github[0]} target='_blank' rel="noreferrer">Link</a>
                </div>
              </div>
            </div>
        }
      </Drawer >
    </div >
  )
};
export default USDRate;