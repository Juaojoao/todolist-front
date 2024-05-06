import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { TreshSvg } from '../svg/tresh';

interface ModalProps extends React.HTMLAttributes<HTMLButtonElement> {
  dialog?: string;
  funcConfirm?: () => void;
}

export const ModalComponent = ({ funcConfirm, dialog }: ModalProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const handleConfirm = () => {
    funcConfirm && funcConfirm();
    handleOpen();
  };

  return (
    <>
      <TreshSvg
        className="w-full outline-none border-none"
        onClick={() => setOpen(true)}
      />
      <Dialog open={open} handler={handleOpen} className="bg-BlackTheme-card ">
        <DialogHeader className="text-gray-300">
          Você tem certeza desta ação?
        </DialogHeader>
        {dialog && (
          <DialogBody className="text-gray-300">
            <p>{dialog}</p>
          </DialogBody>
        )}
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancelar</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleConfirm}>
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
