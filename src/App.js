import React, { useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import { Empty } from 'antd'

import Node from './components/node/Node';
import Edge from './components/edge/Edge';
import DateTimePicker from './components/date-time-picker/DateTimePicker';
import SideDrawer from './components/side-drawer/SideDrawer';
import Select from './components/select/Select';

import './styles/index.css'
import 'reactflow/dist/style.css';

const startInputXRight = 100
const startInputXLeft = -100
const startOutputXRight = 100
const startOutputXLeft = -100
const xEllipse = 1000
const yEllipse = 500
const range = 200
let isInputRightTurn = true
let isOutputLeftTurn = true
let inputXRight = startInputXRight
let inputXLeft = startInputXLeft
let outputXRight = startOutputXRight
let outputXLeft = startOutputXLeft

const edgeTypes = {
  edge: Edge,
};
const nodeTypes = {
  node: Node,
}
const calculateYCoordinate = (x) => {
  return -Math.sqrt(((1 - x * x / (xEllipse * xEllipse)) * yEllipse * yEllipse))
}

const App = () => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const onOpenSideDrawer = () => {
    setSideDrawerOpen(true);
  };
  const onCloseSideDrawer = () => {
    setSideDrawerOpen(false);
  };
  const exchanges = [
    {
      src: "https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png?1621471875",
      alt: "coinbase-image",
      name: "Coinbase",
      type: "Exchange"
    },
    {
      src: "https://assets.coingecko.com/markets/images/698/small/bybit_spot.png?1629971794",
      alt: "bybit-image",
      name: "Bybit",
      type: "Exchange"
    },
    {
      src: "https://assets.coingecko.com/markets/images/96/small/WeChat_Image_20220117220452.png?1642428377",
      alt: "okx-image",
      name: "OKX",
      type: "Exchange"
    },
    {
      src: "https://assets.coingecko.com/markets/images/589/small/h2oMjPp6_400x400.jpg?1669699705",
      alt: "crypto.com-image",
      name: "Crypto.com",
      type: "Exchange"
    },
    {
      src: "https://assets.coingecko.com/markets/images/4/small/BItfinex.png?1615895883",
      alt: "bitfinex-image",
      name: "Bitfinex",
      type: "Exchange"
    },
    {
      src: "https://assets.coingecko.com/markets/images/409/small/MEXC_logo_square.jpeg?1673000123",
      alt: "mecx-global-image",
      name: "MEXC Global",
      type: "Exchange"
    },
    {
      src: "https://assets.coingecko.com/markets/images/540/small/Bitget_new_logo_2.png?1630049618",
      alt: "bitget-image",
      name: "Bitget",
      type: "Exchange"
    },
    {
      src: "https://assets.coingecko.com/markets/images/25/small/logo_V_colour_black.png?1669177364",
      alt: "exchange-image",
      name: "Huobi",
      type: "Exchange"
    },
    {
      src: "https://assets.coingecko.com/markets/images/29/small/kraken.jpg?1584251255",
      alt: "kraken-image",
      name: "Kraken",
      type: "Exchange"
    },
    {
      src: "https://assets.coingecko.com/markets/images/812/small/YtFwQwJr_400x400.jpg?1646056092",
      alt: "bingx-image",
      name: "Bingx",
      type: "Exchange"
    },
    {
      src: "https://assets.coingecko.com/markets/images/469/small/Binance.png?1568875842",
      alt: "binacne-image",
      name: "Binance",
      type: "Exchange"
    },
  ]
  const sideDrawerData = [
    {
      address: "0x8b6c8fd93d6f4cea42bbb345dbc6f0dfdb5bec73",
      scanURL: "https://bscscan.com/address/0x8b6c8fd93d6f4cea42bbb345dbc6f0dfdb5bec73",
      transactions: [
        {
          src: "https://assets.coingecko.com/coins/images/825/thumb/bnb-icon2_2x.png?1644979850",
          alt: "bnb-image",
          scanURL: "https://bscscan.com/tx/0x4eb4d57ff1bc134fe8e4046bde8c82513d41acb4a183e244bdcd4b1fa6206046",
          from: "0x8b6c8fd93d6f4cea42bbb345dbc6f0dfdb5bec73",
          to: "",
          value: 120
        },
        {
          src: "https://assets.coingecko.com/coins/images/13442/thumb/steth_logo.png?1608607546",
          alt: "steth-image",
          scanURL: "https://bscscan.com/tx/0x4eb4d57ff1bc134fe8e4046bde8c82513d41acb4a183e244bdcd4b1fa6206046",
          from: "0x8b6c8fd93d6f4cea42bbb345dbc6f0dfdb5bec73",
          to: "",
          value: 0.1
        },
      ]
    },
    {
      address: "0x8b6c8fd93d6f4cea42bbb345dbc6f0dfdb5bec73",
      scanURL: "https://bscscan.com/address/0x8b6c8fd93d6f4cea42bbb345dbc6f0dfdb5bec73",
      transactions: [
        {
          src: "https://assets.coingecko.com/coins/images/2/thumb/litecoin.png?1547033580",
          alt: "ltc-image",
          scanURL: "https://bscscan.com/tx/0x4eb4d57ff1bc134fe8e4046bde8c82513d41acb4a183e244bdcd4b1fa6206046",
          from: "",
          to: "0x8b6c8fd93d6f4cea42bbb345dbc6f0dfdb5bec73",
          value: 50
        },
        {
          src: "https://assets.coingecko.com/coins/images/44/thumb/xrp-symbol-white-128.png?1605778731",
          alt: "xrp-image",
          scanURL: "https://bscscan.com/tx/0x4eb4d57ff1bc134fe8e4046bde8c82513d41acb4a183e244bdcd4b1fa6206046",
          from: "",
          to: "0x8b6c8fd93d6f4cea42bbb345dbc6f0dfdb5bec73",
          value: 1000
        },
        {
          src: "https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912",
          alt: "matic-image",
          scanURL: "https://bscscan.com/tx/0x4eb4d57ff1bc134fe8e4046bde8c82513d41acb4a183e244bdcd4b1fa6206046",
          from: "",
          to: "0x8b6c8fd93d6f4cea42bbb345dbc6f0dfdb5bec73",
          value: 5012.2
        },
        {
          src: "https://assets.coingecko.com/coins/images/12171/thumb/polkadot.png?1639712644",
          alt: "dot-image",
          scanURL: "https://bscscan.com/tx/0x4eb4d57ff1bc134fe8e4046bde8c82513d41acb4a183e244bdcd4b1fa6206046",
          from: "",
          to: "0x8b6c8fd93d6f4cea42bbb345dbc6f0dfdb5bec73",
          value: 1000
        },
      ]
    },
  ]
  const tokens = [
    {
      src: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
      alt: "btc-image",
      name: "BTC",
      type: "Token"
    },
    {
      src: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880",
      alt: "eth-image",
      name: "ETH",
      type: "Token"
    },
    {
      src: "https://assets.coingecko.com/coins/images/325/thumb/Tether.png?1668148663",
      alt: "usdt-image",
      name: "USDT",
      type: "Token"
    },
    {
      src: "https://assets.coingecko.com/coins/images/825/thumb/bnb-icon2_2x.png?1644979850",
      alt: "bnb-image",
      name: "BNB",
      type: "Token"
    },
    {
      src: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
      alt: "usdc-image",
      name: "USDC",
      type: "Token"
    },
    {
      src: "https://assets.coingecko.com/coins/images/44/thumb/xrp-symbol-white-128.png?1605778731",
      alt: "xrp-image",
      name: "XRP",
      type: "Token"
    },
    {
      src: "https://assets.coingecko.com/coins/images/975/thumb/cardano.png?1547034860",
      alt: "steth-image",
      name: "STETH",
      type: "Token"
    },
    {
      src: "https://assets.coingecko.com/coins/images/5/thumb/dogecoin.png?1547792256",
      alt: "doge-image",
      name: "DOGE",
      type: "Token"
    },
    {
      src: "https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912",
      alt: "matic-image",
      name: "MATIC",
      type: "Token"
    },
    {
      src: "https://assets.coingecko.com/coins/images/4128/thumb/solana.png?1640133422",
      alt: "sol-image",
      name: "SOL",
      type: "Token"
    },
    {
      src: "https://assets.coingecko.com/coins/images/1094/thumb/tron-logo.png?1547035066",
      alt: "trx-image",
      name: "TRX",
      type: "Token"
    },
    {
      src: "https://assets.coingecko.com/coins/images/12171/thumb/polkadot.png?1639712644",
      alt: "dot-image",
      name: "dot",
      type: "Token"
    },
    {
      src: "https://assets.coingecko.com/coins/images/2/thumb/litecoin.png?1547033580",
      alt: "ltc-image",
      name: "LTC",
      type: "Token"
    },
  ]
  const [instance, setInstance] = useState(null)
  const onInit = (i) => {
    setInstance(i)
  }

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [filterExchange, setFilterExchange] = useState("binance")
  const [filterToken, setFilterToken] = useState("btc")
  const [filterStartTime, setFilterStartTime] = useState("start time")
  const [filterEndTime, setFilterEndTime] = useState("end time")

  const handleChangeExchange = (value) => {
    let n = [...nodes]
    let e = exchanges.filter((exchange) => {
      return exchange.name === value
    })

    if (n.length === 0) {
      setNodes([{
        id: '1',
        type: 'default',
        data: {
          label: (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
              <img src={e[0].src} alt="logo" />
            </div>
          ),
        },
        position: { x: 0, y: 0 },
      }])
      return
    }

    n.map((node) => {
      if (node.id === '1') {
        node.data = {
          ...node.data,
          label: (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
              <img src={e[0].src} alt="exchange-logo" />
            </div>
          ),
        };
      }

      return node;
    })

    setNodes(n)
  }
  const addNewNode = (label, address, isComposite, isInput, value, src, alt) => {
    if (isInput) {
      if (isInputRightTurn) {
        let y = calculateYCoordinate(inputXRight)
        let id = (inputXRight - startInputXRight) / range + 2
        let newNode = {
          id: `${id}`,
          type: 'node',
          data: {
            label: label,
            onClick: () => onOpenSideDrawer(),
            address: address,
            isComposite: isComposite,
            isInput: isInput,
          },
          position: { x: inputXRight, y: y },
        }
        let newEdge = {
          id: `${id}-1`, source: `${id}`, target: '1', animated: true, type: 'edge',
          data: {
            value: value,
            src: src,
            alt: alt,
            onClick: () => onOpenSideDrawer(),
            isComposite: isComposite,
          }
        }
        inputXRight += range
        isInputRightTurn = !isInputRightTurn

        return { newNode, newEdge }
      }

      let y = calculateYCoordinate(inputXLeft)
      let id = (startInputXLeft - inputXLeft) / range + 7
      let newNode = {
        id: `${id}`,
        type: 'node',
        data: {
          label: label,
          onClick: () => onOpenSideDrawer(),
          address: address,
          isComposite: isComposite,
          isInput: isInput,
        },
        position: { x: inputXLeft, y: y },
      }
      let newEdge = {
        id: `${id}-1`, source: `${id}`, target: '1', animated: true, type: 'edge',
        data: {
          value: value,
          src: src,
          alt: alt,
          onClick: () => onOpenSideDrawer(),
          isComposite: isComposite,
        }
      }
      inputXLeft -= range
      isInputRightTurn = !isInputRightTurn

      return { newNode, newEdge }
    }

    if (isOutputLeftTurn) {
      let y = calculateYCoordinate(outputXLeft)
      let id = (startOutputXLeft - outputXLeft) / range + 12
      let newNode = {
        id: `${id}`,
        type: 'node',
        data: {
          label: label,
          onClick: () => onOpenSideDrawer(),
          address: address,
          isComposite: isComposite,
          isInput: isInput,
        },
        position: { x: outputXLeft, y: -y },
      }
      let newEdge = {
        id: `1-${id}`, source: '1', target: `${id}`, animated: true, type: 'edge',
        data: {
          value: value,
          src: src,
          alt: alt,
          onClick: () => onOpenSideDrawer(),
          isComposite: isComposite,
        }
      }
      outputXLeft -= range
      isOutputLeftTurn = !isOutputLeftTurn

      return { newNode, newEdge }
    }

    let y = calculateYCoordinate(outputXRight)
    let id = (outputXRight - startOutputXRight) / range + 17
    let newNode = {
      id: `${id}`,
      type: 'node',
      data: {
        label: label,
        onClick: () => onOpenSideDrawer(),
        address: address,
        isComposite: isComposite,
        isInput: isInput,
      },
      position: { x: outputXRight, y: -y },
    }
    let newEdge = {
      id: `1-${id}`, source: '1', target: `${id}`, animated: true, type: 'edge',
      data: {
        value: value,
        src: src,
        alt: alt,
        onClick: () => onOpenSideDrawer(),
        isComposite: isComposite,
      }
    }
    outputXRight += range
    isOutputLeftTurn = !isOutputLeftTurn

    return { newNode, newEdge }
  }
  const data = [
    {
      label: '0xBe807D...',
      address: '0xBe807Dddb074639cD9fA61b47676c064fc50D62C',
      isComposite: false,
      isInput: true,
      value: 50,
      src: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
      alt: 'btc-image',
    },
    {
      label: '0xBe807D...',
      address: '0xBe807Dddb074639cD9fA61b47676c064fc50D62C',
      isComposite: false,
      isInput: true,
      value: 100,
      src: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
      alt: 'btc-image',
    },
    {
      label: '0xBe807D...',
      address: '0xBe807Dddb074639cD9fA61b47676c064fc50D62C',
      isComposite: false,
      isInput: true,
      value: 1000,
      src: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
      alt: 'btc-image',
    },
    {
      label: '0xBe807D...',
      address: '0xBe807Dddb074639cD9fA61b47676c064fc50D62C',
      isComposite: false,
      isInput: true,
      value: 50,
      src: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
      alt: 'btc-image',
    },
    {
      label: '0xBe807D...',
      address: '0xBe807Dddb074639cD9fA61b47676c064fc50D62C',
      isComposite: false,
      isInput: true,
      value: 100,
      src: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
      alt: 'btc-image',
    },
    {
      label: '0xBe807D...',
      address: '0xBe807Dddb074639cD9fA61b47676c064fc50D62C',
      isComposite: false,
      isInput: true,
      value: 1000,
      src: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
      alt: 'btc-image',
    },
    {
      label: '0xBe807D...',
      address: '0xBe807Dddb074639cD9fA61b47676c064fc50D62C',
      isComposite: false,
      isInput: true,
      value: 50,
      src: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
      alt: 'btc-image',
    },
    {
      label: '0xBe807D...',
      address: '0xBe807Dddb074639cD9fA61b47676c064fc50D62C',
      isComposite: false,
      isInput: true,
      value: 100,
      src: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
      alt: 'btc-image',
    },
    {
      label: '0xBe807D...',
      address: '0xBe807Dddb074639cD9fA61b47676c064fc50D62C',
      isComposite: false,
      isInput: true,
      value: 1000,
      src: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
      alt: 'btc-image',
    },
    {
      label: '0xBe807D...',
      address: '0xBe807Dddb074639cD9fA61b47676c064fc50D62C',
      isComposite: false,
      isInput: false,
      value: 10,
      src: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
      alt: 'btc-image',
    },
    {
      label: '0xBe807D...',
      address: '0xBe807Dddb074639cD9fA61b47676c064fc50D62C',
      isComposite: false,
      isInput: false,
      value: 1,
      src: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
      alt: 'btc-image',
    },
    {
      label: '0xBe807D...',
      address: '0xBe807Dddb074639cD9fA61b47676c064fc50D62C',
      isComposite: false,
      isInput: false,
      value: 10,
      src: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
      alt: 'btc-image',
    },
    {
      label: '0xBe807D...',
      address: '0xBe807Dddb074639cD9fA61b47676c064fc50D62C',
      isComposite: false,
      isInput: false,
      value: 1,
      src: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
      alt: 'btc-image',
    },
    {
      label: '0xBe807D...',
      address: '0xBe807Dddb074639cD9fA61b47676c064fc50D62C',
      isComposite: false,
      isInput: false,
      value: 10,
      src: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
      alt: 'btc-image',
    },
    {
      label: '0xBe807D...',
      address: '0xBe807Dddb074639cD9fA61b47676c064fc50D62C',
      isComposite: false,
      isInput: false,
      value: 1,
      src: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
      alt: 'btc-image',
    },
    {
      label: '0xBe807D...',
      address: '0xBe807Dddb074639cD9fA61b47676c064fc50D62C',
      isComposite: true,
      isInput: true,
      value: 5000,
      src: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
      alt: 'btc-image',
    }
  ]
  const addNewNodes = (data) => {
    let newNodes = []
    let newEdges = []
    for (let i = 0; i < data.length; i++) {
      let d = data[i]
      let { newNode, newEdge } = addNewNode(d.label, d.address, d.isComposite, d.isInput, d.value, d.src, d.alt)
      newNodes.push(newNode)
      newEdges.push(newEdge)
    }


    setNodes([...nodes, ...newNodes])
    setEdges([...nodes, ...newEdges])
    let i = instance
    i.zoomTo(0.75)
    setInstance(i)
  }
  const callAPI = () => {
    if (!filterStartTime || !filterEndTime) {
      return
    }

    addNewNodes(data)
  }

  return (
    <div>
      <div style={{ right: '20px', top: '20px', zIndex: '2', position: 'absolute' }}>
        <DateTimePicker setFilterStartTime={setFilterStartTime} setFilterEndTime={setFilterEndTime} onChange={callAPI} />
      </div>
      <div style={{ right: '650px', top: '20px', zIndex: '2', position: 'absolute' }}>
        <Select data={exchanges} setFilterExchange={setFilterExchange} onChange={handleChangeExchange} />
      </div>
      <div style={{ right: '400px', top: '20px', zIndex: '2', position: 'absolute' }}>
        <Select data={tokens} setFilterToken={setFilterToken} />
      </div>
      {
        filterExchange && filterToken && filterStartTime && filterEndTime ?
          <div>
            <SideDrawer sideDrawerOpen={sideDrawerOpen} onCloseSideDrawer={onCloseSideDrawer} data={sideDrawerData} />
            <div style={{ height: '100vh' }}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                edgeTypes={edgeTypes}
                nodeTypes={nodeTypes}
                nodesDraggable={true}
                onInit={onInit}
                fitView
              >
                <MiniMap zoomable pannable />
                <Controls showInteractive={false} />
                <Background color="#aaa" gap={16} />
              </ReactFlow>
            </div>
          </div>
          :
          <div style={{ display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
            <Empty description={false} />
          </div>
      }
    </div >
  );
};

export default App;
