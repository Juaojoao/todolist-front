import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../../interfaces/todo-list.interface';
import { CardService } from '../../../services/api/cardService';
import { RootState } from '../../../services/redux/root-reducer';
import {
  getAllCards,
  setSelectedCard,
} from '../../../services/redux/card/actions';
import { useMessage } from '../../../context/useGlobalContext';

interface CardsRequest {
  id?: number;
  activitiesListId?: number;
  input?: inputs;
  clearButton?: any;
  selectedFrame?: number;
  setState?: any;
  description?: string;
  order?: number;
}

interface inputs {
  createCard?: string;
  updateCardName?: string;
  updateCardDescription?: string;
}

export const CardsRequest = () => {
  const userInfo: User = useSelector((state: RootState) => state.UserReducer);
  const cardService = new CardService();
  const { setMessage } = useMessage();
  const dispatch = useDispatch();

  const createCard = async ({
    activitiesListId,
    input,
    clearButton,
    order,
  }: CardsRequest) => {
    if (!input?.createCard || !activitiesListId) {
      return setMessage({
        type: 'warning',
        message: 'Campo em branco!',
      });
    }

    try {
      await cardService.createCard({
        activitiesListId,
        name: input?.createCard,
        order,
      });
      setMessage({ type: 'success', message: 'Cartão criado com sucesso!' });

      input.createCard = '';
      clearButton(false);

      const newCards = await cardService.getAllCard(userInfo.id);
      if (newCards) {
        dispatch(getAllCards(newCards));
      }
    } catch (error) {
      setMessage({ type: 'error', message: 'Erro ao criar cartão!' });
    }
  };

  const updateCard = async ({ id, input, clearButton }: CardsRequest) => {
    if (!id || !input?.updateCardName) {
      return setMessage({
        type: 'warning',
        message: 'Campo em branco!',
      });
    }

    try {
      await cardService.updateCard({
        id,
        name: input.updateCardName,
      });
      setMessage({
        type: 'success',
        message: 'Cartão atualizado com sucesso!',
      });

      input.updateCardName = '';
      clearButton(false);

      const newCards = await cardService.getAllCard(userInfo.id);
      if (newCards) {
        dispatch(getAllCards(newCards));
      }
    } catch (error) {
      setMessage({ type: 'error', message: 'Erro ao atualizar cartão!' });
    }
  };

  const deleteCard = async ({ id }: CardsRequest) => {
    if (!id) {
      return setMessage({
        type: 'error',
        message: 'Cartão não encontrado!',
      });
    }

    try {
      await cardService.deleteCard(id);
      setMessage({ type: 'success', message: 'Cartão deletado com sucesso!' });

      const newCards = await cardService.getAllCard(userInfo.id);
      if (newCards) {
        dispatch(getAllCards(newCards));
      }
    } catch (error) {
      setMessage({ type: 'error', message: 'Erro ao deletar cartão!' });
    }
  };

  const selectCard = ({ id }: CardsRequest) => {
    if (!id) return;
    dispatch(setSelectedCard(id));
  };

  const updateCardDescrition = async ({
    id,
    input,
    clearButton,
  }: CardsRequest) => {
    if (!id || !input?.updateCardDescription) {
      return setMessage({
        type: 'warning',
        message: 'Campo em branco!',
      });
    }

    try {
      await cardService.updateDescription({
        id: id,
        description: input.updateCardDescription,
      });
      setMessage({
        type: 'success',
        message: 'Descrição atualizada com sucesso!',
      });

      input.updateCardDescription = '';
      clearButton(false);

      const newCardDesc = await cardService.getAllCard(userInfo?.id);
      if (newCardDesc) {
        dispatch(getAllCards(newCardDesc));
      }
    } catch (error) {
      setMessage({ type: 'error', message: 'Erro ao atualizar descrição!' });
    }
  };

  const orderCard = async ({ id, order, activitiesListId }: CardsRequest) => {
    if (!id) return;

    try {
      await cardService.updateCard({
        id,
        activitiesListId,
        order,
      });
    } catch (error) {
      setMessage({ type: 'error', message: 'Erro ao atualizar cartão!' });
    }
  };

  return {
    createCard,
    updateCard,
    deleteCard,
    selectCard,
    updateCardDescrition,
    orderCard,
  };
};
