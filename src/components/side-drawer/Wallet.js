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
        <h5>Current Transactions</h5>
        <Transaction transaction={wallet.transactions[0]} wallet={wallet} />
      </div >
      <div>
        <h5>Related Transactions</h5>
        {
          wallet.transactions.slice(1).map((transaction) => {
            return (
              <Transaction transaction={transaction} wallet={wallet} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Wallet;