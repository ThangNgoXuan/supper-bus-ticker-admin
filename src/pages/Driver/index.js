import { Button, notification, Table, Typography } from "antd";
import React from "react";

export default function Driver() {
  const { Title } = Typography;

  const columns = [
    {
      title: "Mã tài xế",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên tài xế",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      dataIndex: "function",
      key: "function",
      render: () => (
        <div className="p-news_table_button">
          <Button onClick={handleDelete} type="primary">
            Xóa
          </Button>
          <Button type="primary">Cập nhật</Button>
        </div>
      ),
    },
  ];

  const handleDelete = () => {
    notification.open({
      message: "Xóa thành công",
    });
  };

  const dataTableTicket = new Array(30).fill({
    id: "1",
    name: "Ngô Xuân Thắng",
    status: "Bận",
  });

   return (
    <div className="p-typeCoach">
      <div>
        <Title level={4}>Quản lí trang tài xế</Title>
      </div>
      <Table
        style={{
          marginTop: "20px",
        }}
        columns={columns}
        dataSource={dataTableTicket}
      />
    </div>
  );
}
