import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Table,
  Typography,
} from "antd";
import React, { useState } from "react";

export default function Routes() {
  const { Title } = Typography;
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tuyến đường",
      dataIndex: "route",
      key: "route",
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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFinish = (data) => {
    console.log(data);
    handleClose();
    notification.open({
      message: "Tạo thành công",
    });
  };

  const onFinishUpdate = (data) => {
    console.log(data);
    notification.open({
      message: "Cập nhật thành công",
    });
    handleCloseUpdate();
  };

  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const data = new Array(30).fill({
    id: "1",
    route: "Bình Dương => Bình Định",
    start: "Bình Dương",
    end: "Bình Định",
    list: ["An Nhơn", "An Nhơn", "An Nhơn"],
    schedule: ["08:00 -> 20:30", "08:00 -> 20:30"]
  });

  return (
    <div className="p-routes">
      <div className="p-routes">
        <Title level={2}>Quản lí tuyến xe</Title>
        <Button onClick={handleOpen}>Tạo mới</Button>
      </div>
      <div className="p-routes_table">
        <Table columns={columns} dataSource={data} />
      </div>
      <div className="p-routes_modal">
        <Modal
          title="Tạo tuyến xe mới"
          visible={open}
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
      <div className="p-routes_modalUpdate">
        <Modal
          title="Cập nhật tuyến xe"
          visible={openUpdate}
          footer={[
            <>
              <Button onClick={handleCloseUpdate}>Hủy</Button>
              <Button form="formRouterUpdate" type="primary" htmlType="submit">
                Tạo
              </Button>
            </>,
          ]}
        >
          <Form layout="" id="formRouterUpdate" onFinish={onFinishUpdate}>
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
