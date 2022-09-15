import { Table, Typography, Button } from "antd";
import React from "react";

export default function Coach() {
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
          <Button type="primary">Xóa</Button>
          <Button type="primary">Cập nhật</Button>
        </div>
      ),
    },
  ];

  const listCoach = new Array(3).fill({
    id: "24.359",
    name: "Xe giường năm",
    schedule: "Sài gòn -> đà nẵng",
    position: "Vị trí 1",
  });
  const { Title } = Typography;

  return (
    <div className="p-coach">
      <Title level={2}>Quản lí xe</Title>
      <div className="p-coach_titleWrap">
        <div className="p-coach_typeFilter">
          <Title level={5}>Trạng thái xe theo ngày</Title>
        </div>
        <div className="p-coach_typeCoach"></div>
      </div>

      <div className="p-coach_tableDetail">
        <Table dataSource={listCoach} columns={columns} />
      </div>
    </div>
  );
}
