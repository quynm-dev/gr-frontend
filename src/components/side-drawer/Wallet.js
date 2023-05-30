import { Divider, Button } from "antd";
import Transaction from "./Transaction";

const Wallet = ({ wallet }) => {
  return (
    <div>
      <Divider plain>
        <Button size="medium">
          <a href={wallet.scanURL} target="_blank" rel="noreferrer">{wallet.address}</a>
        </Button>
      </Divider>
      <div>
        {
          wallet.transactions.map((transaction) => {
            return (
              <Transaction transaction={transaction} wallet={wallet} />
            )
          })
        }
      </div >
    </div>
  )
}

export default Wallet;