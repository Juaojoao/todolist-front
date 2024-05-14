import { useState } from 'react';
import { Card, List, Quadro, User } from '../../interfaces/todo-list.interface';
import { MoreSvg } from '../svg/more';
import { QuadroSvg } from '../svg/quadro';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/root-reducer';
import { ContainerCard } from './list-container';
import { ActivitiesListsRequests } from '../../util/functions/requests/activitiesListsRequests';
import { InputConditionComp } from '../inputs/inputCondition';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// import { updateDataOrder } from '../../util/functions/validateDND';
// import { ListService } from '../../services/api/listService';
// import { useDispatch } from 'react-redux';
// import { getAllList } from '../../services/redux/list/actions';

export const BodyContainer = () => {
  // Falta Lógica de arrastar e soltar incrementar e decrementar a ordem das listas

  // const userInfo: User = useSelector((state: RootState) => state.UserReducer);
  const cards = useSelector((state: RootState) => state.CardReducer.cards);
  const listInfo = useSelector((state: RootState) => state.ListReducer);

  const { input, handleInput } = useChangeInput({ createList: '' });
  const { createList } = ActivitiesListsRequests();
  const { selectedFrame, frames } = useSelector(
    (state: RootState) => state.frameReducer,
  );

  const [addInput, setAddInput] = useState(false);

  const filtredList = listInfo.filterList;
  // const listService = new ListService();
  // const dispatch = useDispatch();

  const handleAddButton = () => setAddInput(!addInput);

  const handleDragEndWithContext = async (result: any) => {
    const { source, destination } = result;

    // const draggedItem = filtredList[source.index];
    // const newPosition = destination.index + 1;

    if (result.destination) {
      if (source.index === destination.index) return;

      // const existingItem = filtredList.find(
      //   (item: List) => item.order === newPosition,
      // );

      // if (existingItem) {
      //   const updatedData = updateDataOrder(
      //     filtredList,
      //     draggedItem,
      //     newPosition,
      //   );

      //   if (!updatedData) return;
      //   console.log(updatedData);
      //   await Promise.all(
      //     updatedData.map((item: List) =>
      //       orderList({ id: item.id, order: item.order }),
      //     ),
      //   );

      //   const newLists = await listService.getAllList(userInfo.id);
      //   if (newLists) dispatch(getAllList(newLists));
      // }
    }
  };

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

                  <InputConditionComp
                    condition={addInput}
                    funcCancel={() => setAddInput(false)}
                    funcConfirm={() =>
                      createList({
                        id: selectedFrame,
                        input: input,
                        clearButton: setAddInput,
                      })
                    }
                    funcChange={handleInput('createList')}
                    valueId={frame.id}
                  >
                    <button
                      onClick={handleAddButton}
                      className="header-addList flex items-center gap-2 "
                    >
                      <MoreSvg />
                      <p className="font-semibold text-sm">Adicionar Lista</p>
                    </button>
                  </InputConditionComp>
                </div>
                <div className="divisor w-full h-px bg-white" />
                <DragDropContext onDragEnd={handleDragEndWithContext}>
                  <ol>
                    {filtredList.length > 0 ? (
                      <Droppable
                        droppableId="droppable-list"
                        direction="horizontal"
                      >
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="pb-2 flex flex-wrap gap-4 w-full"
                          >
                            {filtredList.map((list: List, index: number) => (
                              <Draggable
                                key={list.id}
                                draggableId={list.id?.toString() || ''}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                  >
                                    <ContainerCard
                                      key={list.id}
                                      list={list}
                                      cards={cards.filter(
                                        (card: Card) =>
                                          card.activitiesListId === list.id,
                                      )}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    ) : (
                      <div className="flex justify-center items-center max-h-full w-full">
                        <p>Crie uma Lista de atividades para começar!</p>
                      </div>
                    )}
                  </ol>
                </DragDropContext>
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
