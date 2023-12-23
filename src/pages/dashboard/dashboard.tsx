import { ListTodo } from "./components/dash-component";

export const Dashboard = () => {
  return (
    <div className="h-screen w-full flex bg-BlackTheme-fundo">
      <ListTodo useOn={1} />
    </div>
  );
};
