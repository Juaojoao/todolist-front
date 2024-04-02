interface User {
  id?: number;
  email?: string;
  name?: string;
  password?: string;
  image?: string;
  quadros?: Quadro[];
}

interface Quadro {
  id?: number;
  name?: string;
  activitiesList?: List[];
  userId?: number;
}

interface List {
  id?: number;
  name?: string;
  cards?: Card[];
  frameId?: number;
}

interface Card {
  id?: number;
  name?: string;
  description?: string;
  createdAt?: string;
  tasklist?: taskList[];
  activitiesListId?: number;
}

interface taskList {
  id: number;
  name: string;
  cardId?: number;
  tasks: Tasks[];
}

interface Tasks {
  id?: number;
  name?: string;
  status?: boolean;
  taskListId?: number;
}

export type { User, Quadro, List, Card, Tasks, taskList };
