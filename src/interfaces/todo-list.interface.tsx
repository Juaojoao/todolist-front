interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  image?: string;
  quadros?: Quadro[];
  tasksContainers?: TasksContainer[];
}

interface Quadro {
  id: number;
  name: string;
  activitiesList?: List[];
  owner?: number;
}

interface List {
  id: number;
  name: string;
  cards?: Card[];
  frameId?: number;
}

interface Card {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  tasklist?: Task[];
  activitiesListId?: number;
}

interface Task {
  id: number;
  name: string;
  status: boolean;
  cardId?: number;
}

interface TasksContainer {
  id: number;
  name: string;
  tasks?: Task[];
  owner?: number;
}

export type { User, Quadro, List, Card, Task, TasksContainer };
