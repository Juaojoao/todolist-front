import { useRef, useState } from 'react';
import { Card, List, Quadro, User } from '../../interfaces/todo-list.interface';
import { MoreSvg } from '../svg/more';
import { QuadroSvg } from '../svg/quadro';
import { ButtonGreen } from '../buttons/buttonGreen';
import { ButtonRed } from '../buttons/buttonRed';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { useClickOutside } from '../../util/hooks/useClickOutside';
import { useStopPropagation } from '../../util/hooks/useStopPropagation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/redux/root-reducer';
import { ContainerCard } from './list-container';
import { ListService } from '../../services/api/listService';
import { getAllList, filterList } from '../../services/redux/list/actions';

export const BodyContainer = () => {
  const userInfo: User = useSelector((state: RootState) => state.UserReducer);
  const frameInfo = useSelector((state: RootState) => state.frameReducer);
  const cardsInfo = useSelector((state: RootState) => state.CardReducer);
  const listInfo = useSelector((state: RootState) => state.ListReducer);

  const [addInput, setAddInput] = useState(false);
  const { input, handleInput } = useChangeInput({ name: '' });

  const handleAddButton = () => setAddInput(!addInput);

  const listService = new ListService();
  const dispatch = useDispatch();
  const refInput = useRef(null);

  const selectedFrame = frameInfo.selectedFrame;
  const frames: Quadro[] = frameInfo.frames;
  const filtredList = listInfo.filterList;
  const cards: Card[] = cardsInfo.cards;

  useClickOutside({ ref: refInput, callback: () => handleAddButton() });

  const handleCreateList = async ({ id }: Quadro) => {
    if (input.name === '' || !id) return;

    try {
      await listService.createList(input.name, id);
      const newLists = await listService.getAllList(userInfo.id);

      input.name = '';
      setAddInput(false);

      if (newLists) {
        dispatch(getAllList(newLists));
        dispatch(filterList(id));
      }
    } catch (error) {
      console.error('Error creating List', error);
    }
  };

  return (
    <>
      {selectedFrame ? (
        frames.map(
          (frame) =>
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
                            onClick: () => handleCreateList({ id: frame.id }),
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
                          (card) => card.activitiesListId === list.id,
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
