import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../../interfaces/todo-list.interface';
import { FrameService } from '../../../services/api/frameService';
import { RootState } from '../../../services/redux/root-reducer';
import {
  filterFrames,
  getAllFrames,
} from '../../../services/redux/frame/actions';
import { useMessage } from '../../../context/useGlobalContext';
import { filterList } from '../../../services/redux/list/actions';

interface FramesRequests {
  id?: number;
  input?: inputs;
  clearButton?: any;
  setState?: any;
}

interface inputs {
  createFrame?: string;
  updateFrame?: string;
}

export const FramesRequests = () => {
  const userInfo: User = useSelector((state: RootState) => state.UserReducer);
  const frameService = new FrameService();
  const dispatch = useDispatch();

  const { setMessage } = useMessage();

  const createFrame = async ({ input, clearButton }: FramesRequests) => {
    if (!input?.createFrame || !userInfo) {
      return setMessage({ type: 'warning', message: 'Campo vazio!' });
    }

    try {
      await frameService.createFrame(userInfo.id, input.createFrame);
      setMessage({ type: 'success', message: 'Quadro criado com sucesso!' });

      input.createFrame = '';
      clearButton(false);

      const newFrames = await frameService.getAllFrames(userInfo.id);
      if (!newFrames) return;

      dispatch(getAllFrames(newFrames));
    } catch (error) {
      setMessage({ type: 'error', message: 'Erro ao criar quadro!' });
    }
  };

  const updateFrame = async ({ id, input, clearButton }: FramesRequests) => {
    if (!input?.updateFrame || !id) {
      return setMessage({ type: 'warning', message: 'Campo vazio!' });
    }

    try {
      await frameService.updateInfoFrame(id, input?.updateFrame);
      setMessage({
        type: 'success',
        message: 'Quadro atualizado com sucesso!',
      });

      input.updateFrame = '';
      clearButton(null);

      const newFrames = await frameService.getAllFrames(userInfo.id);
      if (!newFrames) return;

      dispatch(getAllFrames(newFrames));
    } catch (error) {
      setMessage({ type: 'error', message: 'Erro ao atualizar quadro!' });
    }
  };

  const deleteFrame = async ({ id }: FramesRequests) => {
    if (!id) {
      return setMessage({ type: 'error', message: 'Quadro não encontrado!' });
    }
    try {
      await frameService.deleteFrame(id);
      setMessage({ type: 'success', message: 'Quadro deletado com sucesso!' });
      const newFrames = await frameService.getAllFrames(userInfo.id);
      if (!newFrames) return;

      dispatch(getAllFrames(newFrames));
    } catch (error) {
      setMessage({ type: 'error', message: 'Erro ao deletar quadro!' });
    }
  };

  const handleSetSelectedFrame = ({ id, setState }: FramesRequests) => {
    if (!id) return;
    dispatch(filterList(id));
    dispatch(filterFrames(id));
    setState(id);
  };

  return { createFrame, updateFrame, deleteFrame, handleSetSelectedFrame };
};
