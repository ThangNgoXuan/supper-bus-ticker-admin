import React from "react";
import { Layout, Menu, Typography, Image } from "antd";
import { Link } from "react-router-dom";

export default function Sider({ router }) {
  const { Sider } = Layout;
  const { SubMenu, Item } = Menu;
  const { Title } = Typography;
  return (
    <Sider>
      <div className="sider_logoTitle">
        <Image src="https://picsum.photos/50/50" />
        <Title level={3}>Bug Ticker</Title>
      </div>
      <Menu mode="inline" theme="dark">
        {router.map(
          (item, index) =>
            item.name &&
            (item.children ? (
              <SubMenu
                key={`submenu-item-${index}`}
                title={item.name}
                icon={item.icon}
              >
                {item.children &&
                  item.children.map((ele, idx) => (
                    <Item key={`children-item-${idx}`} icon={ele.icon}>
                      <Link to={ele.path}>{ele.name}</Link>
                    </Item>
                  ))}
              </SubMenu>
            ) : (
              <Item key={`submenu-item-${index}`} icon={item.icon}>
                <Link to={item.path}>{item.name}</Link>
              </Item>
            ))
        )}
      </Menu>
    </Sider>
  );
}
