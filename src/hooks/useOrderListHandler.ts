import { useCallback, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { OrderModel } from "../components/units/common/EditOrderUI.container";

export function useOrderListHandler() {
  const [orderList, setOrderList] = useState<OrderModel[]>([]);

  const handleChange = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;
      const items = [...orderList];
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setOrderList(items);
    },
    [orderList]
  );

  return { orderList, handleChange, setOrderList };
}
