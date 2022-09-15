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

export default function Schema() {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const { Title } = Typography;
  const columnsSchema = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Tên",
      key: "name",
      dataIndex: "name",
    },
    {
      key: "function",
      dataIndex: "function",
      render: () => (
        <>
          <Button onClick={handleDelete}>Xóa</Button>
          <Button onClick={handleOpenUpdate}>Cập nhật</Button>
        </>
      ),
    },
  ];

  const dataSchema = [
    {
      id: "1",
      name: "sơ đồ xe 16 chỗ",
    },
    {
      id: "2",
      name: "sơ đồ xe limousin",
    },
    {
      id: "3",
      name: "sơ đồ xe giường nằm",
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
      <div className="p-schema_title">
        <Title>Sơ đồ xe</Title>
      </div>
      <div className="p-schema_table">
        <Table columns={columnsSchema} dataSource={dataSchema} />
      </div>
      <div className="p-schema_button">
        <Button onClick={handleOpen}>Tạo mơi</Button>
      </div>

      <div className="p-schema_modal">
        <Modal
          title="Tạo sơ đồ xe mới"
          visible={open}
          onCancel={handleClose}
          footer={[
            <>
              <Button onClick={handleClose}>Hủy</Button>
              <Button htmlType="submit" form="formSchema">
                Tạo
              </Button>
            </>,
          ]}
        >
          <Form onFinish={onFinish} id="formSchema" layout="vertical">
            <Form.Item label="Loại xe" name="name">
              <Input placeholder="Nhập loại xe" />
            </Form.Item>
            <Form.Item label="Sơ đồ ghế" name="schema">
              <Input placeholder="Nhập sơ đồ ghế" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className="p-schema_modalUpdate">
        <Modal
          title="Cập nhật sơ đồ xe"
          visible={openUpdate}
          onCancel={handleCloseUpdate}
          footer={[
            <>
              <Button onClick={handleCloseUpdate}>Hủy</Button>
              <Button htmlType="submit" form="formSchemaUpdate">
                Cập nhật
              </Button>
            </>,
          ]}
        >
          <Form onFinish={onFinishUpdate} id="formSchemaUpdate" layout="vertical">
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
