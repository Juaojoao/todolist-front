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
  order?: number;
}

interface List {
  id?: number;
  name?: string;
  cards?: Card[];
  frameId?: number;
  order?: number;
}

interface Card {
  id?: number;
  name?: string;
  description?: string;
  createdAt?: string;
  tasklist?: taskList[];
  activitiesListId?: number;
  order?: number;
}

interface taskList {
  id?: number;
  name?: string;
  cardId?: number;
  tasks?: Tasks[];
  order?: number;
}

interface Tasks {
  id?: number;
  name?: string;
  status?: boolean;
  taskListId?: number;
  order?: number;
}

export type { User, Quadro, List, Card, Tasks, taskList };
