import {
  Table,
  Typography,
  Button,
  notification,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import React from "react";
import { useState } from "react";

export default function Coach() {
  const { Title } = Typography;
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const columns = [
    {
      title: "Biển số xe",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Loại xe",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tuyến vận chuyển",
      dataIndex: "schedule",
      key: "schedule",
    },
    {
      title: "Vị trí xe",
      dataIndex: "position",
      key: "position",
    },
    {
      dataIndex: "function",
      key: "function",
      render: () => (
        <div className="p-news_table_button">
          <Button type="primary" onClick={handleDelete}>
            Xóa
          </Button>
          <Button type="primary" onClick={handleOpenUpdate}>
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

  const listCoach = new Array(3).fill({
    id: "24.359",
    name: "Xe giường năm",
    schedule: "Sài gòn -> đà nẵng",
    position: "Vị trí 1",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFinish = (data) => {
    console.log(data);
    notification.open({
      message: "Tạo thành công",
    });
    handleClose();
  };

  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const onFinishUpdate = (data) => {
    console.log(data);
    notification.open({
      message: "Cập nhật thành công",
    });
    handleCloseUpdate();
  };

  // Pull Down
  const { Option } = Select;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <div className="p-coach">
      <Title level={2}>Quản lí xe</Title>
      <Button onClick={handleOpen}>Tạo mới</Button>
      <div className="p-coach_tableDetail">
        <Table dataSource={listCoach} columns={columns} />
      </div>
      <div className="p-coach_modal">
        <Modal
          title="Tạo xe mới"
          visible={open}
          onCancel={handleClose}
          footer={[
            <>
              <Button onClick={handleClose}>Hủy</Button>
              <Button htmlType="submit" form="formCoach">
                Tạo
              </Button>
            </>,
          ]}
        >
          <Form layout="vertical" id="formCoach" onFinish={onFinish}>
            <Form.Item label="Biển số xe">
              <Input placeholder="Vui lòng nhập biển số xe" />
            </Form.Item>
            <Form.Item label="Category">
              <Select
                showSearch
                onSearch={onSearch}
                onChange={onChange}
                name="category"
                placeholder="Please select a category"
              >
                <Option value="Fruit">Fruit</Option>
                <Option value="Vegetable">Vegetable</Option>
                <Option value="Poultry">Poultry</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className="p-coach_modalUpdate">
        <Modal
          title="Tạo xe mới"
          visible={openUpdate}
          onCancel={handleCloseUpdate}
          footer={[
            <>
              <Button onClick={handleCloseUpdate}>Hủy</Button>
              <Button htmlType="submit" form="formCoachUpdate">
                Cập nhật
              </Button>
            </>,
          ]}
        >
          <Form
            layout="vertical"
            id="formCoachUpdate"
            onFinish={onFinishUpdate}
          >
            <Form.Item label="Biển số xe">
              <Input placeholder="Vui lòng nhập biển số xe" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
