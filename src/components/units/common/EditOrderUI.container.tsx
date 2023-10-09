import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { TopicListModel } from "../../../types/topicTypes";
import styled from "styled-components";
import { KeywordModel } from "../../../types/keywordType";

const Item = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.large};
  text-align: center;
`;

interface EditOrderProps {
  orderList: TopicListModel[] | KeywordModel[];
  showModal: () => void;
  handleCancel: () => void;
  onSubmit: () => Promise<void>;
  handleChange: (result: DropResult) => Promise<void>;
  isModalOpen: boolean;
  isLoading: boolean;
}

function EditOrderUI({
  orderList,
  showModal,
  handleCancel,
  onSubmit,
  handleChange,
  isModalOpen,
  isLoading,
}: EditOrderProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  return (
    <>
      <Button onClick={showModal}>순서 변경</Button>
      <Modal
        title="순서 변경"
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
                  {orderList.map((item, i: number) => {
                    let name = "";
                    if ("name" in item) name = item.name;
                    if ("title" in item) name = item.title;
                    if (item.dateComment) name += `(${item.dateComment})`;
                    return (
                      <Draggable
                        draggableId={`${name}`}
                        index={i}
                        key={`${name}`}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <Item>{name}</Item>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
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

export default EditOrderUI;
