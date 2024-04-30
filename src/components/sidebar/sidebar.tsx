import './style.css';
import { useRef, useState } from 'react';
import { MoreSvg } from '../svg/more';
import { QuadroSvg } from '../svg/quadro';
import { ExitIcon } from '../svg/exit';
import { useAuth } from '../../context/AuthContext';
import { animated, useTransition } from 'react-spring';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { ButtonRed } from '../buttons/buttonRed';
import { ButtonGreen } from '../buttons/buttonGreen';
import { DropDownButton } from '../buttons/dropDown';
import { useClickOutside } from '../../util/hooks/useClickOutside';
import { useStopPropagation } from '../../util/hooks/useStopPropagation';
import { ModalComponent } from '../modal/modalAlert';
import { Quadro, User } from '../../interfaces/todo-list.interface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/redux/root-reducer';
import { FrameService } from '../../services/api/frameService';
import { filterFrames, getAllFrames } from '../../services/redux/frame/actions';
import { filterList } from '../../services/redux/list/actions';
import { EditSvg } from '../svg/edit';
import { TreshSvg } from '../svg/tresh';

export const Sidebar = () => {
  const userInfo: User = useSelector((state: RootState) => state.UserReducer);
  const { frames } = useSelector((state: RootState) => state.frameReducer);

  const { input, handleInput } = useChangeInput({ name: '' });
  const { logout } = useAuth();

  const frameService = new FrameService();
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();

  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<number | null>(null);

  const [addInput, setAddInput] = useState(false);
  const [open, setOpen] = useState(false);

  const transitions = useTransition(open, {
    from: { opacity: 0, transform: 'translateX(-100%)' },
    enter: { opacity: 1, transform: 'translateX(35%)' },
    leave: { opacity: 0, transform: 'translateX(-100%)' },
  });

  const buttonTransitions = useTransition(addInput, {
    from: { opacity: 0, transform: 'translateY(-20px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-20px)' },
  });

  const closeAll = () => {
    setOpen(false);
    setAddInput(false);
  };

  useClickOutside({ ref: sidebarRef, callback: closeAll });

  const handleClick = () => setOpen(!open);

  const handleAddInput = ({ id }: Quadro) => {
    if (!id) return;
    setEditingProjectId(id);
  };

  const handleAddButton = () => setAddInput(!addInput);

  const handleCreateFrame = async () => {
    if (input.name === '' || !userInfo.id) return;
    try {
      await frameService.createFrame(userInfo.id, input.name);
      const newFrames = await frameService.getAllFrames(userInfo.id);
      if (!newFrames) return;

      input.name = '';
      setAddInput(false);
      dispatch(getAllFrames(newFrames));
    } catch (error) {
      console.error('Error creating Frame', error);
    }
  };

  const handleUpdateFrame = async ({ id }: Quadro) => {
    if (input.name === '' || !id) return;

    try {
      await frameService.updateInfoFrame(id, input.name);
      const newFrames = await frameService.getAllFrames(userInfo.id);
      if (!newFrames) return;

      input.name = '';
      setEditingProjectId(null);
      dispatch(getAllFrames(newFrames));
    } catch (error) {
      console.error('Error creating Frame', error);
    }
  };

  const handleDeleteFrame = async ({ id }: Quadro) => {
    if (!id) return;
    try {
      await frameService.deleteFrame(id);
      const newFrames = await frameService.getAllFrames(userInfo.id);
      if (!newFrames) return;

      dispatch(getAllFrames(newFrames));
    } catch (error) {}
  };

  const handleSelectFrame = ({ id }: Quadro) => {
    if (!id) return;
    dispatch(filterList(id));
    dispatch(filterFrames(id));
    setSelectedFrame(id);
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
                      <animated.div
                        style={styleButton}
                        className="flex gap-3 items-center flex-col p-3  m-3 rounded-xl "
                      >
                        <input
                          type="text"
                          placeholder="Criar novo Quadro"
                          className="input-box w-full bg-transparent border p-2 rounded-lg border-gray-600 focus:border-gray-50 outline-none text-gray-50"
                          value={input.name}
                          onChange={handleInput('name')}
                          name="name"
                          id="name"
                        />
                        <div className="flex gap-2 w-full">
                          <ButtonGreen
                            children="Criar"
                            buttonProps={{
                              onClick: () => handleCreateFrame(),
                            }}
                          />

                          <ButtonRed
                            children="X"
                            buttonProps={{ onClick: () => setAddInput(false) }}
                          />
                        </div>
                      </animated.div>
                    ),
                )}
                {frames &&
                  frames.length > 0 &&
                  frames?.map((project: Quadro) => (
                    <a
                      key={project.id}
                      className={`button-hover cursor-pointer p-3 flex gap-3 items-center w-full 
                      ${selectedFrame === project.id ? 'bg-gray-800' : ''}`}
                      onClick={() => handleSelectFrame({ id: project.id })}
                    >
                      <div className="flex items-center justify-between w-full px-2">
                        {editingProjectId === project.id ? (
                          <div
                            className="flex justify-center items-center gap-2 w-full"
                            onClick={useStopPropagation().stopPropagation}
                          >
                            <input
                              value={input.name}
                              placeholder={project.name}
                              onChange={handleInput('name')}
                              type="text"
                              name="name"
                              id="name"
                              className="overflow-hidden
                             resize-none text-sm rounded-lg outline-none p-2 
                           bg-BlackTheme-list drop-shadow-lg text-gray-400
                             border border-gray-400 w-full"
                            />
                            <div className="flex gap-2">
                              <ButtonGreen
                                children="V"
                                buttonProps={{
                                  onClick: () =>
                                    handleUpdateFrame({ id: project.id }),
                                }}
                              />
                              <ButtonRed
                                children="X"
                                buttonProps={{
                                  onClick: () => setEditingProjectId(null),
                                }}
                              />
                            </div>
                          </div>
                        ) : (
                          <p>{project.name}</p>
                        )}
                        {!editingProjectId && (
                          <DropDownButton
                            props={{
                              onClick: useStopPropagation().stopPropagation,
                            }}
                            textName="..."
                          >
                            <button
                              onClick={() => handleAddInput({ id: project.id })}
                            >
                              <EditSvg />
                            </button>
                            <ModalComponent
                              title={<TreshSvg />}
                              funcConfirm={() =>
                                handleDeleteFrame({ id: project.id })
                              }
                            />
                          </DropDownButton>
                        )}
                      </div>
                    </a>
                  ))}
              </div>
            </animated.div>
          ),
      )}
    </div>
  );
};
