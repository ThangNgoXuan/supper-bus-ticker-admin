import { Button, Table, Typography } from "antd";
import React from "react";

export default function Routes() {
  const { Title } = Typography;

  const columns = [
    {
        title: "Mã chuyến xe",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Tuyến đường",
        dataIndex: "route",
        key: "route",
    },
    {
        title: "Xe chạy",
        dataIndex: "coach",
        key: "coach",
    },
    {
        title: "Loại xe",
        dataIndex: "typeCoach",
        key: "typeCoach",
    },
    {
        title: "Trạng thái",
        dataIndex: "route",
        key: "route",
    },
    {
        title: "Ghế đã đặt",
        dataIndex: "book",
        key: "book",
    },
    {
        title: "Ghế chưa đặt",
        dataIndex: "noBook",
        key: "noBook",
    },
    {
        dataIndex: "function",
        key: "function",
        render: () => (
            <div className="p-news_table_button">
              <Button type="primary">Xem</Button>
              <Button type="primary">Đặt vé</Button>
            </div>
          ),
    },
  ]

  const data = new Array(30).fill({
    id: '1',
    route: 'Bình Dương => Bình Định',
    coach: '77A 24359',
    typeCoach: "Xe limousin",
    status: "Đang chạy",
    book: 33,
    noBook: 2,
  })

  return (
    <div className="p-routes">
      <div className="p-routes">
        <Title level={2}>Quản lí tuyến xe</Title>
      </div>
      <div className="p-routes_table">
        <Table columns={columns} dataSource={data}/>
      </div>
    </div>
  );
}
