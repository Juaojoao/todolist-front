import { useRef, useState } from 'react';
import { ButtonGreen } from '../buttons/buttonGreen';
import { ButtonRed } from '../buttons/buttonRed';
import { CardTodo } from '../card/card';
import { MoreSvg } from '../svg/more';
import { Card, List, User } from '../../interfaces/todo-list.interface';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { DropDownButton } from '../buttons/dropDown';
import { useClickOutside } from '../../util/hooks/useClickOutside';
import { ModalComponent } from '../modal/modalAlert';
import { ListService } from '../../services/api/listService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/redux/root-reducer';
import { filterList, getAllList } from '../../services/redux/list/actions';
import { CardService } from '../../services/api/cardService';
import { getAllCards } from '../../services/redux/card/actions';

type ContainerCardProps = {
  cards: Card[];
  list: List;
};

export const ContainerCard = ({ cards, list }: ContainerCardProps) => {
  const [addInputEdit, setAddInputEdit] = useState(false);
  const [addInput, setAddInput] = useState(false);
  const refOutSide = useRef(null);

  const frameInfo = useSelector((state: RootState) => state.frameReducer);
  const userInfo: User = useSelector((state: RootState) => state.UserReducer);

  const listService = new ListService();
  const cardService = new CardService();

  const dispatch = useDispatch();
  const selectedFrame: number = frameInfo.selectedFrame;

  const { input, handleInput } = useChangeInput({
    createCard: '',
    updateListName: '',
  });

  const clickOutside = () => {
    setAddInput(false);
    setAddInputEdit(false);
  };

  useClickOutside({ ref: refOutSide, callback: () => clickOutside() });

  const handleaddInputEdit = () => setAddInputEdit(!addInputEdit);
  const handleAddInput = () => setAddInput(!addInput);

  const handleUpdateList = async ({ id }: List) => {
    if (!id || input.updateListName === '') return;

    try {
      await listService.updateList(id, input.updateListName);
      setAddInputEdit(false);

      const newLists = await listService.getAllList(userInfo.id);
      if (!newLists) return;

      dispatch(getAllList(newLists));
      dispatch(filterList(selectedFrame));
    } catch (error) {
      console.error('Error deleting List', error);
    }
  };

  const handleDeleteList = async ({ id }: List) => {
    if (!id) return;

    try {
      await listService.deleteList(id);
      setAddInputEdit(false);

      const newLists = await listService.getAllList(userInfo.id);
      if (!newLists) return;

      dispatch(getAllList(newLists));
      dispatch(filterList(selectedFrame));
    } catch (error) {
      console.error('Error deleting List', error);
    }
  };

  const handleCreateCard = async ({ activitiesListId }: Card) => {
    if (!activitiesListId) return;

    try {
      await cardService.createCard({
        activitiesListId: activitiesListId,
        name: input.createCard,
      });
      input.createCard = '';
      setAddInput(false);

      const newCards = await cardService.getAllCard(userInfo.id);
      if (!newCards) return;

      dispatch(getAllCards(newCards));
    } catch (error) {
      console.error('Error deleting List', error);
    }
  };

  return (
    <li className="w-72 h-full self-start flex-shrink-0">
      <div
        className="max-h-full drop-shadow-md list-todo bg-BlackTheme-list
       p-3 flex flex-col gap-3 rounded-xl border-collapse border-2 border-gray-900"
      >
        <div className="list-top flex justify-between items-center px-3">
          {!addInputEdit ? (
            <>
              <p className="text-sm font-semibold opacity-50">
                {list.name && list?.name?.length > 20
                  ? `${list.name.substring(0, 20)}...`
                  : list.name}
              </p>

              <DropDownButton textName="...">
                <ul
                  className="text-sm flex flex-col gap-2"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li
                    className="cursor-pointer button-hover p-2 w-full text-center"
                    onClick={handleaddInputEdit}
                  >
                    Editar
                  </li>
                  <li className="cursor-pointer button-hover p-2">
                    <ModalComponent
                      title="Excluir"
                      funcConfirm={() => handleDeleteList({ id: list.id })}
                    />
                  </li>
                </ul>
              </DropDownButton>
            </>
          ) : (
            <div
              className="flex gap-2 items-center justify-center"
              ref={refOutSide}
            >
              <input
                type="text"
                name="updateListName"
                id="updateListName"
                onChange={handleInput('updateListName')}
                placeholder="Editar"
                className="overflow-hidden resize-none text-sm drop-shadow-2xl py-2
                 w-full rounded-lg outline-none p-2 bg-BlackTheme-card text-gray-400"
              />
              <div className="flex gap-2">
                <ButtonGreen
                  children="Salvar"
                  buttonProps={{
                    onClick: () => handleUpdateList({ id: list.id }),
                  }}
                />
                <ButtonRed
                  children="X"
                  buttonProps={{ onClick: () => setAddInputEdit(false) }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="shadow flex flex-col p-2 gap-3 items-center overflow-y-auto drop-shadow-xl">
          {cards?.length > 0 ? (
            cards.map((card) => <CardTodo card={card} key={card.id} />)
          ) : (
            <span className="text-sm text-gray-400">Sem cartões..</span>
          )}
        </div>

        {!addInput ? (
          <div className="w-full flex flex-col">
            <button
              onClick={handleAddInput}
              className="rounded-lg flex gap-2 items-center font-bold text-sm hover:bg-gray-800"
            >
              <MoreSvg /> Adicionar um cartão
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col" ref={refOutSide}>
            <input
              type="text"
              name="createCard"
              id="createCard"
              onChange={handleInput('createCard')}
              placeholder="Digite o nome do cartão"
              className="overflow-hidden resize-none text-sm drop-shadow-2xl py-6 w-full rounded-lg outline-none p-2 bg-BlackTheme-card text-gray-400"
            />
            <div className="flex gap-2 mt-2">
              <ButtonGreen
                children="Criar cartão"
                buttonProps={{
                  onClick: () =>
                    handleCreateCard({ activitiesListId: list.id }),
                }}
              />
              <ButtonRed
                children="X"
                buttonProps={{
                  onClick: () => setAddInput(false),
                }}
              />
            </div>
          </div>
        )}
      </div>
    </li>
  );
};
