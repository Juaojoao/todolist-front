import './style.css';
import { useState } from 'react';
import { MoreSvg } from '../svg/more';
import { QuadroSvg } from '../svg/quadro';
import { ExitIcon } from '../svg/exit';
import { useAuth } from '../../context/AuthContext';
import { animated, useTransition } from 'react-spring';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { ButtonRed } from '../buttons/buttonRed';
import { ButtonGreen } from '../buttons/buttonGreen';

type Project = {
  id: number;
  name: string;
};

type SidebarProps = {
  handleAddProject?: (id: number, name: string) => void;
  handleSelectProject?: (frameId: number) => void;
  projects: Project[] | null;
  selectedProject?: number | null;
  userId?: number;
};

export const Sidebar = ({
  handleSelectProject,
  handleAddProject,
  selectedProject,
  projects,
  userId,
}: SidebarProps) => {
  const [addInput, setAddInput] = useState(false);
  const [open, setOpen] = useState(false);

  const { input, handleInput } = useChangeInput({ name: '' });

  const { logout } = useAuth();

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

  const handleClick = () => {
    setOpen(!open);
  };

  const handleAddButton = () => {
    setAddInput(!addInput);
  };

  const handleAddProjectAndClearInput = () => {
    if (!handleAddProject || !userId) return;

    handleAddProject(userId, input.name);
    input.name = '';
    setAddInput(false);
  };

  return (
    <div className="sidebar flex h-full relative">
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
              style={style}
              className={`z-10 absolute overflow-auto sidebar-content ${open ? 'sidebar-open' : 'sidebar-close'}`}
            >
              <div className="box-project-wrapper px-6 pt-6 text-3xl font-bold text-white flex items-center justify-between">
                <h1>Quadros</h1>
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
                        className="flex gap-3 items-center flex-col p-3 bg-BlackTheme-aside m-3 rounded-xl "
                      >
                        <input
                          type="text"
                          placeholder="Criar novo Quadro"
                          className="input-box w-full bg-transparent border-b border-gray-50 outline-none text-gray-50"
                          value={input.name}
                          onChange={handleInput('name')}
                          name="name"
                          id="name"
                        />
                        <div className="flex gap-2 w-full">
                          <ButtonGreen
                            children="Criar"
                            buttonProps={{
                              onClick: () => handleAddProjectAndClearInput(),
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
                {projects?.map((project, index) => (
                  <button
                    key={index}
                    className={`button-hover cursor-pointer p-3 flex gap-3 items-center w-full ${
                      selectedProject === project.id ? 'bg-gray-800' : ''
                    }`}
                    onClick={() =>
                      handleSelectProject &&
                      handleSelectProject(Number(project?.id))
                    }
                  >
                    <div className="color-box w-6 h-4 rounded-md bg-slate-500"></div>
                    <p>{project.name}</p>
                  </button>
                ))}
              </div>
            </animated.div>
          ),
      )}
    </div>
  );
};
