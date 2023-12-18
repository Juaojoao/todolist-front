import { CardTodo } from "../card-todo/card";

export const ListTodo = () => {
  return (
    <div className="h-full list-todo bg-BlackTheme-list p-4 flex flex-col gap-3">
      <CardTodo />
      <CardTodo />
      <CardTodo />
    </div>
  );
};
