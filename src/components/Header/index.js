import React from "react";
import { Dropdown, Image, Layout, Menu, Typography } from "antd";
import { DownOutlined, SmileOutlined, LogoutOutlined } from "@ant-design/icons";

const account = {
  img: "https://picsum.photos/200",
  name: "Thang Ngo",
};

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: "Thông tin cá nhân",
      },
      {
        key: "2",
        label: "2nd menu ",
        icon: <SmileOutlined />,
      },
      {
        key: "3",
        label: "Đăng xuất",
        icon: <LogoutOutlined />,
      },
    ]}
  />
);
export default function Header() {
  const { Header } = Layout;
  const { Title } = Typography;

  return (
    <Header>
      <Dropdown overlay={menu}>
          <div className="header-account">
            <DownOutlined />
            <Title level={5}>{account.name}</Title>
            <Image preview={false} src={account.img} />
          </div>
      </Dropdown>
    </Header>
  );
}
