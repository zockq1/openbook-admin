import { ReactNode, useEffect, useState } from "react";
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
import { GetChapterModel } from "../../../types/chapterTypes";
import { JJHOrderModel } from "../jjh/EditJJHOrder.presenter";

const Item = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.large};
  text-align: center;

  &.colored {
    color: ${({ theme }) => theme.colors.blue};
  }
`;

interface EditOrderProps {
  orderList:
    | TopicListModel[]
    | KeywordModel[]
    | GetChapterModel
    | JJHOrderModel[];
  button: ReactNode;
  handleCancel: () => void;
  onSubmit: () => Promise<void>;
  handleChange: (result: DropResult) => Promise<void>;
  isModalOpen: boolean;
  isLoading: boolean;
}

function EditOrderUI({
  orderList,
  button,
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
      {button}
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
            변경
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
                    let colored = false;
                    if ("name" in item) name = item.name;
                    if ("title" in item) name = item.title;
                    if ("dateComment" in item && item.dateComment)
                      name += `(${item.dateComment})`;
                    if ("type" in item) colored = item.type === "Timeline";
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
                              <Item className={colored ? "colored" : ""}>
                                {name}
                              </Item>
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
