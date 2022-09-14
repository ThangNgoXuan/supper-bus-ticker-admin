import { Button, notification, Table, Typography } from "antd";
import React from "react";

export default function User() {
  const { Title } = Typography;

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Hóa đơn",
      dataIndex: "receip",
      key: "receip",
    },
    {
      dataIndex: "function",
      key: "function",
      render: () => (
        <div className="p-news_table_button">
          <Button type="primary" onClick={handleDelete}>Xóa</Button>
          <Button type="primary">Cập nhật</Button>
        </div>
      ),
    },
  ];

  const handleDelete = () => {
    notification.open({
      message: 'Xóa thành công'
    })
  }

  const data = new Array(30).fill({
    id: "10",
    name: "Ngô Xuân Thang",
    email: "thangnx.it@gmail.com",
    phone: "0337930954",
    receip: ["123", "345"],
  });

  return (
    <div className="p-user">
      <div className="p-user_title">
        <Title level={2}>Quản lí người dùng</Title>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
