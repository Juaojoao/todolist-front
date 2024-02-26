import { List, Card } from "../../interfaces/todo-list.interface";
import { FunctionDate } from "./setDate";

interface AddCardProps {
  listArray: List[];
  listIndex: number;
  setAddCard: React.Dispatch<React.SetStateAction<Card[][]>>;
}

export const addCardToProject = ({
  listArray,
  listIndex,
  setAddCard,
}: AddCardProps) => {
  const ramdomId = Math.floor(Math.random() * 100);
  const updateListData = [...listArray];

  if (!updateListData[listIndex].cards) {
    updateListData[listIndex].cards = [];
  }

  const newCard: Card = {
    id: ramdomId,
    name: `Novo Card ${ramdomId}`,
    description: "Descrição do novo card",
    date: FunctionDate(),
    list: listArray[listIndex].id,
    tasks: [],
  };

  updateListData[listIndex].cards?.push(newCard);

  const mappedProjectData = updateListData?.map((item) => {
    return item.cards || [];
  });

  return setAddCard(mappedProjectData);
};
