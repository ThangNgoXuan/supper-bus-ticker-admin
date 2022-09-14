import { Button, Table, Typography } from 'antd'
import React, { useState } from 'react'

export default function Place() {
  const {Title } = Typography;
  const [open, setOpen] = useState();
  const columns = [
    {
        title: 'Địa điểm',
        dataIndex: 'place',
        key: 'place',
    },
  ]
    return (
    <div className='p-place'>
    <div className='p-place_title'>
        <Title level={2}>Địa điểm đón khách</Title>
        <Button type="primary" size="large" >Thêm mới</Button>
    </div>
    <div className='p-place'>
        <Table columns={columns}/>
    </div>

    </div>
  )
}
