import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../services/redux/root-reducer';
import { ListService } from '../../../services/api/listService';
import { User } from '../../../interfaces/todo-list.interface';
import { filterList, getAllList } from '../../../services/redux/list/actions';
import { useMessage } from '../../../context/useGlobalContext';

interface TasksListsRequests {
  id?: number;
  input?: inputs;
  clearButton?: any;
  selectedFrame?: number;
  setState?: any;
}

interface inputs {
  createList?: string;
  updateListName?: string;
}

export const TasksListsRequests = () => {
  const userInfo: User = useSelector((state: RootState) => state.UserReducer);
  const listService = new ListService();
  const { setMessage } = useMessage();
  const dispatch = useDispatch();

  const createList = async ({ id, input, clearButton }: TasksListsRequests) => {
    if (!input?.createList || !id) {
      return setMessage({ type: 'warning', message: 'Campo vazio!' });
    }

    try {
      await listService.createList(input.createList, id);
      setMessage({ type: 'success', message: 'Lista criada com sucesso!' });

      input.createList = '';
      clearButton(false);

      const newLists = await listService.getAllList(userInfo.id);

      if (newLists) {
        dispatch(getAllList(newLists));
        dispatch(filterList(id));
      }
    } catch (error) {
      setMessage({ type: 'error', message: 'Erro ao criar lista!' });
      console.log(error);
    }
  };

  const updateList = async ({
    id,
    input,
    clearButton,
    selectedFrame,
  }: TasksListsRequests) => {
    if (!input?.updateListName || !id) {
      return setMessage({ type: 'warning', message: 'Campo vazio!' });
    }

    try {
      await listService.updateList(id, input?.updateListName);
      setMessage({ type: 'success', message: 'Lista atualizada com sucesso!' });

      input.updateListName = '';
      clearButton(false);

      const newLists = await listService.getAllList(userInfo.id);
      if (newLists) {
        dispatch(getAllList(newLists));
        dispatch(filterList(selectedFrame));
      }
    } catch (error) {
      setMessage({ type: 'error', message: 'Erro ao atualizar lista!' });
    }
  };

  const deleteList = async ({
    id,
    clearButton,
    selectedFrame,
  }: TasksListsRequests) => {
    if (!id) {
      return setMessage({ type: 'error', message: 'Lista não encontrada!' });
    }

    try {
      await listService.deleteList(id);
      setMessage({ type: 'success', message: 'Lista deletada com sucesso!' });
      clearButton(false);

      const newLists = await listService.getAllList(userInfo.id);
      if (newLists) {
        dispatch(getAllList(newLists));
        dispatch(filterList(selectedFrame));
      }
    } catch (error) {
      setMessage({ type: 'error', message: 'Erro ao deletar lista!' });
    }
  };

  return { createList, updateList, deleteList };
};
