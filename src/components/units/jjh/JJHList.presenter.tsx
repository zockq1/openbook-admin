import { Button, Empty } from "antd";
import useNotificationErrorList from "../../../hooks/useNotificationErrorList";
import setError from "../../../services/setError";
import { useGetJJHListQuery } from "../../../store/api/JJHApi";
import ContentBox from "../../commons/ContentBox";
import TableUI from "../common/TableUI.container";
import { useEffect, useState } from "react";
import EditJJHOrder from "./EditJJHOrder.presenter";

interface JJHListModel {
  title: string;
  number: number;
  type: "단원" | "연표";
}

function JJHList() {
  const {
    data: jjhList,
    error: jjhListError,
    refetch,
  } = useGetJJHListQuery({ count: 5 }, { refetchOnMountOrArgChange: true });
  useNotificationErrorList([setError(jjhListError, "정주행 목록")]);
  const [list, setList] = useState<JJHListModel[]>();

  useEffect(() => {
    if (jjhList) {
      let newList: JJHListModel[] = jjhList.chapterList.map(
        (chapter): JJHListModel => {
          const { jjhNumber, title, number } = chapter;
          return {
            title: `${number}단원: ${title}`,
            number: jjhNumber,
            type: "단원",
          };
        }
      );
      newList = newList.concat(
        jjhList.timelineList.map((timeline): JJHListModel => {
          const { jjhNumber, title } = timeline;
          return {
            title,
            number: jjhNumber,
            type: "연표",
          };
        })
      );

      setList(newList.sort((a, b) => a.number - b.number));
    }
  }, [jjhList, setList]);

  if (!list) {
    return (
      <ContentBox title="정주행 목록">
        <Empty />
      </ContentBox>
    );
  }
  return (
    <TableUI
      currentItemKey=""
      tableHead={[
        { name: "number", title: "순서" },
        { name: "title", title: "제목" },
        { name: "type", title: "분류" },
      ]}
      itemList={[...list]
        .sort((a, b) => a.number - b.number)
        .map((item) => {
          return {
            data: {
              number: item.number,
              title: item.title,
              type: item.type,
            },
            colored: item.type === "연표",
            key: item.title,
            onClick: () => {},
          };
        })}
      title={`정주행 목록`}
      option={
        <>
          <EditJJHOrder />
          <Button onClick={refetch}>새로 고침</Button>
        </>
      }
    />
  );
}

export default JJHList;
