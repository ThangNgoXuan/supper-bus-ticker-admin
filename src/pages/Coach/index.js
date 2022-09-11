import { Table, Typography, Button, DatePicker } from "antd";
import moment from "moment";
import React from "react";
import { dateFormat } from "../../utils";

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
      title: "Trạng thái xe",
      dataIndex: "status",
      key: "status",
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
          <Button type="primary">Xóa</Button>
          <Button type="primary">Cập nhật</Button>
        </div>
      ),
    },
  ];

const listCoachType = new Array(3).fill({
  id: '1',
  name: 'Xe 36 chỗ',
  schema: 'sơ đồ 1'
})

const listCoach = new Array(3).fill({
  id: '24.359',
  name: 'Xe giường năm',
  status: 'Bận',
  position: 'Vị trí 1',
})
  const { Title } = Typography;

  return (
    <div className="p-coach">
      <Title level={2}>Quản lí xe</Title>
      <div className="p-coach_titleWrap">
        <div className="p-coach_typeFilter">
          <Title level={5}>Trạng thái xe theo ngày</Title>
          <DatePicker
            defaultValue={moment("09/09/2022", dateFormat)}
            format={dateFormat}
          />
        </div>
        <div className="p-coach_typeCoach">
          <div className="p-coach_typeCoach_header">
          <Title level={5}>Loại xe</Title>
          <Button type="primary">Tạo mới</Button>
          </div>
          <Table
            columns={columnsTypeCoach}
            dataSource={listCoachType}
          ></Table>
        </div>
      </div>

      <div className="p-coach_tableDetail">
        <Table
          dataSource={listCoach}
          columns={columns}
        />
      </div>
    </div>
  );
}
