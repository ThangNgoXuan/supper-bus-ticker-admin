import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Table,
  Typography,
} from "antd";
import React from "react";
import { useEffect } from "react";
import BoardingPointApi from "../../api/boardingPoint";
import useFetch from "../../hooks/useFetch";
import useValues from "../../hooks/useValues";

export default function Place() {
  const { Title } = Typography;
  const [form] = Form.useForm();

  const [values, setValues] = useValues({
    open: false,
    setOpen: false,
    idUpdate: "",
  });

  /* eslint-disable-next-line */
  const [loading, data, _, fetch, refetch] = useFetch(
    {},
    BoardingPointApi.getAllBoardingPoint
  );

  useEffect(() => {
    //call api lấy data typecoach
    fetch({}, true);
    /* eslint-disable-next-line */
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "_id",
      render: (index) => (
        <span>{(index = data.findIndex((x) => x._id === index) + 1)}</span>
      ),
    },
    {
      title: "Tên điểm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Kinh độ",
      dataIndex: "longtitude",
      key: "longtitude",
    },
    {
      title: "Vĩ độ",
      dataIndex: "latitude",
      key: "latitude",
    },
    {
      title: "",
      render: (record) => (
        <div className="p-recruit_table_button">
          <Button
            type="primary"
            onClick={() => {
              handleDelete(record);
            }}
          >
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

  const handleDelete = (record) => {
    BoardingPointApi.deleteBoardingPoint(record._id)
      .then((res) => {
        refetch();
        notification.open({
          message: "Xoá thành công!",
        });
      })
      .catch((err) => {
        notification.open({
          message: "Xóa thất bại!",
        });
      });
  };

  const handleSubmit = (data) => {
    console.log(data);
    if (values.idUpdate) {
      BoardingPointApi.updateBoardingPoint(data, values.idUpdate)
        .then((res) => {
          refetch();
          notification.open({
            message: "Cập nhật thành công",
          });
          setValues({
            idUpdate: "",
          });
        })
        .catch((err) => {
          notification.open({
            message: "Cập nhật thất bạn",
          });
        });
      form.resetFields();
    } else {
      BoardingPointApi.addBoardingPoint(data)
        .then((res) => {
          refetch();
          notification.open({
            message: "Thêm thành công",
          });
          form.resetFields();
        })
        .catch((err) => {
          notification.open({
            message: "Tạo mới thất bại",
          });
        });
    }
    handleClose();
  };

  const handleOpenUpdate = (record) => {
    form.setFieldsValue({
      name: record.name,
      address: record.address,
      phone: record.phone,
      longtitude: record.longtitude,
      latitude: record.latitude,
    });
    setValues({
      open: true,
      idUpdate: record._id,
    });
  };

  return (
    <div className="p-typeCoach">
      <div>
        <Title level={4}>Địa điểm</Title>
      </div>
      <div className="p-typeCoach_typeCoach_header">
        <Button onClick={handleOpen} type="primary" size="large">
          <PlusOutlined />
          Thêm mới
        </Button>
      </div>
      <div className="p-place">
        <Table columns={columns} dataSource={data} loading={loading} />
      </div>
      <div className="p-place_modalUpdate">
        <Modal
          maskClosable={false}
          title={values.idUpdate ? "Cập nhật địa điểm" : "Tạo địa điểm mới"}
          visible={values.open}
          footer={[
            <>
              <Button
                style={{ backgroundColor: "#001c6b", color: "white" }}
                onClick={handleClose}
              >
                Hủy
              </Button>
              <Button
                htmlType="submit"
                form="formplace"
                style={{ backgroundColor: "#001c6b", color: "white" }}
              >
                {!values.idUpdate ? "Tạo" : "Cập nhật"}
              </Button>
            </>,
          ]}
          onCancel={handleClose}
        >
          <Form
            form={form}
            id="formplace"
            onFinish={handleSubmit}
            layout="vertical"
          >
            <Form.Item
              label="Tên điểm"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập điểm đón",
                },
              ]}
            >
              <Input placeholder="Nhập điểm đón" />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ",
                },
              ]}
            >
              <Input placeholder="Nhập địa chỉ" />
            </Form.Item>
            <Form.Item
              label="Kinh độ"
              name="longtitude"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập kinh độ",
                },
              ]}
            >
              <Input placeholder="Nhập điểm kinh độ" />
            </Form.Item>
            <Form.Item
              label="Vĩ độ"
              name="latitude"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập vĩ độ",
                },
              ]}
            >
              <Input placeholder="Nhập điểm vĩ độ" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
