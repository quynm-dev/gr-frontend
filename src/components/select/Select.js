import { Select } from 'antd';
const { Option } = Select;

const S = ({ data }) => {
  return (
    <Select
      showSearch
      placeholder={data[0].type}
      optionLabelProp="label"
      status="warning"
      style={{ width: '200px' }}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      allowClear
    >
      {
        data.map((item) => {
          return (
            <Option value={item.name} label={item.name}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: '10px'
                }}>
                  <img src={item.src} alt={item.alt} style={{ objectFit: 'cover', width: '100%' }} />
                </div>
                <div>
                  {item.name}
                </div>
              </div>
            </Option>
          )
        })
      }
    </Select >
  );
}

export default S