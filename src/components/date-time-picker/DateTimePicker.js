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

const timePresets = [
  {
    label: 'Last 1 hours',
    value: [dayjs().add(-1, 'h'), dayjs()],
  },
  {
    label: 'Yesterday',
    value: [dayjs().add(-1, 'd'), dayjs()],
  },
  {
    label: 'Last 7 days',
    value: [dayjs().add(-7, 'd'), dayjs()],
  },
  {
    label: 'Last 30 days',
    value: [dayjs().add(-30, 'd'), dayjs()],
  },
  {
    label: 'Last 90 days',
    value: [dayjs().add(-90, 'd'), dayjs()],
  },
];

const DateTimePicker = ({ onChange }) => {
  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        disabledDate={disabledDate}
        status="warning"
        showTime={{
          hideDisabledOptions: true,
          defaultValue: [dayjs('00:00', 'HH:mm'), dayjs('11:59', 'HH:mm')],
        }}
        format="HH:mm DD-MM-YYYY"
        presets={timePresets}
        onChange={onChange}
      />
    </Space>
  )
};
export default DateTimePicker;