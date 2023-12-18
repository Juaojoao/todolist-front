import "./style.css";
import React, { useState } from "react";
import { MoreSvg } from "../svg/more";
import { QuadroSvg } from "../svg/quadro";
import { test } from "../../pages/dashboard/test";
import { MagicMotion } from "react-magic-motion";

interface Project {
  id: number;
  name: string;
}

interface Props {
  projects: Project[];
}

export const Sidebar: React.FC<Props> = ({ projects }) => {
  const [open, setOpen] = useState(false);
  const [addProject, setAddProject] = useState<Project[]>([]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleAddProject = () => {
    const numero = Math.floor(Math.random() * 1000);
    const newProject = { id: numero, name: `Project ${numero}` };

    setAddProject(test.push(newProject));
  };

  return (
    <MagicMotion>
      <div className="sidebar flex h-full w-full ">
        <aside className="bg-BlackTheme-aside px-6 pt-6">
          <div className=" flex center justify-center ">
            <button
              onClick={handleClick}
              className=" button-box p-3 container-icon rounded-full hover:bg-BlackTheme-roudend transition duration-500 ease-in-out"
            >
              <QuadroSvg />
            </button>
          </div>
        </aside>
        <div
          className={`overflow-auto scroll ${
            open ? "sidebar-open" : "sidebar-close"
          }`}
        >
          <div
            className=" box-project-wrapper px-6 pt-6 text-3xl font-bold text-white flex items-center justify-between
        "
          >
            <h1>Projects</h1>
            <button onClick={handleAddProject}>
              <MoreSvg />
            </button>
          </div>
          <ul
            className={`table-projects pt-4 ${
              open ? "opacity-open" : "opacity-closed"
            }`}
          >
            {projects.map((project) => (
              <li
                key={Number(project.id)}
                className="button-hover cursor-pointer p-3 flex gap-3 items-center w-full"
              >
                <div className="color-box w-6 h-4 rounded-md bg-slate-500"></div>
                <p>{project.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MagicMotion>
  );
};
