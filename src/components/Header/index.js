import React from 'react';
import { Image, Layout, Typography } from 'antd';

const account = {
  img: 'https://picsum.photos/200',
  name: 'Thang Ngo'
}

export default function Header() {

  const { Header } = Layout;
  const { Title} = Typography;

  return (
    <Header>
        <div className='header-account'>
          <Image preview={false} src={account.img}/>
          <Title level={5}>{account.name}</Title>
        </div>
    </Header>
  )
}
