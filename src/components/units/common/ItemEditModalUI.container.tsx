import { Button, Form, FormInstance, Input, Modal, Space } from "antd";
import { CategoryModel } from "../../../types/categoryType";
import { EraModel } from "../../../types/eraType";

interface ItemEditModalUIProps {
  title: string;
  itemList: CategoryModel[] | EraModel[];
  handleDelete: (item: string) => Promise<void>;
  showModal: () => void;
  handleOk: () => void;
  handleCancel: () => void;
  onSubmit: (values: any) => Promise<void>;
  form: FormInstance<any>;
  isModalOpen: boolean;
}

function ItemEditModalUI({
  title,
  itemList,
  handleCancel,
  handleDelete,
  handleOk,
  showModal,
  onSubmit,
  form,
  isModalOpen,
}: ItemEditModalUIProps) {
  return (
    <div style={{ display: "inline", marginLeft: "20px" }}>
      <Button type="primary" onClick={showModal}>
        {`${title} 설정`}
      </Button>
      <Modal
        title={`${title} 설정`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="item-form"
          form={form}
          onFinish={onSubmit}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label={`${title} 이름`}
            rules={[
              {
                required: true,
                message: `${title} 이름을 입력해 주세요`,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ float: "right" }}>
              저장
            </Button>
          </Form.Item>
        </Form>
        {itemList.map((item) => (
          <Space key={item.name}>
            <span style={{ fontSize: 18 }}>{item.name}</span>
            <Button onClick={() => handleDelete(item.name)} danger>
              삭제
            </Button>
            <span> </span>
          </Space>
        ))}
      </Modal>
    </div>
  );
}

export default ItemEditModalUI;
