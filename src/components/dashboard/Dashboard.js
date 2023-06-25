import { Card } from 'antd'
import SideMenu from '../side-menu/SideMenu';
const DashBoard = () => (
  <div style={{ backgroundColor: 'rgb(240, 242, 245)', height: '100vh' }}>
    <div style={{ left: '20px', top: '20px', zIndex: '2', position: 'absolute' }}>
      <SideMenu />
    </div>
    <div style={{ textAlign: 'center', padding: '20px 0' }}>Dashboard</div>
    <div style={{ display: 'flex', justifyContent: 'center', width: '80%', margin: 'auto' }}>
      <div style={{ width: '33%', padding: '20px' }}>
        <Card title="Top 3 trending" bordered={false}>
          <div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
          </div>
        </Card>
      </div>
      <div style={{ width: '33%', padding: '20px' }}>
        <Card title="Top 3 gainers" bordered={false}>
          <div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
          </div>
        </Card>
      </div>
      <div style={{ width: '33%', padding: '20px' }}>
        <Card title="Top 3 losers" bordered={false}>
          <div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
          </div>
        </Card>
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', width: '80%', margin: 'auto' }}>
      <div style={{ width: '33%', padding: '20px' }}>
        <Card title="Top 3 trading volume" bordered={false}>
          <div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
          </div>
        </Card>
      </div>
      <div style={{ width: '33%', padding: '20px' }}>
        <Card title="Top 3 trending" bordered={false}>
          <div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
          </div>
        </Card>
      </div>
      <div style={{ width: '33%', padding: '20px' }}>
        <Card title="Top 3 trending" bordered={false}>
          <div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
          </div>
        </Card>
      </div>
    </div>
  </div>
);
export default DashBoard;