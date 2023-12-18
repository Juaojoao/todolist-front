import { ListTodo } from "../../components/lista-todo/list-todo";
import { Sidebar } from "../../components/sidebar/sidebar";
import { test } from "./test";

export const Dashboard = () => {
  return (
    <div className="h-screen w-screen flex bg-BlackTheme-fundo">
      <Sidebar projects={test} />
      <div className="project-box h-full">
        <ListTodo />
      </div>
    </div>
  );
};
