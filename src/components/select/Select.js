import { Select, Tooltip } from 'antd';
import React, { useState, useMemo } from 'react';
const { Option } = Select;

const maxNameLength = 30

const S = ({ data, onChange, type }) => {
  const shortenName = (name) => {
    if (name.length > maxNameLength) {
      return name.slice(0, maxNameLength) + "..."
    }
    return name
  }

  const [arrow,] = useState('Show');
  const mergedArrow = useMemo(() => {
    if (arrow === 'Hide') {
      return false;
    }

    if (arrow === 'Show') {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  return (
    <Select
      showSearch
      placeholder={type}
      optionLabelProp="label"
      status="warning"
      style={{ width: '300px' }}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      onChange={onChange}
      allowClear
    >
      {
        data.length !== 0 ?
          data.map((item) => {
            return (
              <Option value={item.name} label={item.name} key={item.name}>
                <Tooltip placement="rightTop" title={item.name} arrow={mergedArrow}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      width: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      marginRight: '10px'
                    }}>
                      <img src={item.image} alt={item.name} style={{ objectFit: 'cover', width: '100%' }} />
                    </div>
                    <div>
                      {shortenName(item.name)}
                    </div>
                  </div>
                </Tooltip>
              </Option>
            )
          }) :
          ""
      }
    </Select >
  );
}

export default S