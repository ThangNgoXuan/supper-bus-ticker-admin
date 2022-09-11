import { Table, Typography } from "antd";
import React from "react";

export default function Ticket() {

  const columns = [
    {
      title: "Mã vé",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Người đặt",
      dataIndex: "orderer",
      key: "orderer",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Thời gian đi",
      dataIndex: "derparture",
      key: "derparture",
    },
    {
      title: "Tuyến",
      dataIndex: "route",
      key: "route",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
  ]

  const dataTableTicket = new Array(30).fill({
    id: '1',
    orderer: 'Ngô Xuân Thắng',
    phone: '0337930954',
    derparture: '20/09/2022',
    route: 'Bình Dương => Bình Định',
    status: 'Hoành thành',
  })
  const { Title } = Typography;
  return (
    <div className="p-ticket">
      <div className="p-ticket_header">
        <Title level={2}>Quản lí vé xe</Title>
      </div>
      <div className="p-ticket_table">
        <Table columns={columns} dataSource={dataTableTicket}/>
      </div>
    </div>
  );
}
