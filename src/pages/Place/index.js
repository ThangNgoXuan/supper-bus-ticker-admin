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

export default function Place() {
  const { Title } = Typography;
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tỉnh",
      dataIndex: "province",
      key: "province",
    },
    {
      title: "Khởi hành",
      dataIndex: "place",
      key: "place",
    },
    {
      title: "Địa điểm đón",
      dataIndex: "listPlace",
      key: "listPlace",
    },
    {
      dataIndex: "function",
      key: "function",
      render: () => (
        <div className="p-recruit_table_button">
          <Button type="primary" onClick={handleDelete}>
            Xóa
          </Button>
          <Button type="primary" onClick={handleOpenUpdate}>Cập nhật</Button>
        </div>
      ),
    },
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    notification.open({
      message: "Xóa thành công",
    })
  }

  const listData = new Array(30).fill({
    id: "1",
    place: "An Nhơn",
    province: "Bình Định",
    listPlace: ["Bến xe ngựa", "Nhơn hạnh", "Nhơn Phong"],
  });

  const handleSubmit = () => {
    notification.open({
      message: "Thêm thành công",
    });
    handleClose();
  };

  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleSubmitUpdate = () => {
    notification.open({
      message: "Cập nhật thành công",
    });
    handleCloseUpdate();
  };
  return (
    <div className="p-place">
      <div className="p-place_title">
        <Title level={2}>Địa điểm đón khách</Title>
        <Button onClick={handleOpen} type="primary" size="large">
          Thêm mới
        </Button>
      </div>
      <div className="p-place">
        <Table columns={columns} dataSource={listData} />
      </div>
      <div className="p-place_modalUpdate">
        <Modal
          title="Tạo địa điểm mới"
          visible={open}
          footer={[
            <>
              <Button onClick={handleClose}>Hủy</Button>
              <Button form="formplace" htmlType="submit">
                Tạo
              </Button>
            </>,
          ]}
          onCancel={handleClose}
        >
          <Form id="formplace" onFinish={handleSubmit} layout="vertical">
            <Form.Item label="Tỉnh thành">
              <Input placeholder="Vui lòng nhập tỉnh" />
            </Form.Item>
            <Form.Item label="Điểm khởi hành">
              <Input placeholder="Nhập điểm khởi hành" />
            </Form.Item>

            <Form.Item label="Điểm đón">
              <Input placeholder="Nhập điểm đón" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className="p-place_modal">
        <Modal
          title="Cập nhật địa điểm"
          visible={openUpdate}
          footer={[
            <>
              <Button onClick={handleCloseUpdate}>Hủy</Button>
              <Button form="formplaceupdate" htmlType="submit">
                Cập nhật
              </Button>
            </>,
          ]}
          onCancel={handleCloseUpdate}
        >
          <Form id="formplaceupdate" onFinish={handleSubmitUpdate} layout="vertical">
            <Form.Item label="Tỉnh thành">
              <Input placeholder="Vui lòng nhập tỉnh" />
            </Form.Item>
            <Form.Item label="Điểm khởi hành">
              <Input placeholder="Nhập điểm khởi hành" />
            </Form.Item>

            <Form.Item label="Điểm đón">
              <Input placeholder="Nhập điểm đón" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
