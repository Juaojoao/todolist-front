import { FrameContextType } from '../../context/FrameContext';

export const FrameService = (frameContext: FrameContextType) => {
  const { getFrames, createFrame, updateFrame, deleteFrame } = frameContext;

  const onGetFrames = async (userId: number) => {
    if (!userId) return;
    return await getFrames(userId);
  };

  const onCreateFrame = async (
    frameId: number,
    name: string,
    userId?: number,
  ) => {
    if (!frameId || !name || !userId) return;
    await createFrame(frameId, name);
    return await getFrames(userId);
  };

  const onUpdateFrame = async (
    frameId: number,
    name: string,
    userId?: number,
  ) => {
    if (!frameId || !name || !userId) return;
    await updateFrame(frameId, { userId, name });
    return await getFrames(userId);
  };

  const onDeleteFrame = async (frameId: number, userId?: number) => {
    if (!frameId || !userId) return;
    await deleteFrame(frameId, userId);
    return await getFrames(userId);
  };

  return {
    onGetFrames,
    onCreateFrame,
    onUpdateFrame,
    onDeleteFrame,
  };
};
