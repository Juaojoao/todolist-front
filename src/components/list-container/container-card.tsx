import { useRef, useState } from 'react';
import { ButtonGreen } from '../buttons/buttonGreen';
import { ButtonRed } from '../buttons/buttonRed';
import { CardTodo } from '../card/card';
import { MoreSvg } from '../svg/more';
import { Card } from '../../interfaces/todo-list.interface';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { DropDownButton } from '../buttons/dropDown';
import { useClickOutside } from '../../util/hooks/useClickOutside';
import { ModalComponent } from '../modal/modalAlert';

type ContainerCardProps = {
  title?: string;
  cards: Card[];
  frameId?: number;
  ActivityListId?: number;
  updateList?: (listId: number, frameId: number, name: string) => void;
  deleteList?: (listId: number, frameId: number) => void;
  createCard?: (name: string, ActivityListId: number) => void;
  updateCard?: (cardId: number, data: Card) => void;
  deleteCard?: (cardId: number, activitiesListId: number) => void;
};

export const ContainerCard = ({
  title,
  cards,
  frameId,
  ActivityListId,
  updateList,
  deleteList,
  createCard,
  updateCard,
  deleteCard,
}: ContainerCardProps) => {
  const { input, handleInput } = useChangeInput({
    createCard: '',
    updateListName: '',
  });
  const [addInputEdit, setAddInputEdit] = useState(false);
  const [addInput, setAddInput] = useState(false);
  const refOutSide = useRef(null);

  useClickOutside({ ref: refOutSide, callback: () => setAddInput(false) });

  const handleAddInput = () => {
    setAddInput(!addInput);
  };

  const handleaddInputEdit = () => {
    setAddInputEdit(!addInputEdit);
  };

  const handleAddCard = async () => {
    if (input.createCard === '' || !ActivityListId || !createCard) return;
    createCard(input.createCard, ActivityListId);
    input.createCard = '';
    setAddInput(false);
  };

  const handleEditCard = (cardId: number, name: string) => {
    if (!updateCard || !name) return;

    updateCard(cardId, { name: name, activitiesListId: ActivityListId });
  };

  const handleDeleteCard = (cardId: number) => {
    if (!deleteCard || !ActivityListId) return;
    deleteCard(cardId, ActivityListId);
  };

  const handleEditList = () => {
    if (
      !ActivityListId ||
      input.updateListName === '' ||
      !frameId ||
      !updateList
    )
      return;
    updateList(ActivityListId, frameId, input.updateListName);
    input.updateListName = '';
    setAddInputEdit(false);
  };

  const handleDeleteList = () => {
    if (!ActivityListId || !frameId) return;
    deleteList && deleteList(ActivityListId, frameId);
    setAddInputEdit(false);
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
                {title && title?.length > 20
                  ? `${title.substring(0, 20)}...`
                  : title}
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
                      funcConfirm={handleDeleteList}
                    />
                  </li>
                </ul>
              </DropDownButton>
            </>
          ) : (
            <div className="flex gap-2 items-center justify-center">
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
                  buttonProps={{ onClick: handleEditList }}
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
            cards.map((card) => (
              <CardTodo
                card={card}
                key={card.id}
                updateCard={handleEditCard}
                deleteCard={handleDeleteCard}
              />
            ))
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
                buttonProps={{ onClick: handleAddCard }}
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
