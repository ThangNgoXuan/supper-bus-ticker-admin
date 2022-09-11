import { Table, Typography } from 'antd'
import React from 'react'

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
  ]

  const dataTableTicket = new Array(30).fill({
    id: '1',
    name: 'Ngô Xuân Thắng',
    status: 'Bận',
  })

  return (
    <div className='p-driver'>
      <div className='p-driver_header'>
        <Title level={4}>Quản lí tài xế</Title>
      </div>
      <div className='p-driver_title'>
        <Table columns={columns} dataSource={dataTableTicket}/>
      </div>
    </div>
  )
}
