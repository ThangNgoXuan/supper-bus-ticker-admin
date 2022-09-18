import React from "react";
import { Layout, Menu, Image } from "antd";
import { Link } from "react-router-dom";

export default function Sider({ router }) {
  const { Sider } = Layout;
  const { SubMenu, Item } = Menu;
  return (
    <Sider collapsible width={248}>
      <div className="sider_logoTitle">
        <Image src="https://picsum.photos/50/50" preview={false} />
      </div>
      <Menu mode="inline">
        {router.map(
          (item, index) =>
            item.name &&
            (item.children ? (
              <SubMenu
                key={`submenu-item-${index.toString()}`}
                title={item.name}
                icon={item.icon}
              >
                {item.children &&
                  item.children.map((ele, idx) => (
                    <Item key={`children-item-${index.toString()}-${idx.toString()}`} icon={ele.icon}>
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
