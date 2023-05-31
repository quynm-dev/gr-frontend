import { Drawer, Tag } from 'antd';
import SideDrawerSelect from './SideDrawerSelect';
import Wallet from './Wallet';

const tokens = [
  { src: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579", alt: "btc-image", symbol: "BTC" },
  { src: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880", alt: "eth-image", symbol: "ETH" },
  { src: "https://assets.coingecko.com/coins/images/325/thumb/Tether.png?1668148663", alt: "usdt-image", symbol: "USDT" },
  { src: "https://assets.coingecko.com/coins/images/825/thumb/bnb-icon2_2x.png?1644979850", alt: "bnb-image", symbol: "BNB" },
  { src: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389", alt: "usdc-image", symbol: "USDC" },
  { src: "https://assets.coingecko.com/coins/images/44/thumb/xrp-symbol-white-128.png?1605778731", alt: "xrp-image", symbol: "XRP" },
  { src: "https://assets.coingecko.com/coins/images/975/thumb/cardano.png?1547034860", alt: "ada-image", symbol: "ADA" },
  { src: "https://assets.coingecko.com/coins/images/13442/thumb/steth_logo.png?1608607546", alt: "steth-image", symbol: "STETH" },
  { src: "https://assets.coingecko.com/coins/images/5/thumb/dogecoin.png?1547792256", alt: "doge-image", symbol: "DOGE" },
  { src: "https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912", alt: "matic-image", symbol: "MATIC" },
  { src: "https://assets.coingecko.com/coins/images/4128/thumb/solana.png?1640133422", alt: "sol-image", symbol: "SOL" },
  { src: "https://assets.coingecko.com/coins/images/1094/thumb/tron-logo.png?1547035066", alt: "trx-image", symbol: "TRX" },
]

const SideDrawer = ({ sideDrawerOpen, onCloseSideDrawer, data }) => {
  return (
    <>
      <Drawer width={640} placement="right" closable={false} onClose={onCloseSideDrawer} open={sideDrawerOpen}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}><Tag color="magenta">14:00 25/10/2000</Tag></div>
          <SideDrawerSelect tokens={tokens} />
        </div>
        {
          data.map((wallet) => {
            return (
              <Wallet wallet={wallet} />
            )
          })
        }
      </Drawer >
    </>
  );
};
export default SideDrawer;