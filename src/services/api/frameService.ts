import { Quadro } from '../../interfaces/todo-list.interface';
import { connectionAPI } from './api';

export class FrameService {
  constructor(private api = connectionAPI) {}

  async createFrame({ userId, name }: Quadro) {
    if (!userId || !name) return;
    const UserId = Number(userId);
    try {
      await this.api.post('frame/create', { UserId, name });
    } catch (error) {
      console.error('Error creating Frame', error);
    }
  }

  // const onGetFrames = async (userId: number) => {
  //   if (!userId) return;
  //   return await getFrames(userId);
  // };

  // const onUpdateFrame = async (
  //   frameId: number,
  //   name: string,
  //   userId?: number,
  // ) => {
  //   if (!frameId || !name || !userId) return;
  //   await updateFrame(frameId, { userId, name });
  //   return await getFrames(userId);
  // };

  // const onDeleteFrame = async (frameId: number, userId?: number) => {
  //   if (!frameId || !userId) return;
  //   await deleteFrame(frameId, userId);
  //   return await getFrames(userId);
  // };
}
