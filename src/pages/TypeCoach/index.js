import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Table,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import TypeCoachApi from "../../api/typeCoach";
import useValues from "../../hooks/useValues";
import useFetch from "../../hooks/useFetch";

export default function TypeCoach() {
  // const [open, setOpen] = useState(false);
  // const [openUpdate, setOpenUpdate] = useState(false);

  // useValues dùng thay thế khi có quá nhiều useState
  const [values, setValues] = useValues({
    open: false,
    openUpdate: false,
  });

  const { Title } = Typography;

  const [loading, data, _, fetch, refetch] = useFetch(
    {},
    TypeCoachApi.getAllTypeCoach
  );

  useEffect(() => {
    //call api lấy data typecoach
    fetch({}, true);
  }, []);

  const columnsTypeCoach = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Loại xe",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Sơ đồ ghế",
      dataIndex: "schema",
      key: "schema",
    },
    {
      title: "Số ghế ngồi",
      dataIndex: "number_of_seats",
      key: "number_of_seats",
    },
    {
      title: "",
      dataIndex: "function",
      key: "function",
      render: () => (
        <div className="p-recruit_table_button">
          <Button type="primary" onClick={handleDeleteType}>
            Xóa
          </Button>
          <Button onClick={handleOpenUpdate} type="primary">
            Cập nhật
          </Button>
        </div>
      ),
    },
  ];

  const handleDeleteType = () => {
    notification.open({
      message: "Xóa thành công",
    });
  };

  const handleOpen = () => {
    // setOpen(true);
    setValues({
      open: true,
    });
  };

  const handleClose = () => {
    // setOpen(false);
    setValues({
      open: false,
    });
  };

  const onFinish = (data) => {
    // console.log(data);
    TypeCoachApi.addTypeCoach(data)
      .then((res) => {
        refetch(); // fetch lại data để lấy dữ liệu mới thêm vào
        notification.open({
          message: "Cập nhật thành công",
        });
      })
      .catch((err) => {
        notification.open({
          message: "Cập nhật thất bại",
        });
      });
    handleClose();
  };

  const handleOpenUpdate = () => {
    // setOpenUpdate(true);
    setValues({
      openUpdate: true,
    });
  };

  const handleCloseUpdate = () => {
    // setOpenUpdate(false);
    setValues({
      openUpdate: false,
    });
  };

  const onFinishUpdate = (data) => {
    // console.log(data);
    TypeCoachApi.addTypeCoach(data)
      .then((res) => {
        // console.log(res);
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
    handleCloseUpdate();
  };

  return (
    <div className="p-typeCoach">
      <div>
        <Title level={4}>Quản lí loại xe</Title>
      </div>
      <div className="p-typeCoach_type">
        <div className="p-typeCoach_typeCoach_header">
          <Button size="large" type="primary" onClick={handleOpen}>
            <PlusOutlined />
            Tạo mới
          </Button>
        </div>
        <Table
          columns={columnsTypeCoach}
          dataSource={data}
          loading={loading}
        ></Table>
      </div>
      <div className="_modalTypeCoap-typeCoachch">
        <Modal
          title="Tạo loại xe mới"
          open={values.open}
          onCancel={handleClose}
          maskClosable={false}
          footer={[
            <>
              <Button onClick={handleClose}>Hủy</Button>
              <Button htmlType="submit" form="formTypeCoach">
                Tạo
              </Button>
            </>,
          ]}
        >
          <Form onFinish={onFinish} id="formTypeCoach" layout="vertical">
            <Title level={5}>Thông tin chung</Title>
            <Form.Item label="Loại xe" name="name">
              <Input size="large" placeholder="Nhập loại xe" />
            </Form.Item>
            <Form.Item label="Sơ đồ ghế" name="schema">
              <Input placeholder="Nhập sơ đồ ghế" />
            </Form.Item>
            <Form.Item label="Số ghế" name="number_of_seats">
              <Input placeholder="Nhập số ghế" type="number" />
            </Form.Item>
            <Form.Item label="Số ghế" name="description">
              <Input placeholder="Nhập số ghế" />
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <div className="p-typeCoach_modalTypeCoachUpdate">
        <Modal
          title="Cập nhật loại xe"
          open={values.openUpdate}
          onCancel={handleCloseUpdate}
          footer={[
            <>
              <Button onClick={handleCloseUpdate}>Hủy</Button>
              <Button htmlType="submit" form="formTypeCoachUpdate">
                Cập nhật
              </Button>
            </>,
          ]}
        >
          <Form
            onFinish={onFinishUpdate}
            id="formTypeCoachUpdate"
            layout="vertical"
          >
            <Form.Item label="Loại xe" name="name">
              <Input placeholder="Nhập loại xe" />
            </Form.Item>
            <Form.Item label="Sơ đồ ghế" name="schema">
              <Input placeholder="Nhập sơ đồ ghế" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
