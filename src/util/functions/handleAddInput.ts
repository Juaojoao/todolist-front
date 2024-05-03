interface IShowButton {
    setShowButton: any;
    valueId?: number;
}

export const handleAddButton = ({valueId, setShowButton}:IShowButton) => {
    if (valueId === undefined) return;
    setShowButton((prevState: { [key: number]: boolean }) => ({
      ...prevState,
      [valueId]: !prevState[valueId],
    }));
  };
