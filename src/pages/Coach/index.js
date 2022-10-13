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
  InputNumber,
} from "antd";
import React from "react";
import { useEffect } from "react";
import CoachApi from "../../api/coachApi";
import useFetch from "../../hooks/useFetch";
import useValues from "../../hooks/useValues";

export default function Coach() {
  const { Title } = Typography;
  const [valuse, setValues] = useValues({
    open: false,
  });

  const { TextArea } = Input;
  const [form] = Form.useForm();

  /* eslint-disable-next-line */
  const [loading, data, _, fetch, refetch] = useFetch({}, CoachApi.getAllCoach);

  useEffect(() => {
    fetch({}, true);
    /* eslint-disable-next-line */
  }, []);

  console.log(data);

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
          src="https://picsum.photo/20"
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
      title: "Tuyến vận chuyển",
      dataIndex: "schedule",
      key: "schedule",
    },
    {
      title: "Số ghế",
      dataIndex: "number_of_seats",
      key: "number_of_seats",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      dataIndex: "function",
      key: "function",
      render: () => (
        <div className="p-news_table_button">
          <Button type="primary" onClick={handleDelete}>
            Xóa
          </Button>
          <Button type="primary" onClick={handleOpenUpdate}>
            Cập nhật
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = () => {
    notification.open({
      message: "Xóa thành công",
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
    });
    form.resetFields();
  };

  const onFinish = (data) => {
    const dd = {status: true, ...data, category_id: "631df726c48332886a21bc5d"}
    CoachApi.createCoach(dd)
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
    handleClose();
  };

  const handleOpenUpdate = () => {};

  // Pull Down
  const { Option } = Select;

  const onChange = (value) => {};

  const onSearch = (value) => {};

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
          visible={valuse.open}
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
            {/* <Form.Item
              label="trạng thái"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Nhập hình ảnh xe!",
                },
              ]}
            >
              <Input placeholder="Vui lòng nhập hình ảnh xe!" />
            </Form.Item> */}
            <Form.Item
              label="Loại xe"
              name="category_id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lọn xe",
                },
              ]}
            >
              <Input placeholder="Nhập loại xe" />
            </Form.Item>
            <Form.Item label="Loại xe">
              <Select
                onChange={onChange}
                name="categoryqqq"
                placeholder="Please select a category"
              >
                <Option value="Fruit">Fruit</Option>
                <Option value="Vegetable">Vegetable</Option>
                <Option value="Poultry">Poultry</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Tuyến vận chuyển">
              <Select
                showSearch
                onSearch={onSearch}
                onChange={onChange}
                name="categoryqq"
                placeholder="Please select a category"
              >
                <Option value="Fruit">Fruit</Option>
                <Option value="Vegetable">Vegetable</Option>
                <Option value="Poultry">Poultry</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Số ghế"
              name="number_of_seats"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số ghế!",
                },
              ]}
            >
              <InputNumber placeholder="Nhập số ghế" />
            </Form.Item>
            <Form.Item label="Mô tả" name="description">
              <TextArea placeholder="Nhập mô tả!" rows={10} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
