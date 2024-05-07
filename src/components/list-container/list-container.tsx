import { useRef, useState } from 'react';
import { ButtonGreen } from '../buttons/buttonGreen';
import { ButtonRed } from '../buttons/buttonRed';
import { CardTodo } from '../card/card';
import { MoreSvg } from '../svg/more';
import { Card, List, User } from '../../interfaces/todo-list.interface';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { DropDownButton } from '../buttons/dropDown';
import { useClickOutside } from '../../util/hooks/useClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/redux/root-reducer';
import { CardService } from '../../services/api/cardService';
import { getAllCards } from '../../services/redux/card/actions';
import { useStopPropagation } from '../../util/hooks/useStopPropagation';
import { EditSvg } from '../svg/edit';
import { TreshSvg } from '../svg/tresh';
import { TasksListsRequests } from '../../util/functions/requests/tasksListsRequests';

type ContainerCardProps = {
  cards: Card[];
  list: List;
};

export const ContainerCard = ({ cards, list }: ContainerCardProps) => {
  const { deleteList, updateList } = TasksListsRequests();

  const userInfo: User = useSelector((state: RootState) => state.UserReducer);
  const frameInfo = useSelector((state: RootState) => state.frameReducer);

  const [addInputEdit, setAddInputEdit] = useState(false);
  const [addInput, setAddInput] = useState(false);

  const selectedFrame: number = frameInfo.selectedFrame;
  const cardService = new CardService();
  const dispatch = useDispatch();
  const refOutSide = useRef(null);

  const { input, handleInput } = useChangeInput({
    createCard: '',
    updateListName: '',
  });

  const handleaddInputEdit = () => setAddInputEdit(!addInputEdit);
  const handleAddInput = () => setAddInput(!addInput);

  useClickOutside({
    ref: refOutSide,
    callback: () => {
      setAddInputEdit(false), setAddInput(false);
    },
  });

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
                <EditSvg onClick={handleaddInputEdit} />
                <TreshSvg
                  onClick={() =>
                    deleteList({
                      id: list.id,
                      clearButton: setAddInputEdit,
                      selectedFrame,
                    })
                  }
                />
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
                onClick={useStopPropagation().stopPropagation}
              />
              <div className="flex gap-2">
                <ButtonGreen
                  children="Salvar"
                  buttonProps={{
                    onClick: () =>
                      updateList({
                        id: list.id,
                        input: input,
                        clearButton: setAddInputEdit,
                        selectedFrame,
                      }),
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
