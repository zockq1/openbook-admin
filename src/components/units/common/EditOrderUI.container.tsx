import { ReactNode, useEffect, useState } from "react";
import { Button, Modal } from "antd";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { ModalHandler } from "../../../hooks/useModalHandler";

const Item = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.large};
  text-align: center;

  &.colored {
    color: ${({ theme }) => theme.colors.blue};
  }
`;

export interface OrderModel {
  title: string;
  number: number;
  id: number;
  isColored: boolean;
  date?: string;
}

interface EditOrderProps {
  orderList: OrderModel[];
  modalHandler: ModalHandler;
  button: ReactNode;
  onSubmit: () => Promise<void>;
  handleChange: (result: DropResult) => void;
  isLoading: boolean;
}

function EditOrderUI({
  orderList,
  modalHandler,
  button,
  onSubmit,
  handleChange,
  isLoading,
}: EditOrderProps) {
  const { isModalOpen, closeModal } = modalHandler;
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
        onCancel={closeModal}
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
                  {orderList.map((item, index: number) => {
                    const { title, id, isColored, date } = item;
                    return (
                      <Draggable
                        draggableId={id + title}
                        index={index}
                        key={id + title}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <Item className={isColored ? "colored" : ""}>
                                {date ? `${title}(${date})` : title}
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
