import { Drawer } from 'antd';
import Wallet from './Wallet';

const SideDrawer = ({ sideDrawerOpen, onCloseSideDrawer, transactionData }) => {
  return (
    <>
      <Drawer width={640} placement="right" closable={false} onClose={onCloseSideDrawer} open={sideDrawerOpen}>
        {
          transactionData?.length > 0 ?
            transactionData.map((wallet) => {
              return (
                <Wallet wallet={wallet} key={wallet.address} />
              )
            }) :
            ""
        }
      </Drawer >
    </>
  );
};
export default SideDrawer;