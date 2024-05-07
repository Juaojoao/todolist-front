import React, { useRef } from 'react';
import { useStopPropagation } from '../../util/hooks/useStopPropagation';
import { ButtonGreen } from '../buttons/buttonGreen';
import { ButtonRed } from '../buttons/buttonRed';
import { useClickOutside } from '../../util/hooks/useClickOutside';
import { CheckedSvg } from '../svg/checked';
import { ExitIcon } from '../svg/exit';

interface InputConditionProps {
  childrenBefore?: React.ReactNode;
  children: React.ReactNode;
  funcConfirm?: () => void;
  inputOrTextArea?: string;
  funcCancel?: () => void;
  valueInput?: string;
  flexCol?: boolean;
  valueId?: number;
  condition: any;
  funcChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export const InputConditionComp = ({
  inputOrTextArea,
  childrenBefore,
  funcConfirm,
  funcCancel,
  funcChange,
  valueInput,
  condition,
  children,
  valueId,
  flexCol,
}: InputConditionProps) => {
  const ref = useRef(null);

  useClickOutside({
    ref: ref,
    callback: funcCancel,
  });

  return (
    <>
      {condition ? (
        <div
          className={`flex gap-2 w-full items-center ${flexCol ? 'flex-col' : 'flex-row'}`}
          ref={ref}
          onClick={useStopPropagation().stopPropagation}
        >
          {childrenBefore && childrenBefore}
          {inputOrTextArea === 'textarea' ? (
            <textarea
              onChange={funcChange}
              id={`input-${valueId} `}
              name={`input-${valueId}`}
              className="overflow-hidden resize-none 
              text-sm drop-shadow-2xl py-4 h-auto w-full 
              rounded-lg outline-none p-2 bg-BlackTheme-card
              text-gray-400"
            />
          ) : (
            <input
              onChange={funcChange}
              type="text"
              value={valueInput}
              id={`input-${valueId}`}
              name={`input-${valueId}`}
              className="overflow-hidden resize-none text-sm rounded-md outline-none p-1 
            bg-BlackTheme-list drop-shadow-lg text-gray-400
              border border-gray-400"
            />
          )}
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
