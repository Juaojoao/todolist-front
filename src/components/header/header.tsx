import { Input } from '@material-tailwind/react';
import { DateSvg } from '../svg/date';
import { SearchSvg } from '../svg/src';
import { FunctionDate } from '../../util/functions/setDate';
import { User } from '../../interfaces/todo-list.interface';

interface UserProps {
  user: User | null;
}

export const HeaderTodo = ({ user }: UserProps) => {
  return (
    <header className="w-full">
      <div className="header-wrapper flex w-full items-center justify-between py-8">
        <div className="header-desc">
          <h1 className="text-xl font-bold text-white">{`Bem-Vindo, ${user?.name}`}</h1>
        </div>
        <div className="header-info flex items-center gap-5">
          <div className="w-72">
            <Input
              label="Buscar"
              icon={<SearchSvg />}
              color="white"
              crossOrigin={undefined}
            />
          </div>
          <div className="header-date flex items-center gap-2">
            <DateSvg />
            <p className="opacity-50 font-semibold">{FunctionDate()}</p>
          </div>
          <div className="header-img ">
            {user?.image ? (
              <img
                src={user.image}
                alt="user"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="user"
                className="w-10 h-10 rounded-full"
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
