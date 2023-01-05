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
import React, { useEffect, useState } from "react";
import routerApi from '../../api/routerApi'
import useValues from "../../hooks/useValues";
export default function Booking() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useValues({
    selectedFrom: "",
    selectedTo: "",
    selectedTime: new Date(),
    listRoutes: [],
    listRoutesCustom: [],
  });

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

  const originData = [];
  for (let i = 0; i < 10; i++) {
    originData.push({
      id: i.toString(),
      name: `Edrward ${i}`,
      place: `London Park no. ${i}`,
      status: i % 2 === 0 ? false : true,
    });
  }

  useEffect(() => {
    routerApi.getAllRoute().then((res) => {
      if (res?.status) {
        setValues({
          listRoutes: res?.data,
          listRoutesCustom: customRoutes(res?.data),
          selectedFrom: {
            label: res?.data[0]?.from?.name,
            value: res?.data[0]?.from?._id,
          },
          selectedTo: {
            label: res?.data[0]?.to?.name,
            value: res?.data[0]?.to?._id,
          },
        });
      }
    });
  }, []);

  const handleReset = () => {
    setValues({
      selectedFrom: {
        label: values?.listRoutes[0].from?.name,
        value: values?.listRoutes[0].from?._id,
      },
      selectedTo: {
        label: values?.listRoutes[0].to?.name,
        value: values?.listRoutes[0].to?._id,
      },
      listRoutesCustom: customRoutes(values.listRoutes),
    });
  };


  const handleChoose = (type, value) => {
    let from = values.listRoutesCustom.from;
    let to = values.listRoutesCustom.to;
    if (type === "from") {
      to = values.listRoutes
        .filter((item) => item.from._id === value.value)
        .map((item2) => ({
          label: item2?.to?.name,
          value: item2?.to?._id,
        }));
      setValues({
        listRoutesCustom: {
          to: to,
        },
      });
    } else if (type === "to") {
      from = values.listRoutes
        .filter((item) => item.to._id === value.value)
        .map((item2) => ({
          label: item2?.from?.name,
          value: item2?.from?._id,
        }));
      setValues({
        listRoutesCustom: {
          from: from,
        },
      });
    }
  };

  const customRoutes = (routes) => {
    let from = [];
    let to = [];

    if (Array.isArray(routes)) {
      //ban đầu
      routes.forEach((element) => {
        if (!from.find((item) => item?.value === element?.from?._id)) {
          from.push({ label: element?.from?.name, value: element?.from._id });
        }
        if (!to.find((item) => item?.value === element?.to?._id)) {
          to.push({ label: element?.to?.name, value: element?.to?._id });
        }
      });
    }
    return { from, to };
  };


  console.log("data", values.listRoutesCustom)

  return (
    <div className="p-booking">
      <div className="p-booking_filter">
        <div className="p-booking_filter_schedule">
          <Title level={3}>Điểm đi</Title>
          <Select
            placeholder="Chọn điểm đi"
            optionFilterProp="children"
            options={values.listRoutesCustom.from}
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.toLowerCase().includes(input.toLowerCase())
            }
          >
          </Select>
        </div>
        <div className="p-booking_filter_schedule">
          <Title level={3}>Điểm đến</Title>
          <Select
            placeholder="Chọn điểm đến"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            options={values.listRoutesCustom.to}
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
      </div>
      <div className="p-booking_list">
        {originData.map((item, index) => (
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
