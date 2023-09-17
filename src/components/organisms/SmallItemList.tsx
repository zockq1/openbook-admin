import styled, { css } from "styled-components";

interface SmallItemType {
  name: string;
  key: string;
  onClick: () => void;
}

interface SmallItemListProps {
  itemList: SmallItemType[];
  currentItemKey: string;
}

const ItemList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

interface ItemProps {
  $isCurrent: boolean;
}
const Item = styled.li<ItemProps>`
  margin: 10px;
  padding: 5px;
  width: max-content;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  ${({ $isCurrent }) =>
    $isCurrent
      ? css`
          box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
          font-weight: ${({ theme }) => theme.fontWeight.medium};
          background-color: ${({ theme }) => theme.colors.blue};
          color: ${({ theme }) => theme.colors.white};
        `
      : css`
          font-weight: ${({ theme }) => theme.fontWeight.bold};
          background-color: ${({ theme }) => theme.colors.white};
        `}
  cursor: pointer;
`;

function SmallItemList({ itemList, currentItemKey }: SmallItemListProps) {
  return (
    <ItemList>
      {itemList.map((item) => {
        return (
          <Item
            key={item.key}
            onClick={item.onClick}
            $isCurrent={currentItemKey === item.key}
          >
            {item.name}
          </Item>
        );
      })}
    </ItemList>
  );
}

export default SmallItemList;
