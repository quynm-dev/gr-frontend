import { useState, useEffect } from 'react'
import SideMenu from '../side-menu/SideMenu';
import PieChart from './PieChart';
import axios from 'axios';
import { Spin } from 'antd'
import { LoadingOutlined, FireOutlined, SlidersOutlined, FallOutlined, RiseOutlined, UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons'
import Top5 from './Top5';

const DashBoard = () => {
  const [pieChartData, setPieChartData] = useState([])
  const [loading, setLoading] = useState(false)
  const [top5Trending, setTop5Trending] = useState([])
  const [top5SellCount, setTop5SellCount] = useState([])
  const [top5BuyCount, setTop5BuyCount] = useState([])
  const [top5SellValue, setTop5SellValue] = useState([])
  const [top5BuyValue, setTop5BuyValue] = useState([])
  const convertData = (data) => {
    let convertedData = []
    for (let symbol in data) {
      convertedData.push({
        type: symbol,
        value: data[symbol]
      })
    }
    return convertedData
  }
  const getStringTokenIDFromArray = (listTokens) => {
    let listIDs = []
    listTokens.forEach((token) => {
      listIDs.push(token.item.id)
    })
    return listIDs.join('%2C')
  }

  useEffect(() => {
    const getData = async () => {
      setLoading(true)

      await axios.get("https://api.coingecko.com/api/v3/global").then((resp) => {
        setPieChartData(convertData(resp.data.data.market_cap_percentage))
      }).catch((err) => {
        console.log(err)
      })

      await axios.get("https://api.coingecko.com/api/v3/search/trending").then((resp) => {
        let stringTokenID = getStringTokenIDFromArray(resp.data.coins.slice(0, 5))

        const getTokensDetailData = async () => {
          await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" + stringTokenID +
            "&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en").then((resp) => {
              setTop5Trending(resp.data)
            }).catch((err) => {
              console.log(err)
            })
        }

        getTokensDetailData()
      })

      setLoading(false)
    }
    getData()
  }, [])

  return (< div style={{ backgroundColor: 'rgb(240, 242, 245)', height: '100%' }}>
    <div style={{ left: '20px', top: '20px', zIndex: '2', position: 'absolute' }}>
      <SideMenu />
    </div>
    <div style={{ textAlign: 'center', padding: '20px 0' }}>Dashboard</div>
    <div>
      {
        loading ? <div style={{
          position: 'absolute', width: '100%', height: '100vh', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 100
        }}>
          <div>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
          </div>
        </div> :
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '90%', margin: 'auto' }}>
            {/* <div>
              <PieChart data={pieChartData} />
            </div> */}
            <div style={{ display: 'flex', justifyContent: 'center', width: '30%', padding: '0 20px 50px 0' }}>
              <Top5 data={top5Trending} icon={<FireOutlined style={{ color: 'orange' }} />} title={'Searching'} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '30%', padding: '0 20px 50px 0' }}>
              <Top5 data={top5Trending} icon={<SlidersOutlined style={{ color: 'orange' }} />} title={'Volume'} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '30%', padding: '0 20px 50px 0' }}>
              <Top5 data={top5Trending} icon={<RiseOutlined style={{ color: 'green' }} />} title={'Gainers price'} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '30%', padding: '0 20px 50px 0' }}>
              <Top5 data={top5Trending} icon={<FallOutlined style={{ color: 'red' }} />} title={'Losers price'} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '30%', padding: '0 20px 50px 0' }}>
              <Top5 data={top5Trending} icon={<UpCircleOutlined style={{ color: 'green' }} />} title={'Gainers volumne'} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '30%', padding: '0 20px 50px 0' }}>
              <Top5 data={top5Trending} icon={<DownCircleOutlined style={{ color: 'red' }} />} title={'Losers volumne'} />
            </div>
          </div>
      }
    </div>
  </div >)
};
export default DashBoard;