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

const onInit = (instance) => {
  instance.zoomTo(0.9)
}
const edgeTypes = {
  edge: Edge,
};
const nodeTypes = {
  node: Node,
}

const App = () => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const onOpenSideDrawer = () => {
    setSideDrawerOpen(true);
  };
  const onCloseSideDrawer = () => {
    setSideDrawerOpen(false);
  };

  const initialNodes = [
    {
      id: '1',
      type: 'node',
      data: {
        label: '0x7efaef...',
        onClick: () => onOpenSideDrawer(),
        address: '0x7a1992f36b439045c3661d328db44e1407445daa40cb728516c614cca6949a65',
        isComposite: false,
        isInput: true,
      },
      position: { x: 0, y: -200 },
    },
    {
      id: '2',
      type: 'default',
      data: {
        label: (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
            <img src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/270.png" alt="logo" />
          </div>
        ),
      },
      position: { x: 500, y: 0 },
    },
    {
      id: '3',
      type: 'node',
      data: {
        onClick: () => onOpenSideDrawer(),
        label: '0x7a1992...',
        address: '0x7a1992f36b439045c3661d328db44e1407445daa40cb728516c614cca6949a65',
        isComposite: true,
        isInput: false,
      },
      position: { x: 0, y: 200 },
    },
    {
      id: '4',
      type: 'node',
      data: {
        onClick: () => onOpenSideDrawer(),
        label: '0x7a1992...',
        address: '0x7a1992f36b439045c3661d328db44e1407445daa40cb728516c614cca6949a65',
        isComposite: false,
        isInput: true,
      },
      position: { x: 300, y: -200 },
    },
    {
      id: '5',
      type: 'node',
      data: {
        label: '0x179e3a...',
        onClick: () => onOpenSideDrawer(),
        address: '0x7a1992f36b439045c3661d328db44e1407445daa40cb728516c614cca6949a65',
        isComposite: false,
        isInput: true,
      },
      position: { x: 600, y: -200 },
    },
    {
      id: '6',
      type: 'node',
      data: {
        label: '0xbb4cdb...',
        onClick: () => onOpenSideDrawer(),
        address: '0x7a1992f36b439045c3661d328db44e1407445daa40cb728516c614cca6949a65',
        isComposite: false,
        isInput: true,
      },
      position: { x: 900, y: -200 },
    },
    {
      id: '7',
      type: 'node',
      data: {
        label: '0x5b1f87...',
        onClick: () => onOpenSideDrawer(),
        address: '0x7a1992f36b439045c3661d328db44e1407445daa40cb728516c614cca6949a65',
        isComposite: false,
        isInput: false,
      },
      position: { x: 300, y: 200 },
    },
    {
      id: '8',
      type: 'node',
      data: {
        label: '0x000000...',
        onClick: () => onOpenSideDrawer(),
        address: '0x7a1992f36b439045c3661d328db44e1407445daa40cb728516c614cca6949a65',
        isComposite: false,
        isInput: false,
      },
      position: { x: 600, y: 200 },
    },
    {
      id: '9',
      type: 'node',
      data: {
        label: '0xbb4cdb...',
        onClick: () => onOpenSideDrawer(),
        address: '0x7a1992f36b439045c3661d328db44e1407445daa40cb728516c614cca6949a65',
        isComposite: false,
        isInput: false,
      },
      position: { x: 900, y: 200 },
    },
  ];

  const initialEdges = [
    {
      id: '1-2', source: '1', target: '2', animated: true, type: 'edge',
      data: {
        value: 12,
        src: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
        alt: "token-image",
        onClick: () => onOpenSideDrawer(),
        isComposite: false,
      }
    },
    {
      id: '2-3', source: '2', target: '3', animated: true, type: 'edge',
      data: {
        value: 12,
        src: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
        alt: "token-image",
        onClick: () => onOpenSideDrawer(),
        isComposite: true,
      }
    },
    {
      id: '4-2', source: '4', target: '2', animated: true, type: 'edge',
      data: {
        value: 12,
        src: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
        alt: "token-image",
        onClick: () => onOpenSideDrawer(),
      }
    },
    {
      id: '5-2', source: '5', target: '2', animated: true, type: 'edge',
      data: {
        value: 12,
        src: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
        alt: "token-image",
        onClick: () => onOpenSideDrawer(),
      }
    },
    {
      id: '6-2', source: '6', target: '2', animated: true, type: 'edge',
      data: {
        value: 12, src: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
        alt: "token-image",
        onClick: () => onOpenSideDrawer(),
      }
    },
    {
      id: '2-7', source: '2', target: '7', animated: true, type: 'edge',
      data: {
        value: 12,
        src: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
        alt: "token-image",
        onClick: () => onOpenSideDrawer(),
      }
    },
    {
      id: '2-8', source: '2', target: '8', animated: true, type: 'edge',
      data: {
        value: 12,
        src: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
        alt: "token-image",
        onClick: () => onOpenSideDrawer(),
      }
    },
    {
      id: '2-9', source: '2', target: '9', animated: true, type: 'edge',
      data: {
        value: 12,
        src: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
        alt: "token-image",
        onClick: () => onOpenSideDrawer(),
      }
    },
  ];

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

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const [filterExchange, setFilterExchange] = useState("binance")
  const [filterToken, setFilterToken] = useState("btc")
  const [filterStartTime, setFilterStartTime] = useState("start time")
  const [filterEndTime, setFilterEndTime] = useState("end time")

  const handleChangeExchange = (value) => {
    let n = [...nodes]
    let e = exchanges.filter((exchange) => {
      return exchange.name === value
    })

    n.map((node) => {
      if (node.id === '2') {
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

  return (
    <div>
      <div style={{ right: '20px', top: '20px', zIndex: '2', position: 'absolute' }}>
        <DateTimePicker setFilterStartTime={setFilterStartTime} setFilterEndTime={setFilterEndTime} />
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
    </div>
  );
};

export default App;
