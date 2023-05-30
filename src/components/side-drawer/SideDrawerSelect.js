import { Select } from 'antd';
import { useState } from 'react';
const { Option } = Select;

const SideDrawerSelect = ({ tokens }) => {
  const [t, setT] = useState(tokens)
  const onSearch = (value) => {
    setT(t.filter((token) => {
      return token.name.toLowerCase().includes(value.toLowerCase())
    }))
  }

  return (
    <Select
      mode="multiple"
      placeholder="Sort by token"
      optionLabelProp="label"
      style={{ width: '100%' }}
      onSearch={onSearch}
    >
      {
        t.map((token) => {
          return (
            <Option value={token.symbol} label={token.symbol}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '30px', display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                  <img src={token.src} alt={token.alt} style={{ objectFit: 'cover', width: '100%' }} />
                </div>
                <div>
                  {token.symbol}
                </div>
              </div>
            </Option>
          )
        })
      }
    </Select>
  )
};
export default SideDrawerSelect;