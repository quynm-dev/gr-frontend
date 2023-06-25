import {
  DollarOutlined,
  PieChartOutlined,
  PartitionOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useState } from 'react';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Dashboard', '1', <PieChartOutlined />),
  getItem('Analysis', '2', <PartitionOutlined />),
  getItem('Price', '3', <DollarOutlined />),
];
const getSelectedKeys = () => {
  let currentURL = window.location.href
  if (currentURL.indexOf("analysis") !== -1) {
    return ['2']
  }
  if (currentURL.indexOf("usd-rate") !== -1) {
    return ['3']
  }
  return ['1']
}
const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const handleClick = ({ key }) => {
    switch (key) {
      case '2':
        window.location.href = 'http://localhost:3000/analysis'
        break
      case '3':
        window.location.href = 'http://localhost:3000/usd-rate'
        break
      default:
        window.location.href = 'http://localhost:3000'
        break
    }
  }
  return (
    <div
      style={{
        width: '200px',
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        style={{ borderRadius: '10px' }}
        onClick={handleClick}
        selectedKeys={getSelectedKeys()}
      />
    </div>
  );
};
export default SideMenu;