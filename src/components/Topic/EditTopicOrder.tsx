import { useUpdateTopicOrderMutation } from "../../store/api/topicApi";
import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { TopicListModel } from "../../types/topicTypes";

interface EditTopicOrderProps {
  topicList: TopicListModel[];
}

function EditTopicOrder({ topicList }: EditTopicOrderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [editedTopicList, setEditedTopicList] = useState([...topicList]);
  const [updateTopicOrder, { isLoading }] = useUpdateTopicOrderMutation();

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async () => {
    updateTopicOrder(
      editedTopicList.map((item, index) => {
        return { title: item.title, number: index };
      })
    );
    setIsModalOpen(false);
  };

  const handleChange = async (result: DropResult) => {
    if (!result.destination) return;
    const items = [...editedTopicList];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setEditedTopicList(items);
  };

  return (
    <>
      <Button onClick={showModal} style={{ width: "90%" }}>
        주제 순서 변경
      </Button>
      <Modal
        title="주제 순서 변경"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={onSubmit}
          >
            Submit
          </Button>,
        ]}
      >
        {isMounted && (
          <DragDropContext onDragEnd={handleChange}>
            <Droppable droppableId="played">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {editedTopicList.map((item, i: number) => (
                    <Draggable
                      draggableId={`${item.title}`}
                      index={i}
                      key={`${item.title}`}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <div>{item.title}</div>
                          </div>
                        );
                      }}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </Modal>
    </>
  );
}

export default EditTopicOrder;
