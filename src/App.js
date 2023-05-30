import React, { useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';

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
      src: "https://assets.coingecko.com/markets/images/469/small/Binance.png?1568875842",
      alt: "exchange-image",
      name: "Binance",
      type: "Exchange"
    },
    {
      src: "https://assets.coingecko.com/markets/images/25/small/logo_V_colour_black.png?1669177364",
      alt: "exchange-image",
      name: "Huobi",
      type: "Exchange"
    },
  ]
  const sideDrawerData = [
    {
      address: "0x685b1ded8013785d6623cc18d214320b6bb64759",
      scanURL: "https://bscscan.com/address/0x685b1ded8013785d6623cc18d214320b6bb64759",
      transactions: [
        {
          src: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
          alt: "token-image",
          scanURL: "https://bscscan.com/tx/0xc63da88a098c69000f032c5dca04d8851bb0895c3be6eb9680ed9c1aabbc3b3b",
          from: "0x685b1ded8013785d6623cc18d214320b6bb64759",
          to: "",
          value: 12
        },
        {
          src: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
          alt: "token-image",
          scanURL: "https://bscscan.com/tx/0xc63da88a098c69000f032c5dca04d8851bb0895c3be6eb9680ed9c1aabbc3b3b",
          from: "",
          to: "",
          value: 50
        }
      ]
    },
    {
      address: "0x5BCb97ABD43C891b5e202e5A10e638f18EBAF000",
      scanURL: "https://bscscan.com/address/0x5BCb97ABD43C891b5e202e5A10e638f18EBAF000",
      transactions: [
        {
          src: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
          alt: "token-image",
          from: "0x5BCb97ABD43C891b5e202e5A10e638f18EBAF000",
          to: "",
          value: 1000
        },
        {
          src: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
          alt: "token-image",
          from: "0x5BCb97ABD43C891b5e202e5A10e638f18EBAF000",
          to: "",
          value: 50
        }
      ]
    },
  ]
  const tokens = [
    {
      src: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
      alt: "token-image",
      name: "BTC",
      type: "Token"
    },
  ]

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div>
      <div style={{ right: '20px', top: '20px', zIndex: '2', position: 'absolute' }}><DateTimePicker /></div>
      <div style={{ right: '650px', top: '20px', zIndex: '2', position: 'absolute' }}><Select data={exchanges} /></div>
      <div style={{ right: '400px', top: '20px', zIndex: '2', position: 'absolute' }}><Select data={tokens} /></div>
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
  );
};

export default App;
