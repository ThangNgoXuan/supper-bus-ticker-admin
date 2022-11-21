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
import CoachApi from "../../api/coachApi";
import TypeCoachApi from "../../api/typeCoach";
import useFetch from "../../hooks/useFetch";
import useValues from "../../hooks/useValues";

export default function Coach() {
  const { Title } = Typography;
  const [values, setValues] = useValues({
    open: false,
    idUpdate: "",
  });

  const { TextArea } = Input;
  const [form] = Form.useForm();
  const { Option } = Select;
  /* eslint-disable-next-line */
  const [loading, data, _, fetch, refetch] = useFetch({}, CoachApi.getAllCoach);
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

  console.log(data)


  useEffect(() => {
    fetch({}, true);
    fetchTypeCoach({}, true);
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
      title: "Biển số xe",
      dataIndex: "license_plate",
      key: "license_plate",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      // key: "image",
      render: () => (
        <Image
          src="https://picsum.photos/20"
          style={{
            width: "50px",
            height: "50px",
          }}
        />
      ),
    },
    {
      title: "Tên xe",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại xe",
      dataIndex: "category_id",
      key: "category_id",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      dataIndex: "",
      render: (record) => (
        <div className="p-news_table_button">
          <Button type="primary" onClick={() => handleDelete(record)}>
            Xóa
          </Button>
          <Button type="primary" onClick={() => handleOpenUpdate(record)}>
            Cập nhật
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = (record) => {
    console.log("id", record._id);
    CoachApi.deleteCoach(record._id)
      .then((res) => {
        refetch();
        notification.open({
          message: "Xóa thành công",
        });
      })
      .catch((err) => {
        console.log("qqq",err);
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
      CoachApi.updateCoach(data, values.idUpdate)
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
      data.number_of_seats = 50;
      CoachApi.createCoach(data)
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
    setValues({
      open: true,
      idUpdate: data._id,
    });
    form.setFieldsValue({
      images: data.images,
      name: data.name,
      license_plate: data.license_plate,
      category_id: data.category_id,
      description: data.description,
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
        <Table dataSource={data} columns={columns} loading={loading} />
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
              <Button onClick={handleClose}>Hủy</Button>
              <Button htmlType="submit" form="formCoach">
                Tạo
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
              images: "",
              name: "",
              license_plate: "",
              category_id: dataTypeCoach[0]?._id,
              description: "",
            }}
          >
            <Form.Item
              label="Biển số xe"
              name="license_plate"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập biển số xe!",
                },
              ]}
            >
              <Input placeholder="Vui lòng nhập biển số xe" />
            </Form.Item>
            <Form.Item
              label="Tên xe"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên xe!",
                },
              ]}
            >
              <Input placeholder="Vui lòng nhập biển tên xe" />
            </Form.Item>
            <Form.Item
              label="Hình ảnh"
              name="images"
              rules={[
                {
                  required: true,
                  message: "Nhập hình ảnh xe!",
                },
              ]}
            >
              <Input placeholder="Vui lòng nhập hình ảnh xe!" />
            </Form.Item>
            <Form.Item
              label="Loại xe"
              name="category_id"
            >
              <Select>
                {dataTypeCoach &&
                  dataTypeCoach.map((ele) => (
                    <Option values={ele?._id} key={ele?._id}>
                      {ele?.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item label="Mô tả" name="description">
              <TextArea placeholder="Nhập mô tả!" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
