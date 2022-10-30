import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Select,
  Table,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import TypeCoachApi from "../../api/typeCoach";
import useValues from "../../hooks/useValues";
import useFetch from "../../hooks/useFetch";
import SeatSchemaApi from "../../api/seatSchemaApi";

export default function TypeCoach() {
  const [values, setValues] = useValues({
    open: false,
    idUpdate: "",
  });

  const [form] = Form.useForm();

  const { Title } = Typography;
  const { TextArea } = Input;
  const { Option } = Select;

  /* eslint-disable-next-line */
  const [loading, data, _, fetch, refetch] = useFetch(
    {},
    TypeCoachApi.getAllTypeCoach
  );

  /* eslint-disable-next-line */
  const [
    loadingSeatSchema,
    dataSeatSchema,
    _SeatSchema,
    fetchSeatSchema,
    refetchSeatSchema,
  ] = useFetch({}, SeatSchemaApi.getAllSeatSchema);

  useEffect(() => {
    //call api lấy data typecoach
    fetch({}, true);
    fetchSeatSchema({}, true);
    /* eslint-disable-next-line */
  }, []);

  const columnsTypeCoach = [
    {
      title: "STT",
      dataIndex: "_id",
      render: (index) => (
        <span>{(index = data.findIndex((x) => x._id === index) + 1)}</span>
      ),
    },
    {
      title: "Loại xe",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Sơ đồ ghế",
      dataIndex: "seat_diagram",
      key: "seat_diagram",
    },
    {
      title: "Loại ghế",
      dataIndex: "seat_diagram",
      key: "seat_diagram",
    },
    {
      title: "Số ghế ngồi",
      dataIndex: "number_of_seats",
      key: "number_of_seats",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "",
      render: (record) => (
        <div className="p-recruit_table_button">
          <Button
            type="primary"
            onClick={() => {
              handleDeleteType(record);
            }}
          >
            Xóa
          </Button>
          <Button
            onClick={() => {
              handleOpenUpdate(record);
            }}
            type="primary"
          >
            Cập nhật
          </Button>
        </div>
      ),
    },
  ];

  const handleDeleteType = (record) => {
    TypeCoachApi.deleteTypeCoach(record._id)
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
      TypeCoachApi.updateTypeCoach(data, values.idUpdate)
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
      TypeCoachApi.addTypeCoach(data)
        .then((res) => {
          refetch();
          notification.open({
            message: "Tạo mới thành công",
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

  const handleOpenUpdate = (data) => {
    setValues({
      open: true,
      idUpdate: data._id,
    });
    form.setFieldsValue({
      name: data.name,
      number_of_seats: data.number_of_seats,
      description: data.description,
      seat_diagram: data.seat_diagram,
    });
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
      <div className="p-typeCoach_modalTypeCoap-typeCoachch">
        <Modal
          title="Tạo loại xe mới"
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
                form="formTypeCoach"
                style={{ backgroundColor: "#001c6b", color: "white" }}
              >
                {values.idUpdate ? "Cập nhật" : "Tạo"}
              </Button>
            </>,
          ]}
        >
          <Form
            onFinish={onFinish}
            form={form}
            id="formTypeCoach"
            layout="vertical"
            initialValues={{
              name: "",
              seat_diagram: dataSeatSchema[0]?.id,
              number_of_seats: 30,
              description: "",
            }}
          >
            <Title level={5}>Thông tin chung</Title>
            <Form.Item
              label="Tên loại xe"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên loại xe!",
                },
              ]}
            >
              <Input size="large" placeholder="Nhập loại xe" />
            </Form.Item>
            <Form.Item label="Sơ đồ ghế" name="seat_diagram">
              <Select>
                {dataSeatSchema &&
                  dataSeatSchema.map((ele) => (
                    <Option values={ele?.id} key={ele?.id}>
                      {ele?.name}
                    </Option>
                  ))}
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
              <InputNumber
                placeholder="Nhập số ghế (*)"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mô tả!",
                },
              ]}
            >
              <TextArea placeholder="Nhập sơ đồ ghế (*)" rows={4} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
