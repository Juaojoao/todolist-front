import React, { useRef } from 'react';
import { useStopPropagation } from '../../util/hooks/useStopPropagation';
import { ButtonGreen } from '../buttons/buttonGreen';
import { ButtonRed } from '../buttons/buttonRed';

interface InputConditionProps {
  condition: any;
  children: React.ReactNode;
  funcConfirm?: () => void;
  funcCancel?: () => void;
  funcChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  value?: string;
}

export const InputConditionComp = ({
  children,
  condition,
  funcCancel,
  funcConfirm,
  funcChange,
  value,
}: InputConditionProps) => {
  const ref = useRef(null);

  return (
    <>
      {condition ? (
        <div
          className="flex gap-2"
          onClick={useStopPropagation().stopPropagation}
          ref={ref}
        >
          <input
            onChange={funcChange}
            type="text"
            value={value}
            className="overflow-hidden resize-none text-sm rounded-lg outline-none p-1 
            bg-BlackTheme-list drop-shadow-lg text-gray-400
            border border-gray-400"
          />
          <div className="flex gap-2">
            <ButtonGreen
              children="V"
              buttonProps={{
                onClick: () => funcConfirm && funcConfirm(),
              }}
            />
            <ButtonRed
              children="X"
              buttonProps={{
                onClick: () => funcCancel && funcCancel(),
              }}
            />
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
