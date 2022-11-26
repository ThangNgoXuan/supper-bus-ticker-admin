import { PlusOutlined } from "@ant-design/icons";
import {
  Table,
  Typography,
  Button,
  notification,
  Modal,
  Form,
  Input,
  Select,
  Image,
} from "antd";
import React from "react";
import { useEffect } from "react";
import TypeCoachApi from "../../api/typeCoach";
import useFetch from "../../hooks/useFetch";
import useValues from "../../hooks/useValues";
import userApi from "../../api/userApi";

export default function Employee() {
  const { Title } = Typography;
  const [values, setValues] = useValues({
    open: false,
    idUpdate: "",
  });

  const [form] = Form.useForm();
  const { Option } = Select;
  /* eslint-disable-next-line */
  const [loading, data, _, fetch, refetch] = useFetch({}, userApi.getAll);
  const [
    /* eslint-disable-next-line */
    loadingTypeCoach,
    dataTypeCoach,
    /* eslint-disable-next-line */
    _TypeCoach,
    fetchTypeCoach,
    /* eslint-disable-next-line */
    refetchTypeCoach,
  ] = useFetch({}, TypeCoachApi.getAllTypeCoach);

  useEffect(() => {
    fetch({}, true);
    fetchTypeCoach({}, true);
    /* eslint-disable-next-line */
  }, []);

  const dataRole = [
    {
      key: "driver",
      value: "Tài xế",
    },
    {
      key: "employee",
      value: "Nhân viên",
    },
  ];

  const columns = [
    {
      title: "STT",
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    // {
    //   title: "Mật khẩu",
    //   dataIndex: "password",
    //   key: "password",
    // },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "",
      render: (record) => (
        <div className="p-news_table_button">
          <Button type="primary" onClick={handleDelete}>
            Xóa
          </Button>
          <Button
            type="primary"
            onClick={() => {
              handleOpenUpdate(record);
            }}
          >
            Cập nhật
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = (record) => {
    console.log("id", record._id);
    userApi
      .deteteEmployee(record._id)
      .then((res) => {
        refetch();
        notification.open({
          message: "Xóa thành công",
        });
      })
      .catch((err) => {
        console.log("qqq", err);
        notification.open({
          message: "Xóa thất bại!",
        });
      });
  };

  const handleOpen = () => {
    setValues({
      open: true,
    });
  };

  const handleClose = () => {
    setValues({
      open: false,
      idUpdate: "",
    });
    form.resetFields();
  };

  const onFinish = (data) => {
    if (values.idUpdate) {
      userApi
        .updateEmployee(data, values.idUpdate)
        .then((res) => {
          refetch();
          notification.open({
            message: "Cập nhật thành công",
          });
        })
        .catch((err) => {
          notification.open({
            message: "Cập nhật thất bại",
          });
        });
    } else {
      userApi
        .createEmployee(data)
        .then((res) => {
          refetch();
          notification.open({
            message: "Thêm thành công",
          });
        })
        .catch((err) => {
          notification.open({
            message: "Thêm thất bại",
          });
        });
    }
    handleClose();
  };

  const handleOpenUpdate = (data) => {
    console.log("data", data);
    setValues({
      open: true,
      idUpdate: data._id,
    });

    form.setFieldsValue({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
      password: data.password,
    });
  };

  return (
    <div className="p-typeCoach">
      <Title level={4}>Quản lí xe</Title>
      <div className="p-typeCoach_type">
        <div className="p-typeCoach_typeCoach_header">
          <Button size="large" type="primary" onClick={handleOpen}>
            <PlusOutlined />
            Tạo mới
          </Button>
        </div>
        <Table dataSource={data?.users} columns={columns} loading={loading} />
      </div>
      <div className="p-coach_modal">
        <Modal
          scrollableBody={true}
          title="Tạo xe mới"
          open={values.open}
          onCancel={handleClose}
          maskClosable={false}
          footer={[
            <>
              <Button
                onClick={handleClose}
                style={{ backgroundColor: "#001c6b", color: "white" }}
              >
                Hủy
              </Button>
              <Button
                htmlType="submit"
                form="formCoach"
                style={{ backgroundColor: "#001c6b", color: "white" }}
              >
                {values.idUpdate ? "Cập nhật" : "Tạo"}
              </Button>
            </>,
          ]}
        >
          <Form
            form={form}
            layout="vertical"
            id="formCoach"
            onFinish={onFinish}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              role: dataRole[0].key,
              password: "",
            }}
          >
            <Form.Item
              label="Tên"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Tên",
                },
              ]}
            >
              <Input placeholder="Nhập tên" />
            </Form.Item>
            <Form.Item
              label="Họ"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Họ",
                },
              ]}
            >
              <Input placeholder="Nhập Họ" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email",
                },
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu",
                },
              ]}
            >
              <Input placeholder="Nhập mật khẩu" />
            </Form.Item>
            <Form.Item label="Role" name="role">
              <Select>
                {dataRole &&
                  dataRole.map((ele) => (
                    <Option values={ele.key} key={ele.key}>
                      {ele.value}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
