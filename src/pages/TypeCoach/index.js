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

export default function TypeCoach() {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const { Title } = Typography;
  const columnsTypeCoach = [
    {
      title: "Stt",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Loại xe",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Sơ đồ ghế",
      dataIndex: "schema",
      key: "schema",
    },
    {
      title: "",
      dataIndex: "function",
      key: "function",
      render: () => (
        <div className="p-recruit_table_button">
          <Button type="primary" onClick={handleDeleteType}>
            Xóa
          </Button>
          <Button onClick={handleOpenUpdate} type="primary">
            Cập nhật
          </Button>
        </div>
      ),
    },
  ];

  const listCoachType = new Array(3).fill({
    id: "1",
    name: "Xe 36 chỗ",
    schema: "sơ đồ 1",
  });

  const handleDeleteType = () => {
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

  return (
    <div className="p-schema">
      <div>
        <Title>Quản lí loại xe</Title>
      </div>
      <div className="p-schema_type">
        <div className="p-schema_typeCoach_header">
          <Title level={5}>Loại xe</Title>
          <Button type="primary" onClick={handleOpen}>
            Tạo mới
          </Button>
        </div>
        <Table columns={columnsTypeCoach} dataSource={listCoachType}></Table>
      </div>
      <div className="p-schema_modalTypeCoach">
        <Modal
          title="Tạo loại xe mới"
          visible={open}
          onCancel={handleClose}
          footer={[
            <>
              <Button onClick={handleClose}>Hủy</Button>
              <Button htmlType="submit" form="formTypeCoach">
                Tạo
              </Button>
            </>,
          ]}
        >
          <Form onFinish={onFinish} id="formTypeCoach" layout="vertical">
            <Form.Item label="Loại xe" name="name">
              <Input placeholder="Nhập loại xe" />
            </Form.Item>
            <Form.Item label="Sơ đồ ghế" name="schema">
              <Input placeholder="Nhập sơ đồ ghế" />
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <div className="p-schema_modalTypeCoachUpdate">
        <Modal
          title="Cập nhật loại xe"
          visible={openUpdate}
          onCancel={handleCloseUpdate}
          footer={[
            <>
              <Button onClick={handleCloseUpdate}>Hủy</Button>
              <Button htmlType="submit" form="formTypeCoachUpdate">
                Cập nhật
              </Button>
            </>,
          ]}
        >
          <Form onFinish={onFinishUpdate} id="formTypeCoachUpdate" layout="vertical">
            <Form.Item label="Loại xe" name="name">
              <Input placeholder="Nhập loại xe" />
            </Form.Item>
            <Form.Item label="Sơ đồ ghế" name="schema">
              <Input placeholder="Nhập sơ đồ ghế" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
