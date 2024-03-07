import { useRef, useState } from 'react';
import { Card, List } from '../../interfaces/todo-list.interface';
import { MoreSvg } from '../svg/more';
import { QuadroSvg } from '../svg/quadro';
import { ButtonGreen } from '../buttons/buttonGreen';
import { ButtonRed } from '../buttons/buttonRed';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { ContainerCard } from './container-card';
import { useClickOutside } from '../../util/hooks/useClickOutside';
import { useStopPropagation } from '../../util/hooks/useStopPropagation';

type ContainerListProps = {
  list: List[] | null;
  card: Card[] | null;
  frameId?: number;
  createList?: (name: string, frameId: number) => void;
  updateList?: (listId: number, frameId: number, name: string) => void;
  deleteList?: (listId: number, frameId: number) => void;
  createCard?: (ame: string, ActivityListId: number) => void;
  updateCard?: (cardId: number, data: Card) => void;
  deleteCard?: (cardId: number, activitiesListId: number) => void;
};

export const ContainerList = ({
  list,
  card,
  frameId,
  createList,
  updateList,
  deleteList,
  createCard,
  updateCard,
  deleteCard,
}: ContainerListProps) => {
  const { input, handleInput } = useChangeInput({ name: '' });
  const [addInput, setAddInput] = useState(false);
  const refInput = useRef(null);

  const handleAddButton = () => {
    setAddInput(!addInput);
  };

  useClickOutside({ ref: refInput, callback: () => setAddInput(false) });

  const handleAddList = () => {
    if (input.name === '' || !frameId || !createList) return;

    createList(input.name, frameId);
    input.name = '';
    setAddInput(false);
  };

  return (
    <div className="container-list h-full flex gap-4 flex-col">
      {frameId ? (
        <>
          <div className="flex gap-3">
            <div className="header-quadro flex items-center gap-2">
              <QuadroSvg />
              <p>Seu Quadro</p>
            </div>

            {!addInput && (
              <button
                onClick={handleAddButton}
                className="header-addList flex items-center gap-2 "
              >
                <MoreSvg />
                <p className="font-semibold text-sm">Adicionar Lista</p>
              </button>
            )}
            {addInput && (
              <div
                className="flex justify-center items-center gap-2"
                ref={refInput}
              >
                <input
                  value={input.name}
                  onChange={handleInput('name')}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nova Lista"
                  className="overflow-hidden
               resize-none text-sm rounded-lg outline-none p-2 
               bg-BlackTheme-list drop-shadow-lg text-gray-400
               border border-gray-400 w-full"
                  onClick={useStopPropagation().stopPropagation}
                />
                <div className="flex w-full gap-2">
                  <ButtonGreen
                    children="Criar"
                    buttonProps={{
                      onClick: handleAddList,
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
          <div className="divisor w-full h-px bg-white" />
          <ol className="pb-2 flex gap-4 w-full overflow-y-auto">
            {list?.length ? (
              list.map(
                (item: List) =>
                  item.frameId === frameId && (
                    <ContainerCard
                      title={item.name}
                      key={item.id}
                      cards={
                        card?.filter(
                          (card) => card.activitiesListId === item.id,
                        ) || []
                      }
                      frameId={frameId}
                      ActivityListId={item.id}
                      updateList={updateList}
                      deleteList={deleteList}
                      createCard={createCard}
                      updateCard={updateCard}
                      deleteCard={deleteCard}
                    />
                  ),
              )
            ) : (
              <p>Está um pouco vazio aqui...</p>
            )}
          </ol>
        </>
      ) : (
        <p>Crie um quadro</p>
      )}
    </div>
  );
};
