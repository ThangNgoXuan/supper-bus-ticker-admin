import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Typography,
} from "antd";
import React, { useState } from "react";

export default function Booking() {
  const [open, setOpen] = useState(false);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFinish = (data) => {
    console.log(data);
    notification.open({
      message: "Đặt thành công",
    });
    handleClose();
  };

  const { Option } = Select;
  const { Title } = Typography;

  const booking = new Array(35).fill({
    id: "a12",
    name: "Ngô Xuân Thăng",
    place: "Điểm đón",
    status: false,
  });

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
        <div className="p-booking_filter_date">
          <Title level={3}>Chọn ngày đi</Title>
          <DatePicker />
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
        <div className="p-booking_filter_place">
          <Title level={3}>Chọn xe</Title>
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
      </div>
      <div className="p-booking_list">
        {booking.map((item, index) => (
          <div
            className="p-booking_list_item"
            key={`p-booking_list_item-${index.toString()}`}
          >
            <Title level={5}>Ghế: {item.id}</Title>
            {item.status ? (
              <div>
                <Title level={5}>Người đặt: {item.name}</Title>
                <Title level={5}>Điểm đón: {item.place}</Title>
              </div>
            ) : (
              <Button onClick={handleOpen}>+</Button>
            )}
          </div>
        ))}
      </div>
      <div className="p-booking_modal">
        <Modal
          onCancel={handleClose}
          title="Đặt vé"
          visible={open}
          footer={[
            <>
              <Button onClick={handleClose}>Hủy</Button>
              <Button htmlType="submit" form="formBooking">
                Đặt
              </Button>
            </>,
          ]}
        >
          <Form layout="vertical" onFinish={onFinish} id="formBooking">
            <Form.Item label="Người đặt" name="name">
              <Input placeholder="Nhập tên người đặt" />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phone">
              <Input placeholder="Nhập số điện thoại" type="number" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input placeholder="Nhập email" type="email" />
            </Form.Item>
            <Form.Item>
              <Title level={5}>Chọn điểm đón</Title>
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
            </Form.Item>
            <Form.Item>
              <Checkbox>Gửi gmail</Checkbox>
              <Checkbox>In vé</Checkbox>
            </Form.Item>
            <Form.Item label="Giá vé">
              <Input value={200.0} />
            </Form.Item>
            <Form.Item label="Thanh toán">
              <Checkbox>Đã thanh toán</Checkbox>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
