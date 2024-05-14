export const updateDataOrder = (
  data: any[],
  draggedItem: any,
  newPosition: number,
) => {
  const updatedData: any[] = [];

  data.forEach((item: any) => {
    if (!draggedItem.order || !item.order) return;
    if (item.id === draggedItem.id) {
      updatedData.push({ ...item, order: newPosition });
    } else if (draggedItem.order > newPosition) {
      if (item.order >= newPosition && item.order < draggedItem.order) {
        updatedData.push({ ...item, order: item.order + 1 });
      } else {
        updatedData.push(item);
      }
    } else if (draggedItem.order < newPosition) {
      if (item.order <= newPosition && item.order > draggedItem.order) {
        updatedData.push({ ...item, order: item.order - 1 });
      } else if (item.order === newPosition) {
        updatedData.push({ ...item, order: item.order - 1 });
      } else {
        updatedData.push(item);
      }
    } else {
      updatedData.push(item);
    }
  });

  return updatedData;
};
