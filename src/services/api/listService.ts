import { ListContextType } from '../../context/ListContext';
import { List } from '../../interfaces/todo-list.interface';

export const ListService = (listContext: ListContextType) => {
  const { getLists, createList, deleteList, updateList } = listContext;

  const onGetlist = async () => {
    return await getLists();
  };

  const onCreateList = async (name: string, frameId?: number) => {
    if (!name || !frameId) return;
    await createList(name, frameId);
    return await getLists();
  };

  const onUpdateList = async (listId: number, data: List) => {
    if (!listId || !data) return;
    await updateList(listId, data);
    return await getLists();
  };

  const onDeleteList = async (listId: number, frameId: number) => {
    if (!listId || !frameId) return;
    await deleteList(listId, frameId);
    return await getLists();
  };

  return {
    onGetlist,
    onCreateList,
    onUpdateList,
    onDeleteList,
  };
};
