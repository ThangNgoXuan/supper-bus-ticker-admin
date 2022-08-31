import React from 'react';
import { Layout, Typography } from 'antd';

export default function Footer() {
    const { Footer } = Layout;
    const { Title } = Typography;
  return (
    <Footer theme='dark'>
      <Title level={5}>Bus-ticker ©2018 Created by Team8</Title>
    </Footer>
  )
}
