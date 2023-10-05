import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { TopicListModel } from "../../../../types/topicTypes";
import styled from "styled-components";

const Item = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.large};
  text-align: center;
`;

interface EditTopicOrderProps {
  editedTopicList: TopicListModel[];
  showModal: () => void;
  handleCancel: () => void;
  onSubmit: () => Promise<void>;
  handleChange: (result: DropResult) => Promise<void>;
  isModalOpen: boolean;
  isLoading: boolean;
}

function EditTopicOrderUI({
  editedTopicList,
  showModal,
  handleCancel,
  onSubmit,
  handleChange,
  isModalOpen,
  isLoading,
}: EditTopicOrderProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  return (
    <>
      <Button onClick={showModal}>순서 변경</Button>
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
        forceRender
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
                            <Item>{item.title}</Item>
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

export default EditTopicOrderUI;
