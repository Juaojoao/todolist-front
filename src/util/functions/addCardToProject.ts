// Arquivo functions.ts

import { Card } from "../../interfaces/todo-list.interface";
import { List } from "../../interfaces/todo-list.interface";
import { FunctionDate } from "./setDate";

interface AddCardProps {
  list: List[];
  listIndex: number;
  setAddCard: React.Dispatch<React.SetStateAction<Card[][]>>;
}

export const addCardToProject = ({
  list,
  listIndex,
  setAddCard,
}: AddCardProps) => {
  const cardIDActual = list[listIndex].cards.length + 1;

  const updateListData = [...list] as List[];

  if (!updateListData[listIndex].cards) {
    updateListData[listIndex].cards = [];
  }

  const newCard: Card = {
    id: cardIDActual,
    name: `Novo Card ${cardIDActual}`,
    description: "Descrição do novo card",
    date: FunctionDate(),
    list: list[listIndex],
    tasks: [],
  };

  updateListData[listIndex].cards.push(newCard);

  const mappedProjectData = updateListData.map((item) => {
    return item.cards;
  });

  setAddCard(mappedProjectData);
};
