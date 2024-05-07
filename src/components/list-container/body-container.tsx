import { useRef, useState } from 'react';
import { Card, List, Quadro } from '../../interfaces/todo-list.interface';
import { MoreSvg } from '../svg/more';
import { QuadroSvg } from '../svg/quadro';
import { ButtonGreen } from '../buttons/buttonGreen';
import { ButtonRed } from '../buttons/buttonRed';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { useClickOutside } from '../../util/hooks/useClickOutside';
import { useStopPropagation } from '../../util/hooks/useStopPropagation';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/root-reducer';
import { ContainerCard } from './list-container';
import { TasksListsRequests } from '../../util/functions/requests/tasksListsRequests';

export const BodyContainer = () => {
  const listInfo = useSelector((state: RootState) => state.ListReducer);
  const { selectedFrame, frames } = useSelector(
    (state: RootState) => state.frameReducer,
  );
  const { cards } = useSelector((state: RootState) => state.CardReducer);
  const { input, handleInput } = useChangeInput({ createList: '' });

  const { createList } = TasksListsRequests();

  const [addInput, setAddInput] = useState(false);

  const filtredList = listInfo.filterList;
  const refInput = useRef(null);

  useClickOutside({ ref: refInput, callback: () => handleAddButton() });
  const handleAddButton = () => setAddInput(!addInput);

  return (
    <>
      {selectedFrame ? (
        frames.map(
          (frame: Quadro) =>
            frame.id === selectedFrame && (
              <div
                key={frame.id}
                className="container-list h-full flex gap-4 flex-col"
              >
                <div className="flex gap-3">
                  <div className="header-quadro flex items-center gap-2">
                    <QuadroSvg />
                    <p>{frame.name}</p>
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
                        onChange={handleInput('createList')}
                        type="text"
                        name="name"
                        id="name"
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
                            onClick: () =>
                              createList({
                                id: selectedFrame,
                                input: input,
                                clearButton: setAddInput,
                              }),
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
                  {filtredList.length > 0 ? (
                    filtredList.map((list: List) => (
                      <ContainerCard
                        key={list.id}
                        list={list}
                        cards={cards.filter(
                          (card: Card) => card.activitiesListId === list.id,
                        )}
                      />
                    ))
                  ) : (
                    <div className="flex justify-center items-center max-h-full w-full">
                      <p>Crie uma Lista de atividades para começar!</p>
                    </div>
                  )}
                </ol>
              </div>
            ),
        )
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-center font-bold">
            Selecione ou crie um
            <br />
            Quadro para começar!
          </p>
        </div>
      )}
    </>
  );
};
