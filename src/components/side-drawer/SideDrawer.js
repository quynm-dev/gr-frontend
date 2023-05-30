import { Drawer, Tag } from 'antd';
import SideDrawerSelect from './SideDrawerSelect';
import Wallet from './Wallet';

const tokens = [
  { src: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579", alt: "token-image", symbol: "BTC" },
  { src: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880", alt: "token-image", symbol: "ETH" },
  { src: "https://assets.coingecko.com/coins/images/325/thumb/Tether.png?1668148663", alt: "token-image", symbol: "USDT" },
  { src: "https://assets.coingecko.com/coins/images/825/thumb/bnb-icon2_2x.png?1644979850", alt: "token-image", symbol: "BNB" },
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