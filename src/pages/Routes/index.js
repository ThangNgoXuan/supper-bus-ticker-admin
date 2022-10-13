import {
  Button,
  Form,
  Input,
  Modal,
  notification,
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
  const { Title } = Typography;
  const [values, setValues] = useValues({
    open: false,
  })

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
      title: "ID",
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
      dataIndex: "start",
      key: "start",
    },
    {
      title: "Điểm cuối",
      dataIndex: "end",
      key: "end",
    },
    {
      title: "Danh sách điểm đón",
      dataIndex: "list",
      key: "list",
    },
    {
      title: "Danh sách lịch trình",
      dataIndex: "schedule",
      key: "schedule",
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
    })
  };

  const handleClose = () => {
    setValues({
      open: false
    })
  };

  const onFinish = (data) => {
    console.log(data);
    handleClose();
    notification.open({
      message: "Tạo thành công",
    });
  };

  const handleOpenUpdate = () => {

  };

  return (
    <div className="p-typeCoach">
      <div>
        <Title level={4}>Quản lí tuyến xe</Title>
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
              <Button onClick={handleClose}>Hủy</Button>
              <Button form="formRouter" type="primary" htmlType="submit">
                Tạo
              </Button>
            </>,
          ]}
        >
          <Form layout="" id="formRouter" onFinish={onFinish}>
            <Form.Item name="name" label="Tên chuyến">
              <Input placeholder="Vui lòng nhập tên chuyến" />
            </Form.Item>
            <Form.Item name="start" label="Điểm đầu">
              <Input placeholder="Vui lòng nhập điểm đầu" />
            </Form.Item>
            <Form.Item name="end" label="Điểm cuối">
              <Input placeholder="Vui lòng nhập điểm cuối" />
            </Form.Item>
            <Form.Item name="list" label="Điểm đón">
              <Input placeholder="Vui lòng nhập điểm đón" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
