import { useState } from 'react';

interface DragAndDrop {
  initialData: any[];
}

export const useDragAndDrop = ({ initialData }: DragAndDrop) => {
  const [data, setData] = useState<any[]>(initialData);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedData = Array.from(data);
    const [removed] = reorderedData.splice(result.source.index, 1);
    reorderedData.splice(result.destination.index, 0, removed);

    setData(reorderedData);
  };

  return { data, handleDragEnd, setData };
};
