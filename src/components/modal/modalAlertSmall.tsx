import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

type ModalProps = {
  title?: string;
  funcConfirm?: () => void;
  show: boolean;
};

export const ModalAlertSmall = ({ funcConfirm, title, show }: ModalProps) => {
  const [open, setOpen] = useState(show);
  const handleOpen = () => setOpen(!open);

  const handleConfirm = () => {
    funcConfirm && funcConfirm();
    handleOpen();
  };

  return (
    <>
      <button
        className="border text-sm px-1 text-gray-300 opacity-50 rounded-md hover:opacity-75 hover:text-red-600
        hover:border-red-600 transition duration-150"
        onClick={handleOpen}
      >
        EXCLUIR
      </button>
      <Dialog open={open} handler={handleOpen} className="bg-BlackTheme-card">
        {title && (
          <DialogHeader className="text-gray-300">
            Excluir <span className="text-red-600 ml-2">{title}</span> ?
          </DialogHeader>
        )}
        <DialogBody className="text-gray-300">
          <p>
            A exclusão de uma checklist é permanente e não é possível
            recuperá-la.
          </p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleConfirm}>
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
