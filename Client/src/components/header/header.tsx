import { Input } from '@material-tailwind/react';
import { DateSvg } from '../svg/date';
import { SearchSvg } from '../svg/src';
import { FunctionDate } from '../../util/functions/setDate';
import { User } from '../../interfaces/todo-list.interface';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/root-reducer';

export const HeaderTodo = () => {
  const userInfo: User = useSelector((state: RootState) => state.UserReducer);

  return (
    <header className="w-full">
      <div className="header-wrapper flex w-full md:flex-row flex-col items-center md:justify-between mb-4 md:p-4 md:gap-0 gap-2">
        <div className="header-desc">
          <h1 className="text-xl font-bold text-white">{`Bem-Vindo, ${userInfo?.name}`}</h1>
        </div>
        <div className="header-info flex md:flex-row flex-col items-center gap-5">
          <div className="sm:w-72 w-full">
            <Input
              label="Buscar"
              icon={<SearchSvg />}
              color="white"
              crossOrigin={undefined}
              className="drop-shadow-xl w-full"
            />
          </div>
          <div className="header-date md:flex items-center gap-2 hidden">
            <DateSvg />
            <p className="opacity-50 font-semibold">{FunctionDate()}</p>
          </div>
          <div className="header-img md:block hidden">
            <img
              src={
                userInfo?.image
                  ? userInfo?.image
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
              }
              alt={userInfo?.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-collapse border-gray-300 
                shadow-lg shadow-gray-900"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
