import { Button, Table, Typography } from "antd";
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
    {
      dataIndex: "function",
      key: "function",
      render: () => (
        <>
          <Button>In vé</Button>
        </>
      ),
    },
  ];

  const dataJS = [
    {
      id: "1",
      orderer: "Ngô Xuân Thắng",
      phone: "0337930954",
      derparture: "20/09/2022",
      route: "Bình Dương => Bình Định",
      status: "Hoành thành",
    },
    {
      id: "2",
      orderer: "Ngô Xuân Thắng",
      phone: "0337930954",
      derparture: "20/09/2022",
      route: "Bình Dương => Bình Định",
      status: "Hoành thành",
    },
    {
      id: "3",
      orderer: "Ngô Xuân Thắng",
      phone: "0337930954",
      derparture: "20/09/2022",
      route: "Bình Dương => Bình Định",
      status: "Hoành thành",
    },
    {
      id: "4",
      orderer: "Ngô Xuân Thắng",
      phone: "0337930954",
      derparture: "20/09/2022",
      route: "Bình Dương => Bình Định",
      status: "Hoành thành",
    },
    {
      id: "5",
      orderer: "Ngô Xuân Thắng",
      phone: "0337930954",
      derparture: "20/09/2022",
      route: "Bình Dương => Bình Định",
      status: "Hoành thành",
    },
    {
      id: "6",
      orderer: "Ngô Xuân Thắng",
      phone: "0337930954",
      derparture: "20/09/2022",
      route: "Bình Dương => Bình Định",
      status: "Hoành thành",
    },
    {
      id: "7",
      orderer: "Ngô Xuân Thắng",
      phone: "0337930954",
      derparture: "20/09/2022",
      route: "Bình Dương => Bình Định",
      status: "Hoành thành",
    },
    {
      id: "8",
      orderer: "Ngô Xuân Thắng",
      phone: "0337930954",
      derparture: "20/09/2022",
      route: "Bình Dương => Bình Định",
      status: "Hoành thành",
    },
    {
      id: "9",
      orderer: "Ngô Xuân Thắng",
      phone: "0337930954",
      derparture: "20/09/2022",
      route: "Bình Dương => Bình Định",
      status: "Hoành thành",
    },
    {
      id: "10",
      orderer: "Ngô Xuân Thắng",
      phone: "0337930954",
      derparture: "20/09/2022",
      route: "Bình Dương => Bình Định",
      status: "Hoành thành",
    },
    {
      id: "11",
      orderer: "Ngô Xuân Thắng",
      phone: "0337930954",
      derparture: "20/09/2022",
      route: "Bình Dương => Bình Định",
      status: "Hoành thành",
    },
    {
      id: "12",
      orderer: "Ngô Xuân Thắng",
      phone: "0337930954",
      derparture: "20/09/2022",
      route: "Bình Dương => Bình Định",
      status: "Hoành thành",
    },
    {
      id: "13",
      orderer: "Ngô Xuân Thắng",
      phone: "0337930954",
      derparture: "20/09/2022",
      route: "Bình Dương => Bình Định",
      status: "Hoành thành",
    },
    {
      id: "14",
      orderer: "Ngô Xuân Thắng",
      phone: "0337930954",
      derparture: "20/09/2022",
      route: "Bình Dương => Bình Định",
      status: "Hoành thành",
    },
    {
      id: "15",
      orderer: "Ngô Xuân Thắng",
      phone: "0337930954",
      derparture: "20/09/2022",
      route: "Bình Dương => Bình Định",
      status: "Hoành thành",
    },
    {
      id: "16",
      orderer: "Ngô Xuân Thắng",
      phone: "0337930954",
      derparture: "20/09/2022",
      route: "Bình Dương => Bình Định",
      status: "Hoành thành",
    },
    {
      id: "17",
      orderer: "Ngô Xuân Thắng",
      phone: "0337930954",
      derparture: "20/09/2022",
      route: "Bình Dương => Bình Định",
      status: "Hoành thành",
    },
    {
      id: "18",
      orderer: "Ngô Xuân Thắng",
      phone: "0337930954",
      derparture: "20/09/2022",
      route: "Bình Dương => Bình Định",
      status: "Hoành thành",
    },
    {
      id: "19",
      orderer: "Ngô Xuân Thắng",
      phone: "0337930954",
      derparture: "20/09/2022",
      route: "Bình Dương => Bình Định",
      status: "Hoành thành",
    },
    {
      id: "20",
      orderer: "Ngô Xuân Thắng",
      phone: "0337930954",
      derparture: "20/09/2022",
      route: "Bình Dương => Bình Định",
      status: "Hoành thành",
    },
  ];

  const { Title } = Typography;
  return (
    <div className="p-ticket">
      <div className="p-ticket_header">
        <Title level={2}>Quản lí vé xe</Title>
      </div>
      <div className="p-ticket_table">
        <Table columns={columns} dataSource={dataJS} />
      </div>
    </div>
  );
}
