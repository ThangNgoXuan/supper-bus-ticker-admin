import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import React from "react";
import useFetch from "../../hooks/useFetch";
import routerApi from "../../api/routerApi";
import { useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import useValues from "../../hooks/useValues";

export default function Routes() {
  const { Title, Text } = Typography;
  const { Option } = Select;
  const [values, setValues] = useValues({
    open: false,
  });

  /* eslint-disable-next-line */
  const [loading, data, _, fetch, refetch] = useFetch(
    {},
    routerApi.getAllRoute
  );

  useEffect(() => {
    fetch({}, true);
    /* eslint-disable-next-line */
  }, []);

  console.log(data);

  const columns = [
    {
      title: "STT",
      dataIndex: "_id",
      render: (index) => (
        <span>{(index = data.findIndex((x) => x._id === index) + 1)}</span>
      ),
    },
    {
      title: "Tuyến đường",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Điểm đầu",
      dataIndex: "from",
      key: "from",
      render: (index) => {
        return index?.name;
      },
    },
    {
      title: "Điểm cuối",
      dataIndex: "to",
      key: "to",
      render: (index) => {
        return index?.name;
      },
    },
    {
      title: "Lịch trình",
      dataIndex: "list",
      key: "list",
    },
    {
      title: "Thời gian",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Khoảng cách",
      dataIndex: "distance",
      key: "distance",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
    },
    {
      dataIndex: "function",
      key: "function",
      render: () => (
        <div className="p-news_table_button">
          <Button onClick={handleDelete} type="primary">
            Xóa
          </Button>
          <Button onClick={handleOpenUpdate} type="primary">
            Cập nhật
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = () => {
    notification.open({
      message: "Xóa thành công",
    });
  };

  const handleOpen = () => {
    setValues({
      open: true,
    });
  };

  const handleClose = () => {
    setValues({
      open: false,
    });
  };

  const onFinish = (data) => {
    console.log(data);
    handleClose();
    notification.open({
      message: "Tạo thành công",
    });
  };

  const handleOpenUpdate = () => {};

  return (
    <div className="p-typeCoach">
      <div>
        <Title level={4}>Quản lí tuyến đường</Title>
      </div>
      <div className="p-typeCoach_typeCoach_header">
        <Button onClick={handleOpen} type="primary" size="large">
          <PlusOutlined />
          Tạo mới
        </Button>
      </div>
      <div className="p-routes_table">
        <Table columns={columns} dataSource={data} loading={loading} />
      </div>
      <div className="p-routes_modal">
        <Modal
          title="Tạo tuyến xe mới"
          visible={values.open}
          onCancel={handleClose}
          maskClosable={false}
          footer={[
            <>
              <Button
                style={{ backgroundColor: "#001c6b", color: "white" }}
                onClick={handleClose}
              >
                Hủy
              </Button>
              <Button
                style={{ backgroundColor: "#001c6b", color: "white" }}
                form="formRouter"
                type="primary"
                htmlType="submit"
              >
                Tạo
              </Button>
            </>,
          ]}
        >
          <Form layout="vertical" id="formRouter" onFinish={onFinish}>
            <Form.Item name="name" label="Tên chuyến">
              <Input placeholder="Nhập tên chuyến" />
            </Form.Item>
            <Row>
              <Col span={11}>
                <Form.Item name="start" label="Điểm đầu">
                  <Input placeholder="Nhập điểm đầu" />
                </Form.Item>
              </Col>
              <Col span={2}></Col>
              <Col span={11}>
                <Form.Item name="end" label="Điểm cuối">
                  <Input placeholder="Nhập điểm cuối" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item name="distance" label="Khoảng cách:">
                  <InputNumber />
                  <Text> KM</Text>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="duration" label="Thời gian:">
                  <InputNumber />
                  <Text> Phút</Text>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="price" label="Giá tiền:">
                  <InputNumber />
                  <Text> VNĐ</Text>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Lịch trình">
              <Select>
                <Option>Lịch trình 1</Option>
                <Option>Lịch trình 2</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
