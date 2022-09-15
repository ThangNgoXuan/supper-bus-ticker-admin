import { DatePicker, Select, Typography } from "antd";
import React from "react";

export default function Booking() {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const { Option } = Select;
  const { Title } = Typography;

  return (
    <div className="p-booking">
      <div className="p-booking_filter">
        <div className="p-booking_filter_schedule">
          <Title level={3}>Chọn tuyến</Title>
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </div>
        <div className="p-booking_filter_place">
          <Title level={3}>Chọn điểm đón</Title>
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value="jack">Nhơn Hạnh</Option>
            <Option value="lucy">Nhơn Phong</Option>
            <Option value="tom">Nhơn An</Option>
          </Select>
        </div>
        <div className="p-booking_filter_shift">
          <Title level={3}>Chọn ca</Title>
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value="jack">Nhơn Hạnh</Option>
            <Option value="lucy">Nhơn Phong</Option>
            <Option value="tom">Nhơn An</Option>
          </Select>
        </div>
        <div className="p-booking_filter_date">
          <Title level={3}>Chọn ngày đi</Title>
          <DatePicker/>
        </div>
      </div>
    </div>
  );
}
