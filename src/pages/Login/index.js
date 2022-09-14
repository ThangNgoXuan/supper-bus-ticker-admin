import { Button, Form, Image, Input, Typography } from "antd";
import React from "react";

export default function Login() {
    const {Title} = Typography;

  const onFinish = (data) => {
    console.log(data);
  };

  return (
    <div className="p-login">
      <div className="p-login_left">
        <Image src="https://picsum.photos/200" preview={false} />
      </div>
      <div className="p-login_right">
        <Title level={3}>Đăng nhập</Title>
        <Form onFinish={onFinish}>
          <Form.Item
            label="Tên đăng nhập"
            name="name"
            rules={[{
                required: true, message: 'Vui lòng nhập tên đăng nhập'
            }]}
        >
            <Input placeholder="Vui lòng nhập tên đăng nhập" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{
                required: true, message: 'Vui lòng nhập tên đăng nhập'
            }]}
        >
            <Input placeholder="Vui lòng nhập mật khẩu" />
          </Form.Item>
          <Button size="large" type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form>
      </div>
    </div>
  );
}
