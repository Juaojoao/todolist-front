import { useRef, useState } from 'react';
import { Card, List } from '../../interfaces/todo-list.interface';
import { MoreSvg } from '../svg/more';
import { QuadroSvg } from '../svg/quadro';
import { ButtonGreen } from '../buttons/buttonGreen';
import { ButtonRed } from '../buttons/buttonRed';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { useList } from '../../context/ListContext';
import { ContainerCard } from './container-card';
import { useClickOutside } from '../../util/hooks/useClickOutside';

type ContainerListProps = {
  list: List[] | null;
  card: Card[] | null;
  frameId?: number;
  updateListData?: () => void;
  updateCardData?: () => void;
};

export const ContainerList = ({
  list,
  card,
  frameId,
  updateListData,
  updateCardData,
}: ContainerListProps) => {
  const { input, handleInput } = useChangeInput({ name: '' });
  const [addInput, setAddInput] = useState(false);
  const { createList } = useList();
  const refInput = useRef(null);

  const handleAddButton = () => {
    setAddInput(!addInput);
  };

  useClickOutside({ ref: refInput, callback: () => setAddInput(false) });

  const handleAddList = async () => {
    if (input.name === '') return;

    if (frameId !== undefined) {
      await createList(input.name, frameId);
      input.name = '';
      setAddInput(false);

      if (updateListData) {
        updateListData();
      }
    }
  };

  return (
    <div className="container-list h-full flex gap-4 flex-col">
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
          <div className="flex justify-center items-center gap-2">
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
            />
            <div ref={refInput} className="flex w-full gap-2">
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
                    card?.filter((card) => card.activitiesListId === item.id) ||
                    []
                  }
                  ActivityListId={item.id}
                  updateCardData={updateCardData}
                />
              ),
          )
        ) : (
          <p>Está um pouco vazio aqui...</p>
        )}
      </ol>
    </div>
  );
};
