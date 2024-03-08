import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

type ModalProps = {
  title: string;
  dialog?: string;
  funcConfirm?: () => void;
};

export const ModalComponent = ({ title, funcConfirm, dialog }: ModalProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const handleConfirm = () => {
    funcConfirm && funcConfirm();
    handleOpen();
  };

  return (
    <>
      <button className="w-full" onClick={handleOpen}>
        {title}
      </button>
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
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleConfirm}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
