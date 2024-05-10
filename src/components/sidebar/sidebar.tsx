import './style.css';
import { useEffect, useRef, useState } from 'react';
import { MoreSvg } from '../svg/more';
import { QuadroSvg } from '../svg/quadro';
import { ExitIcon } from '../svg/exit';
import { useAuth } from '../../context/AuthContext';
import { animated, useTransition } from 'react-spring';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { DropDownButton } from '../buttons/dropDown';
import { useStopPropagation } from '../../util/hooks/useStopPropagation';
import { Quadro, User } from '../../interfaces/todo-list.interface';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/root-reducer';
import { EditSvg } from '../svg/edit';
import { FramesRequests } from '../../util/functions/requests/framesRequests';
import { InputConditionComp } from '../inputs/inputCondition';
import { ModalComponent } from '../modal/modalAlert';
import { useClickOutside } from '../../util/hooks/useClickOutside';
import { useDragAndDrop } from '../../util/hooks/useDragAndDrop';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export const Sidebar = () => {
  const userInfo: User = useSelector((state: RootState) => state.UserReducer);
  const frames: Quadro[] = useSelector(
    (state: RootState) => state.frameReducer.frames,
  );
  const { data, handleDragEnd, setData } = useDragAndDrop({
    initialData: frames,
  });
  const { input, handleInput } = useChangeInput({
    createFrame: '',
    updateFrame: '',
  });
  const { logout } = useAuth();

  console.log(data);

  const {
    createFrame,
    updateFrame,
    deleteFrame,
    handleSetSelectedFrame,
    orderFrame,
  } = FramesRequests();

  useEffect(() => {
    setData(frames);
  }, [frames]);

  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<number | null>(null);
  const [addInput, setAddInput] = useState(false);
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  const transitions = useTransition(open, {
    from: { opacity: 0, transform: 'translateX(-100%)' },
    enter: { opacity: 1, transform: 'translateX(35%)' },
    leave: { opacity: 0, transform: 'translateX(-100%)' },
  });

  const buttonTransitions = useTransition(addInput, {
    from: { opacity: 0, transform: 'translateY(-30px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-30px)' },
  });

  const handleAddButton = () => setAddInput(!addInput);
  const handleClick = () => setOpen(!open);

  useClickOutside({ ref: sidebarRef, callback: () => setOpen(false) });

  const handleAddInput = ({ id }: Quadro) => {
    if (!id) return;
    setEditingProjectId(id);
  };

  const handleDragEndWithContext = (result: any) => {
    handleDragEnd(result);

    if (result.destination) {
      const { source, destination } = result;
      const draggedItem = data[source.index];
      const newPosition = destination.index + 1;

      orderFrame({ id: draggedItem.id, order: newPosition });
    }
  };

  return (
    <div className="sidebar flex relative">
      <aside className="bg-BlackTheme-aside px-6 pt-6 z-20">
        <div className="flex center justify-center flex-col gap-2">
          <button
            onClick={handleClick}
            className="button-box p-3 container-icon rounded-full hover:bg-BlackTheme-roudend transition duration-500 ease-in-out"
          >
            <QuadroSvg />
          </button>
          <button onClick={logout}>
            <ExitIcon />
          </button>
        </div>
      </aside>
      <DragDropContext onDragEnd={handleDragEndWithContext}>
        {transitions(
          (style, item) =>
            item && (
              <animated.div
                ref={sidebarRef}
                style={style}
                className={`z-20 absolute overflow-auto sidebar-content ${open ? 'sidebar-open' : 'sidebar-close'}`}
              >
                <div className="box-project-wrapper px-6 pt-6 text-3xl font-bold text-white flex items-center justify-between">
                  <h1>{userInfo.name}</h1>
                  <button onClick={handleAddButton}>
                    <MoreSvg />
                  </button>
                </div>
                <div
                  className={`table-projects pt-4 ${open ? 'opacity-open' : 'opacity-closed'}`}
                >
                  {buttonTransitions(
                    (styleButton, item) =>
                      item && (
                        <animated.div style={styleButton} className="p-3">
                          <InputConditionComp
                            condition={addInput}
                            funcConfirm={() =>
                              createFrame({
                                input: input,
                                clearButton: setAddInput,
                              })
                            }
                            funcCancel={() => setAddInput(false)}
                            funcChange={handleInput('createFrame')}
                            valueId={userInfo.id}
                          />
                        </animated.div>
                      ),
                  )}
                  <Droppable droppableId="frames">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="frame-list"
                      >
                        {data.map((quadro: Quadro, index: number) => (
                          <Draggable
                            key={quadro?.id?.toString()}
                            draggableId={quadro?.id?.toString() || ''}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <a
                                  key={quadro.id}
                                  className={`button-hover cursor-pointer p-3 flex gap-3 items-center w-full 
                                    ${selectedFrame === quadro.id ? 'bg-gray-800' : ''}`}
                                  onClick={() =>
                                    handleSetSelectedFrame({
                                      id: quadro.id,
                                      setState: setSelectedFrame,
                                    })
                                  }
                                >
                                  <div className="flex items-center justify-between w-full px-2">
                                    <InputConditionComp
                                      condition={editingProjectId === quadro.id}
                                      funcChange={handleInput('updateFrame')}
                                      valueInput={input.updateFrame}
                                      valueId={quadro.id}
                                      funcCancel={() =>
                                        setEditingProjectId(null)
                                      }
                                      funcConfirm={() =>
                                        updateFrame({
                                          id: quadro.id,
                                          input: input,
                                          clearButton: setEditingProjectId,
                                        })
                                      }
                                    >
                                      <p>{quadro.name}</p>
                                      <DropDownButton
                                        props={{
                                          onClick:
                                            useStopPropagation()
                                              .stopPropagation,
                                        }}
                                        textName="..."
                                      >
                                        <EditSvg
                                          onClick={() =>
                                            handleAddInput({ id: quadro.id })
                                          }
                                        />
                                        <ModalComponent
                                          dialog={quadro.name}
                                          funcConfirm={() =>
                                            deleteFrame({ id: quadro.id })
                                          }
                                        />
                                      </DropDownButton>
                                    </InputConditionComp>
                                  </div>
                                </a>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </animated.div>
            ),
        )}
      </DragDropContext>
    </div>
  );
};
