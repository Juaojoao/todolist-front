import { CardContextType } from '../../context/CardContext';
import { Card } from '../../interfaces/todo-list.interface';

export const CardService = (cardContext: CardContextType) => {
  const { getCards, createCard, updateCard, deleteCard } = cardContext;

  const onGetCard = async () => {
    return await getCards();
  };

  const onCreateCard = async (name: string, listId?: number) => {
    if (!name || !listId) return;
    await createCard(name, listId);
    return await getCards();
  };

  const onUpdateCard = async (cardId: number, data: Card) => {
    if (!cardId || !data) return;
    await updateCard(cardId, data);
    return await getCards();
  };

  const onDeleteCard = async (cardId: number, listId?: number) => {
    if (!cardId || !listId) return;
    await deleteCard(cardId, listId);
    return await getCards();
  };

  return {
    onGetCard,
    onCreateCard,
    onUpdateCard,
    onDeleteCard,
  };
};
