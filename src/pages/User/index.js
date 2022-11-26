import { PlusOutlined } from "@ant-design/icons";
import { Button, Image, notification, Table, Typography } from "antd";
import React, { useEffect } from "react";
import userApi from "../../api/userApi";
import useFetch from "../../hooks/useFetch";

export default function User() {
  const { Title } = Typography;

  const columns = [
    {
      title: "Stt",
      dataIndex: "_id",
      key: "_id",
      render: (index) => (
        <span>
          {(index = data?.users.findIndex((x) => x._id === index) + 1)}
        </span>
      ),
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (index) => {
        return (
          <Image
            src={index || "https://picsum.photos/50"}
            style={{ height: "50px" }}
          />
        );
      },
    },
    {
      title: "Họ",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Tên",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      dataIndex: "function",
      key: "function",
      render: () => (
        <div className="p-news_table_button">
          <Button type="primary" onClick={handleDelete}>
            Xóa
          </Button>
          <Button type="primary">Cập nhật</Button>
        </div>
      ),
    },
  ];

  const [loading, data, _, fetch, refetch] = useFetch({}, userApi.getAll);
  console.log("data", data);

  useEffect(() => {
    fetch({}, true);
    /* eslint-disable-next-line */
  }, []);

  const handleDelete = () => {
    notification.open({
      message: "Xóa thành công",
    });
  };

  return (
    <div className="p-typeCoach">
      <div>
        <Title level={4}>Tin tức:</Title>
      </div>
      <div className="p-typeCoach_typeCoach_header">
        <Button type="primary" size="large">
          <PlusOutlined />
          Tạo mới
        </Button>
      </div>
      <div>
        <Table scroll={{ x: 500 }} loading={loading} columns={columns} dataSource={data?.users} />
      </div>
    </div>
  );
}
