import { Dispatch, SetStateAction } from "react";
import { List } from "../../interfaces/todo-list.interface";

interface AddListProps {
  listArray: List[];
  listArrayIndex: number;
  setListArray: Dispatch<SetStateAction<List[]>>;
}

export const AddListToProject = ({
  listArray,
  listArrayIndex,
  setListArray,
}: AddListProps) => {
  const ramdomId = Math.floor(Math.random() * 100);
  const updateListData = [...listArray];

  const newList: List = {
    id: ramdomId,
    name: `Nova Lista ${ramdomId}`,
    cards: [],
    quadroId: listArray[listArrayIndex].quadroId,
  };

  updateListData.push(newList);

  return setListArray(updateListData);
};
