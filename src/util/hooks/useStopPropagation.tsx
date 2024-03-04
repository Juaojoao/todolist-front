export const useStopPropagation = () => {
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return {
    stopPropagation,
  };
};
