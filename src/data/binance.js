export const nodes = [
  {
    id: '1',
    type: 'input',
    data: {
      label: '0x7efaef...',
    },
    style: {
      background: 'green',
      color: 'white',
    },
    position: { x: 0, y: -200 },
  },
  {
    id: '2',
    type: 'default',
    data: {
      label: (
        <>
          <img src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/270.png" alt="logo" style={{ width: '50px' }} />
        </>
      ),
    },
    position: { x: 500, y: 0 },
  },
  {
    id: '3',
    type: 'output',
    data: {
      label: ['0xe9e7cea...', '0xe9e7cea...'].join('\n')
    },
    style: {
      background: 'red',
      color: 'white',
    },
    position: { x: 0, y: 200 },
  },
  {
    id: '4',
    type: 'input',
    data: {
      label: '0x55d398...',
    },
    style: {
      background: 'green',
      color: 'white',
    },
    position: { x: 300, y: -200 },
  },
  {
    id: '5',
    type: 'input',
    data: {
      label: '0x179e3a...',
    },
    style: {
      background: 'green',
      color: 'white',
    },
    position: { x: 600, y: -200 },
  },
  {
    id: '6',
    type: 'input',
    data: {
      label: '0xbb4cdb...',
    },
    style: {
      background: 'green',
      color: 'white',
    },
    position: { x: 900, y: -200 },
  },
  {
    id: '7',
    type: 'output',
    data: {
      label: '0x5b1f87...',
    },
    style: {
      background: 'red',
      color: 'white',
    },
    position: { x: 300, y: 200 },
  },
  {
    id: '8',
    type: 'output',
    data: {
      label: '0x000000...',
    },
    style: {
      background: 'red',
      color: 'white',
    },
    position: { x: 600, y: 200 },
  },
  {
    id: '9',
    type: 'output',
    data: {
      label: '0xbb4cdb...',
    },
    style: {
      background: 'red',
      color: 'white',
    },
    position: { x: 900, y: 200 },
  },
];

export const edges = [
  { id: '1-2', source: '1', target: '2', animated: true, label: ['300 USDT', '200 ETH'].join('\n') },
  { id: '2-3', source: '2', target: '3', animated: true, label: "0.001212312 BTC" },
  { id: '4-2', source: '4', target: '2', animated: true, label: "0.0012 ETH" },
  { id: '5-2', source: '5', target: '2', animated: true, label: "9.1123123012 BTC" },
  { id: '6-2', source: '6', target: '2', animated: true, label: "200000 DOT" },
  { id: '2-7', source: '2', target: '7', animated: true, label: "300000 SHIB" },
  { id: '2-8', source: '2', target: '8', animated: true, label: "0.1231 XRP" },
  { id: '2-9', source: '2', target: '9', animated: true, label: "200000 ETH" },
];
