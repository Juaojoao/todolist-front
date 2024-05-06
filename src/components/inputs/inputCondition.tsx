import React, { useRef } from 'react';
import { useStopPropagation } from '../../util/hooks/useStopPropagation';
import { ButtonGreen } from '../buttons/buttonGreen';
import { ButtonRed } from '../buttons/buttonRed';
import { useClickOutside } from '../../util/hooks/useClickOutside';
import { CheckedSvg } from '../svg/checked';
import { ExitIcon } from '../svg/exit';

interface InputConditionProps {
  condition: any;
  children: React.ReactNode;
  funcConfirm?: () => void;
  funcCancel?: () => void;
  funcChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  valueInput?: string;
  valueId?: number;
}

export const InputConditionComp = ({
  children,
  condition,
  funcCancel,
  funcConfirm,
  funcChange,
  valueInput,
  valueId,
}: InputConditionProps) => {
  const ref = useRef(null);

  useClickOutside({
    ref: ref,
    callback: () => funcCancel,
  });

  return (
    <>
      {condition ? (
        <div
          className="flex gap-2"
          ref={ref}
          onClick={useStopPropagation().stopPropagation}
        >
          <input
            onChange={funcChange}
            type="text"
            value={valueInput}
            id={`input-${valueId}`}
            name={`input-${valueId}`}
            className="overflow-hidden resize-none text-sm rounded-lg outline-none p-1 
            bg-BlackTheme-list drop-shadow-lg text-gray-400
            border border-gray-400"
          />
          <div className="flex gap-2">
            <ButtonGreen
              children={<CheckedSvg />}
              buttonProps={{
                onClick: funcConfirm,
              }}
            />
            <ButtonRed
              children={<ExitIcon />}
              buttonProps={{
                onClick: funcCancel,
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
