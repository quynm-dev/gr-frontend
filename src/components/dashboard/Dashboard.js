import { useState, useEffect } from 'react'
import SideMenu from '../side-menu/SideMenu';
import axios from 'axios';
import { Spin } from 'antd'
import { LoadingOutlined, SlidersOutlined, FallOutlined, RiseOutlined, UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons'
import Top5 from './Top5';
import DateTimePicker from '../date-time-picker/DateTimePicker';
import Select from '../select/Select';

const DashBoard = () => {
  const [exchanges, setExchanges] = useState([])
  const [exchange, setExchange] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [loading, setLoading] = useState(false)
  const [top5SellCount, setTop5SellCount] = useState([])
  const [top5BuyCount, setTop5BuyCount] = useState([])
  const [top5SellVolume, setTop5SellVolume] = useState([])
  const [top5BuyVolume, setTop5BuyVolume] = useState([])
  const [top5Price, setTop5Price] = useState([])
  const handleDateTimeChange = (value) => {
    const [start, end] = value
    const startTime = Math.floor(new Date(start).getTime() / 1000)
    const endTime = Math.floor(new Date(end).getTime() / 1000)
    setStartTime(startTime)
    setEndTime(endTime)
  }
  const handleChangeExchange = (value) => {
    setExchange(value)
  }
  const attributes = {
    ...(exchange && startTime && endTime ? { height: '100%', backgroundColor: 'rgb(240, 242, 245)' } : { height: '100vh', backgroundColor: 'rgb(240, 242, 245)' }),
  }

  useEffect(() => {
    const getData = async () => {
      setLoading(true)

      await axios.get('http://0.0.0.0:8096/exchanges/').then((resp) => {
        setExchanges(resp.data.body)
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

      await axios.get('http://0.0.0.0:8096/dashboards/', {
        params: {
          exchangeId: exchange,
          startTime: startTime,
          endTime: endTime
        }
      }).then((resp) => {
        setTop5Price(resp.data.body.sort_by_price_data)
        setTop5BuyCount(resp.data.body.sort_by_buy_count_data)
        setTop5SellCount(resp.data.body.sort_by_sell_count_data)
        setTop5BuyVolume(resp.data.body.sort_by_buy_volume_data)
        setTop5SellVolume(resp.data.body.sort_by_sell_volume_data)
      }).catch((err) => {
        console.log(err)
      })

      setLoading(false)
    }

    if (exchange && startTime && endTime) {
      getData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchange, startTime, endTime])

  return (
    < div style={attributes}>
      <div style={{ left: '20px', top: '20px', zIndex: '2', position: 'absolute' }}>
        <SideMenu />
      </div>
      <div style={{ textAlign: 'center', padding: '20px 0' }}>Dashboard</div>
      <div style={{ display: 'flex', width: '85%', margin: 'auto', justifyContent: 'flex-end' }}>
        <div style={{ padding: '20px' }}>
          <Select data={exchanges} type='Exchange' width={300} maxSymbolLength={30} onChange={handleChangeExchange} renderField={'_id'} />
        </div>
        <div style={{ padding: '20px' }}>
          <DateTimePicker onChange={handleDateTimeChange} />
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '90%', margin: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '40%', padding: '0 20px 50px 0' }}>
            <Top5 data={top5BuyCount} icon={<RiseOutlined style={{ color: 'green' }} />} title={'Top 5 buy transaction'} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', width: '40%', padding: '0 20px 50px 0' }}>
            <Top5 data={top5SellCount} icon={<FallOutlined style={{ color: 'red' }} />} title={'Top 5 sell transaction'} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', width: '40%', padding: '0 20px 50px 0' }}>
            <Top5 data={top5BuyVolume} icon={<UpCircleOutlined style={{ color: 'green' }} />} title={'Top 5 buy volume'} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', width: '40%', padding: '0 20px 50px 0' }}>
            <Top5 data={top5SellVolume} icon={<DownCircleOutlined style={{ color: 'red' }} />} title={'Top 5 sell volume'} />
          </div>
        </div>
      </div>
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
            ""
        }
      </div>
    </div >)
};
export default DashBoard;