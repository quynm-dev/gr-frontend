import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

// eslint-disable-next-line arrow-body-style
const disabledDate = (current) => {
  // Can not select days before today and today
  return current > dayjs().endOf('day');
};

const DateTimePicker = () => (
  <Space direction="vertical" size={12}>
    <RangePicker
      disabledDate={disabledDate}
      status="warning"
      showTime={{
        hideDisabledOptions: true,
        defaultValue: [dayjs('00:00', 'HH:mm'), dayjs('11:59', 'HH:mm')],
      }}
      format="HH:mm DD-MM-YYYY"
    />
  </Space>
);
export default DateTimePicker;